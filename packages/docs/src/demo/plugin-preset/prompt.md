---
outline: 2
---

# Prompt 提示输入 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPrompt" type="default">提示输入</DButton>
	<DButton @click="handlePopupPromptWithDefaultValue">默认值</DButton>
	<DButton @click="handlePopupPromptWithTextarea">文本域类型</DButton>
	<DButton @click="handlePopupPromptWithResult">获取用户输入结果</DButton>
</DButtonGroup>
```

```ts
function handlePopupPrompt() {
	popup.prompt('这是一条提示输入消息')
}

function handlePopupPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '这是默认值',
	})
}

function handlePopupPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
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

## 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupPromptWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopupPromptWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
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
```

:::

## 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithHeaderClose"
		>禁用标题关闭按钮</DButton
	>
	<DButton @click="handlePopupPromptWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
	<DButton @click="handlePopupPromptWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupPromptWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headClose: false,
	})
}

function handlePopupPromptWithoutMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: false,
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

function handlePopupPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '这是默认值',
	})
}

function handlePopupPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}

async function handlePopupPromptWithResult() {
	const result = await popup.prompt('这是一条提示输入消息')

	if (result !== undefined) {
		popup.toastSuccess(`用户输入了：${result}`)
	} else {
		popup.toastWarning('用户取消了输入')
	}
}

function handlePopupPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
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

function handlePopupPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headerClose: false,
	})
}

function handlePopupPromptWithoutMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: false,
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
