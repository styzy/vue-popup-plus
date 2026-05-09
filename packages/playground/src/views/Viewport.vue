<template lang="pug">
.viewport
	.left
		GContainer
			GTools(:component="() => import('./Viewport.vue')")
			GTitle 核心 - 视区功能测试
			GTitle(second) 基础功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopup()" type="fill") 默认
			GTitle(second) 遮罩功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupWithMaskBlur()") 启用遮罩层高斯模糊
				PButton(@click="handlePopupWithMaskTransparent()") 启用遮罩层透明效果
				PButton(@click="handlePopupWithMaskDestroy()") 启用遮罩层点击销毁
				PButton(@click="handlePopupWithMaskDestroyHandler()") 遮罩层点击销毁处理器
			GTitle(second) 样式功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupFullScreen()") 全屏
				PButton(@click="handlePopupMaxSize()") 最大尺寸
				PButton(@click="handlePopupMinSize()") 最小尺寸
				PButton(@click="handlePopupOffset()") 位移
				PButton(@click="handlePopupOffsetLarge()") 大位移(默认安全)
				PButton(@click="handlePopupOffsetLargeOverflow()") 大位移(超出视区)
			GTitle(second) 定位功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupLeftTop()") 左上
				PButton(@click="handlePopupLeft()") 左侧
				PButton(@click="handlePopupLeftBottom()") 左下
				PButton(@click="handlePopupTop()") 顶部
				PButton(@click="handlePopupCenter()") 居中
				PButton(@click="handlePopupBottom()") 底部
				PButton(@click="handlePopupRightTop()") 右上
				PButton(@click="handlePopupRight()") 右侧
				PButton(@click="handlePopupRightBottom()") 右下
				PButton(@click="handlePopupLeftTopWithOffset()") 左上+位移(默认安全)
				PButton(@click="handlePopupLeftTopWithOffsetOverflow()") 左上+位移(超出视区)
				PButton(@click="handlePopupRightBottomWithOffset()") 右下+位移(默认安全)
				PButton(@click="handlePopupRightBottomWithOffsetOverflow()") 右下+位移(超出视区)
			GTitle(second) 动画功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAnimationScale()") 缩放
				PButton(@click="handlePopupAnimationFade()") 淡入淡出
				PButton(@click="handlePopupAnimationFly()") 飞入
				PButton(@click="handlePopupAnimationDuration()") 动画持续10s
				PButton(@click="handlePopupAnimationDurationZero()" theme="danger") 动画持续0s
				PButton(@click="handlePopupAnimationCustom()" theme="success") 自定义动画
	.right
		GTitle(second) 视区容器
		.viewport-wrapper
			.viewport-ref(ref="viewportRef")
				GTitle(third) - 弹出层将以视区作为视图和遮罩的容器
				GTitle(third) - 定位、溢出判断等都将基于视区进行处理
				GTitle(third) - 同时将跟随页面滚动
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import {
	POPUP_ANIMATIONS,
	usePopup,
	type PopupRenderOption,
} from 'vue-popup-plus'

import Demo from './demo/Demo.vue'
import DemoFullScreen from './demo/DemoFullScreen.vue'

const popup = usePopup()

const viewportRef = useTemplateRef('viewportRef')

const shareOptions = computed<PopupRenderOption>(() => ({
	component: Demo,
	viewport: viewportRef.value,
}))

function handlePopup() {
	popup.render({
		...shareOptions.value,
	})
}

function handlePopupWithoutMask() {
	popup.render({
		...shareOptions.value,
		mask: false,
	})
}

function handlePopupWithMaskBlur() {
	popup.render({
		...shareOptions.value,
		maskBlur: true,
	})
}

function handlePopupWithMaskTransparent() {
	popup.render({
		...shareOptions.value,
		maskTransparent: true,
	})
}

function handlePopupWithMaskDestroy() {
	popup.render({
		...shareOptions.value,
		maskDestroy: true,
	})
}

function handlePopupWithMaskDestroyHandler() {
	popup.render({
		...shareOptions.value,
		onUnmounted(payload) {
			console.log('payload: ', payload)
		},
		maskDestroy: async (destroy) => {
			await destroy('自定义销毁参数')
			console.log('已等待 destroy() 方法异步执行结束')
		},
	})
}

