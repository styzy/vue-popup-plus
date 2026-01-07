# Loading 加载遮罩

一般用于显示 `正在加载中` 的状态，例如复杂数据运算，网络请求等。

:::tip
从 <DVersion package="plugin" version="1.5.0" /> 开始，加载遮罩全局只会同时渲染一个实例，调用 `popup.loading()` 方法时，如果当前已存在加载遮罩，将会将其关闭，然后渲染一个新的加载遮罩。
:::

## 基础使用

调用 `popup.loading()` 方法可以显示一个加载遮罩，全屏显示。

::: demo

```html
<DButton theme="primary" @click="handleLoading">加载遮罩</DButton>
```

```ts
function handleLoading() {
	// 显示加载遮罩
	popup.loading() // [!code highlight]

	// 模拟异步操作
	setTimeout(() => {
		// 关闭加载遮罩
		popup.loadingClose() // [!code highlight]
	}, 3000)
}
```

:::

## 关闭加载遮罩 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

调用 `popup.loadingClose()` 方法可以关闭加载遮罩。

```ts
// 关闭加载遮罩
popup.loadingClose()
```

在 <DVersion package="plugin" version="1.5.0" /> 以前，`popup.loading()` 方法的返回值是一个函数，用于关闭加载遮罩。

```ts
const closeLoading = popup.loading()

// 关闭加载遮罩
closeLoading()
```

::: warning
在 `1.5.x` 版本，关闭对话框的使用方式是：

- `popup.loading.close()`

该方法使用的是静态方法，无法动态同步组件上下文，因此从 `1.6.0` 版本开始被废弃，因此请使用新的关闭加载遮罩方法代替：

- `popup.loadingClose()`

:::

## 等待关闭动画结束 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

`popup.loadingClose()` 方法的返回值是一个 `Promise` 对象，用于等待关闭动画结束后继续执行后续代码。

```ts
// 关闭加载遮罩
await popup.loadingClose()
// 只有加载遮罩关闭动画结束后，才会继续执行后续代码
console.log('加载遮罩关闭后，继续执行后续代码')
```

## 设置主题

可以通过 `theme` 选项来自定义主题，默认值为 `primary`，支持的主题有 `primary`、`info`、`success`、`warning`、`danger`。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleLoading">主要</DButton>
	<DButton theme="success" @click="handleLoadingThemeSuccess">成功</DButton>
	<DButton theme="info" @click="handleLoadingThemeInfo">信息</DButton>
	<DButton theme="warning" @click="handleLoadingThemeWarning">警告</DButton>
	<DButton theme="danger" @click="handleLoadingThemeDanger">危险</DButton>
</DButtonGroup>
```

```ts
function handleLoading() {
	popup.loading()
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeSuccess() {
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeInfo() {
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeWarning() {
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeDanger() {
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 自定义标题文本 <Badge text="1.3.3+" />

> <DVersionSupport package="plugin" version="1.3.3" />

可以通过 `title` 选项来自定义标题文本。

::: demo

```html
<DButton theme="primary" @click="handleLoadingCustomTitle"
	>自定义标题文本</DButton
>
```

```ts
function handleLoadingCustomTitle() {
	setTimeout(
		popup.loading({
			title: '自定义标题文本', // [!code highlight]
		}),
		3000
	)
}
```

:::

## 自定义图标尺寸

可以通过 `iconSize` 选项来自定义图标尺寸，默认值为 `60`。

::: demo

```html
<DButton theme="primary" @click="handleLoadingCustomIconSize"
	>自定义图标尺寸</DButton
>
```

```ts
function handleLoadingCustomIconSize() {
	popup.loading({
		iconSize: 100, // [!code highlight]
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 禁用遮罩层 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

可以通过 `mask` 选项来禁用遮罩层。

::: demo

```html
<DButton theme="primary" @click="handleLoadingDisableMask">禁用遮罩层</DButton>
```

```ts
function handleLoadingDisableMask() {
	popup.loading({
		mask: false, // [!code highlight]
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 启用遮罩层透明效果 <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

可以通过 `maskTransparent` 选项来启用遮罩层的透明效果。

::: demo

```html
<DButton theme="primary" @click="handleLoadingMaskTransparent"
	>启用遮罩层透明效果</DButton
>
```

```ts
function handleLoadingMaskTransparent() {
	popup.loading({
		maskTransparent: true, // [!code highlight]
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 启用遮罩层高斯模糊 <Badge text="1.3.3+" />

> <DVersionSupport package="plugin" version="1.3.3" />

如果需要提升用户对弹出层的关注度，可以通过 `maskBlur` 选项来启用遮罩层的高斯模糊效果。

::: warning
启用遮罩层高斯模糊，对浏览器的渲染性能有一定要求，具体取决于设备性能，请根据实际情况选择是否启用。
:::

::: demo

```html
<DButton theme="primary" @click="handleLoadingMaskBlur"
	>启用遮罩层高斯模糊</DButton
>
```

```ts
function handleLoadingMaskBlur() {
	popup.loading({
		maskBlur: true, // [!code highlight]
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Loading 加载遮罩](/api/plugin-preset/loading)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleLoading() {
	popup.loading()
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeSuccess(){
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeInfo(){
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeWarning(){
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingThemeDanger(){
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingCustomTitle() {
	popup.loading({
		title: '自定义标题文本',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingCustomIconSize() {
	popup.loading({
		iconSize: 100,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingDisableMask() {
	popup.loading({
		mask: false,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingMaskTransparent() {
	popup.loading({
		maskTransparent: true, // [!code highlight]
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handleLoadingMaskBlur() {
	popup.loading({
		maskBlur: true,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

</script>
