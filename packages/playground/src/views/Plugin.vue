<template lang="pug">
GContainer.plugin
	GContainer
		GTools(:component="() => import('./Plugin.vue')")
		GTitle 预置插件 - 基础功能测试
		PButtonGroup(theme="primary")
			PButton(@click="handleSkinChange()" size="large" theme="success")
				| 切换皮肤，当前为
				strong {{ skin }}
		ElForm
			ElFormItem(label="国际化")
				ElSelect(style="width: 200px" v-model="locale")
					ElOption(label="English" value="enUS")
					ElOption(label="中文" value="zhCN")
	Message
	Toast
	Alert
	Confirm
	Prompt
	Dialog
	Drawer
	Loading
	Album
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { setLocale, type PopupSkin } from 'vue-popup-plus-plugin-preset'
import enUS from 'vue-popup-plus-plugin-preset/locales/en-US'
import zhCN from 'vue-popup-plus-plugin-preset/locales/zh-CN'

import Album from './plugin/Album.vue'
import Alert from './plugin/Alert.vue'
import Confirm from './plugin/Confirm.vue'
import Dialog from './plugin/Dialog.vue'
import Drawer from './plugin/Drawer.vue'
import Loading from './plugin/Loading.vue'
import Message from './plugin/Message.vue'
import Prompt from './plugin/Prompt.vue'
import Toast from './plugin/Toast.vue'

const localeMessages = {
	enUS,
	zhCN,
}

const skin = (localStorage.getItem('skin') || 'modern') as PopupSkin
const locale = ref<keyof typeof localeMessages>('enUS')

watch(locale, () => {
	const message = localeMessages[locale.value]
	setLocale(message)
})

function handleSkinChange() {
	localStorage.setItem('skin', skin === 'modern' ? 'classic' : 'modern')
	window.location.reload()
}
</script>

<style lang="scss" scoped>
.plugin {
	gap: 30px;
}
</style>
