<template lang="pug">
.popup-mask(:style="styleObject" @click="handleClick")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { usePopup } from '../'
import type { InstanceId, InstanceStore } from '../Instance'
import {
	POPUP_COMPONENT_INJECT_KEYS,
	POPUP_INSIDE_COMPONENT_INJECT_KEYS,
} from '../CONSTANTS'

defineOptions({
	name: 'PopupMask',
})

const instanceId = inject(POPUP_COMPONENT_INJECT_KEYS.INSTANCE_ID) as InstanceId
const store = inject(
	POPUP_INSIDE_COMPONENT_INJECT_KEYS.INSTANCE_STORE
) as InstanceStore

const styleObject = computed(() => {
	return {
		zIndex: store.zIndex,
	}
})

function handleClick() {
	if (store.maskClickCloseEnabled) {
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

