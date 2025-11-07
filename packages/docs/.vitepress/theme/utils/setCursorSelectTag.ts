export function setCursorSelectTag(el: HTMLElement) {
	if ((document.body as any).createTextRange) {
		const range = (document.body as any).createTextRange()

		range.moveToElementText(el)
		range.select()
	} else if (window.getSelection) {
		const selection = window.getSelection(),
			range = document.createRange()
		range.selectNodeContents(el)
		selection?.removeAllRanges()
		selection?.addRange(range)
	}
}
