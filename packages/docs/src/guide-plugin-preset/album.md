# Album 媒体相册

一般用于展示视频和图片等媒体的预览。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [等待弹出层关闭](/guide-plugin-preset/album#等待弹出层关闭)。
:::

## 基础使用

调用 `album` 方法并传入必填选项 `sources` 即可展示媒体相册，全屏显示。

`sources` 是一个类型为 `Array<string>` 的媒体资源列表。

::: demo

```html
<DButton theme="primary" @click="handleAlbum">媒体相册</DButton>
```

```ts
const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
]

function handleAlbum() {
	popup.album({
		sources, // [!code highlight]
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
		sources,
		defaultIndex: 1, // [!code highlight]
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
		sources,
		disableCounter: true, // [!code highlight]
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
		sources,
		disableName: true, // [!code highlight]
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
		sources,
		disablePure: true, // [!code highlight]
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
		sources,
		disableDownload: true, // [!code highlight]
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
		sources,
		disableScale: true, // [!code highlight]
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
		sources,
		disableDrag: true, // [!code highlight]
	})
}
```

:::

## 启用高斯模糊遮罩层 <Badge text="1.3.0+" />

> <DVersionSupport version="1.3.0+" />

如果需要提升用户对弹出层的关注度，可以通过 `maskBlur` 选项来启用遮罩层的高斯模糊效果。

::: warning
启用高斯模糊遮罩层，对浏览器的渲染性能有一定要求，具体取决于设备性能，请根据实际情况选择是否启用。
:::

::: demo

```html
<DButton theme="primary" @click="handleAlbumMaskBlur"
	>启用高斯模糊遮罩层</DButton
>
```

```ts
function handleAlbumMaskBlur() {
	popup.album({
		sources,
		maskBlur: true, // [!code highlight]
	})
}
```

:::

## 等待弹出层关闭

该方法返回一个 `Promise<void>` 对象，当弹出层关闭后，会执行 `resolve` 方法，因此你可以通过 `await` 来等待弹出层关闭。

::: demo

```html
<DButton theme="primary" @click="handleAlbumWaitClose">等待弹出层关闭</DButton>
```

```ts
async function handleAlbumWaitClose() {
	await popup.album({
		sources,
	})
	popup.toast('弹出层已关闭')
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Album 媒体相册](/api/plugin-preset/album)。

<script lang="ts" setup>
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

function handleAlbum() {
	popup.album({
		sources,
	})
}

function handleAlbumDefaultIndex(){
	popup.album({
		sources,
		defaultIndex: 1,
	})
}

function handleAlbumDisableCounter() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handleAlbumDisableName(){
	popup.album({
		sources,
		disableName: true,
	})
}

function handleAlbumDisablePure() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handleAlbumDisableDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handleAlbumDisableScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handleAlbumDisableDrag() {
	popup.album({
		sources,
		disableDrag: true,
	})
}

function handleAlbumMaskBlur() {
	popup.album({
		sources,
		maskBlur: true,
	})
}

async function handleAlbumWaitClose() {
	await popup.album({
		sources,
	})
	popup.toast('弹出层已关闭')
}
</script>
