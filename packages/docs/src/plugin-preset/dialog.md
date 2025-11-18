# Dialog 对话

一般用于展示 `复杂业务` ，例如数据列表、提交表单等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [获取销毁携带参数](/guide/dialog#获取销毁携带参数)。
:::

## 基础使用

`对话 Dialog` 更像是对最基础的 `popup.render()` 方法的二次封装，提供了更多开箱即用的对话框功能。

和 `render` 方法一样，调用 `dialog` 方法并传入 `component` 渲染组件选项，即可弹出一个对话框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleDialog">对话</DButton>
```

```ts
import HelloWorld from 'HelloWorld.vue'

function handleDialog() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'), // [!code highlight]
	})
}
```

:::

## 携带组件参数

可以通过 `componentProps` 属性来为对话框内容组件传递参数。

::: demo

```html
<DButton theme="primary" @click="handleDialogProps">携带组件参数</DButton>
```

```ts{6}
import HelloWorld from 'HelloWorld.vue'

function handleDialogProps() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		componentProps: {
			test: '这是一个组件参数',
		},
	})
}
```

:::

## 获取销毁携带参数

该方法返回一个 `Promise<T | void>` 对象，当弹出层内部调用 `destroy()` 方法时，会将 `payload` 参数作为销毁携带参数返回，因此可以通过 `await` 来获取关闭携带参数。

如果你使用 `Typescript` ，为了获得更好的类型安全，`dialog()` 方法支持类型参数，可以用来指定销毁携带参数的类型。

::: demo

```html
<DButton theme="primary" @click="handleDialogResult">获取销毁携带参数</DButton>
```

```ts{3}
async function handleDialogResult() {
	// 这里使用类型参数 string，因此 payload 的类型将自动推断为 string | void
	const payload = await popup.dialog<string>({
		component: () => import('./HelloWorld.vue'),
	})

	// 判断是否携带参数
	if (payload !== undefined) {
		popup.toast(`得到销毁携带的参数：${payload}`, {
			theme: 'success',
		})
	} else {
		popup.toast('销毁时未携带参数', {
			theme: 'warning',
		})
	}
}
```

:::

## 手动设置尺寸

默认情况下，对话框会自动根据内部所渲染的组件的实际宽高自适应，但也可以通过 `width` 和 `height` 属性来手动设置对话框的尺寸。

下面的示例中，`HelloWorld` 组件内部的跟层级元素定义了宽高为 `400  * 300`，而我们将手动设置其宽高为 `600 * 600`。

::: demo

```html
<DButton theme="primary" @click="handleDialogCustomSize"
	>手动设置尺寸为： 600 * 600</DButton
>
```

```ts
function handleDialogCustomSize() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		width: 600, // [!code highlight]
		height: '600px', // [!code highlight]
	})
}
```

:::

::: tip
所有的尺寸选项都支持 `string` 和 `number` 类型，因此 `所有的 css 有效值` 和 `纯数字` 都是合法的。
:::

## 设置最大最小尺寸

默认情况下，对话框的尺寸是没有最大最小限制的，但也可以通过 `minWidth`、`maxWidth`、`minHeight`、`maxHeight` 属性来手动设置对话框的最大最小尺寸，这在 `没有手动设置尺寸` 时非常有用。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleDialogCustomMinSize"
		>设置最小尺寸为： 500 * 500</DButton
	>
	<DButton theme="primary" @click="handleDialogCustomMaxSize"
		>设置最大尺寸为： 200 * 200</DButton
	></DButtonGroup
>
```

```ts
import HelloWorld from 'HelloWorld.vue'

function handleDialogCustomMinSize() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		minWidth: 500, // [!code highlight]
		minHeight: 500, // [!code highlight]
	})
}

function handleDialogCustomMaxSize() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		maxWidth: 200, // [!code highlight]
		maxHeight: 200, // [!code highlight]
	})
}
```

:::

## 隐藏标题栏

可以通过 `header` 属性来隐藏标题栏，只需要将其设置为 `false` 即可。

::: demo

```html
<DButton theme="primary" @click="handleDialogHideHeader">隐藏标题栏</DButton>
```

```ts
function handleDialogHideHeader() {
	popup.dialog({
		header: false, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 自定义标题文本

可以通过 `title` 选项来自定义对话框的标题文本。

::: demo

```html
<DButton theme="primary" @click="handleDialogCustomTitle"
	>自定义标题文本</DButton
