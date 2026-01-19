# Dialog 对话 <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

一般用于展示 `复杂业务` ，例如数据列表、提交表单等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [携带参数关闭对话框](/guide-plugin-preset/dialog#携带参数关闭对话框)。
:::

## 基础使用

`对话 Dialog` 更像是对最基础的 `popup.render()` 方法的二次封装，提供了更多开箱即用的对话框功能。

和 `render` 方法一样，调用 `popup.dialog()` 方法并传入 `component` 视图组件选项，即可弹出一个对话框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleDialog">对话</DButton>
```

```ts
import HelloDialog from 'HelloDialog.vue'

function handleDialog() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'), // [!code highlight]
	})
}
```

:::

## 携带组件参数

可以通过 `componentProps` 属性来为对话框内容组件传递参数，参数可以是组件的 `属性` 或 `事件监听器`。

事件监听器全都以 `on` 开头，例如 `customEvent` 事件，对应的事件监听器为 `onCustomEvent`。

::: demo

```html
<DButton theme="primary" @click="handleDialogProps">携带组件参数</DButton>
```

```ts{6}
import HelloDialog from 'HelloDialog.vue'

function handleDialogProps() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		componentProps: {
			test: '这是一个组件参数',
			onCustomEvent: (params) => {
				popup.toastSuccess(
					`监听组件事件 customEvent 触发，得到自定义事件参数：${params}`
				)
			},
		},
	})
}
```

:::

## 关闭对话框 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

通过调用 `popup.dialogClose()` 方法可以手动关闭最后一个打开的对话框。

如果不存在打开的对话框，调用 `popup.dialogClose()` 方法将不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

```ts [HelloDialog.vue]
// 关闭对话框
function handleClose() {
	popup.dialogClose()
}
```

::: warning
在 `1.5.x` 版本，关闭对话框的使用方式是：

- `popup.dialog.close()`

该方法使用的是静态方法，无法动态同步组件上下文，因此从 `1.6.0` 版本开始被废弃，因此请使用新的关闭对话框方法代替：

- `popup.dialogClose()`

:::

## 携带参数关闭对话框 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

当调用 `popup.dialogClose()` 方法时，可以传入一个 `payload` 参数，该参数会作为关闭携带参数返回给打开对话框的 `Promise` 对象，因此可以通过 `await` 来获取关闭携带参数。

```ts{3} [HelloDialog.vue]
// 关闭对话框
function handleClose() {
	popup.dialogClose('awesome !')
}
```

```ts{3} [Parent.vue]
// 这里 await 的返回值为关闭携带的参数 'awesome !'
const result = await popup.dialog({
	component: () => import('./HelloDialog.vue'),
})
```

如果你使用 `Typescript` ，`popup.dialog()` 方法的返回值类型为 `Promise<any>` ，这意味着你通过 `await` 获取到的 `result` 类型是 `any` ，大部分情况下没有问题，但为了类型安全，建议你在定义 `result` 时手动指定类型。

```ts{2} [Parent.vue]
// void 不可缺少，因为无法保证对话框是否会携带参数
const result: string | void = await popup.dialog({
	component: () => import('./HelloDialog.vue'),
})
```

<!-- 为了获得更好的类型安全，你可以为 `popup.dialog()` 方法指定一个类型参数，该参数将作为关闭携带参数的类型。

```ts{2} [Parent.vue]
// 这里使用类型参数 string，因此 payload 的类型将自动推断为 string | void
const result = await popup.dialog<string>({
	component: () => import('./HelloDialog.vue'),
})
``` -->

::: demo

```html
<DButton theme="primary" @click="handleDialogResult"
	>携带参数关闭对话框</DButton
>
```

```ts
async function handleDialogResult() {
	const payload: string | void = await popup.dialog({
		component: () => import('./HelloDialog.vue'),
	})

	// 判断是否携带参数
	if (payload !== undefined) {
		popup.toastSuccess(`得到销毁携带的参数：${payload}`)
	} else {
		popup.toastWarning('销毁时未携带参数')
	}
}
```

:::

## 设置位置 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

可以通过 `placement` 属性来设置对话框的位置，默认值为 `center` 。支持的位置有：

- `left-top`
- `left`
- `left-bottom`
- `top`
- `center`
- `bottom`
- `right-top`
- `right`
- `right-bottom`

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleDialogPlacementLeft">左侧</DButton>
	<DButton theme="primary" @click="handleDialogPlacementTop">顶部</DButton>
	<DButton theme="primary" @click="handleDialogPlacementRightBottom"
		>右下</DButton
	>
</DButtonGroup>
```

