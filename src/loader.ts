
import Module from './module';
import wasi from './wasi';
import atob from 'atob';

/**
 * Decodes a base-64 data URI and returns an array buffer.
 * @param {string} data
 * @returns {ArrayBuffer}
 */
function decodeDataUri (data: string) {
	const [, content] = decodeURIComponent(data).split(',', 2);
	return new Uint8Array(Array.from(atob(content)).map( (v: string) => v.charCodeAt(0))).buffer;
}

/**
 * Loads a WebAssembly module from an array buffer and returns an Asyl module.
 * @param {ArrayBuffer} bytes Array buffer containing a WebAssembly binary.
 * @param {Module} env Module imports to pass to the WebAssembly instantiate method.
 * @returns {Promise<Module>}
 */
export async function loadFromArrayBuffer (bytes: ArrayBuffer, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	const { instance } = await WebAssembly.instantiate (bytes, {
		env: env ?? { },
		wasi_snapshot_preview1: wasi
	});

	return new Module(instance);
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
