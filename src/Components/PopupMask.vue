<template lang="pug">
.popup-mask(:style="styleObject" @click="handleClick")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { PopupStore } from '@/Popup'
import { usePopup } from '@'
import {
	COMPONENT_INJECT_KEYS,
	INSIDE_COMPONENT_INJECT_KEYS,
} from '@/CONSTANTS'

defineOptions({
	name: 'PopupMask',
})

const popupId = inject(COMPONENT_INJECT_KEYS.POPUP_ID, Symbol())
const store = inject(INSIDE_COMPONENT_INJECT_KEYS.POPUP_STORE) as PopupStore

const styleObject = computed(() => {
	return {
		zIndex: store.zIndex,
	}
})

function handleClick() {
	if (store.maskClickCloseEnabled) {
		const popup = usePopup()
		popup.destroy(popupId)
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
