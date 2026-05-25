# Anchor 锚点视图 DEMO <Badge text="1.7.0" />

> <DVersionSupport version="1.7.0" />

## 触发方式

:::demo

```html
<DButtonGroup theme="primary" type="plain">
	<PopupAnchorTrigger>
		<DButton type="default">悬浮渲染 (默认)</DButton>
		<template #popup>
			<HelloAnchor />
		</template>
	</PopupAnchorTrigger>
	<PopupAnchorTrigger trigger="click">
		<DButton>点击渲染</DButton>
		<template #popup>
			<HelloAnchor />
		</template>
	</PopupAnchorTrigger>
	<PopupAnchorTrigger trigger="contextmenu">
		<DButton>右键渲染</DButton>
		<template #popup>
			<HelloAnchor />
		</template>
	</PopupAnchorTrigger>
	<PopupAnchorTrigger trigger="focus">
		<input type="text" placeholder="聚焦渲染" style="border: 1px solid var(--docs-color-primary); padding: 7px;"></input>
		<template #popup>
			<HelloAnchor />
		</template>
	</PopupAnchorTrigger>
</DButtonGroup>
```

:::

## 位置

:::demo

```html
<div
	style="display: flex; flex-direction: row; justify-content: center; gap: 20px">
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<div style="height: 40px;"></div>
		<PopupAnchorTrigger anchor-placement="left-start">
			<DButton>左侧 顶部</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<PopupAnchorTrigger anchor-placement="left">
			<DButton>左侧 居中</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<PopupAnchorTrigger anchor-placement="left-end">
			<DButton>左侧 底部</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
	</DButtonGroup>
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<PopupAnchorTrigger anchor-placement="top-start">
			<DButton>顶部 左侧</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<div style="height: 40px;"></div>
		<div style="height: 40px;"></div>
		<div style="height: 40px;"></div>
		<PopupAnchorTrigger anchor-placement="bottom-start">
			<DButton>底部 左侧</DButton>
			<template #popup>
				<HelloAnchor />
			</template> </PopupAnchorTrigger
	></DButtonGroup>
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<PopupAnchorTrigger anchor-placement="top">
			<DButton>顶部 居中</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<div style="height: 40px;"></div>
		<div style="height: 40px;"></div>
		<div style="height: 40px;"></div>
		<PopupAnchorTrigger anchor-placement="bottom">
			<DButton>底部 居中</DButton>
			<template #popup>
				<HelloAnchor />
			</template> </PopupAnchorTrigger
	></DButtonGroup>
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<PopupAnchorTrigger anchor-placement="top-end">
			<DButton>顶部 右侧</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<div style="height: 40px;"></div>
		<div style="height: 40px;"></div>
		<div style="height: 40px;"></div>
		<PopupAnchorTrigger anchor-placement="bottom-end">
			<DButton>底部 右侧</DButton>
			<template #popup>
				<HelloAnchor />
			</template> </PopupAnchorTrigger
	></DButtonGroup>

	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<div style="height: 40px;"></div>
		<PopupAnchorTrigger anchor-placement="right-start">
			<DButton>右侧 顶部</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<PopupAnchorTrigger anchor-placement="right">
			<DButton>右侧 居中</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
		<PopupAnchorTrigger anchor-placement="right-end">
			<DButton>右侧 底部</DButton>
			<template #popup>
				<HelloAnchor />
			</template>
		</PopupAnchorTrigger>
	</DButtonGroup>
</div>
```

:::

<script setup lang="ts">
import { usePopup, PopupAnchorTrigger } from 'vue-popup-plus'
import HelloAnchor from '../HelloAnchor.vue'
</script>
