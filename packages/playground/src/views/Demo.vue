<template lang="pug">
.demo
	h1 这是一个弹框
	br
	button(@click="handleUpdateSize") 更新弹框尺寸
	br
	button(@click="handleClose") 关闭弹框
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'

defineOptions({ name: 'Demo' })

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)

function handleUpdateSize() {
	const popup = usePopup()
	instanceId &&
		popup.update(instanceId, {
			width: '50%',
		})
}

function handleClose() {
	const popup = usePopup()
	instanceId && popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>
.demo
	display flex
	flex-direction column
	align-items center
	overflow hidden
	background-color #0183da
	min-width 300px
	min-height 300px
	height 100%
	width 100%
	color #FFFFFF
</style>

