
import Module from './module';
import wasi from './wasi';
import atob from 'atob';

//@ts-ignore
import main_wasm from 'data-url:./main.wasm';

/**
 * Configuration object for the module loader.
 */
export const config =
{
	/**
	 * Initial size of the WebAssembly shared memory.
	 */
	memory: {
		initial: 16, // 16 pages = 1 MB
		maximum: 32768, // 32768 pages = 2 GB
		shared: true
	}
};

/**
 * Shared memory object.
 */
export let memory: WebAssembly.Memory = null;

/**
 * Shared memory data view.
 */
export let dataView: DataView = null;

/**
 * Main asyl module. Exposes several utility functions.
 */
export let asyl: Module = null;

/**
 * Loads the main module and prepares global shared memory.
 */
export async function loadAsyl ()
{
	if (asyl !== null)
		return;

	const wasmBuff = loadDataUri(main_wasm);

	memory = new WebAssembly.Memory ({
		initial: config.memory.initial,
		maximum: config.memory.maximum,
		shared: true
	});

	dataView = new DataView (memory.buffer);

	const { instance } = await WebAssembly.instantiate (wasmBuff.buffer, {
		env: { memory },
		wasi_snapshot_preview1: wasi
	});

	asyl = new Module(instance);
	asyl.core = {
		version: 100
	};

	// Copy the core exports, which are prefixed with an underscore.
	let name: string;
	let value: any;

	for ([name, value] of Object.entries(asyl.instance.exports))
	{
		if (name[0] !== '_')
			continue;

		asyl.core[name.substring(1)] = value;
	}
}

function ldu32 (bytes, index)
{
	let value = 0;
	let shift = 0;

	while (true)
	{
		let k = bytes[index++];
		value |= (k & 0x7F) << shift;
		if (!(k & 0x80)) break;
		shift += 7;
	}

	return [value, index];
}

function ldstr (bytes, index)
{
	let [n, i] = ldu32(bytes, index);
	let value = '';

	for (let j = 0; j < n; j++)
		value += String.fromCharCode(bytes[i+j]);

	return [value, i+n];
}

function stu32 (bytes, index, value)
{
	do {
		bytes[index] = value & 0x7F;
		value >>>= 7;
		if (value) bytes[index] |= 0x80;
		index++;
	}
	while (value != 0);

	return index;
}

function sizu32 (value)
{
	let n = 0;

	do {
		n++;
		value >>>= 7;
	}
	while (value != 0);

	return n;
}

/**
 * Loads a WebAssembly module from a Uint8Array and returns an Asyl module.
 * @param {Uint8Array} bytes Array buffer containing a WebAssembly binary.
 * @param {Module} env Module imports to pass to the WebAssembly instantiate method.
 * @returns {Promise<Module>}
 */
export async function loadFromBytes (bytes: Uint8Array, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	if (asyl === null) await loadAsyl();

	if (bytes[0] != 0x00 && bytes[1] != 0x61 && bytes[2] != 0x73 && bytes[3] != 0x6D)
		throw new Error('Provided buffer is not a WASM module.');

	// Find section `imports` (2) to patch shared memory limits.
	for (let i = 8; i < bytes.length; )
	{
		let value, mod, name, _;

		// Skip other sections.
		if (bytes[i++] != 0x02)
		{
			[value, i] = ldu32(bytes, i);
			i += value;
			continue;
		}

		let secLen, secLenOffs, secLenBytes;
		[secLen, i] = ldu32(bytes, secLenOffs = i); // section length
		secLenBytes = i - secLenOffs;
		[value, i] = ldu32(bytes, i); // import count

		while (value-- > 0)
		{
			[mod, i] = ldstr(bytes, i);
			[name, i] = ldstr(bytes, i);

			switch (bytes[i++])
			{
				case 0x00: // typeidx
					[_, i] = ldu32(bytes, i);
					break;

				case 0x01: // tabletype
					throw new Error('Unsupported import (tabletype): ' + mod + '.' + name);

				case 0x02: // memtype
					[_, i] = ldu32(bytes, i);

					switch(_)
					{
						case 0x00: // min: n, max: ε
							[_, i] = ldu32(bytes, i);
							console.log('memory min=', _);
							break;

						case 0x01: // min: n, max: m
							[_, i] = ldu32(bytes, i);
							console.log('memory min=', _);
							[_, i] = ldu32(bytes, i);
							console.log('memory max=', _);
							break;

						case 0x03: // min: n, max: m (shared)
							let minMem, maxMem, descOffs, descBytes;
							[minMem, i] = ldu32(bytes, descOffs=i);
							[maxMem, i] = ldu32(bytes, i);
							descBytes = i - descOffs;

							console.log(`SHARED LIMITS: MIN=${minMem}, MAX=${maxMem}`);
							if (minMem == config.memory.initial && maxMem == config.memory.maximum)
							{
								console.log('NO PATCHING REQUIRED');
								value = 0;
								break;
							}

							let descBytesNew = sizu32(config.memory.initial) + sizu32(config.memory.maximum);
							console.log('DESC_BYTES=', descBytes, 'NEW=', descBytesNew);
							if (descBytesNew != descBytes)
							{
								secLen = secLen - descBytes + descBytesNew;
								let secLenBytesNew = sizu32(secLen);

								console.log('SEC_BYTES=', secLenBytes, 'NEW=', secLenBytesNew);
								if (secLenBytesNew != secLenBytes)
								{
									console.log('BIG PATCH-2');
								}
								else
								{
									console.log('BIG PATCH-1');
								}
							}
							else
							{
								descOffs = stu32(bytes, descOffs, config.memory.initial);
								descOffs = stu32(bytes, descOffs, config.memory.maximum);
							}

							value = 0;
							break;

						default:
							throw new Error('Unsupported memtype.limits: ' + _);
					}

					break;

				case 0x03: // globaltype
					throw new Error('Unsupported import (globaltype): ' + mod + '.' + name);
			}
		}

		break;
	}

	const { instance } = await WebAssembly.instantiate (bytes, {
		env: { memory, ...env, ...asyl.core },
		wasi_snapshot_preview1: wasi
	});

	return new Module(instance);
}

/**
 * Decodes a base-64 data URI and returns a Uint8Array.
 * @param {string} data
 * @returns {Uint8Array}
 */
function loadDataUri (data: string) {
	const [, content] = decodeURIComponent(data).split(',', 2);
	return new Uint8Array(Array.from(atob(content)).map((v: string) => v.charCodeAt(0)));
}

/**
 * Loads a WebAssembly module from a Data URI and returns an Asyl module.
 * @param uri - Data URI representing the WASM module data.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export async function loadFromDataUri (uri: string, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	return loadFromBytes(loadDataUri(uri), env);
}

/**
 * Loads a WebAssembly module from a URL and returns an Asyl module.
 * @param url - URL of the WASM module to load.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export async function loadFromUrl (url: string, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	return loadFromBytes(new Uint8Array(await (await fetch(url)).arrayBuffer()), env);
}
