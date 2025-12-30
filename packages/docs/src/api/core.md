---
pageClass: api
outline: 2
---

# 核心实例 API

## createPopupPlus() <Badge text="1.6.0+" /> {#create-popup-plus}

> <DVersionSupport version="1.6.0" />

创建一个 `Vue Popup Plus` 插件的核心实例。

### 类型

```ts
function createPopupPlus(options?: ConfigOption): PupupPlus
```

### 参数类型

```ts
type ConfigOption = {
	/**
	 * 弹出层 zIndex 基础值
	 *
	 * - 默认为1000，每次生成弹出层时，除非 render() 方法传入
	 *   zIndex，否则使用此基础值，每次使用后会自动递增
	 */
	zIndex?: number
	/**
	 * 是否自动禁用滚动
	 *
	 * - 默认为 true
	 * - 开启后，弹出层显示时会自动禁用页面滚动
	 */
	autoDisableScroll?: boolean
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 *
	 * - 默认为 $popup ，这在使用 选项式 API 时可以在组件内通过 this.$popup
	 *   访问控制器实例，可以使用该属性自定义挂载属性名
	 */
	prototypeName?: string
	/**
	 * 日志器
	 *
	 * - 默认使用内置的日志器，仅会在开启调试模式时在控制台输出日志
	 * - 你可以自定义日志器，需要注意日志的接收将不会受到调试模式的影响，
	 *   无论调试模式是否开启，日志都将被传递给自定义的日志器。
	 */
	logHandler?: ILogHandler
	/**
	 * 开启调试模式
	 *
	 * - 默认为 false
	 * - 注意：开启调试模式可能会影响到性能，不建议在生产环境开启。
	 * - 开启后，将会在控制台输出日志，同时如果未注册根组件，调试模式下
	 *   将会使用 Vue App 实例渲染弹出层，方便开发者调试。
	 */
	debugMode?: boolean
}
```

### 详细信息

对于 `prototypeName` 选项，如果你使用 `TypeScript` ，需要手动同步添加类型扩展，扩展代码可以放在一个 `.ts` 文件，或是一个影响整个项目的 `*.d.ts` 文件中。

```ts
declare module 'vue' {
	interface ComponentCustomProperties {
		$customPopup: typeof popup
	}
}
```

### 示例

```ts
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)

const PopupPlus = createPopupPlus()

app.use(PopupPlus)
```

### 相关参考

- [指南 - 初始化](/guide/initialization)

## createPopup() <Badge type="danger" text="1.6.0-" /> {#create-popup}

> <DVersionSupport version="1.6.0" deprecated />

::: danger
该方法已被废弃，请使用 [createPopupPlus()](/api/core#create-popup-plus) 作为替代。
:::

创建一个弹出层控制器实例。

### 类型

```ts
function createPopup(options?: CreateOptions): PopupController
```

### 参数类型

```ts
type CreateOptions = {
	/**
	 * 弹出层 zIndex 基础值
	 *
	 * - 默认为1000，每次生成弹出层时，除非 render() 方法传入
	 *   zIndex，否则使用此基础值，每次使用后会自动递增
	 */
	zIndex?: number
	/**
	 * 是否自动禁用滚动
	 *
	 * - 默认为 true
	 * - 开启后，弹出层显示时会自动禁用页面滚动
	 */
	autoDisableScroll?: boolean
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 *
	 * - 默认为 $popup ，这在使用 选项式 API 时可以在组件内通过 this.$popup
	 *   访问控制器实例，可以使用该属性自定义挂载属性名
	 */
	prototypeName?: string
	/**
	 * 开启调试模式
	 *
	 * - 默认为 false
	 * - 注意：开启调试模式可能会影响到性能，不建议在生产环境开启。
	 * - 开启后，将会在控制台输出日志，同时如果未注册根组件，调试模式下
	 *   将会使用 Vue App 实例渲染弹出层，方便开发者调试。
	 */
	debugMode?: boolean
}
```

### 详细信息

对于 `prototypeName` 选项，如果你使用 `TypeScript` ，需要手动同步添加类型扩展，扩展代码可以放在一个 `.ts` 文件，或是一个影响整个项目的 `*.d.ts` 文件中。

```ts
declare module 'vue' {
	interface ComponentCustomProperties {
		$customPopup: typeof popup
	}
}
```

### 示例

```ts
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)

const popup = createPopup()

app.use(popup)
```

### 相关参考

- [指南 - 初始化](/guide/initialization)

## PopupPlus.use() <Badge text="1.6.0+" /> {#popup-plus-use}

> <DVersionSupport version="1.6.0" />

注册 `Vue Popup Plus` 插件，只需要调用一次即可。名称冲突的插件无法注册。

### 类型

```ts
function use(plugin: Plugin, options?: any): void
```

### 详细信息

第一个参数是插件实例，第二个参数是可选的插件注册选项。

插件实例是由 [definePlugin()](/api/common#define-plugin) 函数所定义的插件实例。

插件注册选项由插件开发者定义，具体需要参考对应的插件文档。

### 示例

```ts
import { createPopupPlus } from 'vue-popup-plus'
import { plugin } from 'vue-popup-plus-plugin-preset'

const PopupPlus = createPopupPlus()

PopupPlus.use(plugin)
```

### 相关参考

- [插件 - 注册插件](/plugin/register)

## PopupPlus.version <Badge text="1.6.0+" /> {#popup-plus-version}

> <DVersionSupport version="1.6.0" />

提供当前所使用的 `Vue Popup Plus` 版本号，这在 [插件](/plugin/introduction) 中很有用，因为插件可能需要针对不同的版本进行适配。

### 类型

```ts
const version: Version

type Version = `${number}.${number}.${number}`
```

### 详细信息

`Vue Popup Plus` 版本号，格式为 `x.y.z`，其中 `x` 为主版本号，`y` 为次版本号，`z` 为修订版本号。

主版本号一般不会改变。

次版本号更新意味着包含存在兼容性改动，需要注意升级时的影响。

修订版本号更新意味着只包含 bug 修复和性能优化，不会引入新的功能或兼容性问题。

### 示例

```ts
import { usePopupPlus } from 'vue-popup-plus'

const PopupPlus = usePopupPlus()

console.log(PopupPlus.version)
```

### 相关参考

- [核心 API - 控制器实例 popup.version](/api/controller#popup-version)
- [核心 API - 通用 version](/api/common#version)
