---
pageClass: api
outline: 2
---

# Prompt 提示输入 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.prompt()

创建一个提示输入弹出层。

### 类型

```ts
function prompt(message: string, options?: PromptOption): Promise<string | void>
```

### 参数类型

````ts
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
	 * 提示输入框验证器
	 *
	 * - 验证器函数，参数为用户输入的内容
	 * - 如果验证失败，直接抛出异常即可，异常信息为验证失败的提示信息
	 *
	 * ```ts
	 * function validateName(value: string) {
	 * 	if (!value) {
	 * 		throw new Error('请输入姓名')
	 * 	}
	 * 	if (value.length < 2) {
	 * 		throw new Error('姓名长度不能小于2个字符')
	 * 	}
	 * }
	 * ```
	 *
	 * @since 1.7.0
	 */
	validator?: PopupPromptValidator
	/**
	 * 提示输入框验证类型
	 *
	 * - 默认值：`blur`
	 * - 指定触发校验的时机，仅在设置 `validator` 时生效
	 * - 支持的类型包括：
	 *
	 *   - `input`：输入框内容改变时验证
	 *   - `change`：输入框内容改变时验证
	 *   - `blur`：输入框失去焦点时验证
	 *
	 * @since 1.7.0
	 */
	validateType?: PopupPromptValidateType
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
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
	/**
````

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
