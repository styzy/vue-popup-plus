import { typeOf, TypeEnum } from './typeOf'

export function deepClone<T extends Record<string, any> | Array<any>>(
	param: T
): T {
	const type = typeOf(param)

	if (type !== TypeEnum.Array && type !== TypeEnum.Object) {
		return param
	}

	if (type === TypeEnum.Array) {
		const newParam: any[] = []
		for (
			let index = 0, length = (param as any[]).length;
			index < length;
			index++
		) {
			newParam.push(deepClone((param as any[])[index]))
		}
		return newParam as T
	} else if (type === TypeEnum.Object) {
		const newParam: Record<string, any> = {}
		for (const key in param) {
			newParam[key] = deepClone((param as Record<string, any>)[key])
		}
		return newParam as T
	}

	return param
}
