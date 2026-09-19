<template lang="pug">
GContainer
	GTitle Alert 提示
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupAlert()" type="fill") 默认
		PButton(@click="handlePopupAlertCustomTitle()") 自定义标题
		PButton(@click="handlePopupAlertHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupAlertCustomConfirmButtonText()") 自定义确认按钮
		PButton(@click="handlePopupAlertDraggable()") 可拖拽
		PButton(@click="handlePopupAlertDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupAlertWithMaskBlur()") 启用遮罩模糊
	GTitle(second) 主题
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupAlertThemePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupAlertThemeSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupAlertThemeInfo()" theme="info") 信息主题
		PButton(@click="handlePopupAlertThemeWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupAlertThemeDanger()" theme="danger") 危险主题
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupAlert() {
	popup.alert('这是一条提示消息')
}

function handlePopupAlertCustomTitle() {
	popup.alert('这是一条提示消息', { title: '自定义标题' })
}

function handlePopupAlertHeaderClose() {
	popup.alert('这是一条提示消息', { headerClose: false })
}

function handlePopupAlertCustomConfirmButtonText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupAlertDraggable() {
	popup.alert('这是一条提示消息', { draggable: true })
}

function handlePopupAlertDraggableOverflow() {
	popup.alert('这是一条提示消息', { draggable: true, dragOverflow: true })
}

function handlePopupAlertWithMaskBlur() {
	popup.alert('这是一条提示消息', { maskBlur: true })
}

function handlePopupAlertThemePrimary() {
	popup.alert('这是一条提示消息', { theme: 'primary' })
}

function handlePopupAlertThemeSuccess() {
	popup.alert('这是一条提示消息', { theme: 'success' })
}

function handlePopupAlertThemeInfo() {
	popup.alert('这是一条提示消息', { theme: 'info' })
}

function handlePopupAlertThemeWarning() {
	popup.alert('这是一条提示消息', { theme: 'warning' })
}

function handlePopupAlertThemeDanger() {
	popup.alert('这是一条提示消息', { theme: 'danger' })
}
</script>
