export const enum TypeEnum {
	Null = 'Null',
	Undefined = 'Undefined',
	Object = 'Object',
	Array = 'Array',
	String = 'String',
	Number = 'Number',
	Boolean = 'Boolean',
	Function = 'Function',
	Symbol = 'Symbol',
	BigInt = 'BigInt',
}

export function typeOf(param: any): TypeEnum {
	const result = Object.prototype.toString.call(param).match(/\s+(\w+)/)
	return result ? (result[1] as TypeEnum) : TypeEnum.Null
}
