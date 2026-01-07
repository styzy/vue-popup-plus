---
pageClass: api
outline: 2
---

# Toast 提示 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.toast()

创建一个轻量提示弹出层。

### 类型

```ts
function toast(message: string, options?: ToastOption): Promise<void>
```

### 参数类型

```ts
type ToastOption = {
	/**
	 * 主题
	 *
	 * - 默认值： 'primary'
	 */
	theme?: Theme
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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
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
popup.toast('这是一条轻量提示')
```

```ts
// 异步等待
await popup.toast('这是一条轻量提示')
// 只有提示消失后，才会继续执行后续代码
console.log('提示消失后，继续执行后续代码')
```

### 相关参考

- [预置插件指南 - Toast 轻量提示](/guide-plugin-preset/toast)

## popup.toastPrimary() <Badge text="1.6.0+" /> {#popup-toast-primary}

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个主要主题的轻量提示弹出层。

### 类型

```ts
function toastPrimary(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
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

和 `toast` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 轻量提示 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toastSuccess() <Badge text="1.6.0+" /> {#popup-toast-success}

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个成功主题的轻量提示弹出层。

### 类型

```ts
function toastSuccess(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
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

和 `toast` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 轻量提示 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toastInfo() <Badge text="1.6.0+" /> {#popup-toast-info}

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个信息主题的轻量提示弹出层。

### 类型

```ts
function toastInfo(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
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

和 `toast` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 轻量提示 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toastWarning() <Badge text="1.6.0+" /> {#popup-toast-warning}

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个警告主题的轻量提示弹出层。

### 类型

```ts
function toastWarning(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
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

和 `toast` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 轻量提示 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toastDanger() <Badge text="1.6.0+" /> {#popup-toast-danger}

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个危险主题的轻量提示弹出层。

### 类型

```ts
function toastDanger(
	message: string,
	options?: ToastOptionWithoutTheme
): Promise<void>
```

### 参数类型

```ts
type ToastOptionWithoutTheme = {
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
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
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

和 `toast` 方法唯一的区别是，提示选项的 `theme` 属性不可用。

### 相关参考

- [预置插件指南 - Toast 轻量提示 快速使用主题](/guide-plugin-preset/toast#快速使用主题)

## popup.toast.success() <Badge text="1.5.0+" /> <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>

创建一个成功主题的轻量提示弹出层。

::: danger
该方法因为静态方法的局限性，从 <DVersion package="plugin" version="1.6.0" /> 开始已被弃用，请使用 [popup.toastSuccess()](#popup-toast-success) 方法代替。
:::

## popup.toast.info() <Badge text="1.5.0+" /> <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>

创建一个信息主题的轻量提示弹出层。

::: danger
该方法因为静态方法的局限性，从 <DVersion package="plugin" version="1.6.0" /> 开始已被弃用，请使用 [popup.toastInfo()](#popup-toast-info) 方法代替。
:::

## popup.toast.warning() <Badge text="1.5.0+" /> <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>

创建一个警告主题的轻量提示弹出层。

::: danger
该方法因为静态方法的局限性，从 <DVersion package="plugin" version="1.6.0" /> 开始已被弃用，请使用 [popup.toastWarning()](#popup-toast-warning) 方法代替。
:::

## popup.toast.danger() <Badge text="1.5.0+" /> <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>

创建一个危险主题的轻量提示弹出层。

::: danger
该方法因为静态方法的局限性，从 <DVersion package="plugin" version="1.6.0" /> 开始已被弃用，请使用 [popup.toastDanger()](#popup-toast-danger) 方法代替。
:::
