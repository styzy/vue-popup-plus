export enum TypeEnum {
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

export interface TypeOf {
	/**
	 * 获取参数的类型
	 * @param param 参数
	 * @returns {TypeEnum} 参数的类型
	 *
	 * @example
	 * ```
	 * import { typeOf, TypeEnum } from '@zarz/utils'
	 *
	 * typeOf('123') === TypeEnum.String // true
	 * typeOf(123) === TypeEnum.Number // true
	 * typeOf(true) === TypeEnum.Boolean // true
	 *
	 * typeOf([]) === TypeEnum.Array // true
	 * typeOf({}) === TypeEnum.Object // true
	 * typeOf(() => {}) === TypeEnum.Function // true
	 *
	 * typeOf(Symbol('123')) === TypeEnum.Symbol // true
	 * typeOf(BigInt(123)) === TypeEnum.BigInt // true
	 *
	 * typeOf(undefined) === TypeEnum.Undefined // true
	 * typeOf(null) === TypeEnum.Null // true
	 *
	 * ```
	 */
	(param: any): TypeEnum
	/**
	 * 检查参数是否为字符串类型
	 * @param param 参数
	 * @returns {boolean} 是否为 String 类型
	 */
	isString(param: any): param is string
	/**
	 * 检查参数是否为数字类型
	 * @param param 参数
	 * @returns {boolean} 是否为 Number 类型
	 */
	isNumber(param: any): param is number
	/**
	 * 检查参数是否为布尔类型
	 * @param param 参数
	 * @returns {boolean} 是否为 Boolean 类型
	 */
	isBoolean(param: any): param is boolean
	/**
	 * 检查参数是否为数组类型
	 * @param param 参数
	 * @returns {boolean} 是否为 Array 类型
	 */
	isArray(param: any): param is any[]
	/**
	 * 检查参数是否为对象类型
	 * @param param 参数
	 * @returns {boolean} 是否为 Object 类型
	 */
	isObject(param: any): param is Record<string, any>
	/**
	 * 检查参数是否为函数类型
	 * @param param 参数
	 * @returns {boolean} 是否为 Function 类型
	 */
	isFunction(param: any): param is (...args: any[]) => any
	/**
	 * 检查参数是否为Symbol类型
	 * @param param 参数
	 * @returns {boolean} 是否为 Symbol 类型
	 */
	isSymbol(param: any): param is symbol
	/**
	 * 检查参数是否为BigInt类型
	 * @param param 参数
	 * @returns {boolean} 是否为 BigInt 类型
	 */
	isBigInt(param: any): param is bigint
	/**
	 * 检查参数是否为null类型
	 * @param param 参数
	 * @returns {boolean} 是否为 null 类型
	 */
	isNull(param: any): param is null
	/**
	 * 检查参数是否为undefined类型
	 * @param param 参数
	 * @returns {boolean} 是否为 undefined 类型
	 */
	isUndefined(param: any): param is undefined
}

function getType(param: any): TypeEnum {
	const result = Object.prototype.toString.call(param).match(/\s+(\w+)/)
	return result ? (result[1] as TypeEnum) : TypeEnum.Null
}

export const typeOf: TypeOf = Object.assign(getType, {
	isString: (param: any): param is string =>
		getType(param) === TypeEnum.String,
	isNumber: (param: any): param is number =>
		getType(param) === TypeEnum.Number,
	isBoolean: (param: any): param is boolean =>
		getType(param) === TypeEnum.Boolean,
	isArray: (param: any): param is any[] => getType(param) === TypeEnum.Array,
	isObject: (param: any): param is Record<string, any> =>
		getType(param) === TypeEnum.Object,
	isFunction: (param: any): param is (...args: any[]) => any =>
		getType(param) === TypeEnum.Function,
	isSymbol: (param: any): param is symbol =>
		getType(param) === TypeEnum.Symbol,
	isBigInt: (param: any): param is bigint =>
		getType(param) === TypeEnum.BigInt,
	isNull: (param: any): param is null => getType(param) === TypeEnum.Null,
	isUndefined: (param: any): param is undefined =>
		getType(param) === TypeEnum.Undefined,
})
