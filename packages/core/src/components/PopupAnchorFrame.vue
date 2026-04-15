<template lang="pug">
div(:class="ns.block()" :style="styleObject")
	slot
</template>

<script lang="ts" setup>
import {
	computed,
	inject,
	nextTick,
	onBeforeUnmount,
	onMounted,
	provide,
	ref,
	shallowRef,
	watch,
} from 'vue'
import {
	type AnchorPlacement,
	type AnchorShift,
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
	flip: boolean
	flipAdvance: number
	shift: AnchorShift
	viewport: Required<RenderOption>['viewport']
	zIndex: number
}

const { anchor, placement, shift, flip, flipAdvance, viewport, zIndex } =
	defineProps<Props>()

const anchorElement =
	typeof anchor === 'string' ? document.querySelector(anchor) : anchor
const resizeObserver = shallowRef<ResizeObserver>()
const scrollTargets = shallowRef<Array<Element | Window>>([])
const lastDirection = ref<'top' | 'bottom' | 'left' | 'right' | null>(null)
const styleObject = ref(createStyle())
let flipSourceSize: {
	direction: 'top' | 'bottom' | 'left' | 'right'
	width: number
	height: number
} | null = null

const actualAnchorPlacement = computed<AnchorPlacement>(() => {
	const { direction: preferredDirection, align } = parsePlacement(placement)
	const direction = lastDirection.value || preferredDirection
	if (align === 'center') {
		return direction as AnchorPlacement
	}
	return `${direction}-${align}` as AnchorPlacement
})

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
	watch(() => shift, updateStyle)
	watch(() => flip, updateStyle)
	watch(() => viewport, updateStyle)
	updateStyle()
}

watch(
	() => placement,
	() => {
		lastDirection.value = null
		flipSourceSize = null
		updateStyle()
	}
)

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

function computeSpacesWithinBoundary(
	rect: Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left'>,
	boundary: { left: number; top: number; right: number; bottom: number }
) {
	return {
		above: rect.top - boundary.top,
		below: boundary.bottom - rect.bottom,
		left: rect.left - boundary.left,
		right: boundary.right - rect.right,
	}
}

function resolveViewportBoundary(
	viewportParam: Required<RenderOption>['viewport'],
	scrollX: number,
	scrollY: number,
	viewportWidth: number,
	viewportHeight: number
) {
	let boundaryLeft = scrollX
	let boundaryTop = scrollY
	let boundaryRight = scrollX + viewportWidth
	let boundaryBottom = scrollY + viewportHeight
	let boundaryElement: HTMLElement | null = null
	if (typeof viewportParam === 'string') {
		boundaryElement = document.querySelector(
			viewportParam
		) as HTMLElement | null
	} else if (viewportParam instanceof HTMLElement) {
		boundaryElement = viewportParam
	}
	if (boundaryElement) {
		const r = boundaryElement.getBoundingClientRect()
		const cs = getComputedStyle(boundaryElement)
		const borderLeft = parseFloat(cs.borderLeftWidth || '0')
		const borderTop = parseFloat(cs.borderTopWidth || '0')
		const paddingLeft = parseFloat(cs.paddingLeft || '0')
		const paddingTop = parseFloat(cs.paddingTop || '0')
		const contentLeft = scrollX + r.left + borderLeft + paddingLeft
		const contentTop = scrollY + r.top + borderTop + paddingTop
		const contentRight = contentLeft + boundaryElement.clientWidth
		const contentBottom = contentTop + boundaryElement.clientHeight
		boundaryLeft = contentLeft
		boundaryTop = contentTop
		boundaryRight = contentRight
		boundaryBottom = contentBottom
	}
	return {
		left: boundaryLeft,
		top: boundaryTop,
		right: boundaryRight,
		bottom: boundaryBottom,
	}
}

function oppositeDirection(direction: 'top' | 'bottom' | 'left' | 'right') {
	if (direction === 'top') return 'bottom'
	if (direction === 'bottom') return 'top'
	if (direction === 'left') return 'right'
	return 'left'
}

function spaceForDirection(
	direction: 'top' | 'bottom' | 'left' | 'right',
	spaces: { above: number; below: number; left: number; right: number }
) {
	if (direction === 'top') return spaces.above
	if (direction === 'bottom') return spaces.below
	if (direction === 'left') return spaces.left
	return spaces.right
}

function applyShiftPosition(
	direction: 'top' | 'bottom' | 'left' | 'right',
	shift: AnchorShift,
	position: { left: number; top: number },
	clampX: (x: number) => number,
	clampY: (y: number) => number
) {
	const res = { left: position.left, top: position.top }
	const vertical = direction === 'top' || direction === 'bottom'
	if (shift === 'both') {
		res.left = clampX(res.left)
		res.top = clampY(res.top)
	} else if (shift === 'crossAxis') {
		if (vertical) {
			res.left = clampX(res.left)
		} else {
			res.top = clampY(res.top)
		}
	} else if (shift === 'mainAxis') {
		if (vertical) {
			res.top = clampY(res.top)
		} else {
			res.left = clampX(res.left)
		}
	}
	return res
}

