export declare class Module {
	[key: string]: any;
	instance: WebAssembly.Instance;
	memory: WebAssembly.Memory;
	dv: DataView;
	constructor(instance: WebAssembly.Instance);
	/**
	 * Allocates a block of memory in the WebAssembly module memory space.
	 * @param bytes Number of bytes to allocate.
	 */
	alloc(bytes: number): number;
	/**
	 * Frees a block of memory in the WebAssembly module memory space.
	 * @param ptr Pointer to the start of the block to free.
	 */
	free(ptr: number): void;
	stringNew(str: any): number;
	stringWrite(ptr: number, str: string): number;
	stringRead(ptr: number): string;
	/**
	 * Creates a new Float32Array view from a location in the WebAssembly module memory.
	 * @param offset Byte offset into the module memory to start the view.
	 * @param count Number of bytes to include in the view.
	 * @returns Float32Array
	 */
	mapFloat32Array(offset: number, count: number): Float32Array;
	/**
	 * Creates a new Uint8Array view from a location in the WebAssembly module memory.
	 * @param offset Byte offset into the module memory to start the view.
	 * @param count Number of bytes to include in the view.
	 * @returns Uint8Array
	 */
	mapUint8Array(offset: number, count: number): Uint8Array;
}
/**
 * Configuration object for the module loader.
 */
export declare const config: {
	/**
	 * Initial size of the WebAssembly shared memory.
	 */
	memory: {
		initial: number;
		maximum: number;
		shared: boolean;
	};
};
/**
 * Shared memory object.
 */
export declare let memory: WebAssembly.Memory;
/**
 * Shared memory data view.
 */
export declare let dataView: DataView;
/**
 * Main asyl module. Exposes several utility functions.
 */
export declare let asyl: Module;
/**
 * Loads the main module and prepares global shared memory.
 */
export declare function loadAsyl(): Promise<void>;
/**
 * Loads a WebAssembly module from a Uint8Array and returns an Asyl module.
 * @param {Uint8Array} bytes Array buffer containing a WebAssembly binary.
 * @param {Module} env Module imports to pass to the WebAssembly instantiate method.
 * @returns {Promise<Module>}
 */
export declare function loadFromBytes(bytes: Uint8Array, env?: WebAssembly.ModuleImports): Promise<Module>;
/**
 * Loads a WebAssembly module from a Data URI and returns an Asyl module.
 * @param uri - Data URI representing the WASM module data.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export declare function loadFromDataUri(uri: string, env?: WebAssembly.ModuleImports): Promise<Module>;
/**
 * Loads a WebAssembly module from a URL and returns an Asyl module.
 * @param url - URL of the WASM module to load.
 * @param env - Module imports to pass to the WebAssembly instantiate method.
 * @returns Promise<Module>
 */
export declare function loadFromUrl(url: string, env?: WebAssembly.ModuleImports): Promise<Module>;
export declare const wasi: {
	args_get: () => number;
	args_sizes_get: () => number;
	environ_get: () => number;
	environ_sizes_get: () => number;
	clock_res_get: () => number;
	clock_time_get: () => number;
	fd_advise: () => number;
	fd_allocate: () => number;
	fd_close: () => number;
	fd_datasync: () => number;
	fd_fdstat_get: () => number;
	fd_fdstat_set_flags: () => number;
	fd_fdstat_set_rights: () => number;
	fd_filestat_get: () => number;
	fd_filestat_set_size: () => number;
	fd_filestat_set_times: () => number;
	fd_pread: () => number;
	fd_prestat_get: () => number;
	fd_prestat_dir_name: () => number;
	fd_pwrite: () => number;
	fd_read: () => number;
	fd_readdir: () => number;
	fd_renumber: () => number;
	fd_seek: () => number;
	fd_sync: () => number;
	fd_tell: () => number;
	fd_write: () => number;
	path_create_directory: () => number;
	path_filestat_get: () => number;
	path_filestat_set_times: () => number;
	path_link: () => number;
	path_open: () => number;
	path_readlink: () => number;
	path_remove_directory: () => number;
	path_rename: () => number;
	path_symlink: () => number;
	path_unlink_file: () => number;
	poll_oneoff: () => number;
	proc_exit: () => number;
	sched_yield: () => number;
	random_get: () => number;
	sock_accept: () => number;
	sock_recv: () => number;
	sock_send: () => number;
	sock_shutdown: () => number;
};

export {};
