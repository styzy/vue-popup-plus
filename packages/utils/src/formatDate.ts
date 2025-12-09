export function formatDate(date = new Date(), rules = 'yyyy-MM-dd hh:mm:ss') {
	date = date || new Date()

	const result: Record<string, string | number> = {
		'M+': date.getMonth() + 1, //month
		'd+': date.getDate(), //day
		'h+': date.getHours(), //hour
		'm+': date.getMinutes(), //minute
		's+': date.getSeconds(), //second
		'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
		S: date.getMilliseconds(), //millisecond
	}

	if (/(y+)/i.test(rules)) {
		rules = rules.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	}

	for (const key in result) {
		if (new RegExp('(' + key + ')').test(rules)) {
			rules = rules.replace(
				RegExp.$1,
				RegExp.$1.length == 1
					? String(result[key])
					: ('00' + result[key]).substr(('' + result[key]).length)
			)
		}
	}
	return rules
}
