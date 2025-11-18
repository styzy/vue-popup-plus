<template lang="pug">
.popup-view-wrapper(:style="{ zIndex: store.zIndex.value }")
	.popup-view(:style="styleObject" ref="popupViewRef")
		component(
			:is="resolvedComponent"
			:key="`${instanceId.name}-component`"
			v-bind="store.componentProps")
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
} from 'vue'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'
import type { PopupViewStyle } from '../typings'

defineOptions({
	name: 'PopupView',
})

const popupViewRef = ref<HTMLDivElement>()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const store = inject(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE_STORE)!

const viewWidth = ref(0)
const viewHeight = ref(0)

// 处理组件，如果是函数（懒加载），则使用defineAsyncComponent包装
const resolvedComponent = computed(() => {
	if (typeof store.component === 'function') {
		return defineAsyncComponent(store.component as () => Promise<Component>)
	}
	return store.component
})

const translateX = computed(() => {
	return store.viewTranslateOverflow.value
		? store.viewTranslateX.value
		: store.viewTranslateX.value > 0
			? Math.min(
					store.viewTranslateX.value,
					(window.innerWidth - viewWidth.value) / 2
				)
			: Math.max(
					store.viewTranslateX.value,
					-(window.innerWidth - viewWidth.value) / 2
				)
})

const translateY = computed(() => {
	return store.viewTranslateOverflow.value
		? store.viewTranslateY.value
		: store.viewTranslateY.value > 0
			? Math.min(
					store.viewTranslateY.value,
					(window.innerHeight - viewHeight.value) / 2
				)
			: Math.max(
					store.viewTranslateY.value,
					-(window.innerHeight - viewHeight.value) / 2
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

const viewStyle: PopupViewStyle = computed(() => ({
	width: viewWidth.value,
	height: viewHeight.value,
	zIndex: store.zIndex.value,
	translateX: translateX.value,
	translateY: translateY.value,
}))

provide(POPUP_COMPONENT_INJECTS.COMPUTED_VIEW_STYLE, viewStyle)

onMounted(() => {
	window.setTimeout(syncViewSize, store.animationDuration.value)
})

onUpdated(() => {
	syncViewSize()
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

<style lang="stylus" scoped>
.popup-view-wrapper
	display flex
	justify-content center
	align-items center
	position fixed
	top 0
	right 0
	bottom 0
	left 0
	pointer-events none
	.popup-view
		position relative
		margin auto
		overflow auto
		pointer-events auto
</style>

