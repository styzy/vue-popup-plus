# Alert 提示 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlert" type="default">提示</DButton>
	<DButton @click="handlePopupAlertWaitClose">等待关闭</DButton>
</DButtonGroup>
```

```ts
function handlePopupAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopupAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')
	popup.toast('提示已关闭')
}
```

:::

## 标题栏

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlertWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupAlertWithHeaderClose">禁用标题关闭按钮</DButton>
</DButtonGroup>
```

```ts
function handlePopupAlertWithCustomTitle() {
	popup.alert('这是一条提示消息', {
		title: '自定义标题',
	})
}

function handlePopupAlertWithHeaderClose() {
	popup.alert('这是一条提示消息', {
		headClose: false,
	})
}
```

:::

## 底部按钮

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlertWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupAlertWithCustomConfirmText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlertWithMaskBlur" theme="warning"
		>启用遮罩高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupAlertWithMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: true,
	})
}
```

:::

## 交互

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlertWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupAlertWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupAlertWithDraggable() {
	popup.alert('这是一条提示消息', {
		draggable: true,
	})
}

function handlePopupAlertWithDragOverflow() {
	popup.alert('这是一条提示消息', {
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopupAlertWithMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: true,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Alert 提示](/guide-plugin-preset/alert)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopupAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')
	popup.toast('提示已关闭')
}

function handlePopupAlertWithCustomTitle() {
	popup.alert('这是一条提示消息', {
		title: '自定义标题',
	})
}

function handlePopupAlertWithHeaderClose() {
	popup.alert('这是一条提示消息', {
		headerClose: false,
	})
}

function handlePopupAlertWithCustomConfirmText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupAlertWithMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: true,
	})
}

function handlePopupAlertWithDraggable() {
	popup.alert('这是一条提示消息', {
		draggable: true,
	})
}

function handlePopupAlertWithDragOverflow() {
	popup.alert('这是一条提示消息', {
		draggable: true,
		dragOverflow: true,
	})
}
</script>
