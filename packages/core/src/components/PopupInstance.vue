<template lang="pug">
template(v-if="hackInject")
	Teleport(:to="store.appendTo.value")
		.popup-instance
			PopupViewport(:viewport="store.viewport.value")
				PopupAnimation(
					:duration="store.animationDuration.value"
					:isBeforeUnmount="store.isBeforeUnmount.value"
					:type="store.maskAnimation.value"
					v-if="store.mask.value")
					PopupMask
				PopupAnchorFrame(
					:anchor="store.anchor.value"
					:flip="store.anchorFlip.value"
					:flipAdvance="store.anchorFlipAdvance.value"
					:placement="store.anchorPlacement.value"
					:shift="store.anchorShift.value"
					:zIndex="store.zIndex.value"
					v-if="store.anchor.value")
					PopupAnimation(
						:duration="store.animationDuration.value"
						:isBeforeUnmount="store.isBeforeUnmount.value"
						:type="store.viewAnimation.value")
						PopupView
				PopupFrame(
					:placement="store.placement.value"
					:zIndex="store.zIndex.value"
					v-else)
					PopupAnimation(
						:duration="store.animationDuration.value"
						:isBeforeUnmount="store.isBeforeUnmount.value"
						:type="store.viewAnimation.value")
						PopupView
</template>

<script lang="ts" setup>
import { provide, ref, Teleport } from 'vue'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_NAMES,
} from '@core/CONSTANTS'
import { type Instance } from '@core/instance'

import PopupAnchorFrame from '@core/components/PopupAnchorFrame.vue'
import PopupAnimation from '@core/components/PopupAnimation.vue'
import PopupFrame from '@core/components/PopupFrame.vue'
import PopupMask from '@core/components/PopupMask.vue'
import PopupView from '@core/components/PopupView.vue'
import PopupViewport from '@core/components/PopupViewport.vue'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.INSTANCE,
})

type Props = {
	instance: Instance
}

const { instance } = defineProps<Props>()
const store = instance.store

// HACK STYZY
// 因为 Vue 3 中，为了兼容 app.runWithContext() 而使用了 currentApp
// 变量动态获取 provides ，导致当 app 未完全挂载时，子组件无法通过
// inject() 获取到正确的 provides 值
// https://github.com/vuejs/core/blob/a4708f324f62ac2122f87c4ee039deb2745f0905/packages/runtime-core/src/apiInject.ts#L64
const hackInject = ref(false)

setTimeout(() => {
	hackInject.value = true
}, 0)

provide(POPUP_COMPONENT_INJECTS.INSTANCE_ID, instance.id)
provide(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE, instance)
</script>
