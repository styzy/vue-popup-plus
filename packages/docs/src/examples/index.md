# 示例中心

所有示例由以下包提供技术支持：

- `vue-popup-plus` 核心包，提供弹出层的基础功能。
- `vue-popup-plus-preset-plugin` 预置插件包，提供一些开箱即用的常用功能。

## 基础功能

::: tip
以下示例由 `vue-popup-plus` 核心包提供技术支持。
:::

### 渲染和生命周期

::: demo

```html
<DButtonGroup theme="primary">
	<DButton @click="handlePopup">基础弹出层</DButton>
	<DButton type="plain" @click="handlePopupWithProps">传递 props</DButton>
	<DButton type="plain" @click="handlePopupWithOnMounted"
		>触发 onMounted</DButton
	>
	<DButton type="plain" @click="handlePopupWithOnUnmounted"
		>触发 onUnmounted</DButton
	>
</DButtonGroup>
```

```ts
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopup() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupWithProps() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		componentProps: {
			test: '这是一个组件参数',
		},
	})
}

function handlePopupWithOnMounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toast('onMounted 触发', {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted() {
			popup.toast('onUnmounted 触发', {
				theme: 'danger',
			})
		},
	})
}
```

:::

### 位置

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithTranslateX">设置横向偏移</DButton>
	<DButton @click="handlePopupWithTranslateY">设置纵向偏移</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithTranslateX() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateX: 200,
	})
}

function handlePopupWithTranslateY() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateY: 200,
	})
}
```

:::

### 遮罩

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithoutMaskBlur">禁用遮罩高斯模糊</DButton>
	<DButton @click="handlePopupWithoutMask">禁用遮罩</DButton>
	<DButton @click="handlePopupWithMaskClickClose"
		>启用遮罩点击关闭弹出层</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupWithoutMaskBlur() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskBlur: false,
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		mask: false,
	})
}

function handlePopupWithMaskClickClose() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskClickClose: true,
	})
}
```

:::

## 预置插件

::: tip
以下示例由 `vue-popup-plus-preset-plugin` 预置插件包提供技术支持。
:::

### Toast 消息

#### 基础功能

::: demo

```html
<DButtonGroup theme="primary">
	<DButton @click="handlePopupToast">消息</DButton>
	<DButton type="plain" @click="handlePopupToastLongText">长文本</DButton>
	<DButton type="plain" @click="handlePopupToastDuration">持续10秒</DButton>
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

#### 主题

::: demo

```html
<DButtonGroup>
	<DButton @click="handlePopupToastDefault" theme="primary" type="plain"
		>默认</DButton
	>
	<DButton @click="handlePopupToastPrimary" theme="primary">主要</DButton>
	<DButton @click="handlePopupToastSuccess" theme="success">成功</DButton>
	<DButton @click="handlePopupToastInfo" theme="info">信息</DButton>
	<DButton @click="handlePopupToastWarning" theme="warning">警告</DButton>
	<DButton @click="handlePopupToastDanger" theme="danger">危险</DButton>
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

### Alert 提示

#### 基础功能

::: demo

```html
<DButtonGroup theme="primary">
	<DButton @click="handlePopuAlert">提示</DButton>
	<DButton @click="handlePopuAlertWaitClose" type="plain">等待关闭</DButton>
</DButtonGroup>
```

```ts
function handlePopuAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopuAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')

	popup.toast('提示已关闭', {
		theme: 'primary',
	})
}
```

:::

#### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopuAlertWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopuAlertWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuAlertWithCustomTitle() {
	popup.alert('这是一条提示消息', {
		title: '自定义标题',
	})
}

function handlePopuAlertWithCustomConfirmText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}
```

:::

#### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopuAlertWithHeaderClose">禁用标题关闭按钮</DButton>
	<DButton @click="handlePopuAlertWithoutMaskBlur">禁用遮罩高斯模糊</DButton>
	<DButton @click="handlePopuAlertWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopuAlertWithDragOverflow">允许拖拽超出屏幕</DButton>
</DButtonGroup>
```

