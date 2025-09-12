import { typeOf } from '../typeOf'

/**
 * 深克隆函数 - 递归复制对象和数组
 * @param param 要克隆的值
 * @returns 克隆后的值
 */
export function deepClone<T>(param: T): T {
	// 处理null和undefined的情况
	if (param === null || param === undefined) {
		return param
	}

	const type = typeOf(param)
	let newParam: any

	if (type === 'Array') {
		newParam = []
		for (
			let index = 0, length = (param as any[]).length;
			index < length;
			index++
		) {
			newParam.push(deepClone((param as any[])[index]))
		}
		return newParam
	} else if (type === 'Object') {
		newParam = {}
		for (const key in param as object) {
			if (Object.prototype.hasOwnProperty.call(param, key)) {
				newParam[key] = deepClone((param as any)[key])
			}
		}
		return newParam
	}

	// 原始类型直接返回
	return param
}
