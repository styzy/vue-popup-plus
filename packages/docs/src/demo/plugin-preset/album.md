---
outline: 2
---

# Album 媒体相册 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbum" type="default">媒体相册</DButton>
	<DButton @click="handlePopupAlbumWithDefaultIndex">设置默认索引</DButton>
</DButtonGroup>
```

```ts
const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
]

function handlePopupAlbum() {
	popup.album({
		sources,
	})
}

function handlePopupAlbumWithDefaultIndex() {
	popup.album({
		sources,
		defaultIndex: 1,
	})
}
```

:::

## 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutCounter">禁用计数器</DButton>
	<DButton @click="handlePopupAlbumWithoutName">禁用媒体名称</DButton>
	<DButton @click="handlePopupAlbumWithoutPure">禁用纯净预览</DButton>
	<DButton @click="handlePopupAlbumWithoutDownload">禁用下载功能</DButton>
	<DButton @click="handlePopupAlbumWithoutScale">禁用缩放功能</DButton>
	<DButton @click="handlePopupAlbumWithoutDrag">禁用拖动功能</DButton>
	<DButton @click="handlePopupAlbumWithMaskBlur" theme="warning"
		>启用遮罩高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupWithoutCounter() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handlePopupWithoutName() {
	popup.album({
		sources,
		disableName: true,
	})
}

function handlePopupWithoutPure() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handlePopupWithoutDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handlePopupWithoutScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handlePopupWithoutDrag() {
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
```

:::

## 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutMaskBlur">禁用遮罩高斯模糊</DButton>
</DButtonGroup>
```

```ts
function handlePopupAlbumWithoutMaskBlur() {
	popup.album({
		sources,
		maskBlur: false,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Album 媒体相册](/guide-plugin-preset/album)

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
]

function handlePopupAlbum() {
	popup.album({
		sources,
	})
}

function handlePopupAlbumWithDefaultIndex() {
	popup.album({
		sources,
		defaultIndex: 1,
	})
}

function handlePopupAlbumWithoutCounter() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handlePopupAlbumWithoutName() {
	popup.album({
		sources,
		disableName: true,
	})
}

function handlePopupAlbumWithoutPure() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handlePopupAlbumWithoutDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handlePopupAlbumWithoutScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handlePopupAlbumWithoutDrag() {
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
</script>
