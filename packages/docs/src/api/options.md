---
pageClass: api
outline: 2
---

# 选项式工具 API

## $popup

获取弹出层控制器实例。

### 类型

```ts
const $popup: IController
```

### 详细信息

弹出层控制器实例，已自动同步当前组件上下文。

### 示例

```ts
export default defineComponent({
	methods: {
		handlePopup() {
			this.$popup.render({
				component: () => import('./HelloWorld.vue'),
			})
		},
	},
})
```

### 相关参考

- [指南 - 获取控制器实例](/guide/controller#获取控制器实例)
- [核心 API - 控制器实例 usePopup()](/api/controller#use-popup)

## $popupInstanceId <Badge text="1.6.0+" /> {#popup-instance-id}

> <DVersionSupport version="1.6.0" />

获取当前组件所在弹出层的实例 ID。

### 类型

```ts
const $popupInstanceId: InstanceId | undefined
```

### 详细信息

如果当前组件并不是通过弹出层渲染，则返回 `undefined`。

### 示例

```ts
export default defineComponent({
	methods: {
		handleClose() {
			this.$popup.destroy(this.$popupInstanceId!)
		},
	},
})
```

### 相关参考

- [指南 - 销毁弹出层 获取弹出层实例ID](/guide/destroy#获取弹出层实例id)
- [核心 API - 组合式工具 usePopupInstanceId()](/api/composition-api#use-popup-instance-id)

## $popupComputedStyle <Badge text="1.6.0+" /> {#popup-computed-style}

> <DVersionSupport version="1.6.0" />

获取当前组件所在弹出层的计算样式。

### 类型

```ts
const $popupComputedStyle: ComputedStyle | undefined
```

### 详细信息

返回的所有样式都是具有响应性的，方便开发者获取当前弹出层视图的实时计算样式。

如果当前组件并不是通过弹出层渲染，则返回 `undefined`。

### 示例

```ts
export default defineComponent({
	watch: {
		$popupComputedStyle(newStyle) {
			console.log('$popupComputedStyle changed: ', newStyle)
		},
	},
})
```

### 相关参考

- [插件 - 辅助功能 获取渲染组件实时样式](/plugin/helper#获取渲染组件实时样式)
- [核心 API - 组合式工具 usePopupComputedStyle()](/api/composition-api#use-popup-computed-style)
