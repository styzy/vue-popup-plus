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
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
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
