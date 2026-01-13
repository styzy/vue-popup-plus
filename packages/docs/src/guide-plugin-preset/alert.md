# Alert 提示

一般用于提示用户 `需要关注` 的信息，例如关键信息、重要文本等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [等待弹出层关闭](/guide-plugin-preset/alert#等待弹出层关闭)。
:::

## 基础使用

调用 `alert` 方法并传入一段文本可以弹出一个提示框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleAlert">提示</DButton>
```

```ts
function handleAlert() {
	popup.alert('这是一条提示信息') // [!code highlight]
}
```

:::

## 自定义标题文本

可以通过 `title` 选项来自定义提示框的标题文本。

::: demo

```html
<DButton theme="primary" @click="handleAlertCustomTitle">自定义标题</DButton>
```

```ts
function handleAlertCustomTitle() {
	popup.alert('这是一条提示信息', {
		title: '自定义标题', // [!code highlight]
	})
}
```

:::

## 禁用标题栏关闭按钮

可以通过 `headerClose` 选项来禁用标题栏的关闭按钮。

::: demo

```html
<DButton theme="primary" @click="handleAlertHeaderClose"
	>禁用标题栏关闭按钮</DButton
>
```

```ts
function handleAlertHeaderClose() {
	popup.alert('这是一条提示信息', {
		headerClose: false, // [!code highlight]
	})
}
```

:::

## 自定义确认按钮文本

可以通过 `confirmText` 选项来自定义确认按钮的文本。

::: demo

```html
<DButton theme="primary" @click="handleAlertConfirmText"
	>自定义确认按钮文本</DButton
>
```

```ts
function handleAlertConfirmText() {
	popup.alert('这是一条提示信息', {
		confirmText: '自定义确认按钮文本', // [!code highlight]
	})
}
```

:::

## 启用窗口拖拽功能

可以通过 `draggable` 选项来启用窗口的拖拽功能，开启后允许拖拽标题栏从而实现窗口的移动。

默认情况下，拖拽时无法超出屏幕范围，可通过 `dragOverflow` 选项来设置是否允许超出。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleAlertDraggable"
		>启用窗口拖拽功能</DButton
	>
	<DButton theme="primary" @click="handleAlertDraggableOverflow"
		>启用窗口拖拽功能并允许超出屏幕范围</DButton
	>
</DButtonGroup>
```

```ts
function handleAlertDraggable() {
	popup.alert('这是一条提示信息', {
		draggable: true, // [!code highlight]
	})
}

function handleAlertDraggableOverflow() {
	popup.alert('这是一条提示信息', {
		draggable: true,
		dragOverflow: true, // [!code highlight]
	})
}
```

:::

## 启用高斯模糊遮罩层 <Badge text="1.3.0+" />

> <DVersionSupport package="plugin" version="1.3.0" />

如果需要提升用户对弹出层的关注度，可以通过 `maskBlur` 选项来启用遮罩层的高斯模糊效果。

::: warning
启用高斯模糊遮罩层，对浏览器的渲染性能有一定要求，具体取决于设备性能，请根据实际情况选择是否启用。
:::

::: demo

```html
<DButton theme="primary" @click="handleAlertMaskBlur"
	>启用高斯模糊遮罩层</DButton
>
```

```ts
function handleAlertMaskBlur() {
	popup.alert('这是一条提示信息', {
		maskBlur: true, // [!code highlight]
	})
}
```

:::

## 等待弹出层关闭

该方法返回一个 `Promise<void>` 对象，当弹出层关闭后，会执行 `resolve` 方法，因此你可以通过 `await` 来等待弹出层关闭。

::: demo

```html
<DButton theme="primary" @click="handleAlertWaitClose">等待弹出层关闭</DButton>
```

```ts
async function handleAlertWaitClose() {
	await popup.alert('这是一条提示信息')
	popup.toast('弹出层已关闭')
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Alert 提示](/api/plugin-preset/alert)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleAlert() {
	popup.alert('这是一条提示信息')
}

function handleAlertCustomTitle() {
	popup.alert('这是一条提示信息', {
		title: '自定义标题',
	})
}

function handleAlertHeaderClose() {
	popup.alert('这是一条提示信息', {
		headerClose: false,
	})
}

function handleAlertConfirmText() {
	popup.alert('这是一条提示信息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handleAlertDraggable() {
	popup.alert('这是一条提示信息', {
		draggable: true,
	})
}

function handleAlertDraggableOverflow() {
	popup.alert('这是一条提示信息', {
		draggable: true,
		dragOverflow: true,
	})
}

function handleAlertMaskBlur() {
	popup.alert('这是一条提示信息', {
		maskBlur: true,
	})
}

async function handleAlertWaitClose() {
	await popup.alert('这是一条提示信息')
	popup.toast('弹出层已关闭')
}
</script>
