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

function openFullScreen(): boolean {
	const docElm: AllBrowserHtmlElement = document.documentElement

	const enter =
		docElm.requestFullscreen?.bind(docElm) ||
		docElm.mozRequestFullScreen?.bind(docElm) ||
		docElm.webkitRequestFullScreen?.bind(docElm) ||
		docElm.msRequestFullscreen?.bind(docElm)

	if (!enter) {
		console.error('当前浏览器不支持全屏 API')
		return false
	}

	try {
		void enter()
		return true
	} catch (error) {
		console.error('进入全屏失败:', error)
		return false
	}
}

function closeFullScreen(): boolean {
	const isFullScreen = !!(
		document.fullscreenElement ||
		// 兼容 Webkit 内核（Chrome/Safari）
		(document as any).webkitFullscreenElement ||
		// 兼容 Gecko 内核（Firefox）
		(document as any).mozFullScreenElement ||
		// 兼容 Trident 内核（IE/Edge 旧版）
		(document as any).msFullscreenElement
	)

	if (!isFullScreen) {
		console.warn('退出全屏失败: 当前不是全屏状态')
		return false
	}

	const docElm: AllBrowserHtmlElement = document.documentElement

	const exit =
		document.exitFullscreen?.bind(document) ||
		(document as any).webkitExitFullscreen?.bind(document) ||
		(document as any).mozCancelFullScreen?.bind(document) ||
		(document as any).msExitFullscreen?.bind(document) ||
		// 兼容旧版浏览器（通过根元素退出）
		docElm.exitFullscreen?.bind(docElm) ||
		docElm.webkitCancelFullScreen?.bind(docElm) ||
		docElm.mozCancelFullScreen?.bind(docElm) ||
		docElm.msExitFullscreen?.bind(docElm)

	try {
		void exit()
		return true
	} catch (error) {
		console.error('退出全屏失败:', error)
		return false
	}
}
