# Drawer 抽屉 DEMO <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDrawer" type="default">抽屉</DButton>
	<DButton @click="handlePopupDrawerWithResult">获取销毁携带参数</DButton>
</DButtonGroup>
```

```ts
function handlePopupDrawer() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
	})
}

async function handlePopupDrawerWithResult() {
	const result = await popup.drawer({
		component: () => import('./HelloDrawer.vue'),
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
	<DButton @click="handlePopupDrawerWithProps">传递组件参数</DButton>
	<DButton @click="handlePopupDrawerWithOnMounted">渲染回调</DButton>
</DButtonGroup>
```

```ts
function handlePopupDrawerWithProps() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
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

function handlePopupDrawerWithOnMounted() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
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
	style="display: flex; flex-direction: row; align-items: stretch; justify-content: center; gap: 20px">
	<DButtonGroup
		theme="primary"
		type="plain"
		direction="vertical"
		align="center">
		<DButton @click="handlePopupDrawerLeft">左侧</DButton>
	</DButtonGroup>
	<DButtonGroup
		theme="primary"
		type="plain"
		direction="vertical"
		align="center">
		<DButton @click="handlePopupDrawerTop">顶部</DButton>
		<br />
		<br />
		<DButton @click="handlePopupDrawerBottom">底部</DButton>
	</DButtonGroup>
	<DButtonGroup
		theme="primary"
		type="plain"
		direction="vertical"
		align="center">
		<DButton @click="handlePopupDrawerRight" type="default">右侧</DButton>
	</DButtonGroup>
</div>
```

```ts
function handlePopupDrawerLeft() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'left',
	})
}

function handlePopupDrawerRight() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'right',
	})
}

function handlePopupDrawerTop() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'top',
	})
}

function handlePopupDrawerBottom() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		placement: 'bottom',
	})
}
```

:::

## 标题栏

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDrawerWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupDrawerWithHeaderClose"
		>禁用标题关闭按钮</DButton
	>
	<DButton @click="handlePopupDrawerWithoutHeader">禁用标题栏</DButton>
</DButtonGroup>
```

```ts
function handlePopupDrawerWithCustomTitle() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		title: '自定义标题',
	})
}

function handlePopupDrawerWithHeaderClose() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		headerClose: false,
	})
}

function handlePopupDrawerWithoutHeader() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		header: false,
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDrawerWithoutMask">禁用遮罩层</DButton>
	<DButton @click="handlePopupDrawerWithMaskTransparent">透明遮罩层</DButton>
	<DButton @click="handlePopupDrawerWithMaskBlur" theme="warning"
		>高斯模糊遮罩层</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupDrawerWithoutMask() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		mask: false,
	})
}

function handlePopupDrawerWithMaskTransparent() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maskTransparent: true,
	})
}

function handlePopupDrawerWithMaskBlur() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maskBlur: true,
	})
}
```

:::

## 交互

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDrawerWithMaskClose"
		>禁用遮罩层点击关闭对话框</DButton
	>
	<DButton @click="handlePopupDrawerWithMaskCloseHandler"
		>自定义遮罩层点击关闭逻辑</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupDrawerWithMaskClose() {
	popup.drawer({
		component: () => import('./HelloDrawer.vue'),
		maskClose: false,
	})
}

async function handlePopupDrawerWithMaskCloseHandler() {
	const payload = await popup.drawer({
		title: '请点击遮罩层关闭抽屉',
		component: () => import('./HelloDrawer.vue'),
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭抽屉吗？')) {
				await close('123456')
				popup.toastSuccess('抽屉关闭成功，且关闭动画执行完成')
			}
		},
	})

	// 返回结果请打开控制台查看
	console.log('drawer payload: ', payload)
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Drawer 抽屉](/guide-plugin-preset/drawer)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloDrawer from '../../HelloDrawer.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupDrawer() {
	popup.drawer({
		component: HelloDrawer,
	})
}

async function handlePopupDrawerWithResult() {
	const result = await popup.drawer({
		component: HelloDrawer,
	})

	if (result !== undefined) {
		popup.toastSuccess(`获取销毁携带参数：${result}`)
	} else {
		popup.toastWarning('销毁未携带参数')
	}
}

function handlePopupDrawerWithProps() {
	popup.drawer({
		component: HelloDrawer,
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

function handlePopupDrawerWithOnMounted() {
	popup.drawer({
		component: HelloDrawer,
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

function handlePopupDrawerLeft() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'left',
	})
}

function handlePopupDrawerRight() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'right',
	})
}

function handlePopupDrawerTop() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'top',
	})
}

function handlePopupDrawerBottom() {
	popup.drawer({
		component: HelloDrawer,
		placement: 'bottom',
	})
}

function handlePopupDrawerWithCustomTitle() {
	popup.drawer({
		component: HelloDrawer,
		title: '自定义标题',
	})
}

function handlePopupDrawerWithHeaderClose() {
	popup.drawer({
		component: HelloDrawer,
		headerClose: false,
	})
}

function handlePopupDrawerWithoutHeader() {
	popup.drawer({
		component: HelloDrawer,
		header: false,
	})
}

function handlePopupDrawerWithoutMask() {
	popup.drawer({
		component: HelloDrawer,
		mask: false,
	})
}

function handlePopupDrawerWithMaskTransparent() {
	popup.drawer({
		component: HelloDrawer,
		maskTransparent: true,
	})
}

function handlePopupDrawerWithMaskBlur() {
	popup.drawer({
		component: HelloDrawer,
		maskBlur: true,
	})
}

function handlePopupDrawerWithMaskClose() {
	popup.drawer({
		component: HelloDrawer,
		maskClose: false,
	})
}

async function handlePopupDrawerWithMaskCloseHandler() {
	const payload = await popup.drawer({
		title: '请点击遮罩层关闭抽屉',
		component: HelloDrawer,
		maskClose: async (close) => {
			if (await popup.confirm('确定关闭抽屉吗？')) {
				await close('123456')
				popup.toastSuccess('抽屉关闭成功，且关闭动画执行完成')
			}
		},
	})

	console.log('drawer payload: ', payload)
}
</script>
