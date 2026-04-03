<template lang="pug">
GContainer.directive
	GTools(:component="() => import('./Directive.vue')")
	GTitle 核心 - 指令功能测试
	GTitle(second) 触发对象
	PButtonGroup(theme="primary")
		.block(v-popup="Demo") div 触发
		PButton(v-popup="Demo") 组件触发
	GTitle(second) 触发方式
	PButtonGroup(theme="primary" type="plain")
		PButton(type="fill" v-popup.click="Demo") 点击触发
		div(@click="handleParentClick()")
			PButton(v-popup.click.stop="Demo") 点击触发(阻止冒泡)
		PButton(v-popup.hover="Demo") 悬浮触发
		PButton(v-popup.contextmenu="Demo") 右键触发
		PButton(v-popup.contextmenu.prevent="Demo") 右键触发(阻止默认事件)
	GTitle(second) 组件参数
	ElInput(placeholder="请输入参数" style="width: 200px" v-model="test")
	PButtonGroup(theme="primary" type="plain")
		PButton(
			type="fill"
			v-popup="{ component: () => import('./demo/Demo.vue'), componentProps: { test } }") 携带参数
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePopup } from 'vue-popup-plus'
import Demo from './demo/Demo.vue'

const test = ref('123')
const popup = usePopup()

const handleParentClick = () => {
	popup.toast('点击了父元素')
}
</script>

<style lang="scss" scoped>
.directive {
	display: flex;
	flex-direction: column;
	background-color: var(--playground-color-background-main);
	overflow: hidden;
	.block {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120px;
		height: 32px;
		line-height: 32px;
		background-color: #51ae00;
		color: #ffffff;
		font-size: 14px;
	}
}
</style>
