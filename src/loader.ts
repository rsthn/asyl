
import wasi from './wasi';
import Module from './module';

/**
 * Loads a WebAssembly module from a URL and returns an Asyl module.
 * @param url - URL of the WASM module to load.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export default async function load (url: string, env?: WebAssembly.ModuleImports) : Promise<Module>
{
	let bytes: ArrayBuffer = await (await fetch(url)).arrayBuffer();
	const { instance } = await WebAssembly.instantiate (bytes, {
		env: env ?? { },
		wasi_snapshot_preview1: wasi
	});

	return new Module(instance);
}
