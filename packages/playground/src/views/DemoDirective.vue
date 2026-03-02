<template lang="pug">
.demo-directive
	.header Vue Popup Plus 指令测试
	.body
		.title v-popup
		.title.second 触发对象
		PButtonGroup(theme="primary")
			.block(v-popup="Demo") div 触发
			PButton(v-popup="Demo") 组件触发
		.title.second 触发方式
		PButtonGroup(theme="primary" type="plain")
			PButton(type="default" v-popup.click="Demo") 点击触发
			div(@click="handleParentClick()")
				PButton(v-popup.click.stop="Demo") 悬浮触发(阻止冒泡)
			PButton(v-popup.hover="Demo") 悬浮触发
			PButton(v-popup.contextmenu="Demo") 右键触发
			PButton(v-popup.contextmenu.prevent="Demo") 右键触发(阻止默认事件)
		.title.second 组件参数
		ElInput(placeholder="请输入参数" style="width: 200px" v-model="test")
		PButtonGroup(theme="primary" type="plain")
			PButton(
				type="default"
				v-popup="{ component: () => import('./Demo.vue'), componentProps: { test } }") 携带参数
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePopup } from 'vue-popup-plus'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'
import Demo from './Demo.vue'

const test = ref('123')
const popup = usePopup()

const handleParentClick = () => {
	popup.toast('点击了父元素')
}
</script>

<style lang="stylus" scoped>
.demo-directive
	display flex
	flex-direction column
	background-color var(--playground-color-background-main)
	overflow hidden
	.header
		padding 20px
		background-color #0183da
		color #FFFFFF
		font-size 20px
		font-weight 700
	.body
		display flex
		flex-direction column
		align-items flex-start
		gap 20px
		padding 20px
	.title
		color var(--playground-color-text-main)
		font-weight 700
		font-size 28px
		&.large
			padding 20px 0
			font-size 36px
		&.second
			padding 10px 0
			font-size 20px
		&.third
			font-size 16px
	.block
		display flex
		align-items center
		justify-content center
		width 120px
		height 32px
		line-height 32px
		background-color #51ae00
		color #FFFFFF
		font-size 14px
</style>
