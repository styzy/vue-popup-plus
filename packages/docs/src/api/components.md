---
pageClass: api
outline: 2
---

# 内置组件 API

## {{ '<PopupRoot>' }} <Badge text="1.5.0+" /> {#popup-root}

> <DVersionSupport  version="1.5.0" />

`<PopupRoot>` 可作为根组件，用于 **继承应用上下文** 并渲染所有弹出层组件。

### Props

```ts
type PopupRootProps = {}
```

### Slots

```ts
type PopupRootSlots = {
	default: () => VNode[]
}
```

### 详细信息

一旦使用了 `PopupRoot` 组件，所有弹出层组件都会自动作为其子组件渲染，这在需要手动同步一些应用上下文时非常有用。

例如当弹出层在非 `setup()` 函数中使用时，为了保持对应用上下文的同步，可以手动在应用的根组件（`App.vue`）的最外层使用 `PopupRoot` 组件。

其默认插槽将正常渲染所有内容，不会进行任何的干预。

::: warning
注意，同时只能挂载一个 `PopupRoot` 组件，否则会导致弹出层重复多次渲染，并且在调试模式下会输出警告日志。
:::

### 示例

```vue [App.vue]
<template>
	<!-- 所有弹出层组件都会自动作为其子组件渲染 -->
	<PopupRoot>
		<RouterView />
	</PopupRoot>
</template>

<script setup lang="ts">
import { PopupRoot } from 'vue-popup-plus'
</script>
```

### 相关参考

- [关于 - 常见问题 同步应用上下文](/about/faq#同步应用上下文)
