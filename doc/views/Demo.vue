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
import { COMPONENT_INJECT_KEYS, usePopup } from '@'

defineOptions({ name: 'Demo' })

const instanceId = inject(COMPONENT_INJECT_KEYS.INSTANCE_ID)

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

