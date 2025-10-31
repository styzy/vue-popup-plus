<template lang="pug">
.popup-mask(:style="{ zIndex: store.zIndex.value }" @click="handleClick")
</template>

<script lang="ts" setup>
import { inject } from 'vue'
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

function handleClick() {
	if (store.maskClickClose) {
		const popup = usePopup()
		popup.destroy(instanceId)
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

