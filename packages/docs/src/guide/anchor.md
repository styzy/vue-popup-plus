# 锚点 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

## 概念

传统弹出层的视图位置是相对于视区而固定的，但有时候我们需要让弹出层视图 **保持跟随** 某个页面元素（锚点元素），例如某个按钮的悬浮卡片，某个图标的提示文本框等，为了实现这一功能，我们引入了 `Anchor - 锚点` 这一概念。

## 设置锚点元素

通过 `anchor` 选项，我们可以指定弹出层视图的锚点元素。该选项支持传入一个元素选择器，或者一个元素实例。例如：

```vue
<template>
	<div id="anchor"></div>
	<button @click="handlePopupAnchor">打开弹出层</button>
</template>

<script setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupAnchor() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		// 指定锚点元素
		anchor: '#anchor', // [!code highlight]
		// 或者传入一个元素实例
		// anchor: document.querySelector('#anchor')
	})
}
</script>
```

此时弹出层视图将相对于锚点元素 `<div id="anchor"></div>` 进行定位，并且跟随锚点元素滚动。

默认情况下弹出层视图位于锚点元素的上方且水平居中，对于需要自定义位置的情况，具体可以参考 [指南 - 锚点视图位置](/guide/anchor-placement)。
