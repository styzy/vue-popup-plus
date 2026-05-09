<template lang="pug">
div(:class="classObject" :style="styleObject" @click="handleClick()")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_NAMES,
} from '../CONSTANTS'
import { useNamespace, usePopup } from '../hooks'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.MASK,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.MASK)

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const instance = inject(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE)!
const viewportBoundary = inject(
	POPUP_INSIDE_COMPONENT_INJECTS.VIEWPORT_BOUNDARY
)!

const store = instance.store

const classObject = computed(() => [
	ns.block(),
	ns.is('transparent', store.maskTransparent.value),
	ns.is('blur', !store.maskTransparent.value && store.maskBlur.value),
])

const styleObject = computed(() => {
	const style: Record<string, string | number> = {
		zIndex: store.zIndex.value,
	}

	if (viewportBoundary.value.fixed) {
		style.position = 'fixed'
		style.top = 0
		style.left = 0
		style.right = 0
		style.bottom = 0
	} else {
		style.position = 'absolute'
		style.top = `${viewportBoundary.value.top}px`
		style.left = `${viewportBoundary.value.left}px`
		style.width = `${viewportBoundary.value.width}px`
		style.height = `${viewportBoundary.value.height}px`
	}

	return style
})

function handleClick() {
	if (store.maskDestroy.value === false) return

	if (store.maskDestroy.value === true) {
		// 不在 setup 根层级创建控制器，因为可以使用全局缓存的无状态控制器，从而提高性能
		const popup = usePopup()

		popup.destroy(instanceId)
	} else {
		const destroy = async (payload?: any) => {
			// 不在 setup 根层级创建控制器，因为可以使用全局缓存的无状态控制器，从而提高性能
			const popup = usePopup()

			await popup.destroy(instanceId, payload)
		}
		store.maskDestroy.value(destroy)
	}
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('mask') {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: use-color(mask);
	&.is-transparent {
		background-color: transparent;
	}
	&.is-blur {
		backdrop-filter: blur(15px) saturate(180%);
	}
}
</style>
