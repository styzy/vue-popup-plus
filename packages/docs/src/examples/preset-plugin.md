# 预置插件示例

::: tip
以下示例由 `vue-popup-plus-preset-plugin` 预置插件包提供技术支持。
:::

## Toast 消息

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupToast" type="default">消息</DButton>
	<DButton @click="handlePopupToastLongText">长文本</DButton>
	<DButton @click="handlePopupToastDuration">持续10秒</DButton>
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
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup>
	<DButton @click="handlePopupToastDefault" theme="primary" type="plain"
		>默认主题</DButton
	>
	<DButton @click="handlePopupToastPrimary" theme="primary">主要主题</DButton>
	<DButton @click="handlePopupToastSuccess" theme="success">成功主题</DButton>
	<DButton @click="handlePopupToastInfo" theme="info">信息主题</DButton>
	<DButton @click="handlePopupToastWarning" theme="warning">警告主题</DButton>
	<DButton @click="handlePopupToastDanger" theme="danger">危险主题</DButton>
</DButtonGroup>
```

```ts
function handlePopupToastDefault() {
	popup.toast('这是一条默认主题的消息')
}

function handlePopupToastPrimary() {
	popup.toast('这是一条主要主题的消息', {
		theme: 'primary',
	})
}

function handlePopupToastSuccess() {
	popup.toast('这是一条成功主题的消息', {
		theme: 'success',
	})
}

function handlePopupToastInfo() {
	popup.toast('这是一条信息主题的消息', {
		theme: 'info',
	})
}

function handlePopupToastWarning() {
	popup.toast('这是一条警告主题的消息', {
		theme: 'warning',
	})
}

function handlePopupToastDanger() {
	popup.toast('这是一条危险主题的消息', {
		theme: 'danger',
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

	popup.toast('提示已关闭', {
		theme: 'primary',
	})
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
		popup.toast('用户点击了确认', {
			theme: 'success',
		})
	} else {
		popup.toast('用户点击了取消', {
			theme: 'warning',
		})
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
		popup.toast(`用户输入了：${result}`, {
			theme: 'success',
		})
	} else {
		popup.toast('用户取消了输入', {
			theme: 'warning',
		})
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
		},
	})
}

function handlePopupDialogWithOnMounted() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toast('渲染回调 触发', {
				theme: 'success',
			})
		},
	})
}

async function handlePopupDialogWithResult() {
	const result = await popup.dialog({
		component: () => import('../HelloWorld.vue'),
	})

	if (result !== undefined) {
		popup.toast(`获取销毁携带参数：${result}`, {
			theme: 'success',
		})
	} else {
		popup.toast('销毁未携带参数', {
			theme: 'warning',
		})
	}
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupDialogWithCustomTitle">自定义标题文本</DButton>
</DButtonGroup>
```

```ts
function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		title: '自定义标题',
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
	setTimeout(popup.loading(), 3000)
}

function handlePopupLoadingWithCustomTitle() {
	setTimeout(
		popup.loading({
			title: '加载中...',
		}),
		3000
	)
}

function handlePopupLoadingWithIconSize() {
	setTimeout(
		popup.loading({
			iconSize: 200,
		}),
		3000
	)
}
```

:::

### 进阶功能

::: demo

```html
<DButtonGroup>
	<DButton
		@click="handlePopupLoadingWithThemeDefault"
		theme="primary"
		type="plain"
		>默认主题</DButton
	>
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
function handlePopupLoadingWithThemeDefault() {
	setTimeout(popup.loading(), 3000)
}

function handlePopupLoadingWithThemePrimary() {
	setTimeout(
		popup.loading({
			theme: 'primary',
		}),
		3000
	)
}

function handlePopupLoadingWithThemeSuccess() {
	setTimeout(
		popup.loading({
			theme: 'success',
		}),
		3000
	)
}

function handlePopupLoadingWithThemeInfo() {
	setTimeout(
		popup.loading({
			theme: 'info',
		}),
		3000
	)
}

