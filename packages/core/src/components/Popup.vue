<template lang="pug">
PopupAnimation(
	:duration="store.animationDuration.value"
	:type="store.maskAnimation.value"
	v-if="store.mask")
	PopupMask
PopupFrame(:placement="store.placement.value" :zIndex="store.zIndex.value")
	PopupAnimation(
		:duration="store.animationDuration.value"
		:type="store.viewAnimation.value")
		PopupView
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import type { InstanceStore } from '../instance'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'
import PopupAnimation from './PopupAnimation.vue'
import PopupFrame from './PopupFrame.vue'
import PopupMask from './PopupMask.vue'
import PopupView from './PopupView.vue'

defineOptions({
	name: 'Popup',
})

type Props = {
	store: InstanceStore
}

const { store } = defineProps<Props>()

provide(POPUP_COMPONENT_INJECTS.INSTANCE_ID, store.id)
provide(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE_STORE, store)
</script>
