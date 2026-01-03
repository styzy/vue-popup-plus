<template lang="pug">
.demo
	.header
		h1(:style="{ margin: '0' }") 这是一个弹框
		h2(:style="{ margin: '0' }") 选项式 API 组件
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

<script lang="ts">
import { defineComponent } from 'vue'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'

export default defineComponent({
	name: 'DemoOption',
	components: {
		PButtonGroup,
		PButton,
	},
	emits: {
		/**
		 * 测试事件
		 */
		inputChange: (value: string) => true,
	},
	props: {
		test: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			result: this.test,
		}
	},
	watch: {
		$popupComputedStyle(newStyle) {
			console.log('newComputedStyle: ', newStyle)
		},
	},
	mounted() {
		console.log('this.$popup: ', this.$popup)
		console.log('this.$popupInstanceId: ', this.$popupInstanceId)
		console.log('this.$popupComputedStyle: ', this.$popupComputedStyle)
	},
	methods: {
		handleUpdateSize() {
			this.$popup.update(this.$popupInstanceId!, {
				width: 900,
				height: '900px',
			})
		},
		handleClose() {
			this.$popup.destroy(this.$popupInstanceId!, this.result)
		},
		handleCloseDialog() {
			this.$popup.dialogClose(this.result)
		},
	},
})
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
