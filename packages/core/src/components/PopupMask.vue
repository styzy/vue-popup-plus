<template lang="pug">
div(
	:class="classObject"
	:style="{ zIndex: store.zIndex.value }"
	@click="handleClick()")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace, usePopup } from '../hooks'
import {
	POPUP_COMPONENT_INJECTS,
	P_INSIDE_COMPONENT_INJECTS,
	P_INSIDE_COMPONENT_NAMES,
} from '../CONSTANTS'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.MASK,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.MASK)

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const instance = inject(P_INSIDE_COMPONENT_INJECTS.INSTANCE)!

const store = instance.store

const classObject = computed(() => [
	ns.block(),
	ns.is('transparent', store.maskTransparent.value),
	ns.is('blur', !store.maskTransparent.value && store.maskBlur.value),
])

function handleClick() {
	if (store.maskDestroy === false) return

	if (store.maskDestroy === true) {
		// 不在 setup 根层级创建控制器，因为可以使用全局缓存的无状态控制器，从而提高性能
		const popup = usePopup()

		popup.destroy(instanceId)
	} else {
		const destroy = async (payload?: any) => {
			// 不在 setup 根层级创建控制器，因为可以使用全局缓存的无状态控制器，从而提高性能
			const popup = usePopup()

			await popup.destroy(instanceId, payload)
		}
		store.maskDestroy(destroy)
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