```ts
function handleDialogPlacementLeft() {
	popup.dialog({
		component: () => import('../HelloDialog.vue'),
		placement: 'left', // [!code highlight]
	})
}

function handleDialogPlacementTop() {
	popup.dialog({
		component: () => import('../HelloDialog.vue'),
		placement: 'top', // [!code highlight]
	})
}

function handleDialogPlacementRightBottom() {
	popup.dialog({
		component: () => import('../HelloDialog.vue'),
		placement: 'right-bottom', // [!code highlight]
	})
}
```

:::

## 手动设置尺寸

默认情况下，对话框会自动根据内部所渲染的组件的实际宽高自适应，但也可以通过 `width` 和 `height` 属性来手动设置对话框的尺寸。

下面的示例中，`HelloDialog` 组件内部的跟层级元素定义了宽高为 `400  * 300`，而我们将手动设置其宽高为 `600 * 600`。

::: demo

```html
<DButton theme="primary" @click="handleDialogCustomSize"
	>手动设置尺寸为： 600 * 600</DButton
>
```

```ts
function handleDialogCustomSize() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
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
import HelloDialog from 'HelloDialog.vue'

function handleDialogCustomMinSize() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		minWidth: 500, // [!code highlight]
		minHeight: 500, // [!code highlight]
	})
}

function handleDialogCustomMaxSize() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
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
		component: () => import('./HelloDialog.vue'),
		header: false, // [!code highlight]
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
		component: () => import('./HelloDialog.vue'),
		title: '自定义标题', // [!code highlight]
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
		component: () => import('./HelloDialog.vue'),
		headerClose: false, // [!code highlight]
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
		component: () => import('./HelloDialog.vue'),
		draggable: true, // [!code highlight]
	})
}

function handleDialogDraggableOverflow() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		draggable: true,
		dragOverflow: true, // [!code highlight]
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
		component: () => import('./HelloDialog.vue'),
		mask: false, // [!code highlight]
	})
}
```

:::

## 启用透明遮罩层 <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

如果希望在不显示遮罩层的同时，阻止用户对文档的操作，可以通过 `maskTransparent` 选项来启用透明遮罩层。

::: demo

```html
<DButton theme="primary" @click="handleDialogMaskTransparent"
	>启用透明遮罩层</DButton
>
```

```ts
function handleDialogMaskTransparent() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		maskTransparent: true, // [!code highlight]
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
<DButton theme="primary" @click="handleDialogMaskBlur"
	>启用高斯模糊遮罩层</DButton
>
```

```ts
function handleDialogMaskBlur() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		maskBlur: true, // [!code highlight]
	})
}
```

:::

## 启用遮罩层点击关闭对话框

可以通过 `maskClose` 选项来启用遮罩层点击关闭对话框。

::: demo

```html
<DButton theme="primary" @click="handleDialogMaskClose"
	>启用遮罩层点击关闭对话框</DButton
>
```

```ts
function handleDialogMaskClose() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		maskClose: true, // [!code highlight]
	})
}
```

:::

::: tip
在 <DVersion package="plugin-preset" version="1.6.0" /> 版本以前，请使用 `maskClickClose` 选项来启用遮罩层点击关闭对话框。
:::

## 自定义遮罩层点击关闭逻辑 <Badge text="1.6.0+" />

> <DVersionSupport package="plugin-preset" version="1.6.0" />

`maskClose` 选项同时支持传入一个函数来自定义遮罩层点击关闭逻辑。

::: demo

```html
<DButton theme="primary" @click="handleDialogMaskCloseHandler"
	>自定义遮罩层点击关闭逻辑</DButton
>
```

