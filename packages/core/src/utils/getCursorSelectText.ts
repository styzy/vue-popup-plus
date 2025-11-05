type OldDocument = Document & {
	selection: {
		createRange: () => {
			text: string
		}
	}
}

export function getCursorSelectText() {
	return window.getSelection
		? window.getSelection()?.toString()
		: (document as OldDocument).selection.createRange().text
}
