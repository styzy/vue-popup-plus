// 是否是父节点
export function isParentNode(parent: HTMLElement, child: HTMLElement) {
	if (parent === child) return false

	let current = child

	while (
		current != undefined &&
		current != null &&
		current.tagName &&
		current.tagName.toUpperCase() != 'BODY'
	) {
		if (current === parent) {
			return true
		}
		current = (current.parentNode as HTMLElement) || null
	}
	return false
}
