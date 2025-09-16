<template lang="pug">
.demo-full-screen
	h1 这是一个全屏弹框
	br
	button(@click="handleClose") 关闭弹框
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { POPUP_COMPONENT_INJECT_KEYS, usePopup } from 'vue-popup-plus'

defineOptions({ name: 'DemoFullScreen' })

const instanceId = inject(POPUP_COMPONENT_INJECT_KEYS.INSTANCE_ID)

function handleClose() {
	const popup = usePopup()
	instanceId && popup.destroy(instanceId)
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
