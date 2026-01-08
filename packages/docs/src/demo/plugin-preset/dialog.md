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
	<DButton @click="handlePopupDialogWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupDialogWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
	<DButton @click="handlePopupDialogWithoutMask">禁用遮罩</DButton>
	<DButton @click="handlePopupDialogWithMaskBlur" theme="warning"
		>启用遮罩高斯模糊</DButton
	>
	<DButton @click="handlePopupDialogWithMaskClose"
		>启用遮罩点击关闭对话框</DButton
	>
	<DButton @click="handlePopupDialogWithMaskCloseHandler"
		>自定义遮罩点击关闭逻辑</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupDialogWithHeaderClose() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		headerClose: false,
	})
}

function handlePopupDialogWithoutHeader() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		header: false,
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

function handlePopupDialogWithoutMask() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		mask: false,
	})
}

function handlePopupDialogWithMaskBlur() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		maskBlur: true,
	})
}

function handlePopupDialogWithMaskClose() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		maskClose: true,
	})
}

async function handlePopupDialogWithMaskCloseHandler() {
	const payload = await popup.dialog({
		title: '请点击遮罩层关闭对话框',
		component: () => import('../HelloWorld.vue'),
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭对话框吗？')) {
				await close('123456')
				popup.toastSuccess('对话框关闭成功，且关闭动画执行完成')
			}
		},
	})

	// 返回结果请打开控制台查看
	console.log('dialog payload: ', payload)
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Dialog 对话框](/guide-plugin-preset/dialog)

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

function handlePopupDialogWithoutMask() {
	popup.dialog({
		component: HelloWorld,
		mask: false,
	})
}

function handlePopupDialogWithMaskBlur() {
	popup.dialog({
		component: HelloWorld,
		maskBlur: true,
	})
}

function handlePopupDialogWithMaskClose() {
	popup.dialog({
		component: HelloWorld,
		maskClose: true,
	})
}

async function handlePopupDialogWithMaskCloseHandler() {
	const payload = await popup.dialog({
		title: '请点击遮罩层关闭对话框',
		component: HelloWorld,
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭对话框吗？')) {
				await close('123456')
				popup.toastSuccess('对话框关闭成功，且关闭动画执行完成')
			}
		},
	})

	console.log('dialog payload: ', payload)
}
</script>
