<template lang="pug">
GContainer
	GTools(:component="() => import('./Button.vue')")
	GTitle 按钮单元测试
	GTitle(second) 默认
	PButtonGroup
		PButton(@click="handleClick()") Button
		PButton(@click="handleClick()" theme="primary") Button
		PButton(@click="handleClick()" theme="info") Button
		PButton(@click="handleClick()" theme="success") Button
		PButton(@click="handleClick()" theme="warning") Button
		PButton(@click="handleClick()" theme="danger") Button
	GTitle(second) 默认 禁用
	PButtonGroup(align="end" direction="vertical")
		PButton(@click="handleClick()" disabled) Button
		PButton(@click="handleClick()" disabled theme="primary") Button
		PButton(@click="handleClick()" disabled theme="info") Button
		PButton(@click="handleClick()" disabled theme="success") Button
		PButton(@click="handleClick()" disabled theme="warning") Button
		PButton(@click="handleClick()" disabled theme="danger") Button
	GTitle(second) 镂空
	PButtonGroup(type="plain")
		PButton(@click="handleClick()") Button
		PButton(@click="handleClick()" theme="primary") Button
		PButton(@click="handleClick()" theme="info") Button
		PButton(@click="handleClick()" theme="success") Button
		PButton(@click="handleClick()" theme="warning") Button
		PButton(@click="handleClick()" theme="danger") Button
	GTitle(second) 镂空 禁用
	PButtonGroup(direction="vertical" type="plain")
		PButton(@click="handleClick()" disabled) Button
		PButton(@click="handleClick()" disabled theme="primary") Button
		PButton(@click="handleClick()" disabled theme="info") Button
		PButton(@click="handleClick()" disabled theme="success") Button
		PButton(@click="handleClick()" disabled theme="warning") Button
		PButton(@click="handleClick()" disabled theme="danger") Button
	GTitle(second) 文本
	PButtonGroup(type="text")
		PButton(@click="handleClick()") Button
		PButton(@click="handleClick()" theme="primary") Button
		PButton(@click="handleClick()" theme="info") Button
		PButton(@click="handleClick()" theme="success") Button
		PButton(@click="handleClick()" theme="warning") Button
		PButton(@click="handleClick()" theme="danger") Button
	GTitle(second) 文本 禁用
	PButtonGroup(cutline direction="vertical" type="text")
		PButton(@click="handleClick()" disabled) Button
		PButton(@click="handleClick()" disabled theme="primary") Button
		PButton(@click="handleClick()" disabled theme="info") Button
		PButton(@click="handleClick()" disabled theme="success") Button
		PButton(@click="handleClick()" disabled theme="warning") Button
		PButton(@click="handleClick()" disabled theme="danger") Button
	GTitle(second) 链接
	PButtonGroup(cutline type="link")
		PButton(@click="handleClick()") Button
		PButton(@click="handleClick()" theme="primary") Button
		PButton(@click="handleClick()" theme="info") Button
		PButton(@click="handleClick()" theme="success") Button
		PButton(@click="handleClick()" theme="warning") Button
		PButton(@click="handleClick()" theme="danger") Button
	GTitle(second) 链接 禁用
	PButtonGroup(cutline direction="vertical" type="link")
		PButton(@click="handleClick()" disabled) Button
		PButton(@click="handleClick()" disabled theme="primary") Button
		PButton(@click="handleClick()" disabled theme="info") Button
		PButton(@click="handleClick()" disabled theme="success") Button
		PButton(@click="handleClick()" disabled theme="warning") Button
		PButton(@click="handleClick()" disabled theme="danger") Button
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleClick() {
	popup.toast('点击了按钮')
}
</script>
