---
pageClass: api
outline: 2
---

# 组合式工具 API

## usePopupInstanceId() <Badge  text="1.6.0+" /> {#use-popup-instance-id}

> <DVersionSupport version="1.6.0" />

获取当前组件所在弹出层的实例 ID。

### 类型

```ts
function usePopupInstanceId(): InstanceId | undefined
```

### 详细信息

如果当前组件并不是通过弹出层渲染，则返回 `undefined`。

### 示例

```ts [HelloWorld.vue]
// 弹出层渲染的组件
import { usePopup, usePopupInstanceId } from 'vue-popup-plus'

const popup = usePopup()
// 通过断言确保非空
const instanceId = usePopupInstanceId()! // [!code highlight]

function handleClose() {
	popup.close(instanceId)
}
```

### 相关参考

- [指南 - 销毁弹出层 获取弹出层实例 ID](/guide/destroy#获取弹出层实例-id)

## usePopupComputedStyle() <Badge  text="1.6.0+" /> {#use-popup-computed-style}

> <DVersionSupport version="1.6.0" />

获取当前弹出层的渲染组件的计算样式。

### 类型

```ts
function usePopupComputedStyle(): ComputedStyle | undefined

type ComputedStyle = ComputedRef<{
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

返回的所有样式都是具有响应性的，方便开发者获取当前弹出层视图的实时计算样式。

如果当前组件并不是通过弹出层渲染，则返回 `undefined`。

### 相关参考

- [插件 - 辅助功能 获取渲染组件实时样式](/plugin/helper#获取渲染组件实时样式)
