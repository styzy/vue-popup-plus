# Prompt 提示输入 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPrompt" type="default">提示输入</DButton>
	<DButton @click="handlePopupPromptWithResult">获取用户输入结果</DButton>
</DButtonGroup>
```

```ts
function handlePopupPrompt() {
	popup.prompt('这是一条提示输入消息')
}

async function handlePopupPromptWithResult() {
	const result = await popup.prompt('这是一条提示输入消息')

	if (result !== undefined) {
		popup.toastSuccess(`用户输入了：${result}`)
	} else {
		popup.toastWarning('用户取消了输入')
	}
}
```

:::

## 输入框

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithDefaultValue">使用默认值</DButton>
	<DButton @click="handlePopupPromptWithPlaceholder">自定义占位文本</DButton>
</DButtonGroup>
```

```ts
function handlePopupPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '123456',
	})
}

function handlePopupPromptWithPlaceholder() {
	popup.prompt('这是一条提示输入消息', {
		placeholder: '自定义占位文本',
	})
}
```

:::

## 文本域

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithTextarea">文本域类型</DButton>
</DButtonGroup>
```

```ts
function handlePopupPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}
```

:::

## 标题栏

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupPromptWithHeaderClose"
		>禁用标题关闭按钮</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
	})
}

function handlePopupPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headClose: false,
	})
}
```

:::

## 底部按钮

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopupPromptWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithCustomConfirmText() {
	popup.prompt('这是一条提示输入消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupPromptWithCustomCancelText() {
	popup.prompt('这是一条提示输入消息', {
		cancelText: '自定义取消按钮文本',
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithMaskBlur" theme="warning"
		>启用遮罩高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: true,
	})
}
```

:::

## 交互

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupPromptWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithDraggable() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
	})
}

function handlePopupPromptWithDragOverflow() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Prompt 提示输入](/guide-plugin-preset/prompt)

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupPrompt() {
	popup.prompt('这是一条提示输入消息')
}

async function handlePopupPromptWithResult() {
	const result = await popup.prompt('这是一条提示输入消息')

	if (result !== undefined) {
		popup.toastSuccess(`用户输入了：${result}`)
	} else {
		popup.toastWarning('用户取消了输入')
	}
}

function handlePopupPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '123456',
	})
}

function handlePopupPromptWithPlaceholder() {
	popup.prompt('这是一条提示输入消息', {
		placeholder: '自定义占位文本',
	})
}

function handlePopupPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}

function handlePopupPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
	})
}

function handlePopupPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headerClose: false,
	})
}

function handlePopupPromptWithCustomConfirmText() {
	popup.prompt('这是一条提示输入消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupPromptWithCustomCancelText() {
	popup.prompt('这是一条提示输入消息', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePopupPromptWithMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: true,
	})
}

function handlePopupPromptWithDraggable() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
	})
}

function handlePopupPromptWithDragOverflow() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
		dragOverflow: true,
	})
}
</script>
