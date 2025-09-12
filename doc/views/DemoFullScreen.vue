<template lang="pug">
.demo-full-screen
	h1 这是一个全屏弹框
	br
	button(@click="handleClose") 关闭弹框
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { usePopup } from '@'

defineOptions({ name: 'DemoFullScreen' })

const popupId: string = inject('popupId', '')

function handleClose() {
	const popup = usePopup()
	popup.destroy(popupId)
}
</script>

<style lang="stylus" scoped>
.demo-full-screen
	display flex
	flex-direction column
	align-items center
	overflow hidden
	height 100%
	background-color #0183da
	color #FFFFFF
</style>
