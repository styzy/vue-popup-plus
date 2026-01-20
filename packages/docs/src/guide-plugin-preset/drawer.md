# Drawer 抽屉 <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

一般用于展示 `复杂业务` ，例如数据列表、提交表单等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [携带参数关闭抽屉](/guide-plugin-preset/drawer#携带参数关闭抽屉)。
:::

## 基础使用

`抽屉 Drawer` 更像是对最基础的 `popup.render()` 方法的二次封装，提供了更多开箱即用的抽屉功能。

和 `render` 方法一样，调用 `popup.drawer()` 方法并传入 `component` 视图组件选项，即可弹出一个抽屉，默认在屏幕右侧弹出。

::: demo

```html
<DButton theme="primary" @click="handleDrawer">抽屉</DButton>
```

```ts
import HelloDrawer from 'HelloDrawer.vue'

function handleDrawer() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'), // [!code highlight]
	})
}
```

:::

## 携带组件参数

可以通过 `componentProps` 属性来为抽屉内容组件传递参数，参数可以是组件的 `属性` 或 `事件监听器`。

事件监听器全都以 `on` 开头，例如 `customEvent` 事件，对应的事件监听器为 `onCustomEvent`。

::: demo

```html
<DButton theme="primary" @click="handleDrawerProps">携带组件参数</DButton>
```

```ts{6}
import HelloDrawer from 'HelloDrawer.vue'

function handleDrawerProps() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
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

## 关闭抽屉

通过调用 `popup.drawerClose()` 方法可以手动关闭最后一个打开的抽屉。

如果不存在打开的抽屉，调用 `popup.drawerClose()` 方法将不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

```ts [HelloDrawer.vue]
// 关闭抽屉
function handleClose() {
	popup.drawerClose()
}
```

## 携带参数关闭抽屉

当调用 `popup.drawerClose()` 方法时，可以传入一个 `payload` 参数，该参数会作为关闭携带参数返回给打开抽屉的 `Promise` 对象，因此可以通过 `await` 来获取关闭携带参数。

```ts{3} [HelloDrawer.vue]
// 关闭抽屉
function handleClose() {
	popup.drawerClose('awesome !')
}
```

```ts{3} [Parent.vue]
// 这里 await 的返回值为关闭携带的参数 'awesome !'
const result = await popup.drawer({
	component: () => import('./HelloDrawer.vue'),
})
```

如果你使用 `Typescript` ，`popup.drawer()` 方法的返回值类型为 `Promise<any>` ，这意味着你通过 `await` 获取到的 `result` 类型是 `any` ，大部分情况下没有问题，但为了类型安全，建议你在定义 `result` 时手动指定类型。

```ts{2} [Parent.vue]
// void 不可缺少，因为无法保证抽屉是否会携带参数
const result: string | void = await popup.drawer({
	component: () => import('./HelloDrawer.vue'),
})
```

<!-- 为了获得更好的类型安全，你可以为 `popup.drawer()` 方法指定一个类型参数，该参数将作为关闭携带参数的类型。

```ts{2} [Parent.vue]
// 这里使用类型参数 string，因此 payload 的类型将自动推断为 string | void
const result = await popup.drawer<string>({
	component: () => import('../HelloDrawer.vue'),
})
``` -->

::: demo

```html
<DButton theme="primary" @click="handleDrawerResult">携带参数关闭抽屉</DButton>
```

```ts
async function handleDrawerResult() {
	const payload: string | void = await popup.drawer({
		component: () => import('./HelloDrawer.vue'),
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

## 设置位置

可以通过 `placement` 属性来设置抽屉的位置，默认值为 `right` 。支持的位置有：

- `left`
- `top`
- `bottom`
- `right`

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleDrawerPlacementLeft">左侧</DButton>
	<DButton theme="primary" @click="handleDrawerPlacementRight">右侧</DButton>
	<DButton theme="primary" @click="handleDrawerPlacementTop">顶部</DButton>
	<DButton theme="primary" @click="handleDrawerPlacementBottom">底部</DButton>
</DButtonGroup>
```

```ts
function handleDrawerPlacementLeft() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'left',
	})
}

function handleDrawerPlacementRight() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
	})
}

function handleDrawerPlacementTop() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'top',
	})
}

