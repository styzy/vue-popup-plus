---
outline: 2
---

# 预置插件示例

::: tip
以下示例由 `vue-popup-plus-plugin-preset` 预置插件包提供技术支持。
:::

## Toast 消息

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupToast" type="default">消息</DButton>
	<DButton @click="handlePopupToastLongText">长文本</DButton>
	<DButton @click="handlePopupToastDuration">持续10秒</DButton>
	<DButton @click="handlePopupToastDurationZero">持续显示</DButton>
</DButtonGroup>
```

```ts
function handlePopupToast() {
	popup.toast('这是一条消息')
}

function handlePopupToastLongText() {
	popup.toast(
		'这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果。'
	)
}

function handlePopupToastDuration() {
	popup.toast('这是一条持续10秒的消息', {
		duration: 10000,
	})
}

function handlePopupToastDurationZero() {
	popup.toast('这是一条持续显示的消息', {
		duration: 0,
	})
}
```

:::

### 进阶功能

#### 主题

::: demo

```html
<DButtonGroup>
	<DButton @click="handlePopupToastPrimary" theme="primary">主要主题</DButton>
	<DButton @click="handlePopupToastSuccess" theme="success">成功主题</DButton>
	<DButton @click="handlePopupToastInfo" theme="info">信息主题</DButton>
	<DButton @click="handlePopupToastWarning" theme="warning">警告主题</DButton>
	<DButton @click="handlePopupToastDanger" theme="danger">危险主题</DButton>
</DButtonGroup>
```

```ts
function handlePopupToastPrimary() {
	popup.toast('这是一条主要主题的消息')
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功主题的消息')
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息主题的消息')
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告主题的消息')
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险主题的消息')
}
```

:::

#### 位置

::: demo

```html
<DButtonGroup type="plain">
	<DButton @click="handlePopupToastLeftTop" theme="primary">左上</DButton>
	<DButton @click="handlePopupToastLeft" theme="primary">左侧</DButton>
	<DButton @click="handlePopupToastLeftBottom" theme="primary">左下</DButton>
	<DButton @click="handlePopupToastTop" theme="primary">顶部</DButton>
	<DButton @click="handlePopupToastCenter" theme="primary" type="default"
		>居中</DButton
	>
	<DButton @click="handlePopupToastBottom" theme="primary">底部</DButton>
	<DButton @click="handlePopupToastRightTop" theme="primary">右上</DButton>
	<DButton @click="handlePopupToastRight" theme="primary">右侧</DButton>
	<DButton @click="handlePopupToastRightBottom" theme="primary">右下</DButton>
</DButtonGroup>
```

```ts
function handlePopupToastLeftTop() {
	popup.toast('这是一条左上位置的消息', {
		placement: 'left-top',
	})
}

function handlePopupToastLeft() {
	popup.toast('这是一条左侧位置的消息', {
		placement: 'left',
	})
}

function handlePopupToastLeftBottom() {
	popup.toast('这是一条左下位置的消息', {
		placement: 'left-bottom',
	})
}

function handlePopupToastTop() {
	popup.toast('这是一条顶部位置的消息', {
		placement: 'top',
	})
}

function handlePopupToastCenter() {
	popup.toast('这是一条居中位置的消息', {
		placement: 'center',
	})
}

function handlePopupToastBottom() {
	popup.toast('这是一条底部位置的消息', {
		placement: 'bottom',
	})
}

function handlePopupToastRightTop() {
	popup.toast('这是一条右上位置的消息', {
		placement: 'right-top',
	})
}

function handlePopupToastRight() {
	popup.toast('这是一条右侧位置的消息', {
		placement: 'right',
	})
}

function handlePopupToastRightBottom() {
	popup.toast('这是一条右下位置的消息', {
		placement: 'right-bottom',
	})
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup type="plain">
	<DButton @click="handlePopupToastShowClose" theme="primary"
		>显示关闭按钮</DButton
	>
	<DButton @click="handlePopupToastHoverWait" theme="primary"
		>禁用鼠标悬停持续显示</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupToastShowClose() {
	popup.toast('这是一条显示关闭按钮的消息', {
		showClose: true,
	})
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false,
	})
}
```

:::

## Alert 提示

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlert" type="default">提示</DButton>
	<DButton @click="handlePopupAlertWaitClose">等待关闭</DButton>
</DButtonGroup>
```

