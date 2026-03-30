<template lang="pug">
GContainer
	GTitle Drawer 抽屉
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDrawer()" type="fill") 默认
		PButton(@click="handlePopupDrawerCustomComponentProps()") 自定义组件参数
		PButton(@click="handlePopupDrawerTopSizeHalf()") 顶部50%尺寸
		PButton(@click="handlePopupDrawerTopCustomMaxSize()") 顶部最大尺寸
		PButton(@click="handlePopupDrawerTopCustomMinSize()") 顶部最小尺寸
		PButton(@click="handlePopupDrawerLeftSizeHalf()") 左侧50%尺寸
		PButton(@click="handlePopupDrawerLeftCustomMaxSize()") 左侧最大尺寸
		PButton(@click="handlePopupDrawerLeftCustomMinSize()") 左侧最小尺寸
		PButton(@click="handlePopupDrawerCustomTitle()") 自定义标题
		PButton(@click="handlePopupDrawerHideHeader()") 隐藏标题栏
		PButton(@click="handlePopupDrawerHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupDrawerWithoutMask()") 禁用遮罩层
		PButton(@click="handlePopupDrawerWithMaskBlur()") 启用遮罩模糊
		PButton(@click="handlePopupDrawerWithMaskTransparent()") 启用遮罩透明
		PButton(@click="handlePopupDrawerWithoutMaskClose()") 禁用遮罩层点击关闭
		PButton(@click="handlePopupDrawerWithMaskCloseHandler()") 遮罩层点击关闭处理器
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDrawerPlacementTop()") 顶部
		PButton(@click="handlePopupDrawerPlacementBottom()") 底部
		PButton(@click="handlePopupDrawerPlacementLeft()") 左侧
		PButton(@click="handlePopupDrawerPlacementRight()") 右侧
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'
import DemoDrawer from '../demo/DemoDrawer.vue'

const popup = usePopup()

async function handlePopupDrawer() {
	const result = await popup.drawer({
		component: DemoDrawer,
	})
	popup.toast(`抽屉关闭时传递的参数是：${result}`)
}

async function handlePopupDrawerCustomComponentProps() {
	const result = await popup.drawer({
		title: '自定义组件参数',
		component: DemoDrawer,
		componentProps: {
			test: '123',
			onInputChange: (value) => {
				popup.toast(`输入框内容改变为：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
	popup.toast(`抽屉关闭时传递的参数是：${result}`)
}

function handlePopupDrawerTopSizeHalf() {
	popup.drawer({
		title: '顶部50%尺寸',
		component: DemoDrawer,
		placement: 'top',
		size: '50%',
	})
}

function handlePopupDrawerTopCustomMaxSize() {
	popup.drawer({
		title: '最大200',
		component: DemoDrawer,
		placement: 'top',
		maxSize: '200px',
	})
}

function handlePopupDrawerTopCustomMinSize() {
	popup.drawer({
		title: '最小800',
		component: DemoDrawer,
		placement: 'top',
		minSize: '800px',
	})
}

function handlePopupDrawerLeftSizeHalf() {
	popup.drawer({
		title: '左侧50%尺寸',
		component: DemoDrawer,
		placement: 'left',
		size: '50%',
	})
}

function handlePopupDrawerLeftCustomMaxSize() {
	popup.drawer({
		title: '最大200',
		component: DemoDrawer,
		placement: 'left',
		maxSize: '200px',
	})
}

function handlePopupDrawerLeftCustomMinSize() {
	popup.drawer({
		title: '最小800',
		component: DemoDrawer,
		placement: 'left',
		minSize: '800px',
	})
}

function handlePopupDrawerCustomTitle() {
	popup.drawer({
		title: '自定义标题',
		component: DemoDrawer,
	})
}

function handlePopupDrawerHideHeader() {
	popup.drawer({
		title: '隐藏标题',
		component: DemoDrawer,
		header: false,
	})
}

function handlePopupDrawerHeaderClose() {
	popup.drawer({
		title: '禁用标题栏关闭',
		component: DemoDrawer,
		headerClose: false,
	})
}

function handlePopupDrawerWithoutMask() {
	popup.drawer({
		title: '无遮罩层',
		component: DemoDrawer,
		mask: false,
	})
}

function handlePopupDrawerWithMaskBlur() {
	popup.drawer({
		title: '遮罩层模糊',
		component: DemoDrawer,
		maskBlur: true,
	})
}

function handlePopupDrawerWithMaskTransparent() {
	popup.drawer({
		title: '遮罩层透明',
		component: DemoDrawer,
		maskTransparent: true,
	})
}

function handlePopupDrawerWithoutMaskClose() {
	popup.drawer({
		title: '禁用遮罩层点击关闭',
		component: DemoDrawer,
		maskClose: false,
	})
}

function handlePopupDrawerWithMaskCloseHandler() {
	popup.drawer({
		title: '遮罩层点击关闭处理器',
		component: DemoDrawer,
		maskClose: async (destroy) => {
			await destroy('自定义销毁参数')
			console.log('已等待 destroy() 方法异步执行结束')
		},
	})
}

function handlePopupDrawerPlacementTop() {
	popup.drawer({
		title: '顶部',
		component: DemoDrawer,
		placement: 'top',
	})
}

function handlePopupDrawerPlacementBottom() {
	popup.drawer({
		title: '底部',
		component: DemoDrawer,
		placement: 'bottom',
	})
}

function handlePopupDrawerPlacementLeft() {
	popup.drawer({
		title: '左侧',
		component: DemoDrawer,
		placement: 'left',
	})
}

function handlePopupDrawerPlacementRight() {
	popup.drawer({
		title: '右侧',
		component: DemoDrawer,
		placement: 'right',
	})
}
</script>
