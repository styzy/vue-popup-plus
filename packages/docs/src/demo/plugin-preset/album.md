# Album 媒体相册 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

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

## 计数器

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutCounter">禁用计数器</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutCounter() {
	popup.album({
		sources,
		disableCounter: true,
	})
}
```

:::

## 媒体名称

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutName">禁用媒体名称</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutName() {
	popup.album({
		sources,
		disableName: true,
	})
}
```

:::

## 纯净模式

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutPure">禁用纯净模式</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutPure() {
	popup.album({
		sources,
		disablePure: true,
	})
}
```

:::

## 下载

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutDownload">禁用下载功能</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}
```

:::

## 缩放

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutScale">禁用缩放功能</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}
```

:::

## 拖拽

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutDrag">禁用拖拽功能</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutDrag() {
	popup.album({
		sources,
		disableDrag: true,
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithMaskBlur" theme="warning"
		>启用高斯模糊遮罩层</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupAlbumWithMaskBlur() {
	popup.album({
		sources,
		maskBlur: true,
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
