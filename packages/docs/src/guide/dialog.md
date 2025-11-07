# 对话 Dialog

一般用于展示 `复杂业务` ，例如数据列表、提交表单等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [获取关闭携带参数](/guide/dialog#获取关闭携带参数)。
:::

## 基础使用

`对话 Dialog` 更像是对最基础的 `popup.render()` 方法的二次封装，提供了更多开箱即用的对话框功能。

和 `render` 方法一样，调用 `dialog` 方法并传入 `component` 渲染组件选项，即可弹出一个对话框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleDialog">基础使用</DButton>
```

```ts
import HelloWorld from 'HelloWorld.vue'

function handleDialog() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
	})
}
```

:::

## 携带组件参数

可以通过 `componentProps` 属性来为对话框内容组件传递参数。

## 获取关闭携带参数

该方法返回一个 `Promise<T | void>` 对象，当弹出层内部调用 `destroy()` 方法时，会将 `payload` 参数作为关闭携带参数返回，因此可以通过 `await` 来获取关闭携带参数。

如果你使用 `Typescript` ，为了获得更好的类型安全，`dialog()` 方法支持类型参数，可以用来指定关闭携带参数的类型。

::: demo

```html
<DButton theme="primary" @click="handleDialogResult">获取关闭携带参数</DButton>
```

```ts{3}
async function handleDialogResult() {
	// 这里使用类型参数 string，因此 payload 的类型将自动推断为 string | void
	const payload = await popup.dialog<string>({
		component: () => import('./HelloWorld.vue'),
	})

	// 判断是否携带参数
	if (payload !== undefined) {
		popup.toast(`得到关闭携带的参数：${payload}`)
	} else {
		popup.toast('关闭时未携带参数')
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

## 详细配置

具体可以查看 [API popup.dialog()](/api/dialog)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleDialog() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
	})
}

async function handleDialogResult() {
	const payload = await popup.dialog<string>({
		component: () => import('./HelloWorld.vue'),
	})

	if (payload !== undefined) {
		popup.toast(`得到关闭携带的参数：${payload}`)
	} else {
		popup.toast('关闭时未携带参数')
	}
}

function handleDialogCustomSize() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		width: 600,
		height: '600px',
	})
}

function handleDialogCustomMinSize() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		minWidth: 500,
		minHeight: 500,
	})
}

function handleDialogCustomMaxSize() {
	popup.dialog({
		component: () => import('./HelloWorld.vue'),
		maxWidth: 200,
		maxHeight: 200,
	})
}



</script>
