<template lang="pug">
div(:class="ns.block()" :style="styleObject")
	slot
</template>

<script lang="ts" setup>
import {
	inject,
	nextTick,
	onBeforeUnmount,
	onMounted,
	ref,
	shallowRef,
	watch,
} from 'vue'
import {
	type AnchorAdjust,
	type AnchorPlacement,
	type RenderOption,
} from '../controller'
import { useNamespace, usePopup } from '../hooks'
import { type ComputedStyle } from '../typings'
import { P_INSIDE_COMPONENT_NAMES, POPUP_COMPONENT_INJECTS } from '../CONSTANTS'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.ANCHOR_FRAME,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.ANCHOR_FRAME)
const popup = usePopup()
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const viewComputedStyleRef = shallowRef<ComputedStyle | null>(null)

type Props = {
	anchor: Required<RenderOption>['anchor']
	placement: AnchorPlacement
	adjust: AnchorAdjust
	clamp: boolean
	viewport: Required<RenderOption>['viewport']
	zIndex: number
}

const { anchor, placement, adjust, clamp, viewport, zIndex } =
	defineProps<Props>()

const anchorElement =
	typeof anchor === 'string' ? document.querySelector(anchor) : anchor
const styleObject = ref(createStyle())
const resizeObserver = shallowRef<ResizeObserver>()
const scrollTargets = shallowRef<Array<Element | Window>>([])

onMounted(async () => {
	bindResizeObserver()
	bindWindowResizeObserver()
	bindScrollObservers()
	await nextTick()
	bindComputedStyleWatcher()
})

onBeforeUnmount(() => {
	unbindResizeObserver()
	unbindWindowResizeObserver()
	unbindScrollObservers()
})

function bindResizeObserver() {
	if (anchorElement) {
		resizeObserver.value = new ResizeObserver(updateStyle)
		resizeObserver.value.observe(anchorElement)
	}
}

function unbindResizeObserver() {
	if (anchorElement && resizeObserver.value) {
		resizeObserver.value.unobserve(anchorElement)
		resizeObserver.value.disconnect()
	}
}

function bindWindowResizeObserver() {
	window.addEventListener('resize', updateStyle)
}

function unbindWindowResizeObserver() {
	window.removeEventListener('resize', updateStyle)
}

function bindComputedStyleWatcher() {
	const computedStyle = popup.getComputedStyle(instanceId)
	viewComputedStyleRef.value = computedStyle
	if (!computedStyle) return
	watch(() => computedStyle.value.width, updateStyle)
	watch(() => computedStyle.value.height, updateStyle)
	watch(() => adjust, updateStyle)
	watch(() => clamp, updateStyle)
	updateStyle()
}

function bindScrollObservers() {
	const targets: Array<Element | Window> = []
	if (anchorElement) {
		let parent: Element | null = anchorElement.parentElement
		const reg = /(auto|scroll|overlay)/
		while (parent) {
			const style = getComputedStyle(parent)
			if (reg.test(style.overflowX) || reg.test(style.overflowY)) {
				targets.push(parent)
			}
			parent = parent.parentElement
		}
	}
	targets.push(window)
	scrollTargets.value = targets
	scrollTargets.value.forEach((element) =>
		element.addEventListener('scroll', updateStyle, { passive: true })
	)
}

function unbindScrollObservers() {
	scrollTargets.value.forEach((element) =>
		element.removeEventListener('scroll', updateStyle)
	)
	scrollTargets.value = []
}

function checkAnchorConnected() {
	return !!anchorElement?.isConnected
}

function updateStyle() {
	if (checkAnchorConnected()) {
		styleObject.value = createStyle()
	} else {
		destroy()
	}
}

function destroy() {
	const popup = usePopup()
	popup.destroy(instanceId)
}

function parsePlacement(placement: AnchorPlacement) {
	const parts = placement.split('-') as [string, string?]
	const direction = (parts[0] || 'bottom') as
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
	const align = ((parts[1] as 'start' | 'end') || 'center') as
		| 'start'
		| 'end'
		| 'center'
	return { direction, align }
}

function computeSpaces(
	rect: Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left'>,
	viewportWidth: number,
	viewportHeight: number
) {
	return {
		above: rect.top,
		below: viewportHeight - rect.bottom,
		left: rect.left,
		right: viewportWidth - rect.right,
	}
}

function flipDirectionIfNeeded(
	direction: 'top' | 'bottom' | 'left' | 'right',
	spaces: { above: number; below: number; left: number; right: number },
	popupSize: { width: number; height: number }
) {
	if (direction === 'top' && popupSize.height > spaces.above) {
		return spaces.below >= spaces.above ? 'bottom' : 'top'
	}
	if (direction === 'bottom' && popupSize.height > spaces.below) {
		return spaces.above >= spaces.below ? 'top' : 'bottom'
	}
	if (direction === 'left' && popupSize.width > spaces.left) {
		return spaces.right >= spaces.left ? 'right' : 'left'
	}
	if (direction === 'right' && popupSize.width > spaces.right) {
		return spaces.left >= spaces.right ? 'left' : 'right'
	}
	return direction
}

