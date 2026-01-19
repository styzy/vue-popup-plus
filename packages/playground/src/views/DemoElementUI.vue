<template lang="pug">
.demo
	.header
		h2(:style="{ margin: '0' }") Element UI
		h2(:style="{ margin: '0' }") 测试
		h4(:style="{ margin: '0' }") initialZIndex: {{ zIndex.initialZIndex }}
		h4(:style="{ margin: '0' }") currentZIndex: {{ zIndex.currentZIndex }}
	.body
		PButtonGroup(align="center" direction="vertical" type="plain")
			PButton(@click="handleUpdateZIndex" theme="primary") 增加zIndex
		ElSelect
	.footer
		PButtonGroup(direction="vertical")
			PButton(@click="handleUpdateSize" theme="success") 更新弹框尺寸
			PButton(@click="handleClose" theme="primary" type="default") 关闭弹框 core
			PButton(@click="handleCloseDialog()" theme="primary" type="plain") 关闭弹框 dialog
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'
import { useZIndex } from 'element-plus'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'

const popup = usePopup()

defineOptions({ name: 'DemoAntd' })

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const zIndex = useZIndex()

function handleUpdateZIndex() {
	const zIndex = useZIndex()
	const nextZIndex = zIndex.nextZIndex()
	popup.toastSuccess(`nextZIndex: ${nextZIndex}`)
}

function handleUpdateSize() {
	popup.update(instanceId, {
		width: 900,
		height: '900px',
	})
}

function handleClose() {
	popup.destroy(instanceId)
}

function handleCloseDialog() {
	popup.dialogClose()
}
</script>

<style lang="stylus" scoped>
.demo
	overflow hidden
	width 300px
	// height 900px
	background-color #FFFFFF
	.header,
	.body,
	.footer
		display flex
		flex-direction column
		align-items center
		gap 20px
		padding 20px
	.header
		align-items flex-start
		background-color #0183da
		color #FFFFFF
	.body
		align-items stretch
	.footer
		padding 20px
		input
			display block
			padding 0 20px
			width 100%
			height 40px
			border-radius 4px
			border 1px solid #0183da
			outline none
			box-sizing border-box
</style>