function handlePopupFullScreen() {
	popup.render({
		...shareOptions.value,
		component: DemoFullScreen,
		width: '100%',
		height: '100%',
	})
}

function handlePopupMaxSize() {
	popup.render({
		...shareOptions.value,
		maxWidth: '200px',
		maxHeight: 200,
	})
}

function handlePopupMinSize() {
	popup.render({
		...shareOptions.value,
		minWidth: 800,
		minHeight: '800px',
	})
}

function handlePopupOffset() {
	popup.render({
		...shareOptions.value,
		viewTranslateX: 100,
		viewTranslateY: -100,
	})
}

function handlePopupOffsetLarge() {
	popup.render({
		...shareOptions.value,
		viewTranslateX: 380,
		viewTranslateY: -380,
	})
}

function handlePopupOffsetLargeOverflow() {
	popup.render({
		...shareOptions.value,
		viewTranslateX: 380,
		viewTranslateY: -380,
		viewTranslateOverflow: true,
	})
}

function handlePopupLeftTop() {
	popup.render({
		...shareOptions.value,
		placement: 'left-top',
	})
}

function handlePopupLeft() {
	popup.render({
		...shareOptions.value,
		placement: 'left',
	})
}

function handlePopupLeftBottom() {
	popup.render({
		...shareOptions.value,
		placement: 'left-bottom',
	})
}

function handlePopupTop() {
	popup.render({
		...shareOptions.value,
		placement: 'top',
	})
}

function handlePopupCenter() {
	popup.render({
		...shareOptions.value,
		placement: 'center',
	})
}

function handlePopupBottom() {
	popup.render({
		...shareOptions.value,
		placement: 'bottom',
	})
}

function handlePopupRightTop() {
	popup.render({
		...shareOptions.value,
		placement: 'right-top',
	})
}

function handlePopupRight() {
	popup.render({
		...shareOptions.value,
		placement: 'right',
	})
}

function handlePopupRightBottom() {
	popup.render({
		...shareOptions.value,
		placement: 'right-bottom',
	})
}

function handlePopupLeftTopWithOffset() {
	popup.render({
		...shareOptions.value,
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
	})
}

function handlePopupLeftTopWithOffsetOverflow() {
	popup.render({
		...shareOptions.value,
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		viewTranslateOverflow: true,
	})
}

function handlePopupRightBottomWithOffset() {
	popup.render({
		...shareOptions.value,
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
	})
}

function handlePopupRightBottomWithOffsetOverflow() {
	popup.render({
		...shareOptions.value,
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		viewTranslateOverflow: true,
	})
}
function handlePopupAnimationScale() {
	popup.render({
		...shareOptions.value,
		maskAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
	})
}

function handlePopupAnimationFade() {
	popup.render({
		...shareOptions.value,
		maskAnimation: POPUP_ANIMATIONS.FADE,
		viewAnimation: POPUP_ANIMATIONS.FADE,
	})
}

function handlePopupAnimationFly() {
	popup.render({
		...shareOptions.value,
		maskAnimation: POPUP_ANIMATIONS.FLY_TOP,
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
	})
}

function handlePopupAnimationDuration() {
	popup.render({
		...shareOptions.value,
		animationDuration: 10000,
		placement: 'left',
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
	})
}

function handlePopupAnimationDurationZero() {
	popup.render({
		...shareOptions.value,
		animationDuration: 0,
	})
}

function handlePopupAnimationCustom() {
	popup.render({
		...shareOptions.value,
		maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		viewAnimation: POPUP_ANIMATIONS.CUSTOM,
	})
}
</script>

<style lang="scss" scoped>
.viewport {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	gap: 20px;
	height: 100vh;
	.left {
		width: 400px;
		min-height: 0;
		overflow-y: auto;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	}
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		padding-right: 240px;
		min-height: 0;
		overflow-y: auto;
		.viewport-wrapper {
			padding-bottom: 50vh;
			.viewport-ref {
				display: flex;
				flex-direction: column;
				gap: 20px;
				height: 80vh;
				padding: 20px;
				box-sizing: border-box;
				background-color: rgba(28, 112, 209, 0.25);
			}
		}
	}
}
</style>
