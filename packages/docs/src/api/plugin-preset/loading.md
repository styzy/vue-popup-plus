---
pageClass: api
outline: 2
---

# Loading 加载遮罩 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

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
	 *
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
	 *
	 * @since 1.5.0
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.3
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
}

// 加载遮罩主题
type Theme = 'primary' | 'info' | 'success' | 'warning' | 'danger'
```

### 详细信息

第一个参数为加载遮罩选项，选填。

在 <DVersion package="plugin" version="1.5.0" /> 版本之前，该方法返回一个关闭加载弹出层的函数，调用后关闭加载弹出层。

对于 <DVersion package="plugin" version="1.5.x" /> 版本，该方法返回 `void`，关闭加载遮罩可以使用 [popup.loading.close()](#popup-loading-close-1) 方法。

从 <DVersion package="plugin" version="1.6.0" plus/> 版本开始，该方法返回 `void`，关闭加载遮罩可以使用 [popup.loadingClose()](#popup-loading-close) 方法。

### 示例

```ts
// 打开加载遮罩
popup.loading()

// 1.6.0 版本之后
// 关闭加载遮罩
popup.loadingClose()

// 1.5.x 版本
// 关闭加载遮罩
popup.loading.close()

const stopLoading = popup.loading()

// 1.5.0 版本之前
// 关闭加载遮罩
stopLoading()
```

### 相关参考

- [预置插件指南 - Loading 加载](/guide-plugin-preset/loading)

## popup.loadingClose() <Badge text="1.6.0+" /> {#popup-loading-close}

> <DVersionSupport package="plugin" version="1.6.0" />

关闭当前显示的加载遮罩。

### 类型

```ts
function loadingClose(): Promise<void>
```

### 详细信息

- 如果不存在显示的加载遮罩，调用该方法不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

- 调用关闭函数后，会返回一个 `Promise` 对象，用于等待加载遮罩关闭动画完成。

### 示例

```ts
// 直接调用
popup.loadingClose()
```

```ts
// 异步等待
await popup.loadingClose()
console.log('加载遮罩已关闭')
```

### 相关参考

- [预置插件指南 - Loading 加载 关闭加载遮罩](/guide-plugin-preset/loading#关闭加载遮罩)

## popup.loading.close() <Badge text="1.5.0+" /> <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>

关闭当前显示的加载遮罩。

::: danger
该方法因为静态方法的局限性，从 <DVersion package="plugin" version="1.6.0" /> 开始已被弃用，请使用 [popup.loadingClose()](#popup-loading-close) 方法代替。
:::
