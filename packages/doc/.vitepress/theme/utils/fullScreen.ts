type AllBrowserHtmlElement = HTMLElement & {
	requestFullscreen?: () => void
	mozRequestFullScreen?: () => void
	webkitRequestFullScreen?: () => void
	msRequestFullscreen?: () => void
	exitFullscreen?: () => void
	mozCancelFullScreen?: () => void
	webkitCancelFullScreen?: () => void
	msExitFullscreen?: () => void
}

export function fullScreen(isEnter?: boolean) {
	if (isEnter === undefined) {
		isEnter = true
	} else {
		isEnter = !!isEnter
	}
	if (isEnter) {
		openFullScreen()
	} else {
		closeFullScreen()
	}
}

function openFullScreen() {
	const docElm: AllBrowserHtmlElement = document.documentElement
	//W3C
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen()
	}
	//FireFox
	else if (docElm.mozRequestFullScreen) {
		docElm.mozRequestFullScreen()
	}
	//Chrome等
	else if (docElm.webkitRequestFullScreen) {
		docElm.webkitRequestFullScreen()
	}
	//IE11
	else if (docElm.msRequestFullscreen) {
		docElm.msRequestFullscreen()
	} else {
		return false
	}
	return true
}

function closeFullScreen() {
	const docElm: AllBrowserHtmlElement = document.documentElement
	if (docElm.exitFullscreen) {
		docElm.exitFullscreen()
	} else if (docElm.mozCancelFullScreen) {
		docElm.mozCancelFullScreen()
	} else if (docElm.webkitCancelFullScreen) {
		docElm.webkitCancelFullScreen()
	} else if (docElm.msExitFullscreen) {
		docElm.msExitFullscreen()
	} else {
		return false
	}
	return true
}
