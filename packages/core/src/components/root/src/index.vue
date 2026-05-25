<template lang="pug">
slot
PopupInstance(
	:instance="instance"
	:key="instance.id.name"
	v-for="instance in istances")
</template>

<script lang="ts" setup>
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount } from 'vue'
import {
	POPUP_COMPONENT_NAMES,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../../../CONSTANTS'
import { PopupLog, PopupLogType, printLog } from '../../../log'
import type { PopupRootProps, PopupRootSlots } from './types'

import PopupInstance from '../../PopupInstance.vue'

const vm = getCurrentInstance()

defineOptions({
	name: POPUP_COMPONENT_NAMES.ROOT,
})

defineProps<PopupRootProps>()
defineSlots<PopupRootSlots>()

const core = inject(POPUP_INSIDE_COMPONENT_INJECTS.CORE, undefined)

if (!core) {
	const log = new PopupLog({
		type: PopupLogType.Error,
		message:
			'根组件初始化失败，请先调用 createPopupPlus() 方法创建弹出层插件实例',
		group: [
			{
				type: PopupLogType.Component,
				title: '调用组件',
				instance: vm,
			},
		],
	})
	printLog(log)
}

const istances = core?.instances || {}

onBeforeMount(() => {
	core?.registerRootComponent(vm!)
})

onBeforeUnmount(() => {
	core?.unregisterRootComponent(vm!)
})
</script>
