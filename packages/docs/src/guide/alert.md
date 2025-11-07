# 提示 Alert

一般用于弹出用户 `需要关注` 的提示信息，例如关键信息、重要文本等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [等待弹出层关闭](/guide/alert#等待弹出层关闭)。
:::

## 基础使用

调用 `alert` 方法可以弹出一个提示框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleAlert">提示</DButton>
```

```ts
function handleAlert() {
	popup.alert('这是一条提示信息')
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
		title: '自定义标题',
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
		headerClose: false,
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
		confirmText: '自定义确认按钮文本',
	})
}
```

:::

## 禁用遮罩层高斯模糊

为了提升用户关注度，该弹出层使用了 `高斯模糊` 背景遮罩，可以通过 `maskBlur` 选项来禁用遮罩层的高斯模糊效果。

::: demo

```html
<DButton theme="primary" @click="handleAlertMaskBlur"
	>禁用遮罩层高斯模糊</DButton
>
```

```ts
function handleAlertMaskBlur() {
	popup.alert('这是一条提示信息', {
		maskBlur: false,
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
		draggable: true,
	})
}

function handleAlertDraggableOverflow() {
	popup.alert('这是一条提示信息', {
		draggable: true,
		dragOverflow: true,
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

具体可以查看 [API popup.alert()](/api/alert)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

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

function handleAlertMaskBlur() {
	popup.alert('这是一条提示信息', {
		maskBlur: false,
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

async function handleAlertWaitClose() {
	await popup.alert('这是一条提示信息')
	popup.toast('弹出层已关闭')
}
</script>
