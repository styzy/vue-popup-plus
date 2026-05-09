<template lang="pug">
div(
	:class="[ns.block(), { [ns.is('has-viewport')]: !!viewportElement }]"
	:style="styleObject")
	slot
</template>

<script lang="ts" setup>
import { inject, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { type PopupPlacement, type PopupRenderOption } from '../controller'
import { useNamespace, usePopup, useViewport } from '../hooks'
import { P_INSIDE_COMPONENT_NAMES, POPUP_COMPONENT_INJECTS } from '../CONSTANTS'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.FRAME,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.FRAME)
const { getViewportElement, resolveViewportBoundary } = useViewport()
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	placement: PopupPlacement
	viewport: Required<PopupRenderOption>['viewport']
	zIndex: number
}

const { placement, viewport, zIndex } = defineProps<Props>()

const viewportElement = ref(getViewportElement(viewport))
const resizeObserver = shallowRef<ResizeObserver>()
const scrollTargets = shallowRef<Array<Element | Window>>([])
const styleObject = ref(createStyle())

watch(
	() => viewport,
	() => {
		viewportElement.value = getViewportElement(viewport)
		unbindResizeObserver()
		unbindScrollObservers()
		unbindWindowResizeObserver()
		if (viewportElement.value) {
			bindResizeObserver()
			bindScrollObservers()
			bindWindowResizeObserver()
		}
		updateStyle()
	}
)
onMounted(() => {
	if (viewportElement.value) {
		bindResizeObserver()
		bindScrollObservers()
		window.addEventListener('resize', updateStyle)
	}
	updateStyle()
})

onBeforeUnmount(() => {
	unbindResizeObserver()
	unbindScrollObservers()
	window.removeEventListener('resize', updateStyle)
})

function bindResizeObserver() {
	if (!viewportElement.value) return
	resizeObserver.value = new ResizeObserver(updateStyle)
	resizeObserver.value.observe(viewportElement.value)
}

function unbindResizeObserver() {
	if (!viewportElement.value || !resizeObserver.value) return
	resizeObserver.value.unobserve(viewportElement.value)
	resizeObserver.value.disconnect()
}

function bindScrollObservers() {
	const targets: Array<Element | Window> = []
	if (viewportElement.value) {
		let parent: Element | null = viewportElement.value.parentElement
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

function bindWindowResizeObserver() {
	window.addEventListener('resize', updateStyle)
}

function unbindWindowResizeObserver() {
	window.removeEventListener('resize', updateStyle)
}

function createStyle() {
	const style: Record<string, string | number> = {
		alignItems: placement.includes('left')
			? 'flex-start'
			: placement.includes('right')
				? 'flex-end'
				: 'center',
		justifyContent: placement.includes('top')
			? 'flex-start'
			: placement.includes('bottom')
				? 'flex-end'
				: 'center',
		zIndex: zIndex,
	}

	if (!viewportElement.value) {
		return style
	}

	const boundary = resolveViewportBoundary(viewportElement.value)
	const doc = document.documentElement
	const body = document.body
	const documentWidth = Math.max(
		doc.clientWidth,
		doc.scrollWidth,
		body?.clientWidth ?? 0,
		body?.scrollWidth ?? 0
	)
	const documentHeight = Math.max(
		doc.clientHeight,
		doc.scrollHeight,
		body?.clientHeight ?? 0,
		body?.scrollHeight ?? 0
	)

	style.top = `${boundary.top}px`
	style.left = `${boundary.left}px`
	style.width = `${boundary.right - boundary.left}px`
	style.height = `${boundary.bottom - boundary.top}px`

	return style
}

function updateStyle() {
	if (checkViewportConnected()) {
		styleObject.value = createStyle()
	} else {
		destroy()
	}
}

function checkViewportConnected() {
	return !!viewportElement.value?.isConnected
}

function destroy() {
	const popup = usePopup()
	popup.destroy(instanceId)
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('frame') {
	display: flex;
	flex-direction: column;
	pointer-events: none;
	@include ns-not('has-viewport') {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	@include ns-is('has-viewport') {
		position: absolute;
	}
}
</style>