>
```

```ts
function handleDialogCustomTitle() {
	popup.dialog({
		title: '自定义标题', // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 禁用标题栏关闭按钮

可以通过 `headerClose` 选项来禁用标题栏的关闭按钮。

::: demo

```html
<DButton theme="primary" @click="handleDialogHeaderClose"
	>禁用标题栏关闭按钮</DButton
>
```

```ts
function handleDialogHeaderClose() {
	popup.dialog({
		headerClose: false, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 禁用遮罩层

可以通过 `mask` 选项来禁用遮罩层。

::: demo

```html
<DButton theme="primary" @click="handleDialogDisableMask">禁用遮罩层</DButton>
```

```ts
function handleDialogDisableMask() {
	popup.dialog({
		mask: false, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 启用遮罩层点击关闭对话框

可以通过 `maskClickClose` 选项来启用遮罩层点击关闭对话框。

::: demo

```html
<DButton theme="primary" @click="handleDialogMaskClickClose"
	>启用遮罩层点击关闭对话框</DButton
>
```

```ts
function handleDialogMaskClickClose() {
	popup.dialog({
		maskClickClose: true, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 禁用遮罩层高斯模糊

为了提升用户关注度，该弹出层使用了 `高斯模糊` 背景遮罩，可以通过 `maskBlur` 选项来禁用遮罩层的高斯模糊效果。

::: demo

```html
<DButton theme="primary" @click="handleDialogMaskBlur"
	>禁用遮罩层高斯模糊</DButton
>
```

```ts
function handleDialogMaskBlur() {
	popup.dialog({
		maskBlur: false, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
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
	<DButton theme="primary" @click="handleDialogDraggable"
		>启用窗口拖拽功能</DButton
	>
	<DButton theme="primary" @click="handleDialogDraggableOverflow"
		>启用窗口拖拽功能并允许超出屏幕范围</DButton
	>
</DButtonGroup>
```

```ts
function handleDialogDraggable() {
	popup.dialog({
		draggable: true, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}

function handleDialogDraggableOverflow() {
	popup.dialog({
		draggable: true,
		dragOverflow: true, // [!code highlight]
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 渲染完成的回调函数

可以通过 `onMounted` 选项来指定对话框渲染完成后的回调函数。

::: demo

```html
<DButton theme="primary" @click="handleDialogOnMounted"
	>渲染完成的回调函数</DButton
>
```

```ts{4}
function handleDialogOnMounted() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		onMounted: () => {
			popup.toast('对话框渲染完成', {
				theme: 'success',
			})
		},
	})
}
```

:::

## 详细配置

具体可以查看 [API popup.dialog()](/api/dialog)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleDialog() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogProps() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		componentProps: {
			test: '这是一个组件参数',
		},
	})
}

async function handleDialogResult() {
	const payload = await popup.dialog<string>({
		component: () => import('../HelloWorld.vue'),
	})

	if (payload !== undefined) {
		popup.toast(`得到销毁携带的参数：${payload}`, {
			theme: 'success',
		})
	} else {
		popup.toast('销毁时未携带参数', {
			theme: 'warning',
		})
	}
}

function handleDialogCustomSize() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		width: 600,
		height: '600px',
	})
}

function handleDialogCustomMinSize() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		minWidth: 500,
		minHeight: 500,
	})
}

function handleDialogCustomMaxSize() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		maxWidth: 200,
		maxHeight: 200,
	})
}

function handleDialogHideHeader() {
	popup.dialog({
		header: false,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogCustomTitle() {
	popup.dialog({
		title: '自定义标题',
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogHeaderClose() {
	popup.dialog({
		headerClose: false,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogDisableMask() {
	popup.dialog({
		mask: false,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogMaskClickClose() {
	popup.dialog({
		maskClickClose: true,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogMaskBlur() {
	popup.dialog({
		maskBlur: false,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogDraggable() {
	popup.dialog({
		draggable: true,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogDraggableOverflow() {
	popup.dialog({
		draggable: true,
		dragOverflow: true,
		component: () => import('../HelloWorld.vue'),
	})
}

function handleDialogOnMounted() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		onMounted: () => {
			popup.toast('对话框渲染完成', {
				theme: 'success',
			})
		},
	})
}

</script>
