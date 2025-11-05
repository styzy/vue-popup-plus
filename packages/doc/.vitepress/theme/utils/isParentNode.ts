// 是否是父节点
export function isParentNode(parentObj: HTMLElement, obj: HTMLElement) {
	if (parentObj === obj) return false

	let currentObj = obj

	while (
		currentObj != undefined &&
		currentObj != null &&
		currentObj.tagName &&
		currentObj.tagName.toUpperCase() != 'BODY'
	) {
		if (currentObj == parentObj) {
			return true
		}
		currentObj = (currentObj.parentNode as HTMLElement) || null
	}
	return false
}
