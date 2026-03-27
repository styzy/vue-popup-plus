<template lang="pug">
GContainer
	GTools(:component="() => import('./Plugin.vue')")
	GTitle 插件功能单元测试
	PButtonGroup(theme="primary")
		PButton(@click="handleSkinChange()" size="large" theme="success")
			| 切换皮肤，当前为
			strong {{ skin }}
	GTitle(second) Toast 轻量提示
	GTitle(third) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupToast()" type="default") 默认
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
	GTitle(third) 位置
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
	GTitle(third) 主题方法
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupToastPrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupToastSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupToastInfo()" theme="info") 信息主题
		PButton(@click="handlePopupToastWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupToastDanger()" theme="danger") 危险主题
	GTitle(second) Message 消息
	GTitle(third) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupMessage()" type="default") 默认
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
	GTitle(third) 位置
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
	GTitle(third) 主题方法
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupMessagePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupMessageSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupMessageInfo()" theme="info") 信息主题
		PButton(@click="handlePopupMessageWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupMessageDanger()" theme="danger") 危险主题
	GTitle(second) Alert 提示
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupAlert()" type="default") 默认
		PButton(@click="handlePopupAlertCustomTitle()") 自定义标题
		PButton(@click="handlePopupAlertHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupAlertCustomConfirmButtonText()") 自定义确认按钮
		PButton(@click="handlePopupAlertDraggable()") 可拖拽
		PButton(@click="handlePopupAlertDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupAlertWithMaskBlur()") 启用遮罩模糊
	GTitle(second) Confirm 确认
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupConfirm()" type="default") 默认
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
	GTitle(second) Prompt 提示输入
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupPrompt()" type="default") 默认
		PButton(@click="handlePopupPromptDefaultValue()") 默认值
		PButton(@click="handlePopupPromptCustomType()") 自定义类型
		PButton(@click="handlePopupPromptCustomTitle()") 自定义标题
		PButton(@click="handlePopupPromptHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupPromptCustomMaxLength()") 自定义最大长度
		PButton(@click="handlePopupPromptCustomPlaceholder()") 自定义占位符
		PButton(@click="handlePopupPromptCustomConfirmButtonText()") 自定义确认按钮文本
		PButton(@click="handlePopupPromptCustomCancelButtonText()") 自定义取消按钮文本
		PButton(@click="handlePopupPromptDraggable()") 可拖拽
		PButton(@click="handlePopupPromptDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupPromptWithMaskBlur()") 启用遮罩模糊
	GTitle(second) Loading 加载遮罩
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupLoading()" theme="primary" type="default") 默认
		PButton(@click="handlePopupLoadingPrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupLoadingSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupLoadingInfo()" theme="info") 信息主题
		PButton(@click="handlePopupLoadingWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupLoadingDanger()" theme="danger") 危险主题
		PButton(@click="handlePopupLoadingCustomTitle()") 自定义标题
		PButton(@click="handlePopupLoadingCustomTitleLong()") 自定义长标题
		PButton(@click="handlePopupLoadingCustomIconSize()") 自定义图标尺寸
		PButton(@click="handlePopupLoadingForever()") 持续显示
		PButton(@click="handlePopupLoadingWithoutMask()") 禁用遮罩层
		PButton(@click="handlePopupLoadingWithMaskBlur()") 启用遮罩模糊
		PButton(@click="handlePopupLoadingWithMaskTransparent()") 启用遮罩透明
	GTitle(second) Dialog 对话框
	GTitle(third) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDialog()" type="default") 默认
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
	GTitle(third) 位置
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
	GTitle(second) Drawer 抽屉
	GTitle(third) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDrawer()" type="default") 默认
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
	GTitle(third) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupDrawerPlacementTop()") 顶部
		PButton(@click="handlePopupDrawerPlacementBottom()") 底部
		PButton(@click="handlePopupDrawerPlacementLeft()") 左侧
		PButton(@click="handlePopupDrawerPlacementRight()") 右侧
	GTitle(second) Album 媒体相册
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupAlbum()" type="default") 默认
		PButton(@click="handlePopupAlbumDefaultIndex()") 默认下标
		PButton(@click="handlePopupAlbumDisableCount()") 禁用计数器
		PButton(@click="handlePopupAlbumDisableName()") 禁用文件名
		PButton(@click="handlePopupAlbumDisablePureMode()") 禁用纯净模式
		PButton(@click="handlePopupAlbumDisableDownload()") 禁用下载
		PButton(@click="handlePopupAlbumDisableScale()") 禁用缩放
		PButton(@click="handlePopupAlbumDisableDrag()") 禁用拖动
		//- PButton(@click="handlePopupAlbumWithoutMask()") 禁用遮罩层
		PButton(@click="handlePopupAlbumWithMaskBlur()") 启用遮罩模糊
		PButton(@click="handlePopupAlbumDisableLoop()") 禁用循环
		PButton(@click="handlePopupAlbumDisableRotate()") 禁用旋转
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'
import { type Skin } from 'vue-popup-plus-plugin-preset'
import { type AlbumMediaSource } from '../../../plugin/src/plugins/album'
import Demo from './demo/Demo.vue'
import DemoDrawer from './demo/DemoDrawer.vue'

