<template lang="pug">
slot
</template>

<script lang="ts" setup>
import {
	computed,
	onBeforeUnmount,
	onMounted,
	provide,
	ref,
	shallowRef,
	watch,
} from 'vue'
import {
	POPUP_INSIDE_COMPONENT_NAMES,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'
import { type PopupRenderOption } from '../controller'
import type { PopupViewportBoundary } from '../typings'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.VIEWPORT,
})

type Props = {
	viewport: Required<PopupRenderOption>['viewport']
}

const { viewport } = defineProps<Props>()

const element = ref(getViewportElement(viewport))
const boundary = ref(createBoundary())
const resizeObserver = shallowRef<ResizeObserver>()
const scrollTargets = shallowRef<Array<Element | Window>>([])

watch(
	() => viewport,
	() => {
		element.value = getViewportElement(viewport)
		unbindResizeObserver()
		unbindScrollObservers()
		unbindWindowResizeObserver()
		if (element.value) {
			bindResizeObserver()
			bindScrollObservers()
			bindWindowResizeObserver()
		}
		updateBoundary()
	}
)

onMounted(() => {
	if (element.value) {
		bindResizeObserver()
		bindScrollObservers()
		window.addEventListener('resize', updateBoundary)
	}
	createBoundary()
})

onBeforeUnmount(() => {
	unbindResizeObserver()
	unbindScrollObservers()
	window.removeEventListener('resize', updateBoundary)
})

function bindResizeObserver() {
	if (!element.value) return
	resizeObserver.value = new ResizeObserver(updateBoundary)
	resizeObserver.value.observe(element.value)
}

function unbindResizeObserver() {
	if (!element.value || !resizeObserver.value) return
	resizeObserver.value.unobserve(element.value)
	resizeObserver.value.disconnect()
}

function bindScrollObservers() {
	const targets: Array<Element | Window> = []
	if (element.value) {
		let parent: Element | null = element.value.parentElement
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
		element.addEventListener('scroll', updateBoundary, { passive: true })
	)
}

function unbindScrollObservers() {
	scrollTargets.value.forEach((element) =>
		element.removeEventListener('scroll', updateBoundary)
	)
	scrollTargets.value = []
}

function bindWindowResizeObserver() {
	window.addEventListener('resize', updateBoundary)
}

function unbindWindowResizeObserver() {
	window.removeEventListener('resize', updateBoundary)
}

function createBoundary() {
	return createViewportBoundary()
}

function updateBoundary() {
	boundary.value = createBoundary()
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

function createViewportBoundary(): PopupViewportBoundary {
	const scrollX = window.scrollX
	const scrollY = window.scrollY

	if (!element.value || !element.value.isConnected)
		return createFixedBoundary()

	const rect = element.value.getBoundingClientRect()
	const computedStyle = getComputedStyle(element.value)
	const borderLeft = parseFloat(computedStyle.borderLeftWidth || '0')
	const borderTop = parseFloat(computedStyle.borderTopWidth || '0')
	const paddingLeft = parseFloat(computedStyle.paddingLeft || '0')
	const paddingTop = parseFloat(computedStyle.paddingTop || '0')
	const top = scrollY + rect.top
	const left = scrollX + rect.left
	const right = left + element.value.clientWidth
	const bottom = top + element.value.clientHeight

	return {
		fixed: false,
		left,
		top,
		right,
		bottom,
		width: right - left,
		height: bottom - top,
	}
}

function createFixedBoundary(): PopupViewportBoundary {
	const scrollX = window.scrollX
	const scrollY = window.scrollY
	const clientWidth = document.documentElement.clientWidth
	const clientHeight = document.documentElement.clientHeight

	return {
		fixed: true,
		left: scrollX,
		top: scrollY,
		right: scrollX + clientWidth,
		bottom: scrollY + clientHeight,
		width: clientWidth,
		height: clientHeight,
	}
}

provide(
	POPUP_INSIDE_COMPONENT_INJECTS.VIEWPORT_BOUNDARY,
	computed(() => boundary.value)
)
</script>
