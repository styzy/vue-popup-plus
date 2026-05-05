<template lang="pug">
GContainer.anchor-trigger
	GTools(:component="() => import('./AnchorTrigger.vue')")
	GTitle 核心 - 锚点触发器测试
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PopupAnchorTrigger
			PButton(type="fill") 默认
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(trigger="hover")
			PButton 悬浮触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(trigger="click")
			PButton 点击触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(trigger="focus")
			PButton 聚焦触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(trigger="contextmenu")
			PButton 右键菜单触发
			template(#popup)
				DemoAnchor
	GTitle(second) 混合触发方式
	PButtonGroup(theme="primary" tight type="plain")
		PopupAnchorTrigger(:trigger="['hover', 'click']")
			PButton 悬浮触发 + 点击触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['hover', 'focus']")
			PButton 悬浮触发 + 聚焦触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['hover', 'contextmenu']")
			PButton 悬浮触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['click', 'focus']")
			PButton 点击触发 + 聚焦触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['click', 'contextmenu']")
			PButton 点击触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['focus', 'contextmenu']")
			PButton 聚焦触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['hover', 'click', 'focus']")
			PButton 悬浮触发 + 点击触发 + 聚焦触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['hover', 'click', 'contextmenu']")
			PButton 悬浮触发 + 点击触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['hover', 'focus', 'contextmenu']")
			PButton 悬浮触发 + 聚焦触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['click', 'focus', 'contextmenu']")
			PButton 点击触发 + 聚焦触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(:trigger="['hover', 'click', 'focus', 'contextmenu']")
			PButton 悬浮触发 + 点击触发 + 聚焦触发 + 右键菜单触发
			template(#popup)
				DemoAnchor
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PopupAnchorTrigger(placement="left-start")
			PButton 左侧起点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="left")
			PButton 左侧
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="left-end")
			PButton 左侧终点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="top-start")
			PButton 顶部起点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger
			PButton(type="fill") 默认
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="top-end")
			PButton 顶部终点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="bottom-start")
			PButton 底部起点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="bottom")
			PButton 底部
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="bottom-end")
			PButton 底部终点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="right-start")
			PButton 右侧起点
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="right")
			PButton 右侧
			template(#popup)
				DemoAnchor
		PopupAnchorTrigger(placement="right-end")
			PButton 右侧终点
			template(#popup)
				DemoAnchor
		//- GViewport(ref="positionViewportRef")
</template>

<script lang="ts" setup>
import { PopupAnchorTrigger } from 'vue-popup-plus'
import DemoAnchor from './demo/DemoAnchor.vue'
import { useTemplateRef } from 'vue'

const positionViewportRef = useTemplateRef('positionViewportRef')
</script>

<style lang="scss" scoped>
.anchor-trigger {
	align-items: stretch;
}
</style>
