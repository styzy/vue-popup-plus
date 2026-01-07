# Confirm 确认

一般用于用户 `敏感行为` 的二次确认，例如删除等操作。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [获取用户确认结果](/guide-plugin-preset/confirm#获取用户确认结果)。
:::

## 基础使用

调用 `confirm` 方法并传入一段文本可以弹出一个确认框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleConfirm">确认</DButton>
```

```ts
function handleConfirm() {
	popup.confirm('是否确认操作？') // [!code highlight]
}
```

:::

## 获取用户确认结果

该方法返回一个 `Promise<boolean>` 对象，当用户点击确认按钮时，会执行 `resolve(true)` 方法，当用户点击取消按钮时，会执行 `resolve(false)` 方法，因此可以通过 `await` 来获取用户确认结果。

::: demo

```html
<DButton theme="primary" @click="handleConfirmResult">获取确认结果</DButton>
```

```ts
async function handleConfirmResult() {
	const isConfirm = await popup.confirm('是否确认操作？') // [!code highlight]
	if (isConfirm) {
		popup.toastSuccess('用户确认操作')
	} else {
		popup.toastDanger('用户取消操作')
	}
}
```

:::

## 自定义标题文本

可以通过 `title` 选项来自定义确认框的标题文本。

::: demo

```html
<DButton theme="primary" @click="handleConfirmCustomTitle">自定义标题</DButton>
```

```ts
function handleConfirmCustomTitle() {
	popup.confirm('是否确认操作？', {
		title: '自定义标题', // [!code highlight]
	})
}
```

:::

## 启用标题栏关闭按钮

和其他弹出层不同，确认框默认 `不启用` 标题栏关闭按钮的，因为需要引导用户做出明确的选择，避免用户误操作关闭确认框。

使用 `headerClose` 选项可以启用标题栏关闭按钮，当用户点击关闭按钮时，该行为和点击取消按钮保持一致，即在内部执行 `resolve(false)` 方法。

::: demo

```html
<DButton theme="primary" @click="handleConfirmHeaderClose"
	>启用标题栏关闭按钮</DButton
>
```

```ts
async function handleConfirmHeaderClose() {
	const isConfirm = await popup.confirm('是否确认操作？', {
		headerClose: true, // [!code highlight]
	})
	if (isConfirm) {
		popup.toastSuccess('用户确认操作')
	} else {
		popup.toastDanger('用户点击了关闭按钮或取消按钮')
	}
}
```

:::

## 自定义确认按钮文本

可以通过 `confirmText` 选项来自定义确认按钮的文本。

::: demo

```html
<DButton theme="primary" @click="handleConfirmConfirmText"
	>自定义确认按钮文本</DButton
>
```

```ts
function handleConfirmConfirmText() {
	popup.confirm('是否确认操作？', {
		confirmText: '自定义确认按钮文本', // [!code highlight]
	})
}
```

:::

## 自定义取消按钮文本

可以通过 `cancelText` 选项来自定义取消按钮的文本。

::: demo

```html
<DButton theme="primary" @click="handleConfirmCancelText"
	>自定义取消按钮文本</DButton
>
```

```ts
function handleConfirmCancelText() {
	popup.confirm('是否确认操作？', {
		cancelText: '自定义取消按钮文本', // [!code highlight]
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
	<DButton theme="primary" @click="handleConfirmDraggable"
		>启用窗口拖拽功能</DButton
	>
	<DButton theme="primary" @click="handleConfirmDraggableOverflow"
		>启用窗口拖拽功能并允许超出屏幕范围</DButton
	>
</DButtonGroup>
```

```ts
function handleConfirmDraggable() {
	popup.confirm('是否确认操作？', {
		draggable: true, // [!code highlight]
	})
}

function handleConfirmDraggableOverflow() {
	popup.confirm('是否确认操作？', {
		draggable: true,
		dragOverflow: true, // [!code highlight]
	})
}
```

:::

## 启用遮罩层高斯模糊 <Badge text="1.3.0+" />

> <DVersionSupport package="plugin" version="1.3.0" />

如果需要提升用户对弹出层的关注度，可以通过 `maskBlur` 选项来启用遮罩层的高斯模糊效果。

::: warning
启用遮罩层高斯模糊，对浏览器的渲染性能有一定要求，具体取决于设备性能，请根据实际情况选择是否启用。
:::

::: demo

```html
<DButton theme="primary" @click="handleConfirmMaskBlur"
	>启用遮罩层高斯模糊</DButton
>
```

```ts
function handleConfirmMaskBlur() {
	popup.confirm('是否确认操作？', {
		maskBlur: true, // [!code highlight]
	})
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Confirm 确认](/api/plugin-preset/confirm)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleConfirm() {
	popup.confirm('是否确认操作？')
}

async function handleConfirmResult() {
	const isConfirm = await popup.confirm('是否确认操作？')
	if (isConfirm) {
		popup.toastSuccess('用户确认操作')
	} else {
		popup.toastDanger('用户取消操作')
	}
}

function handleConfirmCustomTitle() {
	popup.confirm('是否确认操作？', {
		title: '自定义标题',
	})
}

async function handleConfirmHeaderClose() {
	const isConfirm = await popup.confirm('是否确认操作？', {
		headerClose: true,
	})
	if (isConfirm) {
		popup.toastSuccess('用户确认操作')
	} else {
		popup.toastDanger('用户点击了关闭按钮或取消按钮')
	}
}

function handleConfirmConfirmText() {
	popup.confirm('是否确认操作？', {
		confirmText: '自定义确认按钮文本',
	})
}

function handleConfirmCancelText() {
	popup.confirm('是否确认操作？', {
		cancelText: '自定义取消按钮文本',
	})
}

function handleConfirmDraggable() {
	popup.confirm('是否确认操作？', {
		draggable: true,
	})
}

function handleConfirmDraggableOverflow() {
	popup.confirm('是否确认操作？', {
		draggable: true,
		dragOverflow: true,
	})
}

function handleConfirmMaskBlur() {
	popup.confirm('是否确认操作？', {
		maskBlur: true,
	})
}
</script>
