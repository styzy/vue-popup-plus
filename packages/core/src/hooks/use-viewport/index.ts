import type { PopupRenderOption } from '../../controller'

export function useViewport() {
	return {
		getViewportElement,
		resolveViewportBoundary,
	}
}

function getViewportElement(viewport: Required<PopupRenderOption>['viewport']) {
	if (typeof viewport === 'string') {
		return document.querySelector(viewport) as HTMLElement | null
	}
	if (viewport instanceof HTMLElement) {
		return viewport
	}
	return null
}

function resolveViewportBoundary(
	viewport: Required<PopupRenderOption>['viewport']
) {
	const scrollX = window.scrollX
	const scrollY = window.scrollY
	const clientWidth = document.documentElement.clientWidth
	const clientHeight = document.documentElement.clientHeight
	let left = scrollX
	let top = scrollY
	let right = scrollX + clientWidth
	let bottom = scrollY + clientHeight
	const viewportElement = getViewportElement(viewport)

	if (viewportElement) {
		const r = viewportElement.getBoundingClientRect()
		const cs = getComputedStyle(viewportElement)
		const borderLeft = parseFloat(cs.borderLeftWidth || '0')
		const borderTop = parseFloat(cs.borderTopWidth || '0')
		const paddingLeft = parseFloat(cs.paddingLeft || '0')
		const paddingTop = parseFloat(cs.paddingTop || '0')
		const contentLeft = scrollX + r.left + borderLeft + paddingLeft
		const contentTop = scrollY + r.top + borderTop + paddingTop
		const contentRight = contentLeft + viewportElement.clientWidth
		const contentBottom = contentTop + viewportElement.clientHeight

		left = contentLeft
		top = contentTop
		right = contentRight
		bottom = contentBottom
	}
	return {
		left,
		top,
		right,
		bottom,
	}
}
