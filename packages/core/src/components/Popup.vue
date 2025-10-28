<template lang="pug">
PopupAnimation(
	:duration="store.animationDuration"
	:type="store.maskAnimation"
	v-if="store.mask")
	PopupMask
PopupAnimation(:duration="store.animationDuration" :type="store.viewAnimation")
	PopupView
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { POPUP_INSIDE_COMPONENT_INJECTS } from '../CONSTANTS'
import PopupMask from './PopupMask.vue'
import PopupView from './PopupView.vue'
import PopupAnimation from './PopupAnimation.vue'

const store = inject(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE_STORE)!

defineOptions({
	name: 'Popup',
})
</script>

