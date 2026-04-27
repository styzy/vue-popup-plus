<template lang="pug">
GContainer.anchor-trigger
	GTools(:component="() => import('./AnchorTrigger.vue')")
	GTitle 核心 - 锚点触发器测试
	GTitle(second) 基础
	PButtonGroup(align="center" theme="primary" tight)
		PopupAnchorTrigger
			template(#anchor)
				PButton(type="fill") 默认
			DemoAnchor
		PopupAnchorTrigger(trigger="hover")
			template(#anchor)
				PButton(type="plain") 悬浮触发
			DemoAnchor
		PopupAnchorTrigger(trigger="click")
			template(#anchor)
				PButton(type="plain") 点击触发
			DemoAnchor
		PopupAnchorTrigger(trigger="focus")
			template(#anchor)
				PButton(type="plain") 聚焦触发
			DemoAnchor
		PopupAnchorTrigger(trigger="contextmenu")
			template(#anchor)
				PButton(type="plain") 右键菜单触发
			DemoAnchor
</template>

<script lang="ts" setup>
import { PopupAnchorTrigger } from 'vue-popup-plus'
import DemoAnchor from './demo/DemoAnchor.vue'
</script>

<style lang="scss" scoped>
.anchor-trigger {
	align-items: stretch;
}
</style>
