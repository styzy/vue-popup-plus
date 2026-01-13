<template lang="pug">
.popup-mask(
	:class="classObject"
	:style="{ zIndex: store.zIndex.value }"
	@click="handleClick()")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { usePopup } from '../'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'

defineOptions({
	name: 'PopupMask',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const store = inject(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE_STORE)!

const classObject = computed(() => ({
	'is-transparent': store.maskTransparent.value,
	'is-blur': !store.maskTransparent.value && store.maskBlur.value,
}))

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

<style lang="scss" scoped>
.popup-mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: var(--popup-color-mask);
	&.is-transparent {
		background-color: transparent;
	}
	&.is-blur {
		backdrop-filter: blur(15px) saturate(180%);
	}
}
</style>
