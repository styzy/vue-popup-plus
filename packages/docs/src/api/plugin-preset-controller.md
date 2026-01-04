---
pageClass: api
outline: 2
---

# 控制器实例 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.alert()

创建一个提示弹出层。

### 类型

```ts
function alert(message: string, options?: AlertOption): Promise<void>
```

### 参数类型

```ts
type AlertOption = {
	/**
	 * 提示框标题
	 *
	 * - 默认值：`提示`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 是否可拖动
	 *
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖动超出窗口边界
	 *
	 * - 默认值：`false`
	 */
	dragOverflow?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 * @since 1.3.0
	 */
	maskBlur?: boolean
}
```

### 详细信息

第一个参数为提示内容文本，第二个参数为提示选项，选填。

函数返回一个 `Promise` 对象，用于等待弹出层关闭后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.alert('这是一条提示内容文本')
```

```ts
// 异步等待
await popup.alert('这是一条提示内容文本')
// 只有弹出层关闭后，才会继续执行后续代码
console.log('弹出层关闭后，继续执行后续代码')
```

### 相关参考

- [预置插件指南 - Alert 提示](/guide-plugin-preset/alert)

## popup.confirm()

创建一个确认弹出层。

### 类型

```ts
function confirm(message: string, options?: ConfirmOption): Promise<boolean>
```

### 参数类型

```ts
type ConfirmOption = {
	/**
	 * 确认框标题
	 *
	 * - 默认值：`确认`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`false`
	 */
	headerClose?: boolean
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 取消按钮文本
	 *
	 * - 默认值：`取消`
	 */
	cancelText?: string
	/**
	 * 是否可拖动
	 *
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖动超出窗口边界
	 *
	 * - 默认值：`false`
	 */
	dragOverflow?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 * @since 1.3.0
	 */
	maskBlur?: boolean
}
```

### 详细信息

第一个参数为确认内容文本，第二个参数为确认选项，选填。

函数返回一个 `Promise` 对象，用于获取用户确认结果后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.confirm('这是一条确认内容文本')
```

```ts
// 异步等待
if (await popup.confirm('这是一条确认内容文本')) {
	console.log('用户点击了确认按钮')
} else {
	console.log('用户点击了取消按钮')
}
```

### 相关参考

- [预置插件指南 - Confirm 确认](/guide-plugin-preset/confirm)

## popup.prompt()

创建一个提示输入弹出层。

### 类型

```ts
function prompt(message: string, options?: PromptOption): Promise<string | void>
```

### 参数类型

```ts
type PromptOption = {
	/**
	 * 提示输入框默认值
	 *
	 * - 默认值：`''`
	 */
	defaultValue?: string
	/**
	 * 提示输入框类型
	 *
	 * - 支持的类型包括：
	 *
	 *   - `input`：单行输入框
	 *   - `textarea`：多行文本域
	 */
	type?: PromptType
	/**
	 * 提示输入框标题
	 *
	 * - 默认值：`提示输入`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 提示输入框最大长度
	 *
	 * - 默认值：`null`
	 */
	maxLength?: number | null
	/**
	 * 提示输入框占位符
	 *
	 * - 默认值：`请输入`
	 */
	placeholder?: string
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 取消按钮文本
	 *
	 * - 默认值：`取消`
	 */
	cancelText?: string
	/**
	 * 提示输入框是否可拖拽
	 *
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 提示输入框是否可拖拽溢出屏幕
	 *
	 * - 默认值：`false`
	 */
	dragOverflow?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
```

### 详细信息

第一个参数为提示输入内容文本，第二个参数为提示输入选项，选填。

函数返回一个 `Promise` 对象，用于获取用户输入内容后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.prompt('请输入您的姓名')
```

```ts
// 异步等待
const name = await popup.prompt('请输入您的姓名')

if (name === undefined) {
	console.log('用户取消了输入')
} else {
	console.log('您的姓名是：' + name)
}
```

### 相关参考

- [预置插件指南 - Prompt 提示输入](/guide-plugin-preset/prompt)

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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示对话框遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 是否点击遮罩层关闭对话框
	 *
	 * - 默认值为 `false`
	 */
	maskClickClose?: boolean
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
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 * @since 1.3.0
	 */
	maskBlur?: boolean
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
	component: () => import('./HelloWorld.vue'),
	componentProps: {
		/** HelloWorld 组件的 props */
	},
})
```

```ts
// 异步等待
const result = await popup.dialog<string>({
	component: () => import('./HelloWorld.vue'),
	componentProps: {
		/** HelloWorld 组件的 props */
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

## popup.dialog.close() <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

关闭当前显示的对话弹出层。

### 类型

```ts
function close(payload?: any): Promise<void>
```

### 详细信息

关闭当前显示的对话弹出层。

- 如果不存在显示的对话弹出层，调用该方法不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

- 可以传递一个可选参数 `payload`，用于在关闭时传递数据，打开该对话弹出层的 `popup.dialog()` 函数所返回的 `Promise` 对象将会 `resolve` 该数据。

- 调用关闭函数后，会返回一个 `Promise` 对象，用于等待弹出层关闭动画完成。

### 示例

```ts
// 直接调用
popup.dialog.close()
```

```ts
// 异步等待
await popup.dialog.close()
console.log('对话弹出层已关闭')
```

```ts
// 传递数据
popup.dialog.close('关闭成功')

