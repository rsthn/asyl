
import { asyl, memory } from "./loader";

export default class Module
{
	[key: string]: any;

	instance: WebAssembly.Instance;
	memory: WebAssembly.Memory;
	dv: DataView;

	constructor (instance: WebAssembly.Instance)
	{
		this.instance = instance;

		if (instance.exports.memory) {
			this.memory = instance.exports.memory as WebAssembly.Memory;
			this.dv = new DataView (this.memory.buffer);
		} else {
			this.memory = null;
			this.dv = null;
		}

		let name: string;
		let value: any;

		// Copy the exports to the top-level of this module object.
		for ([name, value] of Object.entries(this.instance.exports))
		{
			if (value instanceof WebAssembly.Memory)
				continue;

			this[name] = value;
		}
	}

	/**
	 * Allocates a block of memory in the WebAssembly module memory space.
	 * @param bytes Number of bytes to allocate.
	 */
	alloc (bytes: number) : number
	{
		if (asyl === null)
			throw new Error("Main asyl module not loaded yet.");

		return asyl.core.malloc(bytes);
	}

	/**
	 * Frees a block of memory in the WebAssembly module memory space.
	 * @param ptr Pointer to the start of the block to free.
	 */
	free (ptr: number) : void
	{
		if (asyl === null)
			throw new Error("Main asyl module not loaded yet.");

		asyl.core.free(ptr);
	}

	stringNew (str) : number
	{
		return this.stringWrite(this.alloc(str.length+1), str);
	}

	stringWrite (ptr: number, str: string) : number
	{
		for (let i: number = 0; i < str.length; i++)
			this.dv.setUint8(ptr+i, str.charCodeAt(i));

		this.dv.setUint8(ptr+str.length, 0);
		return ptr;
	}

	stringRead (ptr: number) : string
	{
		let ch: number, s: string[] = [];

		while ((ch = this.dv.getUint8(ptr++)) != 0)
			s.push(String.fromCharCode(ch));

		return s.join('');
	}

	/**
	 * Creates a new Float32Array view from a location in the WebAssembly module memory.
	 * @param offset Byte offset into the module memory to start the view.
	 * @param count Number of bytes to include in the view.
	 * @returns Float32Array
	 */
	mapFloat32Array (offset: number, count: number) : Float32Array {
		return new Float32Array(this.memory ? this.memory.buffer : memory.buffer, offset, count);
	}

	/**
	 * Creates a new Uint8Array view from a location in the WebAssembly module memory.
	 * @param offset Byte offset into the module memory to start the view.
	 * @param count Number of bytes to include in the view.
	 * @returns Uint8Array
	 */
	mapUint8Array (offset: number, count: number) : Uint8Array {
		return new Uint8Array(this.memory ? this.memory.buffer : memory.buffer, offset, count);
	}
};