function handlePopupLoadingWithThemeWarning() {
	setTimeout(
		popup.loading({
			theme: 'warning',
		}),
		3000
	)
}

function handlePopupLoadingWithThemeDanger() {
	setTimeout(
		popup.loading({
			theme: 'danger',
		}),
		3000
	)
}
```

:::

### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupLoadingWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupLoadingWithoutMaskBlur() {
	setTimeout(
		popup.loading({
			maskBlur: false,
		}),
		3000
	)
}
```

:::

## Album 媒体相册

### 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupAlbum" type="default">媒体相册</DButton>
</DButtonGroup>
```

```ts
function handlePopupAlbum() {
	popup.album({
		component: () => import('../HelloWorld.vue'),
	})
}
```

:::

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

const popup = usePopup()

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

function handlePopupToastDefault() {
	popup.toast('这是一条默认主题的消息')
}

function handlePopupToastPrimary() {
	popup.toast('这是一条主要主题的消息', {
		theme: 'primary',
	})
}

function handlePopupToastSuccess() {
	popup.toast('这是一条成功主题的消息', {
		theme: 'success',
	})
}

function handlePopupToastInfo() {
	popup.toast('这是一条信息主题的消息', {
		theme: 'info',
	})
}

function handlePopupToastWarning() {
	popup.toast('这是一条警告主题的消息', {
		theme: 'warning',
	})
}

function handlePopupToastDanger() {
	popup.toast('这是一条危险主题的消息', {
		theme: 'danger',
	})
}

function handlePopupAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopupAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')
	popup.toast('提示已关闭', {
		theme: 'primary',
	})
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
		popup.toast('用户点击了确认', {
			theme: 'success',
		})
	} else {
		popup.toast('用户点击了取消', {
			theme: 'warning',
		})
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
		popup.toast(`用户输入了：${result}`, {
			theme: 'success',
		})
	} else {
		popup.toast('用户取消了输入', {
			theme: 'warning',
		})
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
		},
	})
}

function handlePopupDialogWithOnMounted() {
	popup.dialog({
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toast('渲染回调 触发', {
				theme: 'success',
			})
		},
	})
}

async function handlePopupDialogWithResult() {
	const result = await popup.dialog({
		component: () => import('../HelloWorld.vue'),
	})

	if (result !== undefined) {
		popup.toast(`获取销毁携带参数：${result}`, {
			theme: 'success',
		})
	} else {
		popup.toast('销毁未携带参数', {
			theme: 'warning',
		})
	}
}

function handlePopupDialogWithCustomTitle() {
	popup.dialog({
		title: '自定义标题',
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
	setTimeout(popup.loading(), 3000)
}

function handlePopupLoadingWithCustomTitle() {
	setTimeout(popup.loading({
		title: '加载中...',
	}), 3000)
}

function handlePopupLoadingWithIconSize() {
	setTimeout(popup.loading({
		iconSize: 200,
	}), 3000)
}

function handlePopupLoadingWithThemeDefault() {
	setTimeout(popup.loading(), 3000)
}

function handlePopupLoadingWithThemePrimary() {
	setTimeout(popup.loading({
		theme: 'primary',
	}), 3000)
}

function handlePopupLoadingWithThemeSuccess() {
	setTimeout(popup.loading({
		theme: 'success',
	}), 3000)
}

function handlePopupLoadingWithThemeInfo() {
	setTimeout(popup.loading({
		theme: 'info',
	}), 3000)
}

function handlePopupLoadingWithThemeWarning() {
	setTimeout(popup.loading({
		theme: 'warning',
	}), 3000)
}

function handlePopupLoadingWithThemeDanger() {
	setTimeout(popup.loading({
		theme: 'danger',
	}), 3000)
}

function handlePopupLoadingWithoutMaskBlur() {
	setTimeout(
		popup.loading({
			maskBlur: false,
		}),
		3000
	)
}
</script>
