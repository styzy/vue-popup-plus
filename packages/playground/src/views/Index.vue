<template lang="pug">
.index
	.title.large @styzy/vue-popup-plus
	.title Vue3 弹出层插件
	.info 版本：{{ version }}
	.info 作者：styzy
	.info Github：
		a(href="https://github.com/styzy/vue-popup-plus" target="_blank") https://github.com/styzy/vue-popup-plus
	.info 文档：
		a(href="http://vue-popup-plus.styzy.cn" target="_blank") http://vue-popup-plus.styzy.cn
	.title.large 示例
	.title 基础功能
	.title.sub 默认
	button(@click="handlePopup()") 打开弹出层
	.title.sub 无遮罩层
	button(@click="handlePopupWithoutMask()") 打开弹出层
	.title.sub 全屏
	button(@click="handlePopupFullScreen()") 打开弹出层
	.title 动画示例
	.title.sub 缩放
	button(@click="handlePopupScale()") 打开弹出层
	.title.sub 淡入淡出
	button(@click="handlePopupFade()") 打开弹出层
	.title.sub 飞入
	button(@click="handlePopupFly()") 打开弹出层
	.title.sub 设置动画持续时间
	button(@click="handlePopupDuration()") 打开弹出层
</template>

<script setup lang="ts">
import { POPUP_ANIMATIONS, usePopup, version } from 'vue-popup-plus'

defineOptions({ name: 'Index' })

const popup = usePopup()

const handlePopup = () => {
	popup.render({
		component: () => import('@/views/Demo.vue'),
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
</script>

<style lang="stylus" scoped>
.index
	display flex
	flex-direction column
	align-items flex-start
	padding 20px
	gap 20px
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
</style>

