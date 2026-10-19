---
pageClass: api
outline: 2
---

# Alert 提示 API

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
	 * 主题
	 *
	 * - 默认值： 'primary'
	 *
	 * @since 1.7.0
	 */
	theme?: PopupTheme
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
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 自定义键盘快捷键
	 *
	 * - 默认值：`true` ，表示启用所有内置键盘快捷键
	 * - 当设置为 `false` 时，将禁用所有键盘快捷键
	 *
	 * @since 1.7.0
	 */
	keyboard?: PopupAlertKeyboard
	/**
	 * 弹出层视区元素
	 *
	 * - 视区将作为触发自动翻转和平移的参考区域
	 * - 如果不指定，将使用浏览器窗口作为视区
	 * - 当指定某个元素时，弹出层将以该元素为视区
	 * - 传入字符串时，会根据字符串选择器查询元素
	 *
	 * @since 1.7.0
	 */
	viewport?: PopupViewport
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
}

// 主题
type PopupTheme = 'primary' | 'info' | 'success' | 'warning' | 'danger'

// 视区元素
type PopupViewport = string | HTMLElement | null

// 自定义键盘快捷键
type PopupAlertKeyboard =
	| boolean
	| {
			/**
			 * 确认
			 *
			 * - 默认值：`Enter`
			 */
			confirm?: PopupKeyboardConfig
			/**
			 * 关闭
			 *
			 * - 默认值：`Escape`
			 */
			close?: PopupKeyboardConfig
	  }

// 键盘快捷键配置
type PopupKeyboardConfig =
	| false
	| PopupKeyboardShortcut
	| PopupKeyboardShortcut[]

// 键盘快捷键
type PopupKeyboardShortcut =
	| string
	| {
			/**
			 * 键名
			 */
			key: string
			/**
			 * 是否按住 Ctrl 键
			 *
			 * @default false
			 */
			ctrl?: boolean
			/**
			 * 是否按住 Shift 键
			 *
			 * @default false
			 */
			shift?: boolean
			/**
			 * 是否按住 Alt 键
			 *
			 * @default false
			 */
			alt?: boolean
			/**
			 * 是否按住 Meta 键
			 *
			 * @default false
			 */
			meta?: boolean
			/**
			 * 是否阻止默认事件
			 *
			 * @default false
			 */
			preventDefault?: boolean
			/**
			 * 是否阻止事件冒泡
			 *
			 * @default false
			 */
			stopPropagation?: boolean
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
