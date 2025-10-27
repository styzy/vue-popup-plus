<template lang="pug">
.popup-view-wrapper(:style="{ zIndex: store.zIndex }")
	.popup-view(:style="styleObject" ref="popupViewRef")
		component(
			:is="resolvedComponent"
			:key="`${instanceId.name}-component`"
			v-bind="store.componentProps")
</template>
<script lang="ts">
export type PopupViewStyle = ComputedRef<{
	width: number
	height: number
	zIndex: number
	translateX: number
	translateY: number
}>
</script>
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
	type ComputedRef,
} from 'vue'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'

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
	return store.viewTranslateOverflow
		? store.viewTranslateX
		: store.viewTranslateX > 0
			? Math.min(
					store.viewTranslateX,
					(window.innerWidth - viewWidth.value) / 2
				)
			: Math.max(
					store.viewTranslateX,
					-(window.innerWidth - viewWidth.value) / 2
				)
})

const translateY = computed(() => {
	return store.viewTranslateOverflow
		? store.viewTranslateY
		: store.viewTranslateY > 0
			? Math.min(
					store.viewTranslateY,
					(window.innerHeight - viewHeight.value) / 2
				)
			: Math.max(
					store.viewTranslateY,
					-(window.innerHeight - viewHeight.value) / 2
				)
})

const styleObject = computed(() => {
	return {
		width: formatSize(store.width),
		maxWidth: formatSize(store.maxWidth),
		minWidth: formatSize(store.minWidth),
		height: formatSize(store.height),
		maxHeight: formatSize(store.maxHeight),
		minHeight: formatSize(store.minHeight),
		transform: `translate(${translateX.value}px, ${translateY.value}px)`,
	}
})

const viewStyle: PopupViewStyle = computed(() => ({
	width: viewWidth.value,
	height: viewHeight.value,
	zIndex: store.zIndex,
	translateX: translateX.value,
	translateY: translateY.value,
}))

provide(POPUP_COMPONENT_INJECTS.COMPUTED_VIEW_STYLE, viewStyle)

onMounted(() => {
	window.setTimeout(syncViewSize, store.animationDuration)
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
@import './animation.styl'

.popup-view-wrapper
	position fixed
	top 0
	right 0
	bottom 0
	left 0
	display flex
	justify-content center
	align-items center
	pointer-events none
	.popup-view
		position relative
		margin auto
		pointer-events auto
</style>

