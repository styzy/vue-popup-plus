<template lang="pug">
.d-header
	.info
		.name(@click="handleLogoClicj") Vue Popup Plus
		.version {{ version }}
	.link
		RouterLink(to="/") 首页
		RouterLink(to="/guide") 指南
		RouterLink(to="/examples") 示例
		RouterLink(to="/api") API
		a(href="https://github.com/styzy/vue-popup-plus" target="_blank") GitHub
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { version } from 'vue-popup-plus'

defineComponent({ name: 'DHeader' })

const router = useRouter()

function handleLogoClicj() {
	router.push('/')
}
</script>

<style lang="stylus" scoped>
.d-header
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	height 70px
	border-bottom: 1px solid $color-border
	background-color rgba(255, 255, 255, 0.5)
	backdrop-filter blur(10px)  saturate(180%)
	.info
		flex 1
		display flex
		flex-direction row
		align-items center
		justify-content flex-start
		gap 15px
		height @height
		.name
			// baseTrans()

			height @height
			line-height @height
			font-size 28px
			font-weight 700
			color $color-primary
			cursor pointer
			&:hover
				baseColorfulText()
		.version
			padding 2px 5px
			border 1px solid $color-primary
			border-radius 20px
			color $color-primary
			// color #FFFFFF
			background-color rgba($color-primary,0.1)
			font-size 14px
			// font-weight 700
	.link
		display flex
		flex-direction row
		align-items stretch
		justify-content flex-end
		gap 24px
		height @height
		a
			height @height
			line-height @height
			color: $color-text-main;
			font-size 16px
			font-weight: 500;
			text-decoration: none;
			&:hover,
			&.router-link-active
				color: $color-primary;
</style>
