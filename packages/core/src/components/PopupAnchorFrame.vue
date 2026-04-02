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
import { type AnchorPlacement, type RenderConfigOptions } from '../controller'
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
	anchor: Required<RenderConfigOptions>['anchor']
	anchorPlacement: AnchorPlacement
	zIndex: number
}

const { anchor, anchorPlacement, zIndex } = defineProps<Props>()

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

	const clampX = (x: number) =>
		Math.max(scrollX, Math.min(x, scrollX + viewportWidth - popupWidth))
	const clampY = (y: number) =>
		Math.max(scrollY, Math.min(y, scrollY + viewportHeight - popupHeight))

	// derive primary and secondary
	let primary: 'top' | 'bottom' | 'left' | 'right'
	if (anchorPlacement.startsWith('top')) primary = 'top'
	else if (anchorPlacement.startsWith('bottom')) primary = 'bottom'
	else if (anchorPlacement.startsWith('left')) primary = 'left'
	else primary = 'right'

	let secondary: 'left' | 'right' | 'top' | 'bottom' | 'center' = 'center'
	if (primary === 'top' || primary === 'bottom') {
		if (/-left$/.test(anchorPlacement)) secondary = 'left'
		else if (/-right$/.test(anchorPlacement)) secondary = 'right'
		else secondary = 'center'
	} else {
		if (/-top$/.test(anchorPlacement)) secondary = 'top'
		else if (/-bottom$/.test(anchorPlacement)) secondary = 'bottom'
		else secondary = 'center'
	}

	// flip when space is insufficient on primary axis
	const spaceAbove = top
	const spaceBelow = viewportHeight - bottom
	const spaceLeft = left
	const spaceRight = viewportWidth - right

	if (primary === 'top' && popupHeight > spaceAbove) {
		primary = spaceBelow >= spaceAbove ? 'bottom' : 'top'
	} else if (primary === 'bottom' && popupHeight > spaceBelow) {
		primary = spaceAbove >= spaceBelow ? 'top' : 'bottom'
	} else if (primary === 'left' && popupWidth > spaceLeft) {
		primary = spaceRight >= spaceLeft ? 'right' : 'left'
	} else if (primary === 'right' && popupWidth > spaceRight) {
		primary = spaceLeft >= spaceRight ? 'left' : 'right'
	}

	// compute base coordinates
	let leftBase = scrollX
	let topBase = scrollY

	if (primary === 'top') {
		topBase = Math.round(scrollY + top - popupHeight)
		// cross-axis horizontal
		if (secondary === 'left') {
			leftBase = Math.round(scrollX + left)
		} else if (secondary === 'right') {
			leftBase = Math.round(scrollX + right - popupWidth)
		} else {
			leftBase = Math.round(scrollX + left + width / 2 - popupWidth / 2)
		}
		// shift on cross-axis to keep fully visible
		leftBase = clampX(leftBase)
		// if still overflows vertically (both sides insufficient), clamp
		topBase = clampY(topBase)
	} else if (primary === 'bottom') {
		topBase = Math.round(scrollY + bottom)
		if (secondary === 'left') {
			leftBase = Math.round(scrollX + left)
		} else if (secondary === 'right') {
			leftBase = Math.round(scrollX + right - popupWidth)
		} else {
			leftBase = Math.round(scrollX + left + width / 2 - popupWidth / 2)
		}
		leftBase = clampX(leftBase)
		topBase = clampY(topBase)
	} else if (primary === 'left') {
		leftBase = Math.round(scrollX + left - popupWidth)
		if (secondary === 'top') {
			topBase = Math.round(scrollY + top)
		} else if (secondary === 'bottom') {
			topBase = Math.round(scrollY + bottom - popupHeight)
		} else {
			topBase = Math.round(scrollY + top + height / 2 - popupHeight / 2)
		}
		topBase = clampY(topBase)
		leftBase = clampX(leftBase)
	} else {
		// primary === 'right'
		leftBase = Math.round(scrollX + right)
		if (secondary === 'top') {
			topBase = Math.round(scrollY + top)
		} else if (secondary === 'bottom') {
			topBase = Math.round(scrollY + bottom - popupHeight)
		} else {
			topBase = Math.round(scrollY + top + height / 2 - popupHeight / 2)
		}
		topBase = clampY(topBase)
		leftBase = clampX(leftBase)
	}

	style.left = `${leftBase}px`
	style.top = `${topBase}px`

	return style
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('anchor-frame') {
	position: absolute;
}
</style>
