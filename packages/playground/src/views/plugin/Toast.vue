<template lang="pug">
GContainer
	GTitle Toast 轻量提示
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupToast()" type="fill") 默认
		PButton(@click="handlePopupToastThemePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupToastThemeSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupToastThemeInfo()" theme="info") 信息主题
		PButton(@click="handlePopupToastThemeWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupToastThemeDanger()" theme="danger") 危险主题
		PButton(@click="handlePopupToastLong()") 长文本轻量提示
		PButton(@click="handlePopupToastTenSecond()" theme="warning") 10秒轻量提示
		PButton(@click="handlePopupToastZeroSecond()" theme="success") 0秒轻量提示
		PButton(@click="handlePopupToastShowClose()") 显示关闭按钮
		PButton(@click="handlePopupToastHoverWait()") 禁用悬停等待
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupToastPlacementLeftTop()") 左上
		PButton(@click="handlePopupToastPlacementLeft()") 左侧
		PButton(@click="handlePopupToastPlacementLeftBottom()") 左下
		PButton(@click="handlePopupToastPlacementTop()") 顶部
		PButton(@click="handlePopupToastPlacementCenter()") 居中
		PButton(@click="handlePopupToastPlacementBottom()") 底部
		PButton(@click="handlePopupToastPlacementRightTop()") 右上
		PButton(@click="handlePopupToastPlacementRight()") 右侧
		PButton(@click="handlePopupToastPlacementRightBottom()") 右下
	GTitle(second) 主题方法
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupToastPrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupToastSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupToastInfo()" theme="info") 信息主题
		PButton(@click="handlePopupToastWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupToastDanger()" theme="danger") 危险主题
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupToast() {
	popup.toast('这是一条toast消息')
}

function handlePopupToastThemePrimary() {
	popup.toast('这是一条主要toast消息', { theme: 'primary' })
}

function handlePopupToastThemeInfo() {
	popup.toast('这是一条信息toast消息', { theme: 'info' })
}

function handlePopupToastThemeSuccess() {
	popup.toast('这是一条成功toast消息', { theme: 'success' })
}

function handlePopupToastThemeWarning() {
	popup.toast('这是一条警告toast消息', { theme: 'warning' })
}

function handlePopupToastThemeDanger() {
	popup.toast('这是一条危险toast消息', { theme: 'danger' })
}

function handlePopupToastLong() {
	popup.toast(
		'这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。'
	)
}

function handlePopupToastTenSecond() {
	popup.toast('这是一条10秒的toast消息', { duration: 10000 })
}

function handlePopupToastZeroSecond() {
	popup.toastSuccess('这是一条0秒的toast消息', { duration: 0 })
}

function handlePopupToastShowClose() {
	popup.toast('这是一条显示关闭按钮的toast消息', { showClose: true })
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用悬停等待的toast消息', { hoverWait: false })
}

function handlePopupToastPlacementLeftTop() {
	popup.toast('这是一条左上toast消息', { placement: 'left-top' })
}

function handlePopupToastPlacementLeft() {
	popup.toast('这是一条左侧toast消息', { placement: 'left' })
}

function handlePopupToastPlacementLeftBottom() {
	popup.toast('这是一条左下toast消息', { placement: 'left-bottom' })
}

function handlePopupToastPlacementTop() {
	popup.toast('这是一条顶部toast消息', { placement: 'top' })
}

function handlePopupToastPlacementCenter() {
	popup.toast('这是一条居中toast消息', { placement: 'center' })
}

function handlePopupToastPlacementBottom() {
	popup.toast('这是一条底部toast消息', { placement: 'bottom' })
}

function handlePopupToastPlacementRightTop() {
	popup.toast('这是一条右上toast消息', { placement: 'right-top' })
}

function handlePopupToastPlacementRight() {
	popup.toast('这是一条右侧toast消息', { placement: 'right' })
}

function handlePopupToastPlacementRightBottom() {
	popup.toast('这是一条右下toast消息', { placement: 'right-bottom' })
}

function handlePopupToastPrimary() {
	popup.toastPrimary('这是一条主要toast消息')
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功toast消息')
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息toast消息')
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告toast消息')
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险toast消息')
}
</script>
