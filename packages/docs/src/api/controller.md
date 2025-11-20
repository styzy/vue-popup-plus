---
pageClass: api
outline: 2
---

# 控制器实例 API

## createPopup()

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
	 * - 开启后，所有的弹出层将以 Vue app 应用实例的方式创建，可通过 Vue DevTools
	 *   开发者工具直接访问到内部的相关组件，方便开发者调试。
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

## popup.render()

渲染一个弹出层，返回该弹出层实例 ID。

### 类型

```ts
function render(options: RenderOption): InstanceId
```

### 参数类型

```ts
type RenderOption = RenderConfigOptions &
	RenderComponentOptions &
	RenderStyleOptions

type RenderConfigOptions = {
	/**
	 * 弹出层挂载的父元素
	 *
	 * - 不指定时，默认挂载到 body 元素下
	 */
	appendTo?: Element | string
	/**
	 * 弹出层是否显示遮罩层
	 *
	 * - 默认值为 true
	 */
	mask?: boolean
	/**
	 * 点击遮罩层是否关闭弹出层
	 *
	 * - 默认值为 false ，仅在 mask 为 true 时有效
	 */
	maskClickClose?: boolean
	/**
	 * 弹出层是否禁用窗口滚动
	 *
	 * - 默认值为 true
	 */
	disableScroll?: boolean
}

type RenderComponentOptions = {
	/**
	 * 弹出层渲染的组件
	 *
	 * - 要创建一个弹出层，这是唯一必要的参数。
	 * - 支持同步组件和异步组件，为了提高加载速度，优化构建体积，建议使用异步组件。
	 * - 对于异步组件，无需使用 `defineAsyncComponent` 方法定义组件，直接传入
	 *   ()=>import() 函数即可。
	 */
	component: Component
	/**
	 * 弹出层渲染组件的 props ，会传递给弹出层组件
	 */
	componentProps?: Record<string, any>
	/**
	 * 弹出层渲染之后的回调
	 */
	onMounted?: () => void
	/**
	 * 弹出层关闭之后的回调，触发时会将destroy() 方法的负载参数 payload 作为参数传入
	 */
	onUnmounted?: (payload?: any) => void
}

type RenderStyleOptions = {
	/**
	 * 弹出层宽度
	 *
	 * - 默认为 auto，即自适应，支持 string 和 number 类型，string
	 *   类型更为灵活，number 类型方便计算
	 */
	width?: string | number
	/**
	 * 弹出层最大宽度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	maxWidth?: string | number
	/**
	 * 弹出层最小宽度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	minWidth?: string | number
	/**
	 * 弹出层高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	height?: string | number
	/**
	 * 弹出层最大高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	maxHeight?: string | number
	/**
	 * 弹出层最小高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	minHeight?: string | number
	/**
	 * 弹出层视图动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 */
	viewAnimation?: Animation
	/**
	 * 弹出层视图水平偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 */
	viewTranslateX?: number
	/**
	 * 弹出层视图垂直偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 */
	viewTranslateY?: number
	/**
	 * 弹出层视图是否允许超出窗口边界
	 *
	 * - 默认为 false
	 */
	viewTranslateOverflow?: boolean
	/**
	 * 弹出层遮罩动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 */
	maskAnimation?: Animation
	/**
	 * 弹出层遮罩是否启用模糊效果，默认为 true
	 */
	maskBlur?: boolean
	/**
	 * 弹出层动画时长
	 *
	 * - 默认为 100 ，单位为 毫秒
	 */
	animationDuration?: number
	/**
	 * 弹出层 zIndex
	 *
	 * - 若不设置，则使用全局递增的 zIndex 值
	 */
	zIndex?: number
}
```

### 详细信息

`component` 是唯一的必填参数，支持同步组件和异步组件。建议使用异步组件，当弹出层未渲染时，将不会加载其代码，从而优化加载速度和构建体积。

`viewAnimation` 和 `maskAnimation` 仅支持动画类型常量 `POPUP_ANIMATIONS` 中提供的动画类型，具体可以参考 [全局 API - 动画类型](/api/animation)。

### 示例