function computeBasePosition(
	direction: 'top' | 'bottom' | 'left' | 'right',
	align: 'start' | 'end' | 'center',
	rect: Pick<
		DOMRect,
		'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'
	>,
	popupSize: { width: number; height: number },
	scroll: { x: number; y: number }
) {
	let left = scroll.x
	let top = scroll.y
	if (direction === 'top') {
		top = Math.round(scroll.y + rect.top - popupSize.height)
		if (align === 'start') {
			left = Math.round(scroll.x + rect.left)
		} else if (align === 'end') {
			left = Math.round(scroll.x + rect.right - popupSize.width)
		} else {
			left = Math.round(
				scroll.x + rect.left + rect.width / 2 - popupSize.width / 2
			)
		}
	} else if (direction === 'bottom') {
		top = Math.round(scroll.y + rect.bottom)
		if (align === 'start') {
			left = Math.round(scroll.x + rect.left)
		} else if (align === 'end') {
			left = Math.round(scroll.x + rect.right - popupSize.width)
		} else {
			left = Math.round(
				scroll.x + rect.left + rect.width / 2 - popupSize.width / 2
			)
		}
	} else if (direction === 'left') {
		left = Math.round(scroll.x + rect.left - popupSize.width)
		if (align === 'start') {
			top = Math.round(scroll.y + rect.top)
		} else if (align === 'end') {
			top = Math.round(scroll.y + rect.bottom - popupSize.height)
		} else {
			top = Math.round(
				scroll.y + rect.top + rect.height / 2 - popupSize.height / 2
			)
		}
	} else {
		left = Math.round(scroll.x + rect.right)
		if (align === 'start') {
			top = Math.round(scroll.y + rect.top)
		} else if (align === 'end') {
			top = Math.round(scroll.y + rect.bottom - popupSize.height)
		} else {
			top = Math.round(
				scroll.y + rect.top + rect.height / 2 - popupSize.height / 2
			)
		}
	}
	return { left, top }
}

function createStyle() {
	const style: Record<string, string | number> = {
		zIndex,
	}

	if (!anchorElement) return style

	const viewportWidth = document.documentElement.clientWidth
	const viewportHeight = document.documentElement.clientHeight
	const scrollX = window.scrollX
	const scrollY = window.scrollY
	const { top, right, bottom, left, width, height } =
		anchorElement.getBoundingClientRect()
	const popupWidth = viewComputedStyleRef.value?.value.width ?? 0
	const popupHeight = viewComputedStyleRef.value?.value.height ?? 0

	const clampXViewport = (x: number) =>
		Math.max(scrollX, Math.min(x, scrollX + viewportWidth - popupWidth))
	const clampYViewport = (y: number) =>
		Math.max(scrollY, Math.min(y, scrollY + viewportHeight - popupHeight))

	const { direction: preferredDirection, align } = parsePlacement(placement)
	const spacesViewport = computeSpaces(
		{ top, right, bottom, left },
		viewportWidth,
		viewportHeight
	)
	let finalDirection = preferredDirection
	if (adjust === 'flip' || adjust === 'auto') {
		finalDirection = flipDirectionIfNeeded(
			preferredDirection,
			spacesViewport,
			{
				width: popupWidth,
				height: popupHeight,
			}
		)
	}
	const position = computeBasePosition(
		finalDirection,
		align as 'start' | 'end' | 'center',
		{ top, right, bottom, left, width, height },
		{ width: popupWidth, height: popupHeight },
		{ x: scrollX, y: scrollY }
	)
	if (adjust === 'shift' || adjust === 'auto') {
		if (finalDirection === 'top' || finalDirection === 'bottom') {
			position.left = clampXViewport(position.left)
		} else {
			position.top = clampYViewport(position.top)
		}
	}

	if (clamp) {
		let boundaryLeft = scrollX
		let boundaryTop = scrollY
		let boundaryRight = scrollX + viewportWidth
		let boundaryBottom = scrollY + viewportHeight
		let boundaryElement: HTMLElement | null = null
		if (typeof clamp === 'string') {
			boundaryElement = document.querySelector(
				clamp
			) as HTMLElement | null
		} else if (viewport instanceof HTMLElement) {
			boundaryElement = viewport
		}
		if (boundaryElement) {
			const r = boundaryElement.getBoundingClientRect()
			boundaryLeft = scrollX + r.left
			boundaryTop = scrollY + r.top
			boundaryRight = scrollX + r.right
			boundaryBottom = scrollY + r.bottom
		}
		const clampXBoundary = (x: number) =>
			Math.max(boundaryLeft, Math.min(x, boundaryRight - popupWidth))
		const clampYBoundary = (y: number) =>
			Math.max(boundaryTop, Math.min(y, boundaryBottom - popupHeight))
		position.left = clampXBoundary(position.left)
		position.top = clampYBoundary(position.top)
	}

	style.left = `${position.left}px`
	style.top = `${position.top}px`
	return style
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('anchor-frame') {
	position: absolute;
}
</style>