function handleDrawerPlacementBottom() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'bottom', // [!code highlight]
	})
}
```

:::

## 手动设置尺寸

默认情况下，抽屉会自动根据内部所渲染的组件的实际宽高自适应，但也可以通过 `size` 属性来手动设置抽屉的尺寸。
当 `placement` 的值为 `top` | `bottom` 时， `size`会应用给抽屉的高度。
当 `placement` 的值为 `left` | `right` 时， `size`会应用给抽屉的宽度。

下面的示例中，`HelloDrawer` 组件内部的根层级元素使用组件默认尺寸`placement` 为 `top`,，而我们将手动设置其尺寸为 `600 `。

::: demo

```html
<DButton theme="primary" @click="handleDrawerCustomSize"
	>手动设置尺寸为： 600
</DButton>
```

```ts
function handleDrawerCustomSize() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'top',
		size: 600,
	})
}
```

:::

::: tip
所有的尺寸选项都支持 `string` 和 `number` 类型，因此 `所有的 css 有效值` 和 `纯数字` 都是合法的。
:::

## 设置最大最小尺寸

默认情况下，抽屉的尺寸是没有最大最小限制的，但也可以通过 `minSize`、`maxSize` 属性来手动设置抽屉的最大最小尺寸，这在 `没有手动设置尺寸` 时非常有用。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleDrawerCustomMinSize"
		>设置最小尺寸为： 500
	</DButton>
	<DButton theme="primary" @click="handleDrawerCustomMaxSize"
		>设置最大尺寸为： 200
	</DButton></DButtonGroup
>
```

```ts
import HelloDrawer from 'HelloDrawer.vue'

function handleDrawerCustomMinSize() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		minSize: 500,
	})
}

function handleDrawerCustomMaxSize() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maxSize: 200,
	})
}
```

:::

## 隐藏标题栏

可以通过 `header` 属性来隐藏标题栏，只需要将其设置为 `false` 即可。

::: demo

```html
<DButton theme="primary" @click="handleDrawerHideHeader">隐藏标题栏</DButton>
```

```ts
function handleDrawerHideHeader() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		header: false,
	})
}
```

:::

## 自定义标题文本

可以通过 `title` 选项来自定义抽屉的标题文本。

::: demo

```html
<DButton theme="primary" @click="handleDrawerCustomTitle"
	>自定义标题文本</DButton
>
```

```ts
function handleDrawerCustomTitle() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		title: '自定义标题', // [!code highlight]
	})
}
```

:::

## 禁用标题栏关闭按钮

可以通过 `headerClose` 选项来禁用标题栏的关闭按钮。

::: demo

```html
<DButton theme="primary" @click="handleDrawerHeaderClose"
	>禁用标题栏关闭按钮</DButton
>
```

```ts
function handleDrawerHeaderClose() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		headerClose: false, // [!code highlight]
	})
}
```

:::

## 禁用遮罩层

可以通过 `mask` 选项来禁用遮罩层。

::: demo

```html
<DButton theme="primary" @click="handleDrawerDisableMask">禁用遮罩层</DButton>
```

```ts
function handleDrawerDisableMask() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		mask: false,
	})
}
```

:::

## 启用透明遮罩层

如果希望在不显示遮罩层的同时，阻止用户对文档的操作，可以通过 `maskTransparent` 选项来启用透明遮罩层。

::: demo

```html
<DButton theme="primary" @click="handleDrawerMaskTransparent"
	>启用透明遮罩层</DButton
>
```

```ts
function handleDrawerMaskTransparent() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maskTransparent: true, // [!code highlight]
	})
}
```

:::

## 启用高斯模糊遮罩层

如果需要提升用户对弹出层的关注度，可以通过 `maskBlur` 选项来启用遮罩层的高斯模糊效果。

::: warning
启用高斯模糊遮罩层，对浏览器的渲染性能有一定要求，具体取决于设备性能，请根据实际情况选择是否启用。
:::

::: demo

```html
<DButton theme="primary" @click="handleDrawerMaskBlur"
	>启用高斯模糊遮罩层</DButton
>
```

```ts
function handleDrawerMaskBlur() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maskBlur: true, // [!code highlight]
	})
}
```

:::

## 启用遮罩层点击关闭抽屉

可以通过 `maskClose` 选项来启用遮罩层点击关闭抽屉。

::: demo

```html
<DButton theme="primary" @click="handleDrawerMaskClose"
	>启用遮罩层点击关闭抽屉</DButton
>
```

