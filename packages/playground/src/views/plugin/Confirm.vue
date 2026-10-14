<template lang="pug">
GContainer
	GTitle Confirm 确认
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupConfirm()" type="fill") 默认
		PButton(@click="handlePopupConfirmCustomTitle()") 自定义标题
		PButton(@click="handlePopupConfirmHeaderClose()") 启用标题栏关闭
		PButton(@click="handlePopupConfirmCustomConfirmButtonText()" theme="primary") 自定义确认按钮文本
		PButton(@click="handlePopupConfirmCustomCancelButtonText()" theme="primary") 自定义取消按钮文本
		PButton(@click="handlePopupConfirmDraggable()") 可拖拽
		PButton(@click="handlePopupConfirmDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupConfirmWithMaskBlur()") 启用遮罩模糊
	GTitle(second) 主题
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupConfirmThemePrimary()" theme="primary") 主要主题
		PButton(@click="handlePopupConfirmThemeSuccess()" theme="success") 成功主题
		PButton(@click="handlePopupConfirmThemeInfo()" theme="info") 信息主题
		PButton(@click="handlePopupConfirmThemeWarning()" theme="warning") 警告主题
		PButton(@click="handlePopupConfirmThemeDanger()" theme="danger") 危险主题
	GTitle(second) 键盘快捷键
	PButtonGroup(theme="primary" tight)
		PButton(@click="handlePopupConfirmKeyboardDisableAll()") 禁用全部
		PButton(@click="handlePopupConfirmKeyboardDisableConfirm()") 禁用确认
		PButton(@click="handlePopupConfirmKeyboardDisableClose()") 禁用关闭
</template>

<script lang="ts" setup>
import { computed, inject, type ComputedRef } from 'vue'
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

const viewport = inject<ComputedRef<HTMLDivElement | null>>('viewport')!

const sharedOptions = computed(() => ({
	viewport: viewport.value,
}))

async function handlePopupConfirm() {
	const isConfirm = await popup.confirm(
		'这是一条确认消息',
		sharedOptions.value
	)
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomTitle() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		title: '自定义标题',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmHeaderClose() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		headerClose: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomConfirmButtonText() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		confirmText: '自定义确认按钮文本',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomCancelButtonText() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		cancelText: '自定义取消按钮文本',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmDraggable() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		draggable: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmDraggableOverflow() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
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
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		maskBlur: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmThemePrimary() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		theme: 'primary',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmThemeSuccess() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		theme: 'success',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmThemeInfo() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		theme: 'info',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmThemeWarning() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		theme: 'warning',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmThemeDanger() {
	const isConfirm = await popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		theme: 'danger',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmKeyboardDisableAll() {
	popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		keyboard: false,
	})
}

async function handlePopupConfirmKeyboardDisableConfirm() {
	popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		keyboard: {
			confirm: false,
		},
	})
}

async function handlePopupConfirmKeyboardDisableClose() {
	popup.confirm('这是一条确认消息', {
		...sharedOptions.value,
		keyboard: {
			close: false,
		},
	})
}
</script>
