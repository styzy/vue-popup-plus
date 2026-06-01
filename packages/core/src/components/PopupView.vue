<template lang="pug">
div(:class="ns.block()" :style="styleObject" ref="popupViewRef")
	component(
		:is="resolvedComponent"
		:key="`${instanceId.name}-component`"
		v-bind="store.componentProps.value")
</template>

<script lang="ts" setup>
import {
	computed,
	inject,
	defineAsyncComponent,
	type Component,
	ref,
	nextTick,
	onMounted,
	onUpdated,
	provide,
	onUnmounted,
	shallowRef,
	useTemplateRef,
	onBeforeUnmount,
} from 'vue'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_NAMES,
} from '@core/CONSTANTS'
import { useNamespace } from '@core/hooks'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.VIEW,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.VIEW)
const popupViewRef = useTemplateRef<HTMLDivElement>('popupViewRef')

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const instance = inject(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE)!
const viewportBoundary = inject(
	POPUP_INSIDE_COMPONENT_INJECTS.VIEWPORT_BOUNDARY
)!

const store = instance.store

const viewWidth = ref(0)
const viewHeight = ref(0)
const resizeObserver = shallowRef<ResizeObserver>()

const hasAnchor = computed(() => !!store.anchor)

// 处理组件，如果是函数（懒加载），则使用defineAsyncComponent包装
const resolvedComponent = computed(() => {
	if (typeof store.component === 'function') {
		return defineAsyncComponent(store.component as () => Promise<Component>)
	}
	return store.component
})

const translateXRange = computed(() => {
	const offset = Math.max(0, viewportBoundary.value.width - viewWidth.value)

	if (store.placement.value.includes('left')) {
		return [0, offset]
	}

	if (store.placement.value.includes('right')) {
		return [-offset, 0]
	}

	return [-(offset / 2), offset / 2]
})

const translateYRange = computed(() => {
	const offset = Math.max(0, viewportBoundary.value.height - viewHeight.value)

	if (store.placement.value.includes('top')) {
		return [0, offset]
	}

	if (store.placement.value.includes('bottom')) {
		return [-offset, 0]
	}

	return [-(offset / 2), offset / 2]
})

const translateX = computed(() => {
	return store.viewTranslateOverflow.value
		? store.viewTranslateX.value
		: Math.max(
				Math.min(store.viewTranslateX.value, translateXRange.value[1]),
				translateXRange.value[0]
			)
})

const translateY = computed(() => {
	return store.viewTranslateOverflow.value
		? store.viewTranslateY.value
		: Math.max(
				Math.min(store.viewTranslateY.value, translateYRange.value[1]),
				translateYRange.value[0]
			)
})

const styleObject = computed(() => {
	return {
		width: formatSize(store.width.value),
		maxWidth: formatSize(store.maxWidth.value),
		minWidth: formatSize(store.minWidth.value),
		height: formatSize(store.height.value),
		maxHeight: formatSize(store.maxHeight.value),
		minHeight: formatSize(store.minHeight.value),
		transform: `translate(${translateX.value}px, ${translateY.value}px)`,
	}
})

const viewComputedStyle = computed(() => ({
	width: viewWidth.value,
	height: viewHeight.value,
	zIndex: store.zIndex.value,
	translateX: translateX.value,
	translateY: translateY.value,
}))

provide(POPUP_COMPONENT_INJECTS.COMPUTED_STYLE, viewComputedStyle)

store.computedStyle = viewComputedStyle

onMounted(() => {
	syncViewSize()
	window.setTimeout(syncViewSize, store.animationDuration.value)
	if (hasAnchor) {
		resizeObserver.value = new ResizeObserver(syncViewSize)
		resizeObserver.value.observe(popupViewRef.value!)
	}
})

onUpdated(() => {
	syncViewSize()
})

onBeforeUnmount(() => {
	if (resizeObserver.value) {
		resizeObserver.value.unobserve(popupViewRef.value!)
		resizeObserver.value.disconnect()
	}
})

onUnmounted(() => {
	store.computedStyle = null
})

async function syncViewSize() {
	await nextTick()
	const rect = popupViewRef.value?.getBoundingClientRect()
	if (rect) {
		viewWidth.value = rect.width
		viewHeight.value = rect.height
	}
}

function formatSize(size: string | number): string {
	return typeof size === 'number' ? `${size}px` : size
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('view') {
	position: relative;
	pointer-events: none;
	& > * {
		pointer-events: auto;
	}
}
</style>