```ts
function handlePopupAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopupAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')

	popup.toast('提示已关闭')
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlertWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupAlertWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupAlertWithCustomTitle() {
	popup.alert('这是一条提示消息', {
		title: '自定义标题',
	})
}

function handlePopupAlertWithCustomConfirmText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlertWithHeaderClose">禁用标题关闭按钮</DButton>
	<DButton @click="handlePopupAlertWithoutMaskBlur">禁用遮罩高斯模糊</DButton>
	<DButton @click="handlePopupAlertWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupAlertWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupAlertWithHeaderClose() {
	popup.alert('这是一条提示消息', {
		headClose: false,
	})
}

function handlePopupAlertWithoutMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: false,
	})
}

function handlePopupAlertWithDraggable() {
	popup.alert('这是一条提示消息', {
		draggable: true,
	})
}

function handlePopupAlertWithDragOverflow() {
	popup.alert('这是一条提示消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

## Confirm 确认

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirm" type="default">确认</DButton>
	<DButton @click="handlePopupConfirmWithResult">获取用户确认结果</DButton>
</DButtonGroup>
```

```ts
function handlePopupConfirm() {
	popup.confirm('这是一条确认消息')
}

async function handlePopupConfirmWithResult() {
	const result = await popup.confirm('这是一条确认消息')

	if (result) {
		popup.toastSuccess('用户点击了确认')
	} else {
		popup.toastWarning('用户点击了取消')
	}
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirmWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupConfirmWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopupConfirmWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupConfirmWithCustomTitle() {
	popup.confirm('这是一条确认消息', {
		title: '自定义标题',
	})
}

function handlePopupConfirmWithCustomConfirmText() {
	popup.confirm('这是一条确认消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupConfirmWithCustomCancelText() {
	popup.confirm('这是一条确认消息', {
		cancelText: '自定义取消按钮文本',
	})
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupConfirmWithHeaderClose"
		>启用标题关闭按钮</DButton
	>
	<DButton @click="handlePopupConfirmWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
	<DButton @click="handlePopupConfirmWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupConfirmWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupConfirmWithHeaderClose() {
	popup.confirm('这是一条确认消息', {
		headClose: false,
	})
}

function handlePopupConfirmWithoutMaskBlur() {
	popup.confirm('这是一条确认消息', {
		maskBlur: false,
	})
}

function handlePopupConfirmWithDraggable() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
	})
}

function handlePopupConfirmWithDragOverflow() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

## Prompt 提示输入

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPrompt" type="default">提示输入</DButton>
	<DButton @click="handlePopupPromptWithDefaultValue">默认值</DButton>
	<DButton @click="handlePopupPromptWithTextarea">文本域类型</DButton>
	<DButton @click="handlePopupPromptWithResult">获取用户输入结果</DButton>
</DButtonGroup>
```

```ts
function handlePopupPrompt() {
	popup.prompt('这是一条提示输入消息')
}

function handlePopupPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '这是默认值',
	})
}

function handlePopupPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}

async function handlePopupPromptWithResult() {
	const result = await popup.prompt('这是一条提示输入消息')

	if (result !== undefined) {
		popup.toastSuccess(`用户输入了：${result}`)
	} else {
		popup.toastWarning('用户取消了输入')
	}
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupPromptWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopupPromptWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
	})
}

function handlePopupPromptWithCustomConfirmText() {
	popup.prompt('这是一条提示输入消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupPromptWithCustomCancelText() {
	popup.prompt('这是一条提示输入消息', {
		cancelText: '自定义取消按钮文本',
	})
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupPromptWithHeaderClose"
		>禁用标题关闭按钮</DButton
	>
	<DButton @click="handlePopupPromptWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
	<DButton @click="handlePopupPromptWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopupPromptWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headClose: false,
	})
}

function handlePopupPromptWithoutMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: false,
	})
}

function handlePopupPromptWithDraggable() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
	})
}

function handlePopupPromptWithDragOverflow() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

## Dialog 对话

### 基础功能

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

### 进阶功能

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
		title: '自定义标题',
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupDialogWithCustomPlacement() {
	popup.dialog({
		placement: 'left-top',
		component: () => import('../HelloWorld.vue'),
	})
}
```

:::

### 高级功能

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

## Loading 加载遮罩

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupLoading" type="default">加载遮罩</DButton>
	<DButton @click="handlePopupLoadingWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopupLoadingWithIconSize">自定义图标尺寸</DButton>
