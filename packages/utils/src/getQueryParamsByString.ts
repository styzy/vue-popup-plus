/**
 * 将查询字符串转换为查询参数对象
 */
export function getQueryParamsByString(str = '') {
	const theRequest: Record<string, string> = {}

	if (str.indexOf('?') != -1) {
		str = str.substr(str.indexOf('?') + 1)
		if (str.indexOf('#') > 0) {
			str = str.replace(str.substr(str.indexOf('#')), '')
		}
		const strs = str.split('&')
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
		}
	}

	return theRequest
}
