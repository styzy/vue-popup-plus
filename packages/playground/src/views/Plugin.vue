<template lang="pug">
GContainer.plugin
	GContainer
		GTools(:component="() => import('./Plugin.vue')")
		GTitle 插件功能单元测试
		PButtonGroup(theme="primary")
			PButton(@click="handleSkinChange()" size="large" theme="success")
				| 切换皮肤，当前为
				strong {{ skin }}
	Bubble
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
import { type Skin } from 'vue-popup-plus-plugin-preset'
import Album from './plugin/Album.vue'
import Alert from './plugin/Alert.vue'
import Bubble from './plugin/Bubble.vue'
import Confirm from './plugin/Confirm.vue'
import Dialog from './plugin/Dialog.vue'
import Drawer from './plugin/Drawer.vue'
import Loading from './plugin/Loading.vue'
import Message from './plugin/Message.vue'
import Prompt from './plugin/Prompt.vue'
import Toast from './plugin/Toast.vue'

const skin = (localStorage.getItem('skin') || 'modern') as Skin

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
