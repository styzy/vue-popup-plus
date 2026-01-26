---
pageClass: api
outline: 2
---

# Message 消息 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.message() <Badge text="1.7.0+" /> {#popup-message}

创建一个消息弹出层。

### 类型

```ts
function message(message: string, options?: MessageOption): Promise<void>
```

### 参数类型

```ts
type MessageOption = {
	/**
	 * 主题
	 *
	 * - 默认值： 'primary'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 显示位置
	 *
	 * - 默认值为 `top`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 */
	zIndex?: number
}

// 主题
type Theme = 'primary' | 'info' | 'success' | 'warning' | 'danger'

// 位置
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

第一个参数为提示内容文本，第二个参数为提示选项，选填。

函数返回一个 `Promise` 对象，用于等待提示消失后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.message('这是一条消息')
```

```ts
// 异步等待
await popup.message('这是一条消息')
// 只有提示消失后，才会继续执行后续代码
console.log('提示消失后，继续执行后续代码')
```

### 相关参考

- [预置插件指南 - Message 消息](/guide-plugin-preset/message)

## popup.messagePrimary() <Badge text="1.7.0+" /> {#popup-message-primary}

> <DVersionSupport package="plugin" version="1.7.0" />

创建一个主要主题的消息弹出层。

```ts
function messagePrimary(
	message: string,
	options?: MessageOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type MessageOptionWithoutTheme = {
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 位置
	 *
	 * - 默认值为 `center`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数为提示内容文本，第二个参数为提示选项，选填。

和 `messgae` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Message 消息 快速使用主题](/guide-plugin-preset/message#快速使用主题)

## popup.messageSuccess() <Badge text="1.7.0+" /> {#popup-message-success}

> <DVersionSupport package="plugin" version="1.7.0" />

创建一个成功主题的消息弹出层。

### 类型

```ts
function messageSuccess(
	message: string,
	options?: MessageOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type MessageOptionWithoutTheme = {
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 位置
	 *
	 * - 默认值为 `center`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数为提示内容文本，第二个参数为提示选项，选填。

和 `messgae` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Message 消息 快速使用主题](/guide-plugin-preset/message#快速使用主题)

## popup.messageInfo() <Badge text="1.7.0+" /> {#popup-message-info}

> <DVersionSupport package="plugin" version="1.7.0" />

创建一个信息主题的消息弹出层。

### 类型

```ts
function messageInfo(
	message: string,
	options?: MessageOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type MessageOptionWithoutTheme = {
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 位置
	 *
	 * - 默认值为 `center`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数为提示内容文本，第二个参数为提示选项，选填。

和 `messgae` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Message 消息 快速使用主题](/guide-plugin-preset/message#快速使用主题)

## popup.messageWarning() <Badge text="1.7.0+" /> {#popup-message-warning}

> <DVersionSupport package="plugin" version="1.7.0" />

创建一个警告主题的消息弹出层。

### 类型

```ts
function messageWarning(
	message: string,
	options?: MessageOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type MessageOptionWithoutTheme = {
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 位置
	 *
	 * - 默认值为 `center`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数为提示内容文本，第二个参数为提示选项，选填。

和 `messgae` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Message 消息 快速使用主题](/guide-plugin-preset/message#快速使用主题)

## popup.messageDanger() <Badge text="1.7.0+" /> {#popup-message-danger}

> <DVersionSupport package="plugin" version="1.7.0" />

创建一个危险主题的消息弹出层。

### 类型

```ts
function messageDanger(
	message: string,
	options?: MessageOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type MessageOptionWithoutTheme = {
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 位置
	 *
	 * - 默认值为 `center`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数为提示内容文本，第二个参数为提示选项，选填。

和 `messgae` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Message 消息 快速使用主题](/guide-plugin-preset/message#快速使用主题)
