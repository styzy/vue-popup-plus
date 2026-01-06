---
pageClass: api
outline: 2
---

# Confirm 确认 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

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
	 *
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
