# 锚点触发器 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

## 介绍

考虑到锚点弹出层对于锚点元素的依赖，以及触发方式的实现复杂度，使得锚点弹出层的使用成本相对于普通弹出层来说要更高。

因此我们提供了 `<PopupAnchorTrigger> - 锚点触发器` 组件，其内置了各种触发方式的实现以及弹出层的所有配置，方便开发者快速实现锚点弹出层的触发和渲染。

## 基本使用

通过 `default` 和 `popup` 两个插槽，我们可以快速实现锚点弹出层的触发和渲染。

:::demo

```html {2,3}
<PopupAnchorTrigger>
	<span>悬浮触发(默认)</span>
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21; color: #ffffff;">
			弹出层内容
		</div>
	</template>
</PopupAnchorTrigger>
```

```ts
import { PopupAnchorTrigger } from 'vue-popup-plus'
```

:::

## 触发方式

通过 `trigger` 属性，我们可以自定义触发方式。

:::demo

```html {1,9,19}
<PopupAnchorTrigger trigger="click">
	<DButton theme="primary" type="plain">点击触发</DButton>
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21; color: #ffffff;">
			弹出层内容
		</div>
	</template>
</PopupAnchorTrigger>
<PopupAnchorTrigger trigger="focus">
	<input
		placeholder="聚焦触发"
		style="padding: 5px 10px; margin: 20px 0; border: 1px solid #1c70d1;" />
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21; color: #ffffff;">
			弹出层内容
		</div>
	</template>
</PopupAnchorTrigger>
<PopupAnchorTrigger trigger="contextmenu">
	<DButton theme="primary" type="plain">右键触发</DButton>
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21; color: #ffffff;">
			弹出层内容
		</div>
	</template>
</PopupAnchorTrigger>
```

:::

## 组合触发方式

`trigger` 属性同时支持以数组的方式指定多个触发方式。

:::demo

```html{1}
<PopupAnchorTrigger :trigger="['click', 'contextmenu']">
	<DButton theme="primary" type="plain">点击+右键触发</DButton>
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21; color: #ffffff;">
			弹出层内容
		</div>
	</template>
</PopupAnchorTrigger>
```

:::

## 位置

通过 `anchor-placement` 属性，我们可以自定义锚点弹出层的视图位置。

:::demo

```html{2,11}
<DButtonGroup theme="primary" type="plain">
	<PopupAnchorTrigger anchor-placement="bottom-start">
		<DButton>底部左侧对齐</DButton>
		<template #popup>
			<div
				style="padding: 20px; background-color: #e56c21; color: #ffffff;">
				弹出层内容
			</div>
		</template>
	</PopupAnchorTrigger>
	<PopupAnchorTrigger anchor-placement="right-end">
		<DButton>右侧底部对齐</DButton>
		<template #popup>
			<div
				style="padding: 20px; background-color: #e56c21; color: #ffffff;">
				弹出层内容
			</div>
		</template>
	</PopupAnchorTrigger>
</DButtonGroup>
```

:::

## 自动翻转

通过 `anchor-flip` 属性，我们可以自定义是否自动翻转弹出层。

:::demo

```html {1}
<PopupAnchorTrigger trigger="click" anchor-flip>
	<DButton theme="primary" type="plain">点击触发</DButton>
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21;color: #ffffff;">
			尝试滚动到顶部边缘，将触发自动翻转
		</div>
	</template>
</PopupAnchorTrigger>
```

:::

## 自动翻转提前量

通过 `anchor-flip-advance` 属性，我们可以自定义自动翻转弹出层的提前量。

:::demo

```html {1}
<PopupAnchorTrigger trigger="click" anchor-flip :anchor-flip-advance="100">
	<DButton theme="primary" type="plain">点击触发</DButton>
	<template #popup>
		<div style="padding: 20px; background-color: #e56c21;color: #ffffff;">
			尝试滚动到顶部边缘 100px ，将触发自动翻转
		</div>
	</template>
</PopupAnchorTrigger>
```

