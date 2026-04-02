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
	const primaryIsHorizontal =
		anchorPlacement.startsWith('top') ||
		anchorPlacement.startsWith('bottom')
	const secondaryLeft = anchorPlacement.includes('left')
	const secondaryRight = anchorPlacement.includes('right')
	const secondaryTop = anchorPlacement.includes('top')
	const secondaryBottom = anchorPlacement.includes('bottom')
	const clampX = (x: number) =>
		Math.max(scrollX, Math.min(x, scrollX + viewportWidth - popupWidth))
	const clampY = (y: number) =>
		Math.max(scrollY, Math.min(y, scrollY + viewportHeight - popupHeight))

	if (
		anchorPlacement.startsWith('left') ||
		anchorPlacement.startsWith('right')
	) {
		if (anchorPlacement.startsWith('left')) {
			style.right = `${Math.ceil(viewportWidth - scrollX - left)}px`
		} else {
			style.left = `${Math.ceil(scrollX + right)}px`
		}

		if (secondaryTop) {
			style.top = `${Math.ceil(scrollY + top)}px`
		} else if (secondaryBottom) {
			style.bottom = `${Math.ceil(viewportHeight - scrollY - bottom)}px`
		} else {
			const y =
				popupHeight > 0
					? scrollY + top + height / 2 - popupHeight / 2
					: scrollY + top + height / 2
			style.top = `${Math.round(clampY(y))}px`
		}
	} else {
		if (anchorPlacement.startsWith('top')) {
			style.bottom = `${Math.ceil(viewportHeight - scrollY - top)}px`
		} else {
			style.top = `${Math.ceil(scrollY + bottom)}px`
		}

		if (secondaryLeft) {
			style.left = `${Math.ceil(scrollX + left)}px`
		} else if (secondaryRight) {
			style.right = `${Math.ceil(viewportWidth - scrollX - right)}px`
		} else {
			const x =
				popupWidth > 0
					? scrollX + left + width / 2 - popupWidth / 2
					: scrollX + left + width / 2
			style.left = `${Math.round(clampX(x))}px`
		}
	}

	return style
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('anchor-frame') {
	position: absolute;
}
</style>
