<template lang="pug">
.popup-anchor-frame(:style="styleObject")
	slot
</template>

<script lang="ts" setup>
import { inject, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from '../'
import { type AnchorPlacement, type RenderConfigOptions } from '../controller'

defineOptions({
	name: 'PopupAnchorFrame',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

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

onMounted(() => {
	bindResizeObserver()
	bindWindowResizeObserver()
	bindScrollObservers()
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

	if (anchorElement) {
		const viewportWidth = document.documentElement.clientWidth
		const viewportHeight = document.documentElement.clientHeight
		const scrollX = window.scrollX
		const scrollY = window.scrollY
		const { top, right, bottom, left, width, height } =
			anchorElement.getBoundingClientRect()
		if (
			anchorPlacement.startsWith('left') ||
			anchorPlacement.startsWith('right')
		) {
			if (anchorPlacement.startsWith('left')) {
				style.right = `${Math.ceil(viewportWidth - scrollX - left)}px`
			} else {
				style.left = `${Math.ceil(scrollX + right)}px`
			}

			if (anchorPlacement.includes('top')) {
				style.top = `${Math.ceil(scrollY + top)}px`
			} else if (anchorPlacement.includes('bottom')) {
				style.bottom = `${Math.ceil(viewportHeight - scrollY - bottom)}px`
			} else {
				style.top = `${Math.ceil(scrollY + top + height / 2)}px`
				style.transform = 'translateY(-50%)'
			}
		} else {
			if (anchorPlacement.startsWith('top')) {
				style.bottom = `${Math.ceil(viewportHeight - scrollY - top)}px`
			} else {
				style.top = `${Math.ceil(scrollY + bottom)}px`
			}

			if (anchorPlacement.includes('left')) {
				style.left = `${Math.ceil(scrollX + left)}px`
			} else if (anchorPlacement.includes('right')) {
				style.right = `${Math.ceil(viewportWidth - scrollX - right)}px`
			} else {
				style.left = `${Math.ceil(scrollX + left + width / 2)}px`
				style.transform = 'translateX(-50%)'
			}
		}
	}

	return style
}
</script>

<style lang="scss" scoped>
.popup-anchor-frame {
	// display: flex;
	// flex-direction: column;
	position: absolute;
	// pointer-events: none;
}
</style>
