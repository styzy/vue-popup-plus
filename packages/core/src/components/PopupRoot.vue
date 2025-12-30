<template lang="pug">
slot
PopupInstance(
	:key="instance.id.name"
	:store="instance.store"
	v-for="instance in istances")
</template>

<script lang="ts">
export const PopupRootComponentName = 'PopupRoot'
</script>

<script lang="ts" setup>
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount } from 'vue'
import { PopupError } from '../error'
import { Log, LogType, printLog } from '../log'
import { POPUP_INSIDE_COMPONENT_INJECTS } from '../CONSTANTS'
import PopupInstance from './PopupInstance.vue'

defineOptions({
	PopupRootComponentName,
})

const core = inject(POPUP_INSIDE_COMPONENT_INJECTS.CORE)

if (!core) {
	const log = new Log({
		type: LogType.Error,
		caller: 'PopupRoot',
		message:
			'根组件初始化失败，请先调用 createPopupPlus() 方法创建弹出层插件实例',
	})
	printLog(log)
	throw new PopupError(log)
}

const istances = core?.instances || {}
const vm = getCurrentInstance()

onBeforeMount(() => {
	core?.registerRootComponent(vm!)
})

onBeforeUnmount(() => {
	core?.unregisterRootComponent(vm!)
})
</script>
