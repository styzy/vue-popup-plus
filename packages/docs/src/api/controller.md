---
pageClass: api
outline: 2
---

# 控制器实例 API

## usePopup() {#use-popup}

获取弹出层控制器实例。

### 类型

```ts
function usePopup(): PopupController
```

### 详细信息

作为增强型的 `Vue` 组合式工具函数，除了在组件内使用，还可以在任何非组件的地方使用。

唯一的前提是需要先调用 [createPopupPlus()](/api/core#create-popup-plus) 方法创建一个核心实例，并将其安装到 `app` 实例上。

### 示例

```ts [组合式 API ~vscode-icons:file-type-vue~]
// 在组件内使用
import { onMounted } from 'vue'
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

onMounted(() => {
	popup.render({
		component: () => import('./HelloPopup.vue'),
	})
})
```

```ts [router.ts]
// 在独立文件中使用
import { usePopup } from 'vue-popup-plus'
import { createRouter, createWebHashHistory } from 'vue-router'

const popup = usePopup()

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: () => import('./Home.vue') },
		{ path: '/login', component: () => import('./Login.vue') },
	],
})

router.beforeEach((to, from, next) => {
	if (!checkAuth() && to.path !== '/login') {
		popup.render({
			component: () => import('./HelloPopup.vue'),
		})
	} else {
		next()
	}
})
```

## popup.render()

渲染一个弹出层，返回该弹出层实例 ID。

### 类型

```ts
function render(options: PopupRenderOption): PopupInstanceId
```

### 参数类型

````ts
// 渲染组件选项
export type PopupRenderComponentOption<TComponent extends Component> = {
	/**
	 * 弹出层渲染的视图组件
	 *
	 * - 要创建一个弹出层，这是唯一必要的参数。
	 * - 支持同步组件和异步组件，为了提高加载速度，优化构建体积，建议使用异步组件。
	 * - 对于异步组件，无需使用 `defineAsyncComponent` 方法定义组件，直接传入
	 *   ()=>import() 函数即可。
	 *
	 * - 使用示例：
	 * ```ts
	 * // 异步组件
	 * popup.render({
	 * 	component: () => import('path/Demo.vue'),
	 * })
	 *
	 * // 同步组件
	 * import Demo from 'path/Demo.vue'
	 * popup.render({
	 * 	component: Demo,
	 * })
	 * ```
	 */
	component: TComponent
	/**
	 * 弹出层渲染的视图组件的 props
	 *
	 * - 除了组件的属性，还支持传入组件的事件监听器，事件监听器的名称需要以
	 *   `on` 开头，例如 `onClick` 、 `onInput` 等。
	 * - 会自动根据传入的组件进行类型推导，提供完善的类型提示
	 */
	componentProps?: ExtractComponentPropTypes<TComponent>
	/**
	 * 弹出层渲染之后的回调
	 */
	onMounted?: () => void
	/**
	 * 弹出层销毁之后的回调
	 *
	 * - 触发时会将 popup.destroy() 方法的负载参数 payload 作为参数传入
	 */
	onUnmounted?: (payload?: any) => void
}

// 渲染配置选项
export type PopupRenderConfigOption = {
	/**
	 * 弹出层位置
	 *
	 * - 默认为 `'center'` ，即居中显示
	 * - 在使用 `anchor` 参数指定锚点元素时无效
	 *
	 * - 可选值包括：
	 *   - `left-top` ：左侧顶部
	 *   - `left` ：左侧居中
	 *   - `left-bottom` ：左侧底部
	 *   - `top` ：顶部居中
	 *   - `center` ：居中
	 *   - `bottom` ：底部居中
	 *   - `right-top` ：右侧顶部
	 *   - `right` ：右侧居中
	 *   - `right-bottom` ：右侧底部
	 *
	 * @since 1.5.0
	 */
	placement?: PopupPlacement
	/**
	 * 弹出层挂载的父元素
	 *
	 * - 默认值为 `'body'` ，即挂载到 body 元素下
	 */
	appendTo?: HTMLElement | string
	/**
	 * 弹出层渲染期间是否禁用窗口滚动
	 *
	 * - 默认值为 `false`
	 *
	 * - 1.7.0 之前，该选项默认值为 `true` ，
	 */
	disableScroll?: boolean
	/**
	 * 弹出层动画时长
	 *
	 * - 默认为 `100` ，单位为 毫秒
	 */
	animationDuration?: number
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
	viewport?: HTMLElement | string | null
	/**
	 * 弹出层 zIndex
	 *
	 * - 若不设置，则使用全局递增的 zIndex 值
	 */
	zIndex?: number
}

// 渲染样式选项
export type PopupRenderStyleOption = {
	/**
	 * 弹出层宽度
	 *
	 * - 默认为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * width: 300
	 * width: '300px'
	 * width: '50%'
	 * width: 'inherit'
	 */
	width?: string | number
	/**
	 * 弹出层最小宽度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * minWidth: 300
	 * minWidth: '300px'
	 * minWidth: '50%'
	 * minWidth: 'inherit'
	 */
	minWidth?: string | number
	/**
	 * 弹出层最大宽度
	 *
	 * - 默认为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * maxWidth: 300
	 * maxWidth: '300px'
	 * maxWidth: '50%'
	 * maxWidth: 'inherit'
	 */
	maxWidth?: string | number
	/**
	 * 弹出层高度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * height: 300
	 * height: '300px'
	 * height: '50%'
	 * height: 'inherit'
	 */
	height?: string | number
	/**
	 * 弹出层最小高度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * minHeight: 300
	 * minHeight: '300px'
	 * minHeight: '50%'
	 * minHeight: 'inherit'
	 */
	minHeight?: string | number
	/**
	 * 弹出层最大高度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * maxHeight: 300
	 * maxHeight: '300px'
	 * maxHeight: '50%'
	 * maxHeight: 'inherit'
	 */
	maxHeight?: string | number
}

// 渲染视图选项
export type PopupRenderViewOption = {
	/**
	 * 弹出层视图动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 * - 更多动画类型请查看 {@link IAnimations}
	 */
	viewAnimation?: Animation
	/**
	 * 弹出层视图水平偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 *
	 * @since 1.1.0
	 */
	viewTranslateX?: number
	/**
	 * 弹出层视图垂直偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 *
	 * @since 1.1.0
	 */
	viewTranslateY?: number
	/**
	 * 弹出层视图是否允许超出视区边界
	 *
	 * - 默认为 false
	 */
	viewTranslateOverflow?: boolean
}

// 渲染遮罩选项
export type PopupRenderMaskOption = {
	/**
	 * 弹出层是否显示遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 弹出层遮罩动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 * - 更多动画类型请查看 {@link IAnimations}
	 */
	maskAnimation?: Animation
	/**
	 * 弹出层遮罩是否启用透明效果
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 弹出层遮罩是否启用高斯模糊
	 *
	 * - 默认为 `false`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 点击遮罩层是否销毁弹出层
	 *
	 * - 默认值为 `false` ，点击遮罩层不会销毁弹出层
	 * - 传入 `true` ，点击遮罩层将销毁弹出层
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将销毁弹出层，可传入销毁携带的负载参数，返回的
	 *   `Promise` 对象会在弹出层销毁动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskDestroy?: boolean | PopupMaskDestroyHandler
}

// 渲染锚点选项
export type PopupRenderAnchorOption = {
	/**
	 * 弹出层位置的锚点元素
	 *
	 * - 默认值为 `null` ，即不使用锚点元素
	 * - 当指定某个元素时，弹出层将以该元素为锚点进行渲染
	 * - 传入字符串时，会根据字符串选择器查询元素
	 * - 可配合 `anchorPlacement` 参数指定弹出层的位置与对齐方式
	 * - 可配合 `anchorAdjust` 参数指定弹出层的相对视窗的调整方式
	 * - 可配合 `anchorClamp` 参数开启弹出层的视窗锁定
	 * - 可配合 `anchorViewport` 参数指定弹出层的视窗元素
	 *
	 * @since 1.7.0
	 */
	anchor?: HTMLElement | string | null
	/**
	 * 锚点弹出层位置与对齐方式
	 *
	 * - 默认为 `'top'` ，即顶部居中对齐
	 * - 指定弹出层渲染对于锚点的对齐方式
	 * - 仅在 `anchor` 参数指定锚点元素时有效
	 *
	 * - 可选值包括：
	 *   - `left-start` ：左侧，顶部对齐
	 *   - `left` ：左侧，居中对齐
	 *   - `left-end` ：左侧，底部对齐
	 *   - `top-start` ：顶部，左侧对齐
	 *   - `top` ：顶部，居中对齐
	 *   - `top-end` ：顶部，右侧对齐
	 *   - `bottom-start` ：底部，左侧对齐
	 *   - `bottom` ：底部，居中对齐
	 *   - `bottom-end` ：底部，右侧对齐
	 *   - `right-start` ：右侧，顶部对齐
	 *   - `right` ：右侧，居中对齐
	 *   - `right-end` ：右侧，底部对齐
	 *
	 * @since 1.7.0
	 */
	anchorPlacement?: PopupAnchorPlacement
	/**
	 * 锚点弹出层是否在视窗空间不足时进行翻转
	 *
	 * - 默认为 `false`，即不进行翻转
	 * - 当视窗空间不足时，自动进行翻转以保持弹出层在视窗范围内，
	 *   并在视窗空间满足渲染时恢复到原始定义的位置
	 *
	 * @since 1.7.0
	 */
	anchorFlip?: boolean
	/**
	 * 锚点弹出层自动翻转时的提前偏移量
	 *
	 * - 默认为 `0` ，即不提前偏移，与原始定义位置一致
	 * - 锚点弹出层计算是否需要进行翻转时的提前偏移量，主要用于
	 *   防止出现达到临界值时的闪烁现象
	 * - 仅在 `anchorFlip` 参数为 `true` 时有效
	 *
	 * @since 1.7.0
	 */
	anchorFlipAdvance?: number
	/**
	 * 锚点弹出层是否在视窗空间不足时进行平移
	 *
	 * - 默认为 `'none'`，即不进行平移
	 * - 当视窗空间不足时，自动进行平移以保持弹出层在视窗范围内，
	 *   并在视窗空间满足渲染时恢复到原始定义的位置
	 *
	 * - 可选值包括：
	 *   - `both` ：在主轴和侧轴上都进行平移，相当于完全
	 *     不会超出视窗范围
	 *   - `mainAxis` ：在主轴上进行平移
	 *   - `crossAxis` ：在侧轴上进行平移
	 *   - `none` ：不进行平移
	 *
	 * @since 1.7.0
	 */
	anchorShift?: PopupAnchorShift
}

export type PopupRenderOption<TComponent extends Component = Component> =
	PopupRenderComponentOption<TComponent> &
		PopupRenderConfigOption &
		PopupRenderStyleOption &
		PopupRenderViewOption &
		PopupRenderMaskOption &
		PopupRenderAnchorOption
````

### 详细信息

`component` 是唯一的必填参数，支持同步组件和异步组件。建议使用异步组件，当弹出层未渲染时，将不会加载其代码，从而优化加载速度和构建体积。

`viewAnimation` 和 `maskAnimation` 仅支持动画类型常量 `POPUP_ANIMATIONS` 中提供的动画类型，具体可以参考 [核心 API - 常量 POPUP_ANIMATIONS](/api/constants#popup_animations)。

### 示例

```ts
import HelloPopup from './HelloPopup.vue'

// 同步组件
popup.render({
	component: HelloPopup,
})

// 异步组件
popup.render({
	component: () => import('./HelloPopup.vue'),
})
```

### 相关参考

- [指南 - 渲染弹出层](/guide/render)

## popup.update()

更新弹出层的渲染选项。

### 类型

```ts
function update(instanceId: PopupInstanceId, options: PopupUpdateOption): void
```

### 参数类型

```ts
export type PopupUpdateOption = Omit<
	PopupRenderOption,
	'component' | 'disableScroll'
>
```

### 详细信息

第一个参数是弹出层实例 ID，第二个参数是更新选项。

`component` 和 `disableScroll` 不能更新，因为这些选项在弹出层渲染时确定，无法动态更新。

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
function destroy(instanceId: PopupInstanceId, payload?: any): void
```

### 详细信息

第一个参数是弹出层实例 ID，第二个参数是可选的自定义数据，如果渲染弹出层时传入了 `onUnmounted` 回调函数，
则会将该数据作为参数传递给回调函数。

### 示例

```ts
const instanceId = popup.render({
	component: () => import('./HelloPopup.vue'),
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

## popup.getComputedStyle() <Badge text="1.6.0+" /> {#popup-get-computed-style}

> <DVersionSupport version="1.6.0" />

获取弹出层视图的计算样式。

### 类型

```ts
function getComputedStyle(
	instanceId: PopupInstanceId
): PopupViewComputedStyle | null

type PopupViewComputedStyle = ComputedRef<{
	/**
	 * 弹出层的宽度
	 */
	width: number
	/**
	 * 弹出层的高度
	 */
	height: number
	/**
	 * 弹出层的 z-index
	 */
	zIndex: number
	/**
	 * 弹出层的 translateX
	 */
	translateX: number
	/**
	 * 弹出层的 translateY
	 */
	translateY: number
}>
```

### 详细信息

传入弹出层的实例 ID，当该弹出层视图已挂载时，返回该弹出层视图的计算样式。否则返回 `null`。

计算样式本质是一个 `Vue` 的计算属性。

### 示例

```ts
// 视图组件内
import { usePopup, usePopupInstanceId } from 'vue-popup-plus'

const popup = usePopup()
const instanceId = usePopupInstanceId()

function getComputedStyle() {
	const computedStyle = popup.getComputedStyle(instanceId)

	console.log(computedStyle?.value.width) // 弹出层的宽度
}
```

### 相关参考

- [指南 - 获取视图计算样式](/guide/get-computed-style)

## popup.use() <Badge type="danger" text="1.6.0-" />

> <DVersionSupport version="1.6.0" deprecated />

::: danger
该方法已被废弃，请使用 [PopupPlus.use()](/api/core#popup-plus-use) 作为替代。
:::

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
import { createPopup } from 'vue-popup-plus'
import { presetPlugin } from 'vue-popup-plus-plugin-preset'

const popup = createPopup()

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

`Vue Popup Plus` 版本号，格式为 `x.y.z`，其中 `x` 为主版本号，`y` 为次版本号，`z` 为修订版本号。

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

- [核心 API - 核心实例 PopupPlus.version](/api/core#popup-plus-version)
- [核心 API - 通用 version](/api/common#version)