// 异步等待
const result = await popup.dialog.close()
console.log(result) // '关闭成功'
```

### 相关参考

- [预置插件指南 - Dialog 对话](/guide-plugin-preset/dialog)

## popup.loading()

创建一个加载弹出层。

### 类型

```ts
// 1.5.0 +
function loading(options?: LoadingOption): void
// 1.5.0 -
function loading(options?: LoadingOption): () => void
```

### 参数类型

```ts
type LoadingOption = {
	/**
	 * 加载遮罩主题
	 *
	 * - 默认值：'primary'
	 */
	theme?: Theme
	/**
	 * 加载遮罩标题文本
	 *
	 * - 默认值：''
	 * @since 1.3.3
	 */
	title?: string
	/**
	 * 加载遮罩图标大小
	 *
	 * - 默认值：60
	 */
	iconSize?: number
	/**
	 * 是否显示遮罩层
	 *
	 * - 默认值：`true`
	 * @since 1.5.0
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 * @since 1.3.3
	 */
	maskBlur?: boolean
}

// 加载遮罩主题
type Theme = 'primary' | 'info' | 'success' | 'warning' | 'danger'
```

### 详细信息

第一个参数为加载遮罩选项，选填。

在 <DVersion package="plugin" version="1.5.0" /> 版本之前，该方法返回一个关闭加载弹出层的函数，调用后关闭加载弹出层。

从 <DVersion package="plugin" version="1.5.0" plus/> 版本开始，该方法返回 `void`，关闭加载遮罩可以使用 [popup.loading.close()](#popup-loading-close) 方法。

### 示例

```ts
// 1.5.0 +
// 打开加载遮罩
popup.loading()

// 关闭加载遮罩
popup.loading.close()

// 1.5.0 版本之前
// 打开加载遮罩
const stopLoading = popup.loading()

// 关闭加载遮罩
stopLoading()
```

### 相关参考

- [预置插件指南 - Loading 加载](/guide-plugin-preset/loading)

## popup.loading.close() <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

关闭当前显示的加载遮罩。

### 类型

```ts
function close(): Promise<void>
```

### 详细信息

- 如果不存在显示的加载遮罩，调用该方法不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

- 调用关闭函数后，会返回一个 `Promise` 对象，用于等待加载遮罩关闭动画完成。

### 示例

```ts
// 直接调用
popup.loading.close()
```

```ts
// 异步等待
await popup.loading.close()
console.log('加载遮罩已关闭')
```

## popup.album()

创建一个媒体相册弹出层。

### 类型

```ts
function album(options: AlbumOption):: Promise<void>
```

### 参数类型

```ts
type AlbumOption = {
	/**
	 * 数据源
	 *
	 * - 支持主流图片资源和视频资源
	 */
	sources: Array<string>
	/**
	 * 默认选中的媒体索引
	 *
	 * - 默认值为 `0`
	 */
	defaultIndex?: number
	/**
	 * 是否禁用计数器
	 *
	 * - 默认值为 `false`
	 */
	disableCounter?: boolean
	/**
	 * 是否禁用媒体名称
	 *
	 * - 默认值为 `false`
	 */
	disableName?: boolean
	/**
	 * 是否禁用纯净预览
	 *
	 * - 默认值为 `false`
	 */
	disablePure?: boolean
	/**
	 * 是否禁用下载功能
	 *
	 * - 默认值为 `false`
	 * - 注意：下载功能仅在资源地址支持跨域时生效
	 */
	disableDownload?: boolean
	/**
	 * 是否禁用缩放功能
	 *
	 * - 默认值为 `false`
	 */
	disableScale?: boolean
	/**
	 * 是否禁用拖动功能
	 *
	 * - 默认值为 `false`
	 */
	disableDrag?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 * @since 1.3.0
	 */
	maskBlur?: boolean
}
```

### 详细信息

第一个参数为媒体相册选项，必填。

函数返回一个 `Promise` 对象，用于等待弹出层关闭后继续执行后续代码。

### 示例

```ts
// 显示媒体相册，默认选中第二张媒体，即使用户不关闭媒体相册，也不会阻塞后续代码执行
popup.album({
	sources: [
		'https://example.com/image1.jpg',
		'https://example.com/video1.mp4',
	],
	defaultIndex: 1,
})

// 异步等待
await popup.album({
	sources: [
		'https://example.com/image1.jpg',
		'https://example.com/image1.jpg',
	],
})
console.log('媒体相册关闭后，继续执行后续代码')
```

### 相关参考

- [预置插件指南 - Album 媒体相册](/guide-plugin-preset/album)