function computeMainAxisOverflow(
	direction: 'top' | 'bottom' | 'left' | 'right',
	position: { left: number; top: number },
	popupSize: { width: number; height: number },
	boundary: { left: number; top: number; right: number; bottom: number }
) {
	// 归一化到 boundary 坐标系，避免绝对坐标基准偏差导致的误判
	const normLeft = position.left - boundary.left
	const normTop = position.top - boundary.top
	const boundWidth = boundary.right - boundary.left
	const boundHeight = boundary.bottom - boundary.top
	if (direction === 'top' || direction === 'bottom') {
		const overflowTop = Math.max(0, -normTop)
		const overflowBottom = Math.max(
			0,
			normTop + popupSize.height - boundHeight
		)
		return overflowTop + overflowBottom
	} else {
		const overflowLeft = Math.max(0, -normLeft)
		const overflowRight = Math.max(
			0,
			normLeft + popupSize.width - boundWidth
		)
		return overflowLeft + overflowRight
	}
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

	const boundary = resolveViewportBoundary(
		viewport,
		scrollX,
		scrollY,
		viewportWidth,
		viewportHeight
	)
	const clampXBoundary = (x: number) =>
		Math.max(boundary.left, Math.min(x, boundary.right - popupWidth))
	const clampYBoundary = (y: number) =>
		Math.max(boundary.top, Math.min(y, boundary.bottom - popupHeight))

	const { direction: preferredDirection, align } = parsePlacement(placement)
	let finalDirection = preferredDirection
	if (flip) {
		const popupSize = { width: popupWidth, height: popupHeight }
		const rectPage = {
			top: scrollY + top,
			right: scrollX + right,
			bottom: scrollY + bottom,
			left: scrollX + left,
		}
		const spacesBoundary = computeSpacesWithinBoundary(rectPage, boundary)
		const flipped = oppositeDirection(preferredDirection)
		const axisSize =
			preferredDirection === 'top' || preferredDirection === 'bottom'
				? popupHeight
				: popupWidth
		const spacePreferred = spaceForDirection(
			preferredDirection,
			spacesBoundary
		)
		const spaceFlipped = spaceForDirection(flipped, spacesBoundary)
		const advance = Math.max(0, flipAdvance || 0)
		const isOnPreferredSide =
			!lastDirection.value || lastDirection.value === preferredDirection

		if (isOnPreferredSide) {
			const earlyFlip = axisSize + advance > spacePreferred
			if (earlyFlip) {
				finalDirection = flipped
			} else {
				const basePreferred = computeBasePosition(
					preferredDirection,
					align as 'start' | 'end' | 'center',
					{ top, right, bottom, left, width, height },
					popupSize,
					{ x: scrollX, y: scrollY }
				)
				const shiftedPreferred = applyShiftPosition(
					preferredDirection,
					shift,
					basePreferred,
					clampXBoundary,
					clampYBoundary
				)
				const overflowPreferred = computeMainAxisOverflow(
					preferredDirection,
					shiftedPreferred,
					popupSize,
					boundary
				)
				const baseFlipped = computeBasePosition(
					flipped,
					align as 'start' | 'end' | 'center',
					{ top, right, bottom, left, width, height },
					popupSize,
					{ x: scrollX, y: scrollY }
				)
				const shiftedFlipped = applyShiftPosition(
					flipped,
					shift,
					baseFlipped,
					clampXBoundary,
					clampYBoundary
				)
				const overflowFlipped = computeMainAxisOverflow(
					flipped,
					shiftedFlipped,
					popupSize,
					boundary
				)
				const FLIP_THRESHOLD = 8
				if (
					overflowPreferred > FLIP_THRESHOLD &&
					overflowFlipped < overflowPreferred
				) {
					finalDirection = flipped
				}
			}
			if (finalDirection === flipped) {
				flipSourceSize = {
					direction: preferredDirection,
					width: popupWidth,
					height: popupHeight,
				}
			}
		} else {
			finalDirection = flipped
			const preferredWidth =
				flipSourceSize &&
				flipSourceSize.direction === preferredDirection
					? Math.max(flipSourceSize.width, popupWidth)
					: popupWidth
			const preferredHeight =
				flipSourceSize &&
				flipSourceSize.direction === preferredDirection
					? Math.max(flipSourceSize.height, popupHeight)
					: popupHeight

			const FLIP_THRESHOLD = 8
			const HYSTERESIS_MIN = 10
			const HYSTERESIS_MAX = 40
			const hysteresisBase = flipAdvance || 0
			const hysteresis = Math.min(
				HYSTERESIS_MAX,
				Math.max(HYSTERESIS_MIN, hysteresisBase + 10)
			)

			const axisSizeBack =
				preferredDirection === 'top' || preferredDirection === 'bottom'
					? preferredHeight
					: preferredWidth
			const canFitPreferredBack = axisSizeBack + advance <= spacePreferred
			const marginPreferred = spacePreferred - (axisSizeBack + advance)
			const marginFlipped = spaceFlipped - (axisSize + advance)

			if (
				canFitPreferredBack &&
				marginPreferred - marginFlipped > hysteresis &&
				Math.abs(marginPreferred) > FLIP_THRESHOLD
			) {
				finalDirection = preferredDirection
			}
		}
	}
	const position = computeBasePosition(
		finalDirection,
		align as 'start' | 'end' | 'center',
		{ top, right, bottom, left, width, height },
		{ width: popupWidth, height: popupHeight },
		{ x: scrollX, y: scrollY }
	)
	const directionIsVertical =
		finalDirection === 'top' || finalDirection === 'bottom'
	if (shift === 'both') {
		position.left = clampXBoundary(position.left)
		position.top = clampYBoundary(position.top)
	} else if (shift === 'crossAxis') {
		if (directionIsVertical) {
			position.left = clampXBoundary(position.left)
		} else {
			position.top = clampYBoundary(position.top)
		}
	} else if (shift === 'mainAxis') {
		if (directionIsVertical) {
			position.top = clampYBoundary(position.top)
		} else {
			position.left = clampXBoundary(position.left)
		}
	}

	lastDirection.value = finalDirection

	style.left = `${position.left}px`
	style.top = `${position.top}px`
	return style
}

provide(POPUP_COMPONENT_INJECTS.ACTUAL_ANCHOR_PLACEMENT, actualAnchorPlacement)
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('anchor-frame') {
	position: absolute;
}
</style>