```ts
function handleDrawerMaskClose() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maskClose: true, // [!code highlight]
	})
}
```

:::

## 自定义遮罩层点击关闭逻辑

`maskClose` 选项同时支持传入一个函数来自定义遮罩层点击关闭逻辑。

::: demo

```html
<DButton theme="primary" @click="handleDrawerMaskCloseHandler"
	>自定义遮罩层点击关闭逻辑</DButton
>
```

```ts
async function handleDrawerMaskCloseHandler() {
	const payload = await popup.drawer({
		title: '请点击遮罩层关闭抽屉',
		component: () => import('./HelloDrawer.vue'),
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭抽屉吗？')) {
				await close('123456')
				popup.toastSuccess('抽屉关闭成功，且关闭动画执行完成')
			}
		},
	})

	// 返回结果请打开控制台查看
	console.log('Drawer payload: ', payload)
}
```

:::

传入的函数将接收一个类型为 `(payload?: any) => Promise<void>` 的 `close()` 函数作为参数，执行 `close()` 函数即可关闭抽屉。

`close()` 函数可以接收一个可选的参数 `payload`，该参数将作为关闭携带的参数。

`close()` 函数返回一个 `Promise` 对象，用于等待抽屉关闭动画结束后执行后续操作。

## 渲染完成的回调函数

可以通过 `onMounted` 选项来指定抽屉渲染完成后的回调函数。

::: demo

```html
<DButton theme="primary" @click="handleDrawerOnMounted"
	>渲染完成的回调函数</DButton
>
```

```ts{4}
function handleDrawerOnMounted() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		onMounted: () => {
			popup.toastSuccess('抽屉渲染完成')
		},
	})
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Drawer 抽屉](/api/plugin-preset/drawer)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloDrawer from '../HelloDrawer.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleDrawer() {
	popup.drawer({
		component: HelloDrawer,
	})
}

function handleDrawerProps() {
	popup.drawer({
		component: HelloDrawer,
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

async function handleDrawerResult() {
	const payload: string | void = await popup.drawer({
		component: HelloDrawer,
	})

	if (payload !== undefined) {
		popup.toastSuccess(`得到销毁携带的参数：${payload}`)
	} else {
		popup.toastWarning('销毁时未携带参数')
	}
}


function handleDrawerPlacementLeft() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'left',
	})
}

function handleDrawerPlacementRight() {
	popup.drawer({
		component: HelloDrawer,
	})
}

function handleDrawerPlacementTop() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'top',
	})
}

function handleDrawerPlacementBottom() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'bottom',
	})
}

function handleDrawerCustomSize() {
	popup.drawer({
		component: HelloDrawer,
		placement:'top',
		size: 600,
	})
}

function handleDrawerCustomMinSize() {
	popup.drawer({
		component: HelloDrawer,
		minSize: 500,
	})
}

function handleDrawerCustomMaxSize() {
	popup.drawer({
		component: HelloDrawer,
		maxSize: 200,
	})
}

function handleDrawerHideHeader() {
	popup.drawer({
		component: HelloDrawer,
		header: false,
	})
}

function handleDrawerCustomTitle() {
	popup.drawer({
		component: HelloDrawer,
		title: '自定义标题',
	})
}

function handleDrawerHeaderClose() {
	popup.drawer({
		component: HelloDrawer,
		headerClose: false,
	})
}

function handleDrawerDisableMask() {
	popup.drawer({
		component: HelloDrawer,
		mask: false,
	})
}

function handleDrawerMaskTransparent() {
	popup.drawer({
		component: HelloDrawer,
		maskTransparent: true,
	})
}

function handleDrawerMaskBlur() {
	popup.drawer({
		component: HelloDrawer,
		maskBlur: true,
	})
}

function handleDrawerMaskClose() {
	popup.drawer({
		component: HelloDrawer,
		maskClose: true,
	})
}

async function handleDrawerMaskCloseHandler() {
	const payload = await popup.drawer({
		title: '请点击遮罩层关闭抽屉',
		component: HelloDrawer,
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭抽屉吗？')) {
				await close('123456')
				popup.toastSuccess('抽屉关闭成功，且关闭动画执行完成')
			}
		},
	})

	console.log('Drawer payload: ', payload)
}

function handleDrawerOnMounted() {
	popup.drawer({
		component: HelloDrawer,
		onMounted: () => {
			popup.toast('抽屉渲染完成')
		},
	})
}
</script>
