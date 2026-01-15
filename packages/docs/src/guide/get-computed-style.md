# 获取视图计算样式 <Badge text="1.6.0+" />

> <DVersionSupport version="1.6.0" />

视图计算样式是弹出层视图渲染后的样式，本质上是一个包含很多样式的响应式对象。

## 全局获取

通过 `popup.getComputedStyle()` 方法可以全局获取任何弹出层的视图计算样式，只需要传入一个弹出层实例 ID 即可。

```ts
const computedStyle = popup.getComputedStyle(instanceId)

console.log(computedStyle?.value.width) // 弹出层的宽度
```

::: tip
当该弹出层视图已挂载时，返回该弹出层视图的计算样式。否则返回 `null`。
:::

## 视图组件内获取

当弹出层的视图组件或者子组件内需要获取实时计算样式时，我们提供了更方便的方式去获取当前弹出层视图计算样式。

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
