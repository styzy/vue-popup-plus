# Dialog 对话 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialog" type="default">对话</DButton>
	<DButton @click="handlePopupDialogWithResult">获取销毁携带参数</DButton>
</DButtonGroup>
```

```ts
function handlePopupDialog() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
	})
}

async function handlePopupDialogWithResult() {
	const result = await popup.dialog({
		component: () => import('./HelloDialog.vue'),
	})

	if (result !== undefined) {
		popup.toastSuccess(`获取销毁携带参数：${result}`)
	} else {
		popup.toastWarning('销毁未携带参数')
	}
}
```

:::

## 视图组件

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithProps">传递组件参数</DButton>
	<DButton @click="handlePopupDialogWithOnMounted">渲染回调</DButton>
</DButtonGroup>
```

```ts
function handlePopupDialogWithProps() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
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
		component: () => import('./HelloDialog.vue'),
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}
```

:::

## 位置

::: demo

```html
<div
	style="display: flex; flex-direction: row; justify-content: center; gap: 20px">
	<DButtonGroup type="plain" direction="vertical">
		<DButton @click="handlePopupDialogLeftTop" theme="primary"
			>左上</DButton
		>
		<DButton @click="handlePopupDialogLeft" theme="primary">左侧</DButton>
		<DButton @click="handlePopupDialogLeftBottom" theme="primary"
			>左下</DButton
		>
	</DButtonGroup>
	<DButtonGroup type="plain" direction="vertical">
		<DButton @click="handlePopupDialogTop" theme="primary">顶部</DButton>
		<DButton @click="handlePopupDialogCenter" theme="primary" type="default"
			>居中</DButton
		>
		<DButton @click="handlePopupDialogBottom" theme="primary">底部</DButton>
	</DButtonGroup>
	<DButtonGroup type="plain" direction="vertical">
		<DButton @click="handlePopupDialogRightTop" theme="primary"
			>右上</DButton
		>
		<DButton @click="handlePopupDialogRight" theme="primary">右侧</DButton>
		<DButton @click="handlePopupDialogRightBottom" theme="primary"
			>右下</DButton
		>
	</DButtonGroup>
</div>
```

```ts
function handlePopupDialogLeftTop() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'left-top',
	})
}

function handlePopupDialogLeft() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'left',
	})
}

function handlePopupDialogLeftBottom() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'left-bottom',
	})
}

function handlePopupDialogTop() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'top',
	})
}

function handlePopupDialogCenter() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'center',
	})
}

function handlePopupDialogBottom() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'bottom',
	})
}

function handlePopupDialogRightTop() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'right-top',
	})
}

function handlePopupDialogRight() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'right',
	})
}

function handlePopupDialogRightBottom() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		placement: 'right-bottom',
	})
}
```

:::

## 标题栏

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupDialogWithHeaderClose"
		>禁用标题关闭按钮</DButton
	>
	<DButton @click="handlePopupDialogWithoutHeader">禁用标题栏</DButton>
</DButtonGroup>
```

```ts
function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		title: '自定义标题',
	})
}

function handlePopupDialogWithHeaderClose() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		headerClose: false,
	})
}

function handlePopupDialogWithoutHeader() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		header: false,
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithoutMask">禁用遮罩层</DButton>
	<DButton @click="handlePopupDialogWithMaskTransparent">透明遮罩层</DButton>
	<DButton @click="handlePopupDialogWithMaskBlur" theme="warning"
		>高斯模糊遮罩层</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupDialogWithoutMask() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		mask: false,
	})
}

function handlePopupDialogWithMaskTransparent() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		maskTransparent: true,
	})
}

function handlePopupDialogWithMaskBlur() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		maskBlur: true,
	})
}
```

:::

## 交互

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupDialogWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
	<DButton @click="handlePopupDialogWithMaskClose"
		>启用遮罩层点击关闭对话框</DButton
	>
	<DButton @click="handlePopupDialogWithMaskCloseHandler"
		>自定义遮罩层点击关闭逻辑</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupDialogWithDraggable() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		draggable: true,
	})
}

function handlePopupDialogWithDragOverflow() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopupDialogWithMaskClose() {
	popup.dialog({
		component: () => import('./HelloDialog.vue'),
		maskClose: true,
	})
}

async function handlePopupDialogWithMaskCloseHandler() {
	const payload = await popup.dialog({
		title: '请点击遮罩层关闭对话框',
		component: () => import('./HelloDialog.vue'),
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

具体可以参考 [预置插件指南 - Dialog 对话框](/guide-plugin-preset/dialog)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloDialog from '../../HelloDialog.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupDialog() {
	popup.dialog({
		component: HelloDialog,
	})
}

async function handlePopupDialogWithResult() {
	const result = await popup.dialog({
		component: HelloDialog,
	})

	if (result !== undefined) {
		popup.toastSuccess(`获取销毁携带参数：${result}`)
	} else {
		popup.toastWarning('销毁未携带参数')
	}
}

function handlePopupDialogWithProps() {
	popup.dialog({
		component: HelloDialog,
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
		component: HelloDialog,
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

function handlePopupDialogLeftTop() {
	popup.dialog({
		component: HelloDialog,
		placement: 'left-top',
	})
}

function handlePopupDialogLeft() {
	popup.dialog({
		component: HelloDialog,
		placement: 'left',
	})
}

function handlePopupDialogLeftBottom() {
	popup.dialog({
		component: HelloDialog,
		placement: 'left-bottom',
	})
}

function handlePopupDialogTop() {
	popup.dialog({
		component: HelloDialog,
		placement: 'top',
	})
}

function handlePopupDialogCenter() {
	popup.dialog({
		component: HelloDialog,
		placement: 'center',
	})
}

function handlePopupDialogBottom() {
	popup.dialog({
		component: HelloDialog,
		placement: 'bottom',
	})
}

function handlePopupDialogRightTop() {
	popup.dialog({
		component: HelloDialog,
		placement: 'right-top',
	})
}

function handlePopupDialogRight() {
	popup.dialog({
		component: HelloDialog,
		placement: 'right',
	})
}

function handlePopupDialogRightBottom() {
	popup.dialog({
		component: HelloDialog,
		placement: 'right-bottom',
	})
}

function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		component: HelloDialog,
		title: '自定义标题',
	})
}

function handlePopupDialogWithHeaderClose() {
	popup.dialog({
		component: HelloDialog,
		headerClose: false,
	})
}

function handlePopupDialogWithoutHeader() {
	popup.dialog({
		component: HelloDialog,
		header: false,
	})
}

function handlePopupDialogWithoutMask() {
	popup.dialog({
		component: HelloDialog,
		mask: false,
	})
}

function handlePopupDialogWithMaskTransparent() {
	popup.dialog({
		component: HelloDialog,
		maskTransparent: true,
	})
}

function handlePopupDialogWithMaskBlur() {
	popup.dialog({
		component: HelloDialog,
		maskBlur: true,
	})
}

function handlePopupDialogWithDraggable() {
	popup.dialog({
		component: HelloDialog,
		draggable: true,
	})
}

function handlePopupDialogWithDragOverflow() {
	popup.dialog({
		component: HelloDialog,
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopupDialogWithMaskClose() {
	popup.dialog({
		component: HelloDialog,
		maskClose: true,
	})
}

async function handlePopupDialogWithMaskCloseHandler() {
	const payload = await popup.dialog({
		title: '请点击遮罩层关闭对话框',
		component: HelloDialog,
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
