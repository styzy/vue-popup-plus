<template lang="pug">
GContainer
	GTitle Message 消息
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupMessage()" type="fill") 默认
		PButton(@click="handlePopupMessageThemePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupMessageThemeSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupMessageThemeInfo()" theme="info") 信息主题
		PButton(@click="handlePopupMessageThemeWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupMessageThemeDanger()" theme="danger") 危险主题
		PButton(@click="handlePopupMessageLong()") 长消息
		PButton(@click="handlePopupMessageTenSecond()") 10秒消息
		PButton(@click="handlePopupMessageZeroSecond()") 0秒消息
		PButton(@click="handlePopupMessageShowClose()") 显示关闭按钮
		PButton(@click="handlePopupMessageHoverWait()") 禁用悬停等待
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupMessagePlacementLeftTop()") 左上
		PButton(@click="handlePopupMessagePlacementLeft()") 左侧
		PButton(@click="handlePopupMessagePlacementLeftBottom()") 左下
		PButton(@click="handlePopupMessagePlacementTop()") 顶部
		PButton(@click="handlePopupMessagePlacementCenter()") 居中
		PButton(@click="handlePopupMessagePlacementBottom()") 底部
		PButton(@click="handlePopupMessagePlacementRightTop()") 右上
		PButton(@click="handlePopupMessagePlacementRight()") 右侧
		PButton(@click="handlePopupMessagePlacementRightBottom()") 右下
	GTitle(second) 主题方法
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupMessagePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupMessageSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupMessageInfo()" theme="info") 信息主题
		PButton(@click="handlePopupMessageWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupMessageDanger()" theme="danger") 危险主题
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupMessage() {
	popup.message('这是一条toast消息')
}

function handlePopupMessageThemePrimary() {
	popup.message('这是一条主要message消息', { theme: 'primary' })
}

function handlePopupMessageThemeInfo() {
	popup.message('这是一条信息message消息', { theme: 'info' })
}

function handlePopupMessageThemeSuccess() {
	popup.message('这是一条成功message消息', { theme: 'success' })
}

function handlePopupMessageThemeWarning() {
	popup.message('这是一条警告message消息', { theme: 'warning' })
}

function handlePopupMessageThemeDanger() {
	popup.message('这是一条危险message消息', { theme: 'danger' })
}

function handlePopupMessageLong() {
	popup.message(
		'这是一条message消息，包含了更多的内容，用于测试message的长消息显示效果，包含了更多的内容，用于测试message的长消息显示效果，这是一条message消息，包含了更多的内容，用于测试message的长消息显示效果，包含了更多的内容'
	)
}

function handlePopupMessageTenSecond() {
	popup.message('这是一条10秒的message消息', { duration: 10000 })
}

function handlePopupMessageZeroSecond() {
	popup.message('这是一条0秒的message消息', { duration: 0 })
}

function handlePopupMessageShowClose() {
	popup.message('这是一条显示关闭按钮的message消息', { showClose: true })
}

function handlePopupMessageHoverWait() {
	popup.message('这是一条禁用悬停等待的message消息', { hoverWait: false })
}

function handlePopupMessagePlacementLeftTop() {
	popup.message('这是一条左上message消息', { placement: 'left-top' })
}

function handlePopupMessagePlacementLeft() {
	popup.message('这是一条左侧message消息', { placement: 'left' })
}

function handlePopupMessagePlacementLeftBottom() {
	popup.message('这是一条左下message消息', { placement: 'left-bottom' })
}

function handlePopupMessagePlacementTop() {
	popup.message('这是一条顶部message消息', { placement: 'top' })
}

function handlePopupMessagePlacementCenter() {
	popup.message('这是一条居中message消息', { placement: 'center' })
}

function handlePopupMessagePlacementBottom() {
	popup.message('这是一条底部message消息', { placement: 'bottom' })
}

function handlePopupMessagePlacementRightTop() {
	popup.message('这是一条右上message消息', { placement: 'right-top' })
}

function handlePopupMessagePlacementRight() {
	popup.message('这是一条右侧message消息', { placement: 'right' })
}

function handlePopupMessagePlacementRightBottom() {
	popup.message('这是一条右下message消息', { placement: 'right-bottom' })
}

function handlePopupMessagePrimary() {
	popup.messagePrimary('这是一条主要message消息')
}

function handlePopupMessageSuccess() {
	popup.messageSuccess('这是一条成功message消息')
}

function handlePopupMessageInfo() {
	popup.messageInfo('这是一条信息message消息')
}

function handlePopupMessageWarning() {
	popup.messageWarning('这是一条警告message消息')
}

function handlePopupMessageDanger() {
	popup.messageDanger('这是一条危险message消息')
}
</script>
