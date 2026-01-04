---
pageClass: api
outline: 2
---

# Toast 提示 API

## popup.toast()

创建一个消息弹出层。

### 类型

```ts
function toast(message: string, options?: ToastOption): Promise<void>
```

### 参数类型

```ts
type ToastOption = {
	/**
	 * 消息主题
	 *
	 * - 默认值： 'default'
	 */
	theme?: Theme
	/**
	 * 消息显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 消息位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 * @since 1.5.0
	 */
	hoverWait?: boolean
}

// 消息主题
type Theme = 'primary' | 'info' | 'success' | 'warning' | 'danger'

// 消息位置
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

第一个参数为消息内容文本，第二个参数为消息选项，选填。

函数返回一个 `Promise` 对象，用于等待消息消失后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.toast('这是一条消息内容文本')
```

```ts
// 异步等待
await popup.toast('这是一条消息内容文本')
// 只有消息消失后，才会继续执行后续代码
console.log('消息消失后，继续执行后续代码')
```

### 相关参考

- [预置插件指南 - Toast 消息](/guide-plugin-preset/toast)

## popup.toast.success() <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

创建一个成功主题的消息弹出层。

### 类型

```ts
function success(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
	/**
	 * 消息显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 消息位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 * @since 1.5.0
	 */
	hoverWait?: boolean
}
```

### 详细信息

第一个参数为消息内容文本，第二个参数为消息选项，选填。

和 `toast` 方法唯一的区别是，消息选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 消息 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toast.info() <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

创建一个信息主题的消息弹出层。

### 类型

```ts
function info(message: string, options?: ToastOptionWithoutTheme): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
	/**
	 * 消息显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 消息位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 * @since 1.5.0
	 */
	hoverWait?: boolean
}
```

### 详细信息

第一个参数为消息内容文本，第二个参数为消息选项，选填。

和 `toast` 方法唯一的区别是，消息选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 消息 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toast.warning() <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

创建一个警告主题的消息弹出层。

### 类型

```ts
function warning(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
	/**
	 * 消息显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 消息位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 * @since 1.5.0
	 */
	hoverWait?: boolean
}
```

### 详细信息

第一个参数为消息内容文本，第二个参数为消息选项，选填。

和 `toast` 方法唯一的区别是，消息选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 消息 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toast.danger() <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

创建一个危险主题的消息弹出层。

### 类型

```ts
function danger(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
	/**
	 * 消息显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 消息位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 * @since 1.5.0
	 */
	hoverWait?: boolean
}
```

### 详细信息

第一个参数为消息内容文本，第二个参数为消息选项，选填。

和 `toast` 方法唯一的区别是，消息选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 消息 快速使用主题](/guide-plugin-preset/toast#快速使用主题)
