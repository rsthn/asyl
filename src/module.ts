
export default class Module
{
	[key: string]: any;

	instance: WebAssembly.Instance;
	memory: WebAssembly.Memory;
	dv: DataView;

	constructor (instance: WebAssembly.Instance)
	{
		this.instance = instance;
		this.memory = instance.exports.memory as WebAssembly.Memory;
		this.dv = new DataView (this.memory.buffer);

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

	alloc (bytes: number) : number
	{
		throw new Error ('Method `alloc` not implemented in WebAssembly module.');
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

	mapFloat32Array (offset: number, count: number) : Float32Array {
		return new Float32Array(this.memory.buffer, offset, count);
	}
};
