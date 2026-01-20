---
pageClass: api
outline: 2
---

# Drawer 抽屉 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.drawer() <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个抽屉弹出层。

### 类型

```ts
function drawer<T extends any = any>(options: DrawerOption): Promise<T | void>
```

### 参数类型

```ts
type DrawerOption = {
	/**
	 * 抽屉标题
	 *
	 * - 默认值为 `抽屉`
	 */
	title?: string
	/**
	 * 抽屉内容组件
	 */
	component: Component
	/**
	 * 抽屉内容组件props
	 */
	componentProps?: Record<string, any>
	/**
	 * 抽屉渲染完成时调用的回调函数
	 */
	onMounted?: () => void
	/**
	 * 是否显示抽屉标题栏
	 *
	 * - 默认值为 `true`
	 */
	header?: boolean
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 抽屉尺寸
	 *
	 * - 默认值为 `auto`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表高度
	 * - 支持 `string` 或 `number` 类型
	 */
	size?: string | number
	/**
	 * 抽屉最大尺寸
	 *
	 * - 默认值为 `100%`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表抽屉最大宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表抽屉最大高度
	 * - 支持 `string` 或 `number` 类型
	 */
	maxSize?: string | number
	/**
	 * 抽屉最小尺寸
	 *
	 * - 默认值为 `auto`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表抽屉最小宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表抽屉最小高度
	 * - 支持 `string` 或 `number` 类型
	 */
	minSize?: string | number
	/**
	 * 抽屉位置
	 *
	 * - 默认值为 `right`
	 */
	placement?: Placement
	/**
	 * 是否显示抽屉遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 */
	maskTransparent?: boolean
	/**
	 * 点击遮罩层是否关闭抽屉
	 *
	 * - 默认值为 `true` ，点击遮罩层将关闭抽屉
	 * - 传入 `false` ，点击遮罩层不会关闭抽屉
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将关闭抽屉，可传入关闭携带的负载参数，返回的
	 *   `Promise` 对象会在抽屉关闭动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有效
	 */
	maskClose?: boolean | MaskDestroyHandler
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 */
	zIndex?: number
}

// 抽屉位置
type Placement = 'top' | 'right' | 'bottom' | 'left'
```

### 详细信息

第一个参数为抽屉选项，必填，其中的 `component` 为抽屉内容组件，必填。

函数返回一个 `Promise` 对象，用于获取返回数据后继续执行后续代码。

### 示例

```ts
// 直接调用
popup.drawer({
	component: () => import('./HelloDrawer.vue'),
	componentProps: {
		/** HelloDrawer 组件的 props */
	},
})
```

```ts
// 异步等待
const result: string | void = await popup.drawer({
	component: () => import('./HelloDrawer.vue'),
	componentProps: {
		/** HelloDrawer 组件的 props */
	},
})

if (result === undefined) {
	console.log('没有返回数据')
} else {
	console.log('返回数据为：' + result)
}
```

### 相关参考

- [预置插件指南 - Drawer 抽屉](/guide-plugin-preset/drawer)

## popup.drawerClose() <Badge text="1.6.0+" /> {#popup-drawer-close}

> <DVersionSupport package="plugin" version="1.6.0" />

关闭当前显示的抽屉弹出层。

### 类型

```ts
function drawerClose(payload?: any): Promise<void>
```

### 详细信息

关闭当前显示的抽屉弹出层。

- 如果不存在显示的抽屉弹出层，调用该方法不会有任何效果，`debugMode 调试模式` 开启的情况下，将会在控制台输出警告信息。

- 可以传递一个可选参数 `payload`，用于在关闭时传递数据，打开该抽屉弹出层的 `popup.drawer()` 函数所返回的 `Promise` 对象将会 `resolve` 该数据。

- 调用关闭函数后，会返回一个 `Promise` 对象，用于等待弹出层关闭动画完成。

### 示例

```ts
// 直接调用
popup.drawerClose()
```

```ts
// 异步等待
await popup.drawerClose()
console.log('抽屉弹出层已关闭')
```

```ts
// 传递数据
popup.drawerClose('关闭成功')

// 异步等待
const result = await popup.drawer()
console.log(result) // '关闭成功'
```

### 相关参考

- [预置插件指南 - Drawer 抽屉 关闭抽屉](/guide-plugin-preset/drawer#关闭抽屉)
