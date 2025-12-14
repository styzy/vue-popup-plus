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
		popup.loading.close() // [!code highlight]
	}, 3000)
}
```

:::

## 关闭加载遮罩 <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

调用 `popup.loading.close()` 方法可以关闭加载遮罩。

```ts
// 关闭加载遮罩
popup.loading.close()
```

在 <DVersion package="plugin" version="1.5.0" /> 以前，`popup.dialog()` 方法的返回值是一个函数，用于关闭弹出层。

```ts
const closeLoading = popup.loading()

// 关闭加载遮罩
closeLoading()
```

## 等待关闭动画结束 <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

`popup.loading.close()` 方法的返回值是一个 `Promise` 对象，用于等待关闭动画结束后继续执行后续代码。

```ts
// 关闭加载遮罩
await popup.loading.close()
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
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeSuccess() {
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeInfo() {
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeWarning() {
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeDanger() {
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loading.close(), 3000)
}
```

:::

## 自定义标题文本

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
	setTimeout(
		popup.loading({
			iconSize: 100, // [!code highlight]
		}),
		3000
	)
}
```

:::

## 详细配置

具体可以参考 [API 控制器实例 popup.loading()](/api/plugin-preset-controller#popup-loading)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleLoading() {
	popup.loading()
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeSuccess(){
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeInfo(){
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeWarning(){
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingThemeDanger(){
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handleLoadingCustomTitle() {
	setTimeout(
		popup.loading({
			title: '自定义标题文本',
		}),
		3000
	)
}

function handleLoadingCustomIconSize() {
	setTimeout(
		popup.loading({
			iconSize: 100,
		}),
		3000
	)
}

</script>
