
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

	memory = new WebAssembly.Memory ({
		initial: config.memory.initial,
		maximum: config.memory.maximum,
		shared: true
	});

	dataView = new DataView (memory.buffer);

	const { instance } = await WebAssembly.instantiate (decodeDataUri(main_wasm), {
		env: { memory: memory },
		wasi_snapshot_preview1: wasi
	});

	asyl = new Module(instance);
	asyl.core = { };

	// Copy the core exports, which are prefixed with an underscore.
	let name: string;
	let value: any;

	for ([name, value] of Object.entries(asyl.instance.exports))
	{
		if (name[0] !== '_')
			continue;

		asyl.core[name.substr(1)] = value;
	}
}

/**
 * Loads a WebAssembly module from an array buffer and returns an Asyl module.
 * @param {ArrayBuffer} bytes Array buffer containing a WebAssembly binary.
 * @param {Module} env Module imports to pass to the WebAssembly instantiate method.
 * @returns {Promise<Module>}
 */
export async function loadFromArrayBuffer (bytes: ArrayBuffer, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	if (asyl === null) await loadAsyl();

	const { instance } = await WebAssembly.instantiate (bytes, {
		env: { memory: memory, ...env, ...asyl.core },
		wasi_snapshot_preview1: wasi
	});

	return new Module(instance);
}

/**
 * Decodes a base-64 data URI and returns an array buffer.
 * @param {string} data
 * @returns {ArrayBuffer}
 */
function decodeDataUri (data: string) {
	const [, content] = decodeURIComponent(data).split(',', 2);
	return new Uint8Array(Array.from(atob(content)).map( (v: string) => v.charCodeAt(0) )).buffer;
}

/**
 * Loads a WebAssembly module from a Data URI and returns an Asyl module.
 * @param uri - Data URI representing the WASM module data.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export async function loadFromDataUri (uri: string, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	return loadFromArrayBuffer(decodeDataUri(uri), env);
}

/**
 * Loads a WebAssembly module from a URL and returns an Asyl module.
 * @param url - URL of the WASM module to load.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export async function loadFromUrl (url: string, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	return loadFromArrayBuffer(await (await fetch(url)).arrayBuffer(), env);
}
