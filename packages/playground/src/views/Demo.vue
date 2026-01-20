<template lang="pug">
.demo
	.left
		.header
			h1(:style="{ margin: '0' }") 这是一个弹框
			h3(:style="{ margin: '0' }") 组合式 API 组件
			h3(:style="{ margin: '0' }") 测试属性：{{ test }}
		.body
			GlobalComponent
		.footer
			input(placeholder="请输入返回值" type="text" v-model="result")
			PButtonGroup(cross-align="center" direction="vertical")
				PButton(@click="handleUpdateSize" theme="success") 更新弹框尺寸
				PButton(@click="handleClose" theme="primary" type="default") 关闭弹框 core
				PButton(@click="handleCloseDialog()" theme="primary" type="plain") 关闭弹框 dialog
	.right
		.header
			h2(:style="{ margin: '0' }") 视图计算样式
		.body
			.info(:key="key" v-for="(value, key) in viewComputedStyle")
				.key {{ key }}
				.value {{ value }}
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
// const viewComputedStyle = inject(POPUP_COMPONENT_INJECTS.COMPUTED_STYLE)!
const viewComputedStyle = popup.getComputedStyle(instanceId)!

defineOptions({ name: 'Demo' })

type Emits = {
	/**
	 * 测试事件
	 */
	inputChange: [value: string]
}

const emit = defineEmits<Emits>()

type Props = {
	/**
	 * 测试属性
	 */
	test?: string
}

const { test = '' } = defineProps<Props>()

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
	popup.dialogClose(result.value)
}
</script>

<style lang="stylus" scoped>
.demo
	display flex
	flex-direction row
	justify-content center
	align-items stretch
	// width 900px
	// height 900px
	min-width 300px
	min-height 300px
	background-color var(--playground-color-background-main)
	overflow hidden
	.header,
	.body,
	.footer
		display flex
		flex-direction column
		align-items center
		gap 20px
		padding 20px 0
	.header
		padding 20px
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
	.right
		.header
			background-color orange
		.body
			align-items stretch
			gap 10px
			padding 20px
	.info
		display flex
		flex-direction row
		justify-content flex-start
		align-items flex-start
		gap 5px
		font-size 14px
		.key
			font-weight 700
			&:after
				content ':'
		.value
			font-weight 700
			color purple
</style>
