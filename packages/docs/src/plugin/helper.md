# 辅助功能

::: tip
本文档主要包括专为 `插件开发者` 提供的辅助功能。
:::

## 获取渲染组件实时样式 <Badge text="1.6.0+" />

> <DVersionSupport version="1.6.0" />

插件开发者在开发插件时，可能需要获取当前弹出层视图的实时计算样式，例如实时获取弹出层的宽度、高度、位置等，对此我们提供了相应的功能支持。

### 组合式 API

对于 **组合式 API** ，我们提供了 `usePopupComputedStyle()` 组合式工具函数，该函数会返回当前弹出层视图的实时计算样式对象。

```ts
import { usePopupComputedStyle } from 'vue-popup-plus'

const popupComputedStyle = usePopupComputedStyle()!

watch(popupComputedStyle, (newStyle) => {
	console.log(`样式更新：`, newStyle)
})
```

具体可以参考 [核心 API - 组合式工具 usePopupComputedStyle()](/api/composition-api#use-popup-computed-style)。

### 选项式 API

同样的对于 **选项式 API** ，我们也提供了 `$popupComputedStyle` 计算属性，该属性会返回当前弹出层视图的实时计算样式对象。

```ts
export default defineComponent({
	watch: {
		$popupComputedStyle(newStyle) {
			console.log(`样式更新：`, newStyle)
		},
	},
})
```

具体可以参考 [核心 API - 选项式工具 $popupComputedStyle](/api/options#$popup-computed-style)。