```ts
import HelloWorld from './HelloWorld.vue'

// 同步组件
popup.render({
	component: HelloWorld,
})

// 异步组件
popup.render({
	component: () => import('./HelloWorld.vue'),
})
```

### 相关参考

- [指南 - 渲染弹出层](/guide/render)

## popup.update()

更新弹出层的渲染参数。

### 类型

```ts
function update(instanceId: InstanceId, options: UpdateOption): void
```

### 参数类型

```ts
type UpdateOption = {
	/**
	 * 弹出层宽度
	 *
	 * - 默认为 auto，即自适应，支持 string 和 number 类型，string
	 *   类型更为灵活，number 类型方便计算
	 */
	width?: string | number
	/**
	 * 弹出层最大宽度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	maxWidth?: string | number
	/**
	 * 弹出层最小宽度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	minWidth?: string | number
	/**
	 * 弹出层高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	height?: string | number
	/**
	 * 弹出层最大高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	maxHeight?: string | number
	/**
	 * 弹出层最小高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 */
	minHeight?: string | number
	/**
	 * 弹出层视图动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 */
	viewAnimation?: Animation
	/**
	 * 弹出层视图水平偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 */
	viewTranslateX?: number
	/**
	 * 弹出层视图垂直偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 */
	viewTranslateY?: number
	/**
	 * 弹出层视图是否允许超出窗口边界
	 *
	 * - 默认为 false
	 */
	viewTranslateOverflow?: boolean
	/**
	 * 弹出层遮罩动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 */
	maskAnimation?: Animation
	/**
	 * 弹出层遮罩是否启用模糊效果，默认为 true
	 */
	maskBlur?: boolean
	/**
	 * 弹出层动画时长
	 *
	 * - 默认为 100 ，单位为 毫秒
	 */
	animationDuration?: number
	/**
	 * 弹出层 zIndex
	 *
	 * - 若不设置，则使用全局递增的 zIndex 值
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数是弹出层实例 ID，第二个参数是更新选项。

只允许更新和样式有关的渲染参数，因为其他参数会在弹出层渲染时确定，无法动态更新。

### 示例

```ts
popup.update(instanceId, {
	width: '50%',
})
```

### 相关参考

- [指南 - 更新弹出层](/guide/update)

## popup.destroy()

销毁弹出层。

### 类型

```ts
function destroy(instanceId: InstanceId, payload?: any): void
```

### 详细信息

第一个参数是弹出层实例 ID，第二个参数是可选的自定义数据，如果渲染弹出层时传入了 `onUnmounted` 回调函数，
则会将该数据作为参数传递给回调函数。

### 示例

```ts
const instanceId = popup.render({
	component: () => import('./HelloWorld.vue'),
	onUnmounted: (payload) => {
		// 弹出层销毁时将获取自定义数据
		console.log(payload) // 'This is a custom payload'
	},
})

// 销毁弹出层时传递自定义数据
popup.destroy(instanceId, 'This is a custom payload')
```

### 相关参考

- [指南 - 销毁弹出层](/guide/destroy)

## popup.use()

注册插件，只需要调用一次即可。名称冲突的插件无法注册。

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
import { usePopup } from 'vue-popup-plus'
import { presetPlugin } from 'vue-popup-plus-plugin-preset'

const popup = usePopup()

popup.use(presetPlugin)
```

### 相关参考

- [插件 - 注册插件](/plugin/register)

## popup.version

提供当前所使用的 Vue Popup Plus 版本号，这在 [插件](/plugin/introduction) 中很有用，因为插件可能需要针对不同的版本进行适配。

### 类型

```ts
const version: string
```

### 详细信息

Vue Popup Plus 版本号，格式为 `x.y.z`，其中 `x` 为主版本号，`y` 为次版本号，`z` 为修订版本号。

主版本号一般不会改变。

次版本号更新意味着包含存在兼容性改动，需要注意升级时的影响。

修订版本号更新意味着只包含 bug 修复和性能优化，不会引入新的功能或兼容性问题。

### 示例

```ts
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

console.log(popup.version)
```

### 相关参考

- [全局 API - version](/api/common#version)
