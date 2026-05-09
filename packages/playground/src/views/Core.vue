<template lang="pug">
GContainer
	GTools(:component="() => import('./Core.vue')")
	GTitle 核心 - 基础功能测试
	GTitle(second) 基础功能
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopup()" type="fill") 默认
		PButton(@click="handlePopupWithImportComponent()") 异步组件(导入)
		PButton(@click="handlePopupWithDefineAsyncComponent()") 异步组件(定义)
	GTitle(second) 组件功能
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupWithProps()") 传入参数
		PButton(@click="handlePopupWithPayload()") 携带销毁参数
		PButton(@click="handleOptionPopupWithProps()") 传入参数(选项式)
		PButton(@click="handleOptionPopupWithPayload()") 携带销毁参数(选项式)
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
	GTitle(second) 三方组件库适配
	ASelect
	ElSelect
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupElementUI()") Element UI
		PButton(@click="handlePopupAntd()") Ant Design Vue
</template>

<script setup lang="ts">
import { defineAsyncComponent, h, ref } from 'vue'
import { POPUP_ANIMATIONS, usePopup } from 'vue-popup-plus'

import Demo from './demo/Demo.vue'
import DemoAntd from './demo/DemoAntd.vue'
import DemoElementUI from './demo/DemoElementUI.vue'
import DemoFullScreen from './demo/DemoFullScreen.vue'
import DemoOption from './demo/DemoOption.vue'

const popup = usePopup()

function handlePopup() {
	popup.render({
		component: Demo,
		componentProps: {
			test: undefined,
		},
	})
}

function handlePopupWithImportComponent() {
	popup.render({
		component: () => import('@/views/demo/Demo.vue'),
		componentProps: {
			test: undefined,
		},
	})
}

function handlePopupWithDefineAsyncComponent() {
	popup.render({
		component: defineAsyncComponent(() => import('@/views/demo/Demo.vue')),
		componentProps: {
			test: undefined,
		},
	})
}

function handlePopupWithProps() {
	popup.render({
		component: defineAsyncComponent(() => import('@/views/demo/Demo.vue')),
		componentProps: {
			test: 'test',
			onInputChange(value) {
				popup.toast(`触发事件：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
}

function handlePopupWithPayload() {
	popup.render({
		component: Demo,
		onUnmounted(payload) {
			popup.toast(`关闭弹框时携带的参数：${payload}`, {
				theme: 'success',
			})
		},
	})
}

function handleOptionPopupWithProps() {
	popup.render({
		component: DemoOption,
		componentProps: {
			test: 'test',
			onInputChange(value) {
				popup.toast(`触发事件：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
}

function handleOptionPopupWithPayload() {
	popup.render({
		component: DemoOption,
		onUnmounted(payload) {
			popup.toast(`关闭弹框时携带的参数：${payload}`, {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: Demo,
		mask: false,
	})
}

function handlePopupWithMaskBlur() {
	popup.render({
		component: Demo,
		maskBlur: true,
	})
}

function handlePopupWithMaskTransparent() {
	popup.render({
		component: Demo,
		maskTransparent: true,
	})
}

function handlePopupWithMaskDestroy() {
	popup.render({
		component: Demo,
		maskDestroy: true,
	})
}

function handlePopupWithMaskDestroyHandler() {
	popup.render({
		component: Demo,
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
		width: '100%',
		height: '100%',
		component: DemoFullScreen,
	})
}

function handlePopupMaxSize() {
	popup.render({
		maxWidth: '200px',
		maxHeight: 200,
		component: Demo,
	})
}

function handlePopupMinSize() {
	popup.render({
		minWidth: 800,
		minHeight: '800px',
		component: Demo,
	})
}

function handlePopupOffset() {
	popup.render({
		viewTranslateX: 100,
		viewTranslateY: -100,
		component: Demo,
	})
}

function handlePopupOffsetLarge() {
	popup.render({
		viewTranslateX: 380,
		viewTranslateY: -380,
		component: Demo,
	})
}

function handlePopupOffsetLargeOverflow() {
	popup.render({
		viewTranslateX: 380,
		viewTranslateY: -380,
		viewTranslateOverflow: true,
		component: Demo,
	})
}

function handlePopupLeftTop() {
	popup.render({
		placement: 'left-top',
		component: Demo,
	})
}

function handlePopupLeft() {
	popup.render({
		placement: 'left',
		component: Demo,
	})
}

function handlePopupLeftBottom() {
	popup.render({
		placement: 'left-bottom',
		component: Demo,
	})
}

function handlePopupTop() {
	popup.render({
		placement: 'top',
		component: Demo,
	})
}

function handlePopupCenter() {
	popup.render({
		placement: 'center',
		component: Demo,
	})
}

function handlePopupBottom() {
	popup.render({
		placement: 'bottom',
		component: Demo,
	})
}

function handlePopupRightTop() {
	popup.render({
		placement: 'right-top',
		component: Demo,
	})
}

function handlePopupRight() {
	popup.render({
		placement: 'right',
		component: Demo,
	})
}

function handlePopupRightBottom() {
	popup.render({
		placement: 'right-bottom',
		component: Demo,
	})
}

function handlePopupLeftTopWithOffset() {
	popup.render({
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		component: Demo,
	})
}

function handlePopupLeftTopWithOffsetOverflow() {
	popup.render({
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		viewTranslateOverflow: true,
		component: Demo,
	})
}

function handlePopupRightBottomWithOffset() {
	popup.render({
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		component: Demo,
	})
}

function handlePopupRightBottomWithOffsetOverflow() {
	popup.render({
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		viewTranslateOverflow: true,
		component: Demo,
	})
}
function handlePopupAnimationScale() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
		component: Demo,
	})
}

function handlePopupAnimationFade() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FADE,
		viewAnimation: POPUP_ANIMATIONS.FADE,
		component: Demo,
	})
}

function handlePopupAnimationFly() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FLY_TOP,
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
		component: Demo,
	})
}

function handlePopupAnimationDuration() {
	popup.render({
		animationDuration: 10000,
		placement: 'left',
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		component: Demo,
	})
}

function handlePopupAnimationDurationZero() {
	popup.render({
		animationDuration: 0,
		component: Demo,
	})
}

function handlePopupAnimationCustom() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		viewAnimation: POPUP_ANIMATIONS.CUSTOM,
		component: Demo,
	})
}

function handlePopupElementUI() {
	popup.render({
		component: DemoElementUI,
	})
}

function handlePopupAntd() {
	popup.render({
		component: DemoAntd,
	})
}
</script>
