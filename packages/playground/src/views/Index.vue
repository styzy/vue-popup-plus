<template lang="pug">
.index
	.title @styzy/vue-popup-plus
	.info 版本：{{ version }}
	.info 作者：styzy
	.info Github：
		a(href="https://github.com/styzy/vue-popup-plus" target="_blank") https://github.com/styzy/vue-popup-plus
	.info 文档：
		a(href="http://vue-popup-plus.styzy.cn" target="_blank") http://vue-popup-plus.styzy.cn
	.row
		.row-item
			.title 主包测试
			.title.sub 基础功能单元测试
			.btn-ctn
				button(@click="handlePopup()") 默认
				button(@click="handlePopupWithoutMask()") 无遮罩层
				button(@click="handlePopupFullScreen()") 全屏
			.title.sub 动画功能单元测试
			.btn-ctn
				button(@click="handlePopupScale()") 缩放
				button(@click="handlePopupFade()") 淡入淡出
				button(@click="handlePopupFly()") 飞入
				button(@click="handlePopupDuration()") 设置动画持续时间
		.row-item
			.title 插件测试
			.title.sub 动画功能单元测试
			.btn-ctn
				button(@click="handlePopupToast()") toast
				button(@click="handlePopupToastLong()") toast长消息
</template>

<script setup lang="ts">
import { POPUP_ANIMATIONS, usePopup, version } from 'vue-popup-plus'

defineOptions({ name: 'Index' })

const popup = usePopup()

const handlePopup = () => {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		viewAnimation: POPUP_ANIMATIONS.CUSTOM,
	})
}

const handlePopupWithoutMask = () => {
	popup.render({
		mask: false,
		maskClickCloseEnabled: true,
		component: () => import('@/views/Demo.vue'),
	})
}

const handlePopupFullScreen = () => {
	popup.render({
		width: '100%',
		height: '100%',
		component: () => import('@/views/DemoFullScreen.vue'),
	})
}

const handlePopupScale = () => {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		viewAnimation: POPUP_ANIMATIONS.SCALE_SHRINK,
		component: () => import('@/views/Demo.vue'),
	})
}

const handlePopupFade = () => {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FADE,
		viewAnimation: POPUP_ANIMATIONS.FADE,
		component: () => import('@/views/Demo.vue'),
	})
}

const handlePopupFly = () => {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FLY_TOP,
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
		component: () => import('@/views/Demo.vue'),
	})
}

const handlePopupDuration = () => {
	popup.render({
		animationDuration: 20000,
		component: () => import('@/views/Demo.vue'),
	})
}

const handlePopupToast = () => {
	popup.toast('这是一条toast消息')
}

const handlePopupToastLong = () => {
	popup.toast(
		'这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。'
	)
}
</script>

<style lang="stylus" scoped>
.index
	display flex
	flex-direction column
	align-items flex-start
	padding 20px
	gap 20px
	.row
		display flex
		flex-direction row
		justify-content space-between
		gap 20px
		width 100%
		.row-item
			flex 1
			display flex
			flex-direction column
			gap 10px
	.title
		padding 10px 0
		color #424242
		font-weight 700
		font-size 28px
		&.large
			padding 20px 0
			font-size 36px
		&.sub
			padding 0
			font-size 20px
	.info
		font-weight 700
		font-size 16px
	.des
		padding 10px 20px
		border-radius 5px
		background-color #F7F7F7
		color #333333
		&:before
			content '说明：'
	.btn-ctn
		display flex
		flex-direction row
		gap 10px
	button
		padding 10px 20px
</style>

