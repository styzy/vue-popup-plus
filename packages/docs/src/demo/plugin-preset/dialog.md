---
outline: 2
---

# Dialog 对话 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialog" type="default">对话</DButton>
	<DButton @click="handlePopupDialogWithProps">携带组件参数</DButton>
	<DButton @click="handlePopupDialogWithOnMounted">渲染回调</DButton>
	<DButton @click="handlePopupDialogWithResult">获取销毁携带参数</DButton>
</DButtonGroup>
```

```ts
function handlePopupDialog() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupDialogWithProps() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		componentProps: {
			test: '这是一个组件参数',
			onCustomEvent(params: string) {
				popup.toastSuccess(
					`监听组件事件 customEvent 触发，得到自定义事件参数：${params}`
				)
			},
		},
	})
}

function handlePopupDialogWithOnMounted() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

async function handlePopupDialogWithResult() {
	const result = await popup.dialog({
		component: () => import('../HelloWorld.vue'),
	})

	if (result !== undefined) {
		popup.toastSuccess(`获取销毁携带参数：${result}`)
	} else {
		popup.toastWarning('销毁未携带参数')
	}
}
```

:::

## 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupDialogWithCustomPlacement">自定义位置</DButton>
</DButtonGroup>
```

```ts
function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		title: '自定义标题',
	})
}

function handlePopupDialogWithCustomPlacement() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		placement: 'left-top',
	})
}
```

:::

## 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithHeaderClose"
		>禁用标题关闭按钮</DButton
	>
	<DButton @click="handlePopupDialogWithoutHeader">禁用标题栏</DButton>
	<DButton @click="handlePopupDialogWithMaskClickClose"
		>启用遮罩点击关闭弹出层</DButton
	>
	<DButton @click="handlePopupDialogWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
	<DButton @click="handlePopupDialogWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupDialogWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupDialogWithHeaderClose() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		headClose: false,
	})
}

function handlePopupDialogWithoutHeader() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		header: false,
	})
}

function handlePopupDialogWithMaskClickClose() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		maskClickClose: true,
	})
}

function handlePopupDialogWithoutMaskBlur() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		maskBlur: false,
	})
}

function handlePopupDialogWithDraggable() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		draggable: true,
	})
}

function handlePopupDialogWithDragOverflow() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Prompt 提示输入](/guide-plugin-preset/prompt)

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloWorld from '../../HelloWorld.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupDialog() {
	popup.dialog({
		component: HelloWorld,
	})
}

function handlePopupDialogWithProps() {
	popup.dialog({
		component: HelloWorld,
		componentProps: {
			test: '这是一个组件参数',
			onCustomEvent(params: string) {
				popup.toastSuccess(
					`监听组件事件 customEvent 触发，得到自定义事件参数：${params}`
				)
			},
		},
	})
}

function handlePopupDialogWithOnMounted() {
	popup.dialog({
		component: HelloWorld,
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

async function handlePopupDialogWithResult() {
	const result = await popup.dialog({
		component: HelloWorld,
	})

	if (result !== undefined) {
		popup.toastSuccess(`获取销毁携带参数：${result}`)
	} else {
		popup.toastWarning('销毁未携带参数')
	}
}

function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		component: HelloWorld,
		title: '自定义标题',
	})
}

function handlePopupDialogWithCustomPlacement() {
	popup.dialog({
		component: HelloWorld,
		placement: 'left-top',
	})
}

function handlePopupDialogWithHeaderClose() {
	popup.dialog({
		component: HelloWorld,
		headerClose: false,
	})
}

function handlePopupDialogWithoutHeader() {
	popup.dialog({
		component: HelloWorld,
		header: false,
	})
}

function handlePopupDialogWithMaskClickClose() {
	popup.dialog({
		component: HelloWorld,
		maskClickClose: true,
	})
}

function handlePopupDialogWithoutMaskBlur() {
	popup.dialog({
		component: HelloWorld,
		maskBlur: false,
	})
}

function handlePopupDialogWithDraggable() {
	popup.dialog({
		component: HelloWorld,
		draggable: true,
	})
}

function handlePopupDialogWithDragOverflow() {
	popup.dialog({
		component: HelloWorld,
		draggable: true,
		dragOverflow: true,
	})
}
</script>
