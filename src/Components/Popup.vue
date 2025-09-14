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
import type { PopupStore } from '@/Popup'
import PopupMask from './PopupMask.vue'
import PopupView from './PopupView.vue'
import PopupAnimation from './PopupAnimation.vue'

const store: PopupStore = inject('popupStore') as PopupStore

defineOptions({
	name: 'Popup',
})
</script>
