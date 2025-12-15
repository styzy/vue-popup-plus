<template lang="pug">
.index
	.title @styzy/vue-popup-plus 版本：{{ version }}
	.links
		.label Github:
		PButton(
			@click="handleJump('https://github.com/styzy/vue-popup-plus', true)"
			theme="primary"
			type="text") https://github.com/styzy/vue-popup-plus
		.label 文档:
		PButton(
			@click="handleJump('http://vue-popup-plus.styzy.cn', true)"
			theme="primary"
			type="text") http://vue-popup-plus.styzy.cn
	.row
		.row-item
			.title 核心功能单元测试
			.title.second 基础功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopup()" type="default") 默认
				PButton(@click="handlePopupWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupWithoutMaskBlur()") 遮罩层禁用模糊
				PButton(@click="handlePopupWithoutMaskClickClose()") 启用遮罩层点击关闭
			.title.second 组件功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupWithProps()") 传入参数
				PButton(@click="handlePopupWithPayload()") 携带销毁参数
			.title.second 样式功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupFullScreen()") 全屏
				PButton(@click="handlePopupMaxSize()") 最大尺寸
				PButton(@click="handlePopupMinSize()") 最小尺寸
				PButton(@click="handlePopupOffset()") 位移
				PButton(@click="handlePopupOffsetLarge()") 大位移(默认安全)
				PButton(@click="handlePopupOffsetLargeOverflow()") 大位移(超出屏幕)
			.title.second 定位功能
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
				PButton(@click="handlePopupLeftTopWithOffsetOverflow()") 左上+位移(超出屏幕)
				PButton(@click="handlePopupRightBottomWithOffset()") 右下+位移(默认安全)
				PButton(@click="handlePopupRightBottomWithOffsetOverflow()") 右下+位移(超出屏幕)
			.title.second 动画功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAnimationScale()") 缩放
				PButton(@click="handlePopupAnimationFade()") 淡入淡出
				PButton(@click="handlePopupAnimationFly()") 飞入
				PButton(@click="handlePopupAnimationDuration()") 动画持续10s
				PButton(@click="handlePopupAnimationDurationZero()" theme="danger") 动画持续0s
				PButton(@click="handlePopupAnimationCustom()" theme="success") 自定义动画
	.row
		.row-item
			.title 插件功能单元测试
			.title.second 消息
			.title.third 基础
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupToast()" type="default") 默认
				PButton(@click="handlePopupToastThemePrimary()" theme="primary") 主要主题
				PButton(@click="handlePopupToastThemeSuccess()" theme="success") 成功主题
				PButton(@click="handlePopupToastThemeInfo()" theme="info") 信息主题
				PButton(@click="handlePopupToastThemeWarning()" theme="warning") 警告主题
				PButton(@click="handlePopupToastThemeDanger()" theme="danger") 危险主题
				PButton(@click="handlePopupToastLong()") 长消息
				PButton(@click="handlePopupToastTenSecond()") 10秒消息
			.title.third 位置
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
			.title.third 主题方法
			PButtonGroup(theme="primary" tight)
				PButton(@click="handlePopupToastSuccess()" theme="success") 成功主题
				PButton(@click="handlePopupToastInfo()" theme="info") 信息主题
				PButton(@click="handlePopupToastWarning()" theme="warning") 警告主题
				PButton(@click="handlePopupToastDanger()" theme="danger") 危险主题
			.title.second 提示
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAlert()" type="default") 默认
				PButton(@click="handlePopupAlertCustomTitle()") 自定义标题
				PButton(@click="handlePopupAlertHeaderClose()") 禁用标题栏关闭
				PButton(@click="handlePopupAlertCustomConfirmButtonText()") 自定义确认按钮
				PButton(@click="handlePopupAlertWithoutMaskBlur()") 禁用遮罩模糊
				PButton(@click="handlePopupAlertDraggable()") 可拖拽
				PButton(@click="handlePopupAlertDraggableOverflow()") 可拖拽溢出屏幕
			.title.second 确认
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
				PButton(@click="handlePopupConfirmWithoutMaskBlur()") 禁用遮罩模糊
				PButton(@click="handlePopupConfirmDraggable()") 可拖拽
				PButton(@click="handlePopupConfirmDraggableOverflow()") 可拖拽溢出屏幕
			.title.second 提示输入
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
				PButton(@click="handlePopupPromptWithoutMaskBlur()") 禁用遮罩模糊
				PButton(@click="handlePopupPromptDraggable()") 可拖拽
				PButton(@click="handlePopupPromptDraggableOverflow()") 可拖拽溢出屏幕
			.title.second 加载遮罩
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupLoading()" theme="primary" type="default") 默认
				PButton(@click="handlePopupLoadingPrimary()" theme="primary") 主要主题
				PButton(@click="handlePopupLoadingSuccess()" theme="success") 成功主题
				PButton(@click="handlePopupLoadingInfo()" theme="info") 信息主题
				PButton(@click="handlePopupLoadingWarning()" theme="warning") 警告主题
				PButton(@click="handlePopupLoadingDanger()" theme="danger") 危险主题
				PButton(@click="handlePopupLoadingCustomTitle()") 自定义标题
				PButton(@click="handlePopupLoadingCustomIconSize()") 自定义图标尺寸
			.title.second Dialog 对话框
			.title.third 基础
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDialog()" type="default") 默认
				PButton(@click="handlePopupDialogCustomComponentProps()") 自定义组件参数
				PButton(@click="handlePopupDialogCustomMaxSize()") 最大尺寸
				PButton(@click="handlePopupDialogCustomMinSize()") 最小尺寸
				PButton(@click="handlePopupDialogCustomTitle()") 自定义标题
				PButton(@click="handlePopupDialogHideHeader()") 隐藏标题栏
				PButton(@click="handlePopupDialogHeaderClose()") 禁用标题栏关闭
				PButton(@click="handlePopupDialogWithoutMaskBlur()") 禁用遮罩模糊
				PButton(@click="handlePopupDialogWithoutMaskClickClose()") 启用遮罩层点击关闭
				PButton(@click="handlePopupDialogDraggable()") 可拖拽
				PButton(@click="handlePopupDialogDraggableOverflow()") 可拖拽溢出屏幕
			.title.third 位置
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
			.title.second 媒体相册
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAlbum()" type="default") 默认
				PButton(@click="handlePopupAlbumDefaultIndex()") 默认下标
				PButton(@click="handlePopupAlbumDisableCount()") 禁用计数器
				PButton(@click="handlePopupAlbumDisableName()") 禁用文件名
				PButton(@click="handlePopupAlbumDisablePureMode()") 禁用纯净模式
				PButton(@click="handlePopupAlbumDisableDownload()") 禁用下载
				PButton(@click="handlePopupAlbumDisableScale()") 禁用缩放
				PButton(@click="handlePopupAlbumDisableDrag()") 禁用拖动
	.row
		.row-item
			.title 按钮单元测试
			.title.second 默认
			PButtonGroup
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 默认 禁用
			PButtonGroup
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
			.title.second 镂空
			PButtonGroup(type="plain")
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 镂空 禁用
			PButtonGroup(type="plain")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
			.title.second 文本
			PButtonGroup(type="text")
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 文本 禁用
			PButtonGroup(type="text")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
			.title.second 链接
			PButtonGroup(cutline type="link")
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 链接 禁用
			PButtonGroup(cutline type="link")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
