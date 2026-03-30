<template lang="pug">
GContainer
	GTitle Confirm 确认
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupConfirm()" type="fill") 默认
		PButton(@click="handlePopupConfirmCustomTitle()") 自定义标题
		PButton(@click="handlePopupConfirmHeaderClose()") 启用标题栏关闭
		PButton(
			@click="handlePopupConfirmCustomConfirmButtonText()"
			theme="primary"
			type="plain") 自定义确认按钮文本
		PButton(
			@click="handlePopupConfirmCustomCancelButtonText()"
			theme="primary"
			type="plain") 自定义取消按钮文本
		PButton(@click="handlePopupConfirmDraggable()") 可拖拽
		PButton(@click="handlePopupConfirmDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupConfirmWithMaskBlur()") 启用遮罩模糊
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

async function handlePopupConfirm() {
	const isConfirm = await popup.confirm('这是一条确认框消息')
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomTitle() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		title: '自定义标题',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmHeaderClose() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		headerClose: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomConfirmButtonText() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		confirmText: '自定义确认按钮文本',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomCancelButtonText() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		cancelText: '自定义取消按钮文本',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmDraggable() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		draggable: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmDraggableOverflow() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		draggable: true,
		dragOverflow: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmWithMaskBlur() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		maskBlur: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}
</script>
