export function setClipboard(str: string, needFormat: boolean = true) {
	try {
		const el = document.createElement(needFormat ? 'textarea' : 'input')
		el.style.opacity = '0'
		el.style.height = '0px'
		el.style.border = 'none'
		el.style.color = 'transparent'
		el.style.position = 'fixed'
		el.style.top = '-1000px'
		el.style.left = '-1000px'
		document.body.appendChild(el)
		el.value = str
		el.focus()
		el.select()
		document.execCommand('copy')
		el.blur()
		document.body.removeChild(el)
		return true
	} catch (error) {
		return false
	}
}

export default setClipboard