</DButtonGroup>
```

```ts
function handlePopupLoading() {
	popup.loading()
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithCustomTitle() {
	popup.loading({
		title: '加载中...',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithIconSize() {
	popup.loading({
		iconSize: 200,
	})
	setTimeout(() => popup.loading.close(), 3000)
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup>
	<DButton @click="handlePopupLoadingWithThemePrimary" theme="primary"
		>主要主题</DButton
	>
	<DButton @click="handlePopupLoadingWithThemeSuccess" theme="success"
		>成功主题</DButton
	>
	<DButton @click="handlePopupLoadingWithThemeInfo" theme="info"
		>信息主题</DButton
	>
	<DButton @click="handlePopupLoadingWithThemeWarning" theme="warning"
		>警告主题</DButton
	>
	<DButton @click="handlePopupLoadingWithThemeDanger" theme="danger"
		>危险主题</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupLoadingWithThemePrimary() {
	popup.loading()
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeSuccess() {
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeInfo() {
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeWarning() {
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeDanger() {
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loading.close(), 3000)
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupLoadingWithoutMask">禁用遮罩层</DButton>
	<DButton @click="handlePopupLoadingWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupLoadingWithoutMask() {
	popup.loading({
		mask: false,
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithoutMaskBlur() {
	popup.loading({
		maskBlur: false,
	})
	setTimeout(() => popup.loading.close(), 3000)
}
```

:::

## Album 媒体相册

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbum" type="default">媒体相册</DButton>
	<DButton @click="handlePopupAlbumWithDefaultIndex">设置默认索引</DButton>
</DButtonGroup>
```

```ts
const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
]

function handlePopupAlbum() {
	popup.album({
		sources,
	})
}

function handlePopupAlbumWithDefaultIndex() {
	popup.album({
		sources,
		defaultIndex: 1,
	})
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithoutCounter">禁用计数器</DButton>
	<DButton @click="handlePopupWithoutName">禁用媒体名称</DButton>
	<DButton @click="handlePopupWithoutPure">禁用纯净预览</DButton>
	<DButton @click="handlePopupWithoutDownload">禁用下载功能</DButton>
	<DButton @click="handlePopupWithoutScale">禁用缩放功能</DButton>
	<DButton @click="handlePopupWithoutDrag">禁用拖动功能</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithoutCounter() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handlePopupWithoutName() {
	popup.album({
		sources,
		disableName: true,
	})
}

function handlePopupWithoutPure() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handlePopupWithoutDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handlePopupWithoutScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handlePopupWithoutDrag() {
	popup.album({
		sources,
		disableDrag: true,
	})
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbumWithoutMaskBlur">禁用遮罩高斯模糊</DButton>
</DButtonGroup>
```

```ts
function handlePopupAlbumWithoutMaskBlur() {
	popup.album({
		sources,
		maskBlur: false,
	})
}
```

:::

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupToast() {
	popup.toast('这是一条消息')
}

function handlePopupToastLongText() {
	popup.toast(
		'这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果；这是一条长文本消息，用于测试 toast 组件的长文本显示效果。'
	)
}

function handlePopupToastDuration() {
	popup.toast('这是一条持续10秒的消息', {
		duration: 10000,
	})
}

function handlePopupToastDurationZero() {
	popup.toast('这是一条持续显示的消息', {
		duration: 0,
	})
}



function handlePopupToastDefault() {
	popup.toast('这是一条默认主题的消息')
}

function handlePopupToastPrimary() {
	popup.toast('这是一条主要主题的消息')
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功主题的消息')
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息主题的消息')
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告主题的消息')
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险主题的消息')
}

function handlePopupToastLeftTop() {
	popup.toast('这是一条左上位置的消息', {
		placement: 'left-top',
	})
}

function handlePopupToastLeft() {
	popup.toast('这是一条左侧位置的消息', {
		placement: 'left',
	})
}

function handlePopupToastLeftBottom() {
	popup.toast('这是一条左下位置的消息', {
		placement: 'left-bottom',
	})
}

function handlePopupToastTop() {
	popup.toast('这是一条顶部位置的消息', {
		placement: 'top',
	})
}

function handlePopupToastCenter() {
	popup.toast('这是一条居中位置的消息', {
		placement: 'center',
	})
}

function handlePopupToastBottom() {
	popup.toast('这是一条底部位置的消息', {
		placement: 'bottom',
	})
}

function handlePopupToastRightTop() {
	popup.toast('这是一条右上位置的消息', {
		placement: 'right-top',
	})
}

function handlePopupToastRight() {
	popup.toast('这是一条右侧位置的消息', {
		placement: 'right',
	})
}

function handlePopupToastRightBottom() {
	popup.toast('这是一条右下位置的消息', {
		placement: 'right-bottom',
	})
}

function handlePopupToastShowClose() {
	popup.toast('这是一条显示关闭按钮的消息', {
		showClose: true,
	})
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false,
	})
}

function handlePopupAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopupAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')
	popup.toast('提示已关闭')
}

function handlePopupAlertWithCustomTitle() {
	popup.alert('这是一条提示消息', {
		title: '自定义标题',
	})
}

function handlePopupAlertWithCustomConfirmText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupAlertWithHeaderClose() {
	popup.alert('这是一条提示消息', {
		headerClose: false,
	})
}

function handlePopupAlertWithoutMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: false,
	})
}

function handlePopupAlertWithDraggable() {
	popup.alert('这是一条提示消息', {
		draggable: true,
	})
}

function handlePopupAlertWithDragOverflow() {
	popup.alert('这是一条提示消息', {
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopupConfirm() {
	popup.confirm('这是一条确认消息')
}

async function handlePopupConfirmWithResult() {
	const result = await popup.confirm('这是一条确认消息')

	if (result) {
		popup.toastSuccess('用户点击了确认')
	} else {
		popup.toastWarning('用户点击了取消')
	}
}

function handlePopupConfirmWithCustomTitle() {
	popup.confirm('这是一条确认消息', {
		title: '自定义标题',
	})
}

function handlePopupConfirmWithCustomConfirmText() {
	popup.confirm('这是一条确认消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupConfirmWithCustomCancelText() {
	popup.confirm('这是一条确认消息', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePopupConfirmWithHeaderClose() {
	popup.confirm('这是一条确认消息', {
		headerClose: true,
	})
}

function handlePopupConfirmWithoutMaskBlur() {
	popup.confirm('这是一条确认消息', {
		maskBlur: false,
	})
}

function handlePopupConfirmWithDraggable() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
	})
}

function handlePopupConfirmWithDragOverflow() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopupPrompt() {
	popup.prompt('这是一条提示输入消息')
}

function handlePopupPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '这是默认值',
	})
}

function handlePopupPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}

async function handlePopupPromptWithResult() {
	const result = await popup.prompt('这是一条提示输入消息')

	if (result !== undefined) {
		popup.toastSuccess(`用户输入了：${result}`)
	} else {
		popup.toastWarning('用户取消了输入')
	}
}

function handlePopupPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
	})
}

function handlePopupPromptWithCustomConfirmText() {
	popup.prompt('这是一条提示输入消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupPromptWithCustomCancelText() {
	popup.prompt('这是一条提示输入消息', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePopupPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headerClose: false,
	})
}

function handlePopupPromptWithoutMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: false,
	})
}