```ts
async function handleDialogMaskCloseHandler() {
	const payload = await popup.dialog({
		title: '请点击遮罩层关闭对话框',
		component: () => import('./HelloDialog.vue'),
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭对话框吗？')) {
				await close('123456')
				popup.toastSuccess('对话框关闭成功，且关闭动画执行完成')
			}
		},
	})

	// 返回结果请打开控制台查看
	console.log('dialog payload: ', payload)
}
```

:::

传入的函数将接收一个类型为 `(payload?: any) => Promise<void>` 的 `close()` 函数作为参数，执行 `close()` 函数即可关闭对话框。

`close()` 函数可以接收一个可选的参数 `payload`，该参数将作为关闭携带的参数。

`close()` 函数返回一个 `Promise` 对象，用于等待对话框关闭动画结束后执行后续操作。

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
		component: () => import('./HelloDialog.vue'),
		onMounted: () => {
			popup.toastSuccess('对话框渲染完成')
		},
	})
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Dialog 对话框](/api/plugin-preset/dialog)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloDialog from '../HelloDialog.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleDialog() {
	popup.dialog({
		component: HelloDialog,
	})
}

function handleDialogProps() {
	popup.dialog({
		component: HelloDialog,
		componentProps: {
			test: '这是一个组件参数',
			onCustomEvent: (params: string) => {
				popup.toastSuccess(
					`监听组件事件 customEvent 触发，得到自定义事件参数：${params}`
				)
			},
		},
	})
}

async function handleDialogResult() {
	const payload: string | void = await popup.dialog({
		component: HelloDialog,
	})

	if (payload !== undefined) {
		popup.toastSuccess(`得到销毁携带的参数：${payload}`)
	} else {
		popup.toastWarning('销毁时未携带参数')
	}
}


function handleDialogPlacementLeft() {
	popup.dialog({
		component: HelloDialog,
		placement: 'left',
	})
}

function handleDialogPlacementTop() {
	popup.dialog({
		component: HelloDialog,
		placement: 'top',
	})
}

function handleDialogPlacementRightBottom() {
	popup.dialog({
		component: HelloDialog,
		placement: 'right-bottom',
	})
}

function handleDialogCustomSize() {
	popup.dialog({
		component: HelloDialog,
		width: 600,
		height: '600px',
	})
}

function handleDialogCustomMinSize() {
	popup.dialog({
		component: HelloDialog,
		minWidth: 500,
		minHeight: 500,
	})
}

function handleDialogCustomMaxSize() {
	popup.dialog({
		component: HelloDialog,
		maxWidth: 200,
		maxHeight: 200,
	})
}

function handleDialogHideHeader() {
	popup.dialog({
		component: HelloDialog,
		header: false,
	})
}

function handleDialogCustomTitle() {
	popup.dialog({
		component: HelloDialog,
		title: '自定义标题',
	})
}

function handleDialogHeaderClose() {
	popup.dialog({
		component: HelloDialog,
		headerClose: false,
	})
}

function handleDialogDraggable() {
	popup.dialog({
		component: HelloDialog,
		draggable: true,
	})
}

function handleDialogDraggableOverflow() {
	popup.dialog({
		component: HelloDialog,
		draggable: true,
		dragOverflow: true,
	})
}

function handleDialogDisableMask() {
	popup.dialog({
		component: HelloDialog,
		mask: false,
	})
}

function handleDialogMaskTransparent() {
	popup.dialog({
		component: HelloDialog,
		maskTransparent: true,
	})
}

function handleDialogMaskBlur() {
	popup.dialog({
		component: HelloDialog,
		maskBlur: true,
	})
}

function handleDialogMaskClose() {
	popup.dialog({
		component: HelloDialog,
		maskClose: true,
	})
}

async function handleDialogMaskCloseHandler() {
	const payload = await popup.dialog({
		title: '请点击遮罩层关闭对话框',
		component: HelloDialog,
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭对话框吗？')) {
				await close('123456')
				popup.toastSuccess('对话框关闭成功，且关闭动画执行完成')
			}
		},
	})

	console.log('dialog payload: ', payload)
}

function handleDialogOnMounted() {
	popup.dialog({
		component: HelloDialog,
		onMounted: () => {
			popup.toast('对话框渲染完成')
		},
	})
}
</script>
