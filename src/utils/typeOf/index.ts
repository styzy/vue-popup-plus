/**
 * 获取值的精确类型
 * @param param 要检查类型的值
 * @returns 类型字符串，如 'Array', 'Object', 'String', 'Number', 'Boolean', 'Null', 'Undefined', 'Function', 'RegExp', 'Date' 等
 */
export function typeOf(param: unknown): string {
	// 处理undefined的特殊情况
	if (param === undefined) return 'Undefined'
	// 处理null的特殊情况
	if (param === null) return 'Null'

	// 使用Object.prototype.toString获取精确类型
	const typeString = Object.prototype.toString.call(param)
	// 正则表达式提取类型名称，格式为 [object Type]
	const match = typeString.match(/\[object\s+([\w]+)\]/)

	return match ? match[1] : 'Unknown'
}
