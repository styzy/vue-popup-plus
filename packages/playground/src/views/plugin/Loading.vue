<template lang="pug">
GContainer
	GTitle Loading 加载遮罩
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupLoading()" theme="primary" type="fill") 默认
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
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

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
</script>
