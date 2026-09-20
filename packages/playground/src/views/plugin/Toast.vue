<template lang="pug">
GContainer
	GTitle Toast 轻量提示
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupToast()" type="fill") 默认
		PButton(@click="handlePopupToastLong()") 长文本
		PButton(@click="handlePopupToastTenSecond()") 持续 10 秒
		PButton(@click="handlePopupToastZeroSecond()") 持续 0 秒(常显)
		PButton(@click="handlePopupToastShowClose()") 显示关闭按钮
		PButton(@click="handlePopupToastHoverWait()") 禁用悬停等待
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupToastPlacementLeftTop()") 左上
		PButton(@click="handlePopupToastPlacementLeft()") 左侧
		PButton(@click="handlePopupToastPlacementLeftBottom()") 左下
		PButton(@click="handlePopupToastPlacementTop()") 顶部
		PButton(@click="handlePopupToastPlacementCenter()") 居中
		PButton(@click="handlePopupToastPlacementBottom()") 底部
		PButton(@click="handlePopupToastPlacementRightTop()") 右上
		PButton(@click="handlePopupToastPlacementRight()") 右侧
		PButton(@click="handlePopupToastPlacementRightBottom()") 右下
	GTitle(second) 主题
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupToastThemePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupToastThemeSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupToastThemeInfo()" theme="info") 信息主题
		PButton(@click="handlePopupToastThemeWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupToastThemeDanger()" theme="danger") 危险主题
	GTitle(second) 主题快捷方法
	PButtonGroup(theme="primary" tight type="fill")
		PButton(@click="handlePopupToastPrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupToastSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupToastInfo()" theme="info") 信息主题
		PButton(@click="handlePopupToastWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupToastDanger()" theme="danger") 危险主题
</template>

<script lang="ts" setup>
import { computed, inject, type ComputedRef } from 'vue'
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

const viewport = inject<ComputedRef<HTMLDivElement | null>>('viewport')!

const sharedOptions = computed(() => ({
	viewport: viewport.value,
}))

function handlePopupToast() {
	popup.toast('这是一条toast消息', sharedOptions.value)
}

function handlePopupToastThemePrimary() {
	popup.toast('这是一条主要toast消息', {
		...sharedOptions.value,
		theme: 'primary',
	})
}

function handlePopupToastThemeInfo() {
	popup.toast('这是一条信息toast消息', {
		...sharedOptions.value,
		theme: 'info',
	})
}

function handlePopupToastThemeSuccess() {
	popup.toast('这是一条成功toast消息', {
		...sharedOptions.value,
		theme: 'success',
	})
}

function handlePopupToastThemeWarning() {
	popup.toast('这是一条警告toast消息', {
		...sharedOptions.value,
		theme: 'warning',
	})
}

function handlePopupToastThemeDanger() {
	popup.toast('这是一条危险toast消息', {
		...sharedOptions.value,
		theme: 'danger',
	})
}

function handlePopupToastLong() {
	popup.toast(
		'这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。',
		{
			...sharedOptions.value,
		}
	)
}

function handlePopupToastTenSecond() {
	popup.toast('这是一条10秒的toast消息', {
		...sharedOptions.value,
		duration: 10000,
	})
}

function handlePopupToastZeroSecond() {
	popup.toastSuccess('这是一条0秒的toast消息', {
		...sharedOptions.value,
		duration: 0,
	})
}

function handlePopupToastShowClose() {
	popup.toast('这是一条显示关闭按钮的toast消息', {
		...sharedOptions.value,
		showClose: true,
	})
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用悬停等待的toast消息', {
		...sharedOptions.value,
		hoverWait: false,
	})
}

function handlePopupToastPlacementLeftTop() {
	popup.toast('这是一条左上toast消息', {
		...sharedOptions.value,
		placement: 'left-top',
	})
}

function handlePopupToastPlacementLeft() {
	popup.toast('这是一条左侧toast消息', {
		...sharedOptions.value,
		placement: 'left',
	})
}

function handlePopupToastPlacementLeftBottom() {
	popup.toast('这是一条左下toast消息', {
		...sharedOptions.value,
		placement: 'left-bottom',
	})
}

function handlePopupToastPlacementTop() {
	popup.toast('这是一条顶部toast消息', {
		...sharedOptions.value,
		placement: 'top',
	})
}

function handlePopupToastPlacementCenter() {
	popup.toast('这是一条居中toast消息', {
		...sharedOptions.value,
		placement: 'center',
	})
}

function handlePopupToastPlacementBottom() {
	popup.toast('这是一条底部toast消息', {
		...sharedOptions.value,
		placement: 'bottom',
	})
}

function handlePopupToastPlacementRightTop() {
	popup.toast('这是一条右上toast消息', {
		...sharedOptions.value,
		placement: 'right-top',
	})
}

function handlePopupToastPlacementRight() {
	popup.toast('这是一条右侧toast消息', {
		...sharedOptions.value,
		placement: 'right',
	})
}

function handlePopupToastPlacementRightBottom() {
	popup.toast('这是一条右下toast消息', {
		...sharedOptions.value,
		placement: 'right-bottom',
	})
}

function handlePopupToastPrimary() {
	popup.toastPrimary('这是一条主要toast消息', { ...sharedOptions.value })
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功toast消息', { ...sharedOptions.value })
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息toast消息', { ...sharedOptions.value })
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告toast消息', { ...sharedOptions.value })
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险toast消息', { ...sharedOptions.value })
}
</script>
