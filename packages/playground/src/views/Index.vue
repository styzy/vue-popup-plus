<template lang="pug">
GContainer.index
	GTitle(large) @styzy/vue-popup-plus
	GTitle 版本：{{ version }}
	GTitle Github
	PButton(
		@click="handleJump('https://github.com/styzy/vue-popup-plus', true)"
		size="large"
		theme="primary"
		type="plain") https://github.com/styzy/vue-popup-plus
	GTitle 文档
	PButton(
		@click="handleJump('http://vue-popup-plus.styzy.cn', true)"
		size="large"
		theme="primary"
		type="plain") http://vue-popup-plus.styzy.cn
	GTitle 测试目录
	PButtonGroup(
		cross-align="center"
		direction="vertical"
		size="large"
		type="fill")
		PButton(@click="handleJumpCore()" theme="primary") 核心 - 基础功能测试
		PButton(@click="handleJumpAnchor()" theme="primary") 核心 - 锚点功能测试
		PButton(@click="handleJumpAnchorTrigger()" theme="primary") 核心 - 锚点触发器测试
		PButton(@click="handleJumpDirective()" theme="warning" type="plain") 核心 - 指令功能测试
		PButton(@click="handleJumpPlugin()" theme="success") 预置插件 - 基础功能测试
		PButton(@click="handleJumpButton()" theme="warning" type="plain") 预置插件 - 按钮功能测试
</template>

<script lang="ts" setup>
import { version } from 'vue-popup-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleJump(url: string, blank = false) {
	window.open(url, blank ? '_blank' : '_self')
}

const handleJumpCore = () => {
	router.push('/core')
}

const handleJumpAnchor = () => {
	router.push('/anchor')
}

const handleJumpAnchorTrigger = () => {
	router.push('/anchor-trigger')
}

const handleJumpDirective = () => {
	router.push('/directive')
}

const handleJumpPlugin = () => {
	router.push('/plugin')
}

const handleJumpButton = () => {
	router.push('/button')
}
</script>

<style lang="scss" scoped>
.index {
	align-items: center;
}
</style>