const popup = usePopup()

const skin = (localStorage.getItem('skin') || 'modern') as Skin

function handleSkinChange() {
	localStorage.setItem('skin', skin === 'modern' ? 'classic' : 'modern')
	window.location.reload()
}

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

async function handlePopupPrompt() {
	const result = await popup.prompt('这是一条提示输入框消息')
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDefaultValue() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		defaultValue: '123',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomType() {
	const result = await popup.prompt('这是一条提示输入框消息，类型为文本域', {
		type: 'textarea',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomTitle() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		title: '自定义标题',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptHeaderClose() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		headerClose: false,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomPlaceholder() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		placeholder: '自定义占位符',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomMaxLength() {
	const result = await popup.prompt(
		'这是一条提示输入框消息，最大长度为10个字符',
		{
			maxLength: 10,
		}
	)
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomConfirmButtonText() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		confirmText: '自定义确认按钮文本',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomCancelButtonText() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		cancelText: '自定义取消按钮文本',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDraggable() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		draggable: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDraggableOverflow() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		draggable: true,
		dragOverflow: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptWithMaskBlur() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		maskBlur: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

function handlePopupLoading() {
	popup.loading()
	window.setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingPrimary() {
	popup.loading({ theme: 'primary' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingInfo() {
	popup.loading({ theme: 'info' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingSuccess() {
	popup.loading({ theme: 'success' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingWarning() {
	popup.loading({ theme: 'warning' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingDanger() {
	popup.loading({ theme: 'danger' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingCustomTitle() {
	popup.loading({ title: '自定义标题' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingCustomTitleLong() {
	popup.loading({
		title: '自定义长标题，自定义长标题，自定义长标题，自定义长标题，自定义长标题，自定义长标题.',
	})
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingCustomIconSize() {
	popup.loading({ iconSize: 100 })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingForever() {
	popup.loading({ title: '持续显示' })
}

function handlePopupLoadingWithoutMask() {
	popup.loading({ mask: false })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingWithMaskBlur() {
	popup.loading({ maskBlur: true })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingWithMaskTransparent() {
	popup.loading({ maskTransparent: true })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

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

const sources: Array<string | AlbumMediaSource> = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
	{
		url: 'https://minio.carzplt.com:8085/acip-dev/20260112/5b6fd0b420954c83990aea3fe3719f26.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=MkWhlye9R97QR5OY1yQw%2F20260319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260319T062616Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=03898e0254f39c2c0fb1077a5096621c3cf7af13133961d9353c1a9b905345ac',
		type: 'image',
	},
]

function handlePopupAlbum() {
	popup.album({
		sources,
	})
}

function handlePopupAlbumDefaultIndex() {
	popup.album({
		sources,
		defaultIndex: 2,
	})
}

function handlePopupAlbumDisableCount() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handlePopupAlbumDisableName() {
	popup.album({
		sources,
		disableName: true,
	})
}

function handlePopupAlbumDisablePureMode() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handlePopupAlbumDisableDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handlePopupAlbumDisableScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handlePopupAlbumDisableDrag() {
	popup.album({
		sources,
		disableDrag: true,
	})
}

// function handlePopupAlbumWithoutMask() {
// 	popup.album({
// 		sources,
// 		mask: false,
// 	})
// }

function handlePopupAlbumWithMaskBlur() {
	popup.album({
		sources,
		maskBlur: true,
	})
}

function handlePopupAlbumDisableLoop() {
	popup.album({
		sources,
		disableLoop: true,
	})
}

function handlePopupAlbumDisableRotate() {
	popup.album({
		sources,
		disableRotate: true,
	})
}
</script>
