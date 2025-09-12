<template lang="pug">
.popup-view-wrapper(:style="{ zIndex: store.zIndex }")
	Transition
		.popup-view(
			:class="classObject"
			:style="styleObject"
			v-if="isShow && !store.isBeforeUnmount")
			component(
				:is="resolvedComponent"
				:key="`${popupId}-component`"
				v-bind="store.componentProps")
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, ref, defineAsyncComponent } from 'vue'
import type { LazyPopupComponent, PopupStore } from '@/Popup'

defineOptions({
	name: 'PopupView',
})

const popupId: string = inject('popupId', '')
const store: PopupStore = inject('popupStore') as PopupStore

const isShow = ref(false)

// 处理组件，如果是函数（懒加载），则使用defineAsyncComponent包装
const resolvedComponent = computed(() => {
	if (typeof store.component === 'function') {
		return defineAsyncComponent(store.component as LazyPopupComponent)
	}
	return store.component
})

const classObject = computed(() => {
	return store.maskAnimations.map((type) => `animation-${type}`)
})

const styleObject = computed(() => {
	return {
		animationDuration: `${store.animationDuration / 1000}s`,
		width: formatSize(store.width),
		maxWidth: formatSize(store.maxWidth),
		minWidth: formatSize(store.minWidth),
		height: formatSize(store.height),
		maxHeight: formatSize(store.maxHeight),
		minHeight: formatSize(store.minHeight),
	}
})

onMounted(() => {
	isShow.value = true
})

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
		useAnimation()

		position relative
		margin auto
		animation-timing-function linear
		pointer-events auto
</style>
