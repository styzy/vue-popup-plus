<template lang="pug">
.index
	.info
		h1.title Vue Popup Plus
		p.description 一个功能强大、灵活的 Vue 3 弹出层插件
		p.version 当前版本:
			span.code {{ version }}
		.btn-ctn
			DButton(@click="handleJump('/guide')" theme="primary") 快速开始
			DButton(@click="handleJump('/examples')") 查看示例
	.features
		.card
			.title 简单易用
			.description 通过简洁的 API 快速创建各种弹出层，无需复杂配置
		.card
			.title 高度可定制
			.description 支持自定义组件、动画效果和样式，满足各种交互需求
		.card
			.title 类型安全
			.description 完整的 TypeScript 支持，提供良好的开发体验和代码提示
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { version } from 'vue-popup-plus'

defineOptions({ name: 'Index' })

const router = useRouter()

function handleJump(url: string) {
	router.push(url)
}
</script>

<style lang="stylus" scoped>
.index
	padding: 20px;
	box-sizing border-box
	.info
		text-align: center;
		padding: 48px;
		.title
			margin-bottom: 16px;
			color: $color-primary;
			font-size: 48px;
		.description
			margin-bottom: 8px;
			font-size: 24px;
			color: $color-text-main;
		.version
			margin-bottom: 32px;
			font-size: 16px;
			color: #666;
			.code
				color: $color-primary;
				margin 0 5px
		.btn-ctn
			display flex
			justify-content center
			gap 16px
	.features
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 32px;
		padding: 48px 16px;
		max-width: 1200px;
		margin: 0 auto;
		.card
			background-color: #f9f9f9;
			padding: 24px;
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
			.title
				margin-bottom: 8px;
				font-size 19px
				font-weight 700
				color: $color-primary;
			.description
				font-size 16px
				color: $color-text-sub;
</style>

