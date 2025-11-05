<template lang="pug">
RouterView
.dark-btn
	PButton(@click="handleDarkMode()" theme="primary") 切换到{{ isDarkMode ? '亮色' : '暗黑' }}模式
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { POPUP_ANIMATIONS } from 'vue-popup-plus'
import PButton from '../../plugin/src/components/PButton.vue'

export default defineComponent({
	name: 'App',
	components: {
		PButton,
	},
	data() {
		return {
			isDarkMode: false,
		}
	},
	created() {
		// this.$popup.render({
		// 	component: () => import('@/views/Demo.vue'),
		// 	maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		// })
		// this.$popup.toast('hello world')
	},
	methods: {
		handleDarkMode() {
			this.isDarkMode = !this.isDarkMode

			if (this.isDarkMode) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
		},
	},
})
</script>

<style lang="stylus" scoped>
.dark-btn
	position fixed
	top 20px
	right 20px
	z-index 9999
</style>
