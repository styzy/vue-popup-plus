<template lang="pug">
GContainer
	GTitle Dialog 对话框
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDialog()" type="fill") 默认
		PButton(@click="handlePopupDialogCustomComponentProps()") 自定义组件参数
		PButton(@click="handlePopupDialogCustomMaxSize()") 最大尺寸
		PButton(@click="handlePopupDialogCustomMinSize()") 最小尺寸
		PButton(@click="handlePopupDialogCustomTitle()") 自定义标题
		PButton(@click="handlePopupDialogHideHeader()") 隐藏标题栏
		PButton(@click="handlePopupDialogHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupDialogDraggable()") 可拖拽
		PButton(@click="handlePopupDialogDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupDialogWithoutMask()") 禁用遮罩层
		PButton(@click="handlePopupDialogWithMaskBlur()") 启用遮罩模糊
		PButton(@click="handlePopupDialogWithMaskTransparent()") 启用遮罩透明
		PButton(@click="handlePopupDialogWithMaskClose()") 启用遮罩层点击关闭
		PButton(@click="handlePopupDialogWithMaskCloseHandler()") 遮罩层点击关闭处理器
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDialogPlacementLeftTop()") 左上
		PButton(@click="handlePopupDialogPlacementLeft()") 左侧
		PButton(@click="handlePopupDialogPlacementLeftBottom()") 左下
		PButton(@click="handlePopupDialogPlacementTop()") 顶部
		PButton(@click="handlePopupDialogPlacementCenter()") 居中
		PButton(@click="handlePopupDialogPlacementBottom()") 底部
		PButton(@click="handlePopupDialogPlacementRightTop()") 右上
		PButton(@click="handlePopupDialogPlacementRight()") 右侧
		PButton(@click="handlePopupDialogPlacementRightBottom()") 右下
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'
import Demo from '../demo/Demo.vue'

const popup = usePopup()

async function handlePopupDialog() {
	const result: string | void = await popup.dialog({
		title: '对话框标题',
		component: Demo,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomComponentProps() {
	const result = await popup.dialog({
		title: '自定义组件参数',
		component: Demo,
		componentProps: {
			test: '123',
			onInputChange: (value) => {
				popup.toast(`输入框内容改变为：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomMaxSize() {
	const result = await popup.dialog({
		title: '最大尺寸为： 200 * 200',
		component: Demo,
		maxWidth: 200,
		maxHeight: '200px',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomMinSize() {
	const result = await popup.dialog({
		title: '最小尺寸为： 800 * 800',
		component: Demo,
		minWidth: 800,
		minHeight: '800px',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomTitle() {
	const result = await popup.dialog({
		title: '自定义标题',
		component: Demo,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogHideHeader() {
	const result = await popup.dialog({
		title: '隐藏标题栏',
		component: Demo,
		header: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogHeaderClose() {
	const result = await popup.dialog({
		title: '禁用标题栏关闭',
		component: Demo,
		headerClose: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithoutMask() {
	const result = await popup.dialog({
		title: '禁用遮罩层',
		component: Demo,
		mask: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogDraggable() {
	const result = await popup.dialog({
		title: '可拖拽',
		component: Demo,
		draggable: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogDraggableOverflow() {
	const result = await popup.dialog({
		title: '可拖拽溢出屏幕',
		component: Demo,
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskBlur() {
	const result = await popup.dialog({
		title: '启用遮罩模糊',
		component: Demo,
		maskBlur: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskTransparent() {
	const result = await popup.dialog({
		title: '启用遮罩透明',
		component: Demo,
		maskTransparent: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskClose() {
	const result = await popup.dialog({
		title: '启用遮罩层点击关闭',
		component: Demo,
		maskClose: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskCloseHandler() {
	const result = await popup.dialog({
		title: '遮罩层点击关闭处理器',
		component: Demo,
		maskClose: async (destroy) => {
			await destroy('自定义销毁参数')
			console.log('已等待 destroy() 方法异步执行结束')
		},
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeftTop() {
	const result = await popup.dialog({
		title: '左上',
		component: Demo,
		placement: 'left-top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeft() {
	const result = await popup.dialog({
		title: '左侧',
		component: Demo,
		placement: 'left',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeftBottom() {
	const result = await popup.dialog({
		title: '左下',
		component: Demo,
		placement: 'left-bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementTop() {
	const result = await popup.dialog({
		title: '顶部',
		component: Demo,
		placement: 'top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementCenter() {
	const result = await popup.dialog({
		title: '居中',
		component: Demo,
		placement: 'center',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementBottom() {
	const result = await popup.dialog({
		title: '底部',
		component: Demo,
		placement: 'bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRightTop() {
	const result = await popup.dialog({
		title: '右上',
		component: Demo,
		placement: 'right-top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRight() {
	const result = await popup.dialog({
		title: '右侧',
		component: Demo,
		placement: 'right',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRightBottom() {
	const result = await popup.dialog({
		title: '右下',
		component: Demo,
		placement: 'right-bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}
</script>
