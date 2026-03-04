export function setClipboard(text: string, format: boolean = true): void {
	try {
		window.navigator.clipboard.writeText(text)
	} catch (error) {
		try {
			const el = document.createElement(format ? 'textarea' : 'input')
			el.style.opacity = '0'
			el.style.height = '0px'
			el.style.border = 'none'
			el.style.color = 'transparent'
			el.style.position = 'fixed'
			el.style.top = '-1000px'
			el.style.left = '-1000px'
			document.body.appendChild(el)
			el.value = text
			el.focus()
			el.select()
			document.execCommand('copy')
			el.blur()
			document.body.removeChild(el)
		} catch (error) {
			throw error
		}
	}
}

export default setClipboard