```ts
function handlePopuAlertWithHeaderClose() {
	popup.alert('这是一条提示消息', {
		headClose: false,
	})
}

function handlePopuAlertWithoutMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: false,
	})
}

function handlePopuAlertWithDraggable() {
	popup.alert('这是一条提示消息', {
		draggable: true,
	})
}

function handlePopuAlertWithDragOverflow() {
	popup.alert('这是一条提示消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

### Confirm 确认

#### 基础功能

::: demo

```html
<DButtonGroup theme="primary">
	<DButton @click="handlePopuConfirm">确认</DButton>
	<DButton @click="handlePopuConfirmWithResult" type="plain"
		>获取用户确认结果</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuConfirm() {
	popup.confirm('这是一条确认消息')
}

async function handlePopuConfirmWithResult() {
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

#### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopuConfirmWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopuConfirmWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopuConfirmWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuConfirmWithCustomTitle() {
	popup.confirm('这是一条确认消息', {
		title: '自定义标题',
	})
}

function handlePopuConfirmWithCustomConfirmText() {
	popup.confirm('这是一条确认消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopuConfirmWithCustomCancelText() {
	popup.confirm('这是一条确认消息', {
		cancelText: '自定义取消按钮文本',
	})
}
```

:::

#### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopuConfirmWithHeaderClose"
		>启用标题关闭按钮</DButton
	>
	<DButton @click="handlePopuConfirmWithoutMaskBlur"
		>禁用遮罩高斯模糊</DButton
	>
	<DButton @click="handlePopuConfirmWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopuConfirmWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuConfirmWithHeaderClose() {
	popup.confirm('这是一条确认消息', {
		headClose: false,
	})
}

function handlePopuConfirmWithoutMaskBlur() {
	popup.confirm('这是一条确认消息', {
		maskBlur: false,
	})
}

function handlePopuConfirmWithDraggable() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
	})
}

function handlePopuConfirmWithDragOverflow() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

### Prompt 提示输入

#### 基础功能

::: demo

```html
<DButtonGroup theme="primary">
	<DButton @click="handlePopuPrompt">提示输入</DButton>
	<DButton @click="handlePopuPromptWithDefaultValue" type="plain"
		>默认值</DButton
	>
	<DButton @click="handlePopuPromptWithTextarea" type="plain"
		>文本域类型</DButton
	>
	<DButton @click="handlePopuPromptWithResult" type="plain"
		>获取用户输入结果</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuPrompt() {
	popup.prompt('这是一条提示输入消息')
}

function handlePopuPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '这是默认值',
	})
}

function handlePopuPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}

async function handlePopuPromptWithResult() {
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

#### 进阶功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopuPromptWithCustomTitle">自定义标题文本</DButton>
	<DButton @click="handlePopuPromptWithCustomConfirmText"
		>自定义确认按钮文本</DButton
	>
	<DButton @click="handlePopuPromptWithCustomCancelText"
		>自定义取消按钮文本</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
	})
}

function handlePopuPromptWithCustomConfirmText() {
	popup.prompt('这是一条提示输入消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopuPromptWithCustomCancelText() {
	popup.prompt('这是一条提示输入消息', {
		cancelText: '自定义取消按钮文本',
	})
}
```

:::

#### 高级功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopuPromptWithHeaderClose">禁用标题关闭按钮</DButton>
	<DButton @click="handlePopuPromptWithoutMaskBlur">禁用遮罩高斯模糊</DButton>
	<DButton @click="handlePopuPromptWithDraggable">标题栏允许拖拽</DButton>
	<DButton @click="handlePopuPromptWithDragOverflow"
		>允许拖拽超出屏幕</DButton
	>
</DButtonGroup>
```

```ts
function handlePopuPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headClose: false,
	})
}

function handlePopuPromptWithoutMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: false,
	})
}

function handlePopuPromptWithDraggable() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
	})
}

function handlePopuPromptWithDragOverflow() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
		dragOverflow: true,
	})
}
```

:::

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

const popup = usePopup()

function handlePopup(){
	popup.render({
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupWithProps() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		componentProps: {
			test: '这是一个组件参数',
		},
	})
}

function handlePopupWithOnMounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toast('onMounted 触发', {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted() {
			popup.toast('onUnmounted 触发', {
				theme: 'danger',
			})
		},
	})
}

