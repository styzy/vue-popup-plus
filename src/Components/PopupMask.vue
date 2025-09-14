<template lang="pug">
.popup-mask(:style="styleObject" @click="handleClick")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { PopupStore } from '@/Popup'
import type { Controller } from '@/Controller'
import { usePopup } from '@'

defineOptions({
	name: 'PopupMask',
})

const popupId: string = inject('popupId', '')
const store: PopupStore = inject('popupStore') as PopupStore

const styleObject = computed(() => {
	return {
		zIndex: store.zIndex,
	}
})

function handleClick() {
	if (store.maskClickCloseEnabled) {
		const controller: Controller = usePopup()

		controller.destroy(popupId)
	}
}
</script>

<style lang="stylus" scoped>
@import './animation.styl'

.popup-mask
	position fixed
	top 0
	right 0
	bottom 0
	left 0
	background-color rgba(0, 0, 0, 0.3)
</style>
