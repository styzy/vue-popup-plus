<template lang="pug">
.demo
	.header
		h1(:style="{ margin: '0' }") 这是一个弹框
		h2(:style="{ margin: '0' }") 测试属性：{{ test }}
	.body
		GlobalComponent
	.footer
		input(placeholder="请输入返回值" type="text" v-model="result")
		PButtonGroup(direction="vertical")
			PButton(@click="handleUpdateSize" theme="success") 更新弹框尺寸
			PButton(@click="handleClose" theme="primary" type="default") 关闭弹框 core
			PButton(@click="handleCloseDialog()" theme="primary" type="plain") 关闭弹框 dialog
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

defineOptions({ name: 'Demo' })

type Props = {
	/**
	 * 测试属性
	 */
	test?: string
}

const { test = '' } = defineProps<Props>()

type Emits = {
	/**
	 * 测试事件
	 */
	inputChange: [value: string]
}

const emit = defineEmits<Emits>()

const result = ref(test)

watch(result, (newValue) => {
	emit('inputChange', newValue)
})

function handleUpdateSize() {
	popup.update(instanceId, {
		width: 900,
		height: '900px',
	})
}

function handleClose() {
	popup.destroy(instanceId, result.value)
}

function handleCloseDialog() {
	popup.dialog.close(result.value)
}
</script>

<style lang="stylus" scoped>
.demo
	overflow hidden
	// width 900px
	// height 900px
	min-width 300px
	min-height 300px
	background-color #FFFFFF
	.header,
	.body,
	.footer
		display flex
		flex-direction column
		align-items center
		gap 20px
		padding 20px 0
	.header
		background-color #0183da
		color #FFFFFF
	.body
		padding 0
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