function handlePopupWithTranslateX() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateX: 200,
	})
}

function handlePopupWithTranslateY() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateY: 200,
	})
}

function handlePopupWithoutMaskBlur() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskBlur: false,
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		mask: false,
	})
}

function handlePopupWithMaskClickClose() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskClickClose: true,
	})
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

function handlePopuAlert() {
	popup.alert('这是一条提示消息')
}

async function handlePopuAlertWaitClose() {
	await popup.alert('这是一条提示消息，关闭后将执行后续代码')
	popup.toast('提示已关闭', {
		theme: 'primary',
	})
}

function handlePopuAlertWithCustomTitle() {
	popup.alert('这是一条提示消息', {
		title: '自定义标题',
	})
}

function handlePopuAlertWithCustomConfirmText() {
	popup.alert('这是一条提示消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopuAlertWithHeaderClose() {
	popup.alert('这是一条提示消息', {
		headerClose: false,
	})
}

function handlePopuAlertWithoutMaskBlur() {
	popup.alert('这是一条提示消息', {
		maskBlur: false,
	})
}

function handlePopuAlertWithDraggable() {
	popup.alert('这是一条提示消息', {
		draggable: true,
	})
}

function handlePopuAlertWithDragOverflow() {
	popup.alert('这是一条提示消息', {
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopuConfirm() {
	popup.confirm('这是一条确认消息')
}

async function handlePopuConfirmWithResult() {
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

function handlePopuConfirmWithCustomTitle() {
	popup.confirm('这是一条确认消息', {
		title: '自定义标题',
	})
}

function handlePopuConfirmWithCustomConfirmText() {
	popup.confirm('这是一条确认消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopuConfirmWithCustomCancelText() {
	popup.confirm('这是一条确认消息', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePopuConfirmWithHeaderClose() {
	popup.confirm('这是一条确认消息', {
		headerClose: true,
	})
}

function handlePopuConfirmWithoutMaskBlur() {
	popup.confirm('这是一条确认消息', {
		maskBlur: false,
	})
}

function handlePopuConfirmWithDraggable() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
	})
}

function handlePopuConfirmWithDragOverflow() {
	popup.confirm('这是一条确认消息', {
		draggable: true,
		dragOverflow: true,
	})
}

function handlePopuPrompt() {
	popup.prompt('这是一条提示输入消息')
}

function handlePopuPromptWithDefaultValue() {
	popup.prompt('这是一条提示输入消息', {
		defaultValue: '这是默认值',
	})
}

function handlePopuPromptWithTextarea() {
	popup.prompt('这是一条提示输入消息', {
		type: 'textarea',
	})
}

async function handlePopuPromptWithResult() {
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

function handlePopuPromptWithCustomTitle() {
	popup.prompt('这是一条提示输入消息', {
		title: '自定义标题',
	})
}

function handlePopuPromptWithCustomConfirmText() {
	popup.prompt('这是一条提示输入消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopuPromptWithCustomCancelText() {
	popup.prompt('这是一条提示输入消息', {
		cancelText: '自定义取消按钮文本',
	})
}

function handlePopuPromptWithHeaderClose() {
	popup.prompt('这是一条提示输入消息', {
		headerClose: false,
	})
}

function handlePopuPromptWithoutMaskBlur() {
	popup.prompt('这是一条提示输入消息', {
		maskBlur: false,
	})
}

function handlePopuPromptWithDraggable() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
	})
}

function handlePopuPromptWithDragOverflow() {
	popup.prompt('这是一条提示输入消息', {
		draggable: true,
		dragOverflow: true,
	})
}

</script>
