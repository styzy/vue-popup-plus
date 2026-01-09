<template lang="pug">
AConfigProvider(:locale="zhCN")
	ElConfigProvider(:locale="elZhCn")
		RouterView
		.dark-btn
			PButton(@click="handleDarkMode()" size="large" theme="primary") 切换到{{ isDarkMode ? '亮色' : '暗黑' }}模式
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { PopupRoot } from 'vue-popup-plus'
import PButton from '../../plugin/src/components/PButton.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import elZhCn from 'element-plus/es/locale/lang/zh-cn'

const isDarkMode = ref(!!localStorage.getItem('dark'))

onMounted(() => {
	if (isDarkMode.value) {
		document.documentElement.classList.add('dark')
	}
})

function handleDarkMode() {
	isDarkMode.value = !isDarkMode.value

	if (isDarkMode.value) {
		document.documentElement.classList.add('dark')
		localStorage.setItem('dark', '1')
	} else {
		document.documentElement.classList.remove('dark')
		localStorage.removeItem('dark')
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
