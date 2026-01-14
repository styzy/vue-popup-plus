# Confirm 确认 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirm" type="default">确认</DButton>
	<DButton @click="handlePopupConfirmWithResult">获取用户确认结果</DButton>
</DButtonGroup>
```

```ts
function handlePopupConfirm() {
	popup.confirm('这是一条确认消息')
}

async function handlePopupConfirmWithResult() {
	const result = await popup.confirm('这是一条确认消息')

	if (result) {
		popup.toastSuccess('用户点击了确认')
	} else {
		popup.toastWarning('用户点击了取消')
	}
}
```

:::

## 标题栏

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirmWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupConfirmWithHeaderClose"
		>启用标题关闭按钮</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupConfirmWithCustomTitle() {
	popup.confirm('这是一条确认消息', {
		title: '自定义标题',
	})
}

function handlePopupConfirmWithHeaderClose() {
	popup.confirm('这是一条确认消息', {
		headClose: false,
	})
}
```

:::

## 底部按钮

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirmWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopupConfirmWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupConfirmWithCustomConfirmText() {
	popup.confirm('这是一条确认消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupConfirmWithCustomCancelText() {
	popup.confirm('这是一条确认消息', {
		cancelText: '自定义取消按钮文本',
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirmWithMaskBlur" theme="warning"
		>启用遮罩高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupConfirmWithMaskBlur() {
	popup.confirm('这是一条确认消息', {
		maskBlur: true,
	})
}
```

:::

## 交互

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirmWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupConfirmWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupConfirmWithDraggable() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
	})
}

function handlePopupConfirmWithDragOverflow() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Confirm 确认](/guide-plugin-preset/confirm)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupConfirm() {
	popup.confirm('这是一条确认消息')
}

async function handlePopupConfirmWithResult() {
	const result = await popup.confirm('这是一条确认消息')

	if (result) {
		popup.toastSuccess('用户点击了确认')
	} else {
		popup.toastWarning('用户点击了取消')
	}
}

function handlePopupConfirmWithCustomTitle() {
	popup.confirm('这是一条确认消息', {
		title: '自定义标题',
	})
}

function handlePopupConfirmWithHeaderClose() {
	popup.confirm('这是一条确认消息', {
		headerClose: true,
	})
}

function handlePopupConfirmWithCustomConfirmText() {
	popup.confirm('这是一条确认消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupConfirmWithCustomCancelText() {
	popup.confirm('这是一条确认消息', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePopupConfirmWithMaskBlur() {
	popup.confirm('这是一条确认消息', {
		maskBlur: true,
	})
}

function handlePopupConfirmWithDraggable() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
	})
}

function handlePopupConfirmWithDragOverflow() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
		dragOverflow: true,
	})
}
</script>