</template>

<script setup lang="ts">
import { POPUP_ANIMATIONS, usePopup, version } from 'vue-popup-plus'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'
import Demo from '@/views/Demo.vue'
import { defineAsyncComponent } from 'vue'

defineOptions({ name: 'Index' })

const popup = usePopup()

function handleJump(url: string, blank = false) {
	window.open(url, blank ? '_blank' : '_self')
}

function handlePopup() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupWithProps() {
	popup.render({
		// component: Demo,
		component: defineAsyncComponent(() => import('@/views/Demo.vue')),
		// component: () => import('@/views/Demo.vue'),
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
		component: () => import('@/views/Demo.vue'),
		onUnmounted(payload) {
			popup.toast(`关闭弹框时携带的参数：${payload}`, {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithoutMaskBlur() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		maskBlur: false,
	})
}

function handlePopupWithoutMask() {
	popup.render({
		mask: false,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupWithoutMaskClickClose() {
	popup.render({
		maskClickClose: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupFullScreen() {
	popup.render({
		width: '100%',
		height: '100%',
		component: () => import('@/views/DemoFullScreen.vue'),
	})
}

function handlePopupMaxSize() {
	popup.render({
		maxWidth: '200px',
		maxHeight: 200,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupMinSize() {
	popup.render({
		minWidth: 800,
		minHeight: '800px',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupOffset() {
	popup.render({
		viewTranslateX: 100,
		viewTranslateY: -100,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupOffsetLarge() {
	popup.render({
		viewTranslateX: 380,
		viewTranslateY: -380,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupOffsetLargeOverflow() {
	popup.render({
		viewTranslateX: 380,
		viewTranslateY: -380,
		viewTranslateOverflow: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftTop() {
	popup.render({
		placement: 'left-top',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeft() {
	popup.render({
		placement: 'left',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftBottom() {
	popup.render({
		placement: 'left-bottom',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupTop() {
	popup.render({
		placement: 'top',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupCenter() {
	popup.render({
		placement: 'center',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupBottom() {
	popup.render({
		placement: 'bottom',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRightTop() {
	popup.render({
		placement: 'right-top',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRight() {
	popup.render({
		placement: 'right',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRightBottom() {
	popup.render({
		placement: 'right-bottom',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftTopWithOffset() {
	popup.render({
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftTopWithOffsetOverflow() {
	popup.render({
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		viewTranslateOverflow: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRightBottomWithOffset() {
	popup.render({
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		component: () => import('@/views/Demo.vue'),
	})
}
function handlePopupRightBottomWithOffsetOverflow() {
	popup.render({
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		viewTranslateOverflow: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationScale() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationFade() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FADE,
		viewAnimation: POPUP_ANIMATIONS.FADE,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationFly() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FLY_TOP,
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationDuration() {
	popup.render({
		animationDuration: 10000,
		placement: 'left',
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationDurationZero() {
	popup.render({
		animationDuration: 0,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationCustom() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		viewAnimation: POPUP_ANIMATIONS.CUSTOM,
		component: () => import('@/views/Demo.vue'),
	})
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
		'这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。'
	)
}

function handlePopupToastTenSecond() {
	popup.toast('这是一条10秒的toast消息', { duration: 10000 })
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

function handlePopupToastSuccess() {
	popup.toast.success('这是一条成功toast消息')
}

function handlePopupToastInfo() {
	popup.toast.info('这是一条信息toast消息')
}

function handlePopupToastWarning() {
	popup.toast.warning('这是一条警告toast消息')
}

function handlePopupToastDanger() {
	popup.toast.danger('这是一条危险toast消息')
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

function handlePopupAlertWithoutMaskBlur() {
	popup.alert('这是一条确认框消息', { maskBlur: false })
}

function handlePopupAlertDraggable() {
	popup.alert('这是一条确认框消息', { draggable: true })
}

function handlePopupAlertDraggableOverflow() {
	popup.alert('这是一条确认框消息', { draggable: true, dragOverflow: true })
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

async function handlePopupConfirmWithoutMaskBlur() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		maskBlur: false,
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

async function handlePopupPromptWithoutMaskBlur() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		maskBlur: false,
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

function handlePopupLoading() {
	popup.loading()
	window.setTimeout(popup.loading.close, 3000)
}

function handlePopupLoadingPrimary() {
	popup.loading({ theme: 'primary' })
	window.setTimeout(popup.loading.close, 2000)
}

function handlePopupLoadingInfo() {
	popup.loading({ theme: 'info' })
	window.setTimeout(popup.loading.close, 2000)
}

function handlePopupLoadingSuccess() {
	popup.loading({ theme: 'success' })
	window.setTimeout(popup.loading.close, 2000)
}

function handlePopupLoadingWarning() {
	popup.loading({ theme: 'warning' })
	window.setTimeout(popup.loading.close, 2000)
}

function handlePopupLoadingDanger() {
	popup.loading({ theme: 'danger' })
	window.setTimeout(popup.loading.close, 2000)
}

function handlePopupLoadingCustomTitle() {
	popup.loading({ title: '自定义标题' })
	window.setTimeout(popup.loading.close, 2000)
}

function handlePopupLoadingCustomIconSize() {
	popup.loading({ iconSize: 100 })
	window.setTimeout(popup.loading.close, 2000)
}

async function handlePopupDialog() {
	const result = await popup.dialog<string>({
		title: '对话框标题',
		component: () => import('./Demo.vue'),
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomTitle() {
	const result = await popup.dialog({
		title: '自定义标题',
		component: () => import('./Demo.vue'),
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomComponentProps() {
	const result = await popup.dialog({
		title: '自定义组件参数',
		component: () => import('./Demo.vue'),
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
		component: () => import('./Demo.vue'),
		maxWidth: 200,
		maxHeight: '200px',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomMinSize() {
	const result = await popup.dialog({
		title: '最小尺寸为： 800 * 800',
		component: () => import('./Demo.vue'),
		minWidth: 800,
		minHeight: '800px',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogHideHeader() {
	const result = await popup.dialog({
		title: '隐藏标题栏',
		component: () => import('./Demo.vue'),
		header: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogHeaderClose() {
	const result = await popup.dialog({
		title: '禁用标题栏关闭',
		component: () => import('./Demo.vue'),
		headerClose: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithoutMaskBlur() {
	const result = await popup.dialog({
		title: '禁用遮罩模糊',
		component: () => import('./Demo.vue'),
		maskBlur: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithoutMaskClickClose() {
	const result = await popup.dialog({
		title: '启用遮罩层点击关闭',
		component: () => import('./Demo.vue'),
		maskClickClose: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogDraggable() {
	const result = await popup.dialog({
		title: '可拖拽',
		component: () => import('./Demo.vue'),
		draggable: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogDraggableOverflow() {
	const result = await popup.dialog({
		title: '可拖拽溢出屏幕',
		component: () => import('./Demo.vue'),
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeftTop() {
	const result = await popup.dialog({
		title: '左上',
		component: () => import('./Demo.vue'),
		placement: 'left-top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeft() {
	const result = await popup.dialog({
		title: '左侧',
		component: () => import('./Demo.vue'),
		placement: 'left',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeftBottom() {
	const result = await popup.dialog({
		title: '左下',
		component: () => import('./Demo.vue'),
		placement: 'left-bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementTop() {
	const result = await popup.dialog({
		title: '顶部',
		component: () => import('./Demo.vue'),
		placement: 'top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementCenter() {
	const result = await popup.dialog({
		title: '居中',
		component: () => import('./Demo.vue'),
		placement: 'center',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementBottom() {
	const result = await popup.dialog({
		title: '底部',
		component: () => import('./Demo.vue'),
		placement: 'bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRightTop() {
	const result = await popup.dialog({
		title: '右上',
		component: () => import('./Demo.vue'),
		placement: 'right-top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRight() {
	const result = await popup.dialog({
		title: '右侧',
		component: () => import('./Demo.vue'),
		placement: 'right',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRightBottom() {
	const result = await popup.dialog({
		title: '右下',
		component: () => import('./Demo.vue'),
		placement: 'right-bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

function handlePopupAlbum() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
	})
}

function handlePopupAlbumDefaultIndex() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		defaultIndex: 2,
	})
}

function handlePopupAlbumDisableCount() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		disableCounter: true,
	})
}

function handlePopupAlbumDisableName() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		disableName: true,
	})
}

function handlePopupAlbumDisablePureMode() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		disablePure: true,
	})
}

function handlePopupAlbumDisableDownload() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		disableDownload: true,
	})
}

function handlePopupAlbumDisableScale() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		disableScale: true,
	})
}

function handlePopupAlbumDisableDrag() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
		],
		disableDrag: true,
	})
}
</script>

<style lang="stylus" scoped>
.index
	display flex
	flex-direction column
	align-items flex-start
	padding 20px
	gap 20px
	.row
		display flex
		flex-direction row
		justify-content space-between
		gap 20px
		width 100%
		.row-item
			flex 1
			display flex
			flex-direction column
			gap 10px
	.title
		color var(--playground-color-text-main)
		font-weight 700
		font-size 28px
		&.large
			padding 20px 0
			font-size 36px
		&.second
			padding 10px 0
			font-size 20px
		&.third
			font-size 16px
	.links
		display flex
		flex-direction row
		align-items center
		gap 5px
		.label
			font-weight 700
			font-size 16px
	.info
		font-weight 700
		font-size 16px
</style>
