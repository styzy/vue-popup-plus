<template lang="pug">
AConfigProvider(:locale="zhCN")
	ElConfigProvider(:locale="elZhCn")
		PopupRoot
			RouterView
			.dark-btn
				PButton(@click="handleDarkMode()" theme="primary") 切换到{{ isDarkMode ? '亮色' : '暗黑' }}模式
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PopupRoot } from 'vue-popup-plus'
import PButton from '../../plugin/src/components/PButton.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import elZhCn from 'element-plus/es/locale/lang/zh-cn'

const isDarkMode = ref(false)

function handleDarkMode() {
	isDarkMode.value = !isDarkMode.value

	if (isDarkMode.value) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
}
</script>

<style lang="stylus" scoped>
.dark-btn
	position fixed
	top 20px
	right 20px
	z-index 9999
</style>
