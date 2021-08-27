export class Serializable<T> {
	constructor(options: {
		serialize: (value: T) => any;
		deserialize: (data: any) => T;
	}) {
		this.serialize = options.serialize as any;
		this.deserialize = options.deserialize;
	}

	readonly serialize: (value: T | undefined) => any;
	readonly deserialize: (data: any) => T;

	serializeArray(value: T[] | undefined): any[] {
		return (value || []).map(this.serialize);
	}

	deserializeArray(data: any[]): T[] {
		return data.map(this.deserialize);
	}
}
