---
pageClass: api
outline: 2
---

# Dialog 对话 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.dialog()

创建一个对话弹出层。

### 类型

```ts
function dialog<T extends any = any>(options: DialogOption): Promise<T | void>
```

### 参数类型

```ts
type DialogOption = {
	/**
	 * 对话框标题
	 *
	 * - 默认值为 `对话`
	 */
	title?: string
	/**
	 * 对话框内容组件
	 */
	component: Component
	/**
	 * 对话框内容组件props
	 */
	componentProps?: Record<string, any>
	/**
	 * 对话框渲染完成时调用的回调函数
	 */
	onMounted?: () => void
	/**
	 * 是否显示对话框标题栏
	 *
	 * - 默认值为 `true`
	 */
	header?: boolean
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 对话框宽度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	width?: string | number
	/**
	 * 对话框最大宽度
	 *
	 * - 默认值为 `100%`
	 * - 支持 `string` 或 `number` 类型
	 */
	maxWidth?: string | number
	/**
	 * 对话框最小宽度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	minWidth?: string | number
	/**
	 * 对话框高度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	height?: string | number
	/**
	 * 对话框最大高度
	 *
	 * - 默认值为 `100%`
	 * - 支持 `string` 或 `number` 类型
	 */
	maxHeight?: string | number
	/**
	 * 对话框最小高度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	minHeight?: string | number
	/**
	 * 对话框位置
	 *
	 * - 默认值为 `center`
	 *
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否可拖拽
	 *
	 * - 默认值为 `false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖拽溢出屏幕
	 *
	 * - 默认值为 `false`
	 */
	dragOverflow?: boolean
	/**
	 * 是否显示对话框遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 点击遮罩层是否关闭对话框
	 *
	 * - 默认值为 `false` ，点击遮罩层不会关闭对话框
	 * - 传入 `true` ，点击遮罩层将关闭对话框
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将关闭对话框，可传入关闭携带的负载参数，返回的
	 *   `Promise` 对象会在对话框关闭动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有
	 *
	 * @since 1.6.0
	 */
	maskClose?: boolean | MaskDestroyHandler
	/**
	 * @deprecated 1.6.0
	 * 请使用 {@link maskClose} 作为代替
	 *
	 * 是否点击遮罩层关闭对话框
	 *
	 * - 默认值为 `false`
	 */
	maskClickClose?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
}

// 对话框位置
type Placement =
	| 'left-top'
	| 'left'
	| 'left-bottom'
	| 'top'
	| 'center'
	| 'bottom'
	| 'right-top'
	| 'right'
	| 'right-bottom'
```

### 详细信息

第一个参数为对话框选项，必填，其中的 `component` 为对话框内容组件，必填。

函数返回一个 `Promise` 对象，用于获取返回数据后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.dialog({
	component: () => import('./HelloDialog.vue'),
	componentProps: {
		/** HelloDialog 组件的 props */
	},
})
```

```ts
// 异步等待
const result = await popup.dialog<string>({
	component: () => import('./HelloDialog.vue'),
	componentProps: {
		/** HelloDialog 组件的 props */
	},
})

if (result === undefined) {
	console.log('没有返回数据')
} else {
	console.log('返回数据为：' + result)
}
```

### 相关参考

- [预置插件指南 - Dialog 对话](/guide-plugin-preset/dialog)

## popup.dialogClose() <Badge text="1.6.0+" /> {#popup-dialog-close}

> <DVersionSupport package="plugin" version="1.6.0" />

关闭当前显示的对话弹出层。

### 类型

```ts
function dialogClose(payload?: any): Promise<void>
```

### 详细信息

关闭当前显示的对话弹出层。

- 如果不存在显示的对话弹出层，调用该方法不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

- 可以传递一个可选参数 `payload`，用于在关闭时传递数据，打开该对话弹出层的 `popup.dialog()` 函数所返回的 `Promise` 对象将会 `resolve` 该数据。

- 调用关闭函数后，会返回一个 `Promise` 对象，用于等待弹出层关闭动画完成。

### 示例

```ts
// 直接调用
popup.dialogClose()
```

```ts
// 异步等待
await popup.dialogClose()
console.log('对话弹出层已关闭')
```

```ts
// 传递数据
popup.dialogClose('关闭成功')

// 异步等待
const result = await popup.dialog()
console.log(result) // '关闭成功'
```

### 相关参考

- [预置插件指南 - Dialog 对话 关闭对话框](/guide-plugin-preset/dialog#关闭对话框)

## popup.dialog.close() <Badge text="1.5.0+" /> <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>

关闭当前显示的对话弹出层。

::: danger
该方法因为静态方法的局限性，从 <DVersion package="plugin" version="1.6.0" /> 开始已被弃用，请使用 [popup.dialogClose()](#popup-dialog-close) 方法代替。
:::
