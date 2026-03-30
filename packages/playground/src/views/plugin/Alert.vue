<template lang="pug">
GContainer
	GTitle Alert 提示
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupAlert()" type="fill") 默认
		PButton(@click="handlePopupAlertCustomTitle()") 自定义标题
		PButton(@click="handlePopupAlertHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupAlertCustomConfirmButtonText()") 自定义确认按钮
		PButton(@click="handlePopupAlertDraggable()") 可拖拽
		PButton(@click="handlePopupAlertDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupAlertWithMaskBlur()") 启用遮罩模糊
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupAlert() {
	popup.alert('这是一条确认框消息')
}

function handlePopupAlertCustomTitle() {
	popup.alert('这是一条确认框消息', { title: '自定义标题' })
}

function handlePopupAlertHeaderClose() {
	popup.alert('这是一条确认框消息', { headerClose: false })
}

function handlePopupAlertCustomConfirmButtonText() {
	popup.alert('这是一条确认框消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupAlertDraggable() {
	popup.alert('这是一条确认框消息', { draggable: true })
}

function handlePopupAlertDraggableOverflow() {
	popup.alert('这是一条确认框消息', { draggable: true, dragOverflow: true })
}

function handlePopupAlertWithMaskBlur() {
	popup.alert('这是一条确认框消息', { maskBlur: true })
}
</script>
