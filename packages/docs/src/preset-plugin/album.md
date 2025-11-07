# Album 媒体相册

一般用于展示视频和图片等媒体的预览。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [等待弹出层关闭](/guide/album#等待弹出层关闭)。
:::

## 基础使用

调用 `album` 方法并传入必填选项 `sources` 即可展示媒体相册，全屏显示。

`sources` 是一个类型为 `Array<string>` 的媒体资源列表。

::: demo

```html
<DButton theme="primary" @click="handleAlbum">媒体相册</DButton>
```

```ts{2}
function handleAlbum() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 设置默认索引

可以通过 `defaultIndex` 选项来设置默认选中的索引。

::: demo

```html
<DButton theme="primary" @click="handleAlbumDefaultIndex">设置默认索引</DButton>
```

```ts
function handleAlbumDefaultIndex(){
		defaultIndex: 1, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
}
```

:::

## 禁用计数器

可以通过 `disableCounter` 选项来禁用计数器。

::: demo

```html
<DButton theme="primary" @click="handleAlbumDisableCounter">禁用计数器</DButton>
```

```ts
function handleAlbumDisableCounter() {
	popup.album({
		disableCounter: true, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 禁用名称

可以通过 `disableName` 选项来禁用名称。

::: demo

```html
<DButton theme="primary" @click="handleAlbumDisableName">禁用名称</DButton>
```

```ts
function handleAlbumDisableName() {
	popup.album({
		disableName: true, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 禁用纯净预览

可以通过 `disablePure` 选项来禁用纯净预览。

::: demo

```html
<DButton theme="primary" @click="handleAlbumDisablePure">禁用纯净预览</DButton>
```

```ts
function handleAlbumDisablePure() {
	popup.album({
		disablePure: true, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 禁用下载

可以通过 `disableDownload` 选项来禁用下载。

::: tip
下载功能仅在资源地址 `支持跨域` 时生效。
:::

::: demo

```html
<DButton theme="primary" @click="handleAlbumDisableDownload">禁用下载</DButton>
```

```ts
function handleAlbumDisableDownload() {
	popup.album({
		disableDownload: true, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 禁用缩放

可以通过 `disableScale` 选项来禁用缩放。

::: demo

```html
<DButton theme="primary" @click="handleAlbumDisableScale">禁用缩放</DButton>
```

```ts
function handleAlbumDisableScale() {
	popup.album({
		disableScale: true, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 禁用拖拽

可以通过 `disableDrag` 选项来禁用拖拽。

::: demo

```html
<DButton theme="primary" @click="handleAlbumDisableDrag">禁用拖拽</DButton>
```

```ts
function handleAlbumDisableDrag() {
	popup.album({
		disableDrag: true, // [!code highlight]
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
```

:::

## 详细配置

具体可以查看 [API popup.album()](/api/album)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleAlbum() {
	popup.album({
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDefaultIndex(){
	popup.album({
		defaultIndex: 1,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDisableCounter() {
	popup.album({
		disableCounter: true,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDisableName(){
	popup.album({
		disableName: true,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDisablePure() {
	popup.album({
		disablePure: true,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDisableDownload() {
	popup.album({
		disableDownload: true,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDisableScale() {
	popup.album({
		disableScale: true,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}

function handleAlbumDisableDrag() {
	popup.album({
		disableDrag: true,
		sources: [
			'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
			'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
			'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
		],
	})
}
</script>
