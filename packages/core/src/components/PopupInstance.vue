<template lang="pug">
template(v-if="hackInject")
	Teleport(:to="store.appendTo")
		.popup-instance
			PopupAnimation(
				:duration="store.animationDuration.value"
				:isBeforeUnmount="store.isBeforeUnmount.value"
				:type="store.maskAnimation.value"
				v-if="store.mask")
				PopupMask
			PopupFrame(:placement="store.placement.value" :zIndex="store.zIndex.value")
				PopupAnimation(
					:duration="store.animationDuration.value"
					:isBeforeUnmount="store.isBeforeUnmount.value"
					:type="store.viewAnimation.value")
					PopupView
</template>

<script lang="ts" setup>
import { provide, ref, Teleport } from 'vue'
import { type Instance } from '../instance'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'
import PopupAnimation from './PopupAnimation.vue'
import PopupFrame from './PopupFrame.vue'
import PopupMask from './PopupMask.vue'
import PopupView from './PopupView.vue'

defineOptions({
	name: 'PopupInstance',
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
