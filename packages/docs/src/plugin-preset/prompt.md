# Prompt 提示输入

一般用于获取用户输入，例如用户名、密码等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [获取用户输入结果](/guide/prompt#获取用户输入结果)。
:::

## 基础使用

调用 `prompt` 方法并传入一段文本可以弹出一个提示输入框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handlePrompt">提示输入</DButton>
```

```ts
function handlePrompt() {
	popup.prompt('请输入您的姓名') // [!code highlight]
}
```

:::

## 获取用户输入结果

该方法返回一个 `Promise<string | void>` 对象，当用户点击确认按钮时，会执行 `resolve` 方法并传入用户输入的文本，当用户点击取消按钮时，会执行 `resolve` 方法并传入 `undefined`，因此可以通过 `await` 来获取用户输入结果。

::: demo

```html
<DButton theme="primary" @click="handlePromptResult">获取输入结果</DButton>
```

```ts
async function handlePromptResult() {
	const name = await popup.prompt('请输入您的姓名') // [!code highlight]
	if (name === undefined) {
		popup.toast('用户取消输入', {
			theme: 'danger',
		})
	} else {
		popup.toast('用户输入的是：' + name, {
			theme: 'success',
		})
	}
}
```

:::

## 设置默认值

可以通过 `defaultValue` 选项来设置默认值。

::: demo

```html
<DButton theme="primary" @click="handlePromptDefaultValue">设置默认值</DButton>
```

```ts
function handlePromptDefaultValue() {
	popup.prompt('请输入您的姓名', {
		defaultValue: '这是默认值', // [!code highlight]
	})
}
```

:::

## 输入框类型

可以通过 `type` 选项来设置输入框的类型，可选类型包括：`input` 、 `textarea` ，默认值为 `input`。

::: demo

```html
<DButton theme="primary" @click="handlePromptTextarea">文本域类型</DButton>
```

```ts
function handlePromptTextarea() {
	popup.prompt('请输入您的姓名', {
		type: 'textarea', // [!code highlight]
	})
}
```

:::

## 最大输入长度

可以通过 `maxLength` 选项来设置输入框的最大输入长度，默认不限制输入长度。

::: demo

```html
<DButton theme="primary" @click="handlePromptMaxLength">最大输入长度10</DButton>
```

```ts
function handlePromptMaxLength() {
	popup.prompt('请输入您的姓名', {
		maxLength: 10, // [!code highlight]
	})
}
```

:::

## 设置输入框占位符

可以通过 `placeholder` 选项来设置输入框的占位符。

::: demo

```html
<DButton theme="primary" @click="handlePromptPlaceholder">设置占位符</DButton>
```

```ts
function handlePromptPlaceholder() {
	popup.prompt('请输入您的姓名', {
		placeholder: '请输入姓名', // [!code highlight]
	})
}
```

:::

## 自定义标题文本

可以通过 `title` 选项来自定义提示输入框的标题文本。

::: demo

```html
<DButton theme="primary" @click="handlePromptCustomTitle">提示输入</DButton>
```

```ts
function handlePromptCustomTitle() {
	popup.prompt('请输入您的姓名', {
		title: '自定义标题', // [!code highlight]
	})
}
```

:::

## 禁用标题栏关闭按钮

可以通过 `headerClose` 选项来禁用标题栏的关闭按钮。

::: demo

```html
<DButton theme="primary" @click="handlePromptHeaderClose"
	>禁用标题栏关闭按钮</DButton
>
```

```ts
function handlePromptHeaderClose() {
	popup.prompt('请输入您的姓名', {
		headerClose: false, // [!code highlight]
	})
}
```

:::

## 自定义确认按钮文本

可以通过 `confirmText` 选项来自定义确认按钮的文本。

::: demo

```html
<DButton theme="primary" @click="handlePromptConfirmText"
	>自定义确认按钮文本</DButton
>
```

```ts
function handlePromptConfirmText() {
	popup.prompt('请输入您的姓名', {
		confirmText: '自定义确认按钮文本', // [!code highlight]
	})
}
```

:::

## 自定义取消按钮文本

可以通过 `cancelText` 选项来自定义取消按钮的文本。

::: demo

```html
<DButton theme="primary" @click="handlePromptCancelText"
	>自定义取消按钮文本</DButton
>
```

```ts
function handlePromptCancelText() {
	popup.prompt('请输入您的姓名', {
		cancelText: '自定义取消按钮文本', // [!code highlight]
	})
}
```

:::

## 禁用遮罩层高斯模糊

为了提升用户关注度，该弹出层使用了 `高斯模糊` 背景遮罩，可以通过 `maskBlur` 选项来禁用遮罩层的高斯模糊效果。

::: demo

```html
<DButton theme="primary" @click="handlePromptMaskBlur"
	>禁用遮罩层高斯模糊</DButton
>
```

```ts
function handlePromptMaskBlur() {
	popup.prompt('请输入您的姓名', {
		maskBlur: false, // [!code highlight]
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
	<DButton theme="primary" @click="handlePromptDraggable"
		>启用窗口拖拽功能</DButton
	>
	<DButton theme="primary" @click="handlePromptDraggableOverflow"
		>启用窗口拖拽功能并允许超出屏幕范围</DButton
	>
</DButtonGroup>
```

```ts
function handlePromptDraggable() {
	popup.prompt('请输入您的姓名', {
		draggable: true, // [!code highlight]
	})
}

function handlePromptDraggableOverflow() {
	popup.prompt('请输入您的姓名', {
		draggable: true,
		dragOverflow: true, // [!code highlight]
	})
}
```

:::

## 详细配置

具体可以参考 [API 控制器实例 popup.prompt()](/api/plugin-preset-controller#popup-prompt)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePrompt() {
	popup.prompt('请输入您的姓名')
}

async function handlePromptResult() {
	const name = await popup.prompt('请输入您的姓名')
	if (name === undefined) {
		popup.toast('用户取消输入', {
			theme: 'danger',
		})
	} else {
		popup.toast('用户输入的是：' + name, {
			theme: 'success',
		})
	}
}

function handlePromptDefaultValue() {
	popup.prompt('请输入您的姓名', {
		defaultValue: '这是默认值',
	})
}

function handlePromptTextarea() {
	popup.prompt('请输入您的姓名', {
		type: 'textarea',
	})
}

function handlePromptMaxLength() {
	popup.prompt('请输入您的姓名', {
		maxLength: 10,
	})
}

function handlePromptPlaceholder() {
	popup.prompt('请输入您的姓名', {
		placeholder: '请输入姓名',
	})
}

function handlePromptCustomTitle() {
	popup.prompt('请输入您的姓名', {
		title: '自定义标题',
	})
}

function handlePromptHeaderClose() {
	popup.prompt('请输入您的姓名', {
		headerClose: false,
	})
}

function handlePromptConfirmText() {
	popup.prompt('请输入您的姓名', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePromptCancelText() {
	popup.prompt('请输入您的姓名', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePromptMaskBlur() {
	popup.prompt('请输入您的姓名', {
		maskBlur: false,
	})
}

function handlePromptDraggable() {
	popup.prompt('请输入您的姓名', {
		draggable: true,
	})
}

function handlePromptDraggableOverflow() {
	popup.prompt('请输入您的姓名', {
		draggable: true,
		dragOverflow: true,
	})
}

</script>
