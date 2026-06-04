<template lang="pug">
GContainer
	GTitle Album 媒体相册
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupAlbum()" type="fill") 默认
		PButton(@click="handlePopupAlbumDefaultIndex()") 默认下标
		PButton(@click="handlePopupAlbumDisableCount()") 禁用计数器
		PButton(@click="handlePopupAlbumDisableName()") 禁用文件名
		PButton(@click="handlePopupAlbumDisablePureMode()") 禁用纯净模式
		PButton(@click="handlePopupAlbumDisableDownload()") 禁用下载
		PButton(@click="handlePopupAlbumDisableScale()") 禁用缩放
		PButton(@click="handlePopupAlbumDisableDrag()") 禁用拖动
		PButton(@click="handlePopupAlbumWithMaskBlur()") 启用遮罩模糊
		PButton(@click="handlePopupAlbumDisableLoop()") 禁用循环
		PButton(@click="handlePopupAlbumDisableRotate()") 禁用旋转
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
	{
		url: 'https://minio.carzplt.com:8085/acip-dev/20260112/5b6fd0b420954c83990aea3fe3719f26.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=MkWhlye9R97QR5OY1yQw%2F20260319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260319T062616Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=03898e0254f39c2c0fb1077a5096621c3cf7af13133961d9353c1a9b905345ac',
		type: 'video',
	} as const,
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