function handlePopupPromptWithDraggable() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
	})
}

function handlePopupPromptWithDragOverflow() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
		dragOverflow: true,
	})
}

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

function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		title: '自定义标题',
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupDialogWithCustomPlacement() {
	popup.dialog({
		placement: 'left-top',
		component: () => import('../HelloWorld.vue'),
	})
}

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

function handlePopupLoading() {
	popup.loading()
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithCustomTitle() {
	popup.loading({
		title: '加载中...',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithIconSize() {
	popup.loading({
		iconSize: 200,
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemePrimary() {
	popup.loading()
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeSuccess() {
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeInfo() {
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeWarning() {
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithThemeDanger() {
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithoutMask() {
	popup.loading({
		mask: false,
	})
	setTimeout(() => popup.loading.close(), 3000)
}

function handlePopupLoadingWithoutMaskBlur() {
	popup.loading({
		maskBlur: false,
	})
	setTimeout(() => popup.loading.close(), 3000)
}

const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
]

function handlePopupAlbum() {
	popup.album({
		sources,
	})
}

function handlePopupAlbumWithDefaultIndex() {
	popup.album({
		sources,
		defaultIndex: 1,
	})
}

function handlePopupWithoutCounter() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handlePopupWithoutName() {
	popup.album({
		sources,
		disableName: true,
	})
}

function handlePopupWithoutPure() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handlePopupWithoutDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handlePopupWithoutScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handlePopupWithoutDrag() {
	popup.album({
		sources,
		disableDrag: true,
	})
}

function handlePopupAlbumWithoutMaskBlur() {
	popup.album({
		sources,
		maskBlur: false,
	})
}
</script>