:::

## 自动平移

通过 `anchor-shift` 属性，我们可以自定义弹出层视图在主轴和交叉轴上是否自动平移。

:::demo

```html {2,11,20}
<DButtonGroup theme="primary" type="plain">
	<PopupAnchorTrigger trigger="click" anchor-shift="mainAxis">
		<DButton theme="primary" type="plain">点击触发 主轴平移</DButton>
		<template #popup>
			<div
				style="padding: 20px; background-color: #e56c21;color: #ffffff;">
				尝试滚动到页面上下边缘，将触发自动平移
			</div>
		</template>
	</PopupAnchorTrigger>
	<PopupAnchorTrigger trigger="click" anchor-shift="crossAxis">
		<DButton theme="primary" type="plain">点击触发 交叉轴平移</DButton>
		<template #popup>
			<div
				style="padding: 20px; background-color: #e56c21;color: #ffffff;">
				尝试滚动到页面左右边缘，将触发自动平移
			</div>
		</template>
	</PopupAnchorTrigger>
	<PopupAnchorTrigger trigger="click" anchor-shift="both">
		<DButton theme="primary" type="plain">点击触发 主轴+交叉轴平移</DButton>
		<template #popup>
			<div
				style="padding: 20px; background-color: #e56c21;color: #ffffff;">
				尝试滚动到页面所有边缘，将触发自动平移
			</div>
		</template>
	</PopupAnchorTrigger>
</DButtonGroup>
```

:::

## 自定义视区

通过 `viewport` 属性，我们可以自定义弹出层视图的视区，此时自动翻转和自动平移将根据视区进行判断。

::: demo

```html{2,8,20,3,44}
<div
	id="viewport"
	style="height: 500px; overflow: auto; background-color: var(--docs-color-background-sub);">
	<div style="height: 100%; width: 100%; margin: 200px;">
		<DButtonGroup theme="primary" type="plain" direction="vertical">
			<PopupAnchorTrigger
				trigger="click"
				viewport="#viewport"
				anchor-flip>
				<DButton>点击触发 主轴翻转</DButton>
				<template #popup>
					<div
						style="padding: 20px; background-color: #e56c21;color: #ffffff;">
						尝试滚动到顶部边缘，将触发自动翻转
					</div>
				</template>
			</PopupAnchorTrigger>
			<PopupAnchorTrigger
				trigger="click"
				viewport="#viewport"
				anchor-shift="mainAxis">
				<DButton>点击触发 主轴平移</DButton>
				<template #popup>
					<div
						style="padding: 20px; background-color: #e56c21;color: #ffffff;">
						尝试滚动到页面上下边缘，将触发自动平移
					</div>
				</template>
			</PopupAnchorTrigger>
			<PopupAnchorTrigger
				trigger="click"
				viewport="#viewport"
				anchor-shift="crossAxis">
				<DButton>点击触发 交叉轴平移</DButton>
				<template #popup>
					<div
						style="padding: 20px; background-color: #e56c21;color: #ffffff;">
						尝试滚动到页面左右边缘，将触发自动平移
					</div>
				</template>
			</PopupAnchorTrigger>
			<PopupAnchorTrigger
				trigger="click"
				viewport="#viewport"
				anchor-shift="both">
				<DButton>点击触发 主轴+交叉轴平移</DButton>
				<template #popup>
					<div
						style="padding: 20px; background-color: #e56c21;color: #ffffff;">
						尝试滚动到页面所有边缘，将触发自动平移
					</div>
				</template>
			</PopupAnchorTrigger>
		</DButtonGroup>
	</div>
</div>
```

:::

## 其他属性

上面仅展示了与锚点弹出层相关的功能，实际上 `<PopupAnchorTrigger>` 组件还支持 `popup.render()` 函数所有选项，具体可以查看 [核心 API - 控制器实例 popup.render()](/api/controller#popup-render)。

<script setup lang="ts">
import { PopupAnchorTrigger } from 'vue-popup-plus'
</script>
