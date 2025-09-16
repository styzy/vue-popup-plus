<template lang="pug">
.popup-view-wrapper(:style="{ zIndex: store.zIndex }")
	.popup-view(:style="styleObject")
		component(
			:is="resolvedComponent"
			:key="`${popupId.description}-component`"
			v-bind="store.componentProps")
</template>
<script lang="ts" setup>
import { computed, inject, defineAsyncComponent, type Component } from 'vue'
import type { PopupStore } from '@/Popup'
import {
	COMPONENT_INJECT_KEYS,
	INSIDE_COMPONENT_INJECT_KEYS,
} from '@/CONSTANTS'

defineOptions({
	name: 'PopupView',
})

const popupId = inject(COMPONENT_INJECT_KEYS.POPUP_ID, Symbol())
const store = inject(INSIDE_COMPONENT_INJECT_KEYS.POPUP_STORE) as PopupStore

// 处理组件，如果是函数（懒加载），则使用defineAsyncComponent包装
const resolvedComponent = computed(() => {
	if (typeof store.component === 'function') {
		return defineAsyncComponent(store.component as () => Promise<Component>)
	}
	return store.component
})

const styleObject = computed(() => {
	return {
		width: formatSize(store.width),
		maxWidth: formatSize(store.maxWidth),
		minWidth: formatSize(store.minWidth),
		height: formatSize(store.height),
		maxHeight: formatSize(store.maxHeight),
		minHeight: formatSize(store.minHeight),
	}
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
		position relative
		margin auto
		pointer-events auto
</style>
