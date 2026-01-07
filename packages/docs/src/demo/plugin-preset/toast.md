---
outline: 2
---

# Toast 轻量提示 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础功能

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupToast" type="default">轻量提示</DButton>
	<DButton @click="handlePopupToastLongText">长文本</DButton>
	<DButton @click="handlePopupToastDuration">持续10秒</DButton>
	<DButton @click="handlePopupToastDurationZero">持续显示</DButton>
</DButtonGroup>
```

```ts
function handlePopupToast() {
	popup.toast('这是一条轻量提示消息')
}

function handlePopupToastLongText() {
	popup.toast(
		'这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；'
	)
}

function handlePopupToastDuration() {
	popup.toast('这是一条持续10秒的轻量提示消息', {
		duration: 10000,
	})
}

function handlePopupToastDurationZero() {
	popup.toast('这是一条持续显示的轻量提示消息', {
		duration: 0,
	})
}
```

:::

## 进阶功能

### 主题

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
	popup.toastPrimary('这是一条主要主题的轻量提示消息')
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功主题的轻量提示消息')
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息主题的轻量提示消息')
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告主题的轻量提示消息')
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险主题的轻量提示消息')
}
```

:::

### 位置

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
	popup.toast('这是一条左上位置的轻量提示消息', {
		placement: 'left-top',
	})
}

function handlePopupToastLeft() {
	popup.toast('这是一条左侧位置的轻量提示消息', {
		placement: 'left',
	})
}

function handlePopupToastLeftBottom() {
	popup.toast('这是一条左下位置的轻量提示消息', {
		placement: 'left-bottom',
	})
}

function handlePopupToastTop() {
	popup.toast('这是一条顶部位置的轻量提示消息', {
		placement: 'top',
	})
}

function handlePopupToastCenter() {
	popup.toast('这是一条居中位置的轻量提示消息', {
		placement: 'center',
	})
}

function handlePopupToastBottom() {
	popup.toast('这是一条底部位置的轻量提示消息', {
		placement: 'bottom',
	})
}

function handlePopupToastRightTop() {
	popup.toast('这是一条右上位置的轻量提示消息', {
		placement: 'right-top',
	})
}

function handlePopupToastRight() {
	popup.toast('这是一条右侧位置的轻量提示消息', {
		placement: 'right',
	})
}

function handlePopupToastRightBottom() {
	popup.toast('这是一条右下位置的轻量提示消息', {
		placement: 'right-bottom',
	})
}
```

:::

## 高级功能

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
	popup.toast('这是一条显示关闭按钮的轻量提示消息', {
		showClose: true,
	})
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用鼠标悬停持续显示的轻量提示消息', {
		hoverWait: false,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Toast 轻量提示](/guide-plugin-preset/toast)

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupToast() {
	popup.toast('这是一条轻量提示消息')
}

function handlePopupToastLongText() {
	popup.toast(
		'这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；这是一条长文本轻量提示，用于测试 toast 组件的长文本显示效果；'
	)
}

function handlePopupToastDuration() {
	popup.toast('这是一条持续10秒的轻量提示消息', {
		duration: 10000,
	})
}

function handlePopupToastDurationZero() {
	popup.toast('这是一条持续显示的轻量提示消息', {
		duration: 0,
	})
}

function handlePopupToastDefault() {
	popup.toast('这是一条默认主题的轻量提示消息')
}

function handlePopupToastPrimary() {
	popup.toast('这是一条主要主题的轻量提示消息')
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功主题的轻量提示消息')
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息主题的轻量提示消息')
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告主题的轻量提示消息')
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险主题的轻量提示消息')
}

function handlePopupToastLeftTop() {
	popup.toast('这是一条左上位置的轻量提示消息', {
		placement: 'left-top',
	})
}

function handlePopupToastLeft() {
	popup.toast('这是一条左侧位置的轻量提示消息', {
		placement: 'left',
	})
}

function handlePopupToastLeftBottom() {
	popup.toast('这是一条左下位置的轻量提示消息', {
		placement: 'left-bottom',
	})
}

function handlePopupToastTop() {
	popup.toast('这是一条顶部位置的轻量提示消息', {
		placement: 'top',
	})
}

function handlePopupToastCenter() {
	popup.toast('这是一条居中位置的轻量提示消息', {
		placement: 'center',
	})
}

function handlePopupToastBottom() {
	popup.toast('这是一条底部位置的轻量提示消息', {
		placement: 'bottom',
	})
}

function handlePopupToastRightTop() {
	popup.toast('这是一条右上位置的轻量提示消息', {
		placement: 'right-top',
	})
}

function handlePopupToastRight() {
	popup.toast('这是一条右侧位置的轻量提示消息', {
		placement: 'right',
	})
}

function handlePopupToastRightBottom() {
	popup.toast('这是一条右下位置的轻量提示消息', {
		placement: 'right-bottom',
	})
}

function handlePopupToastShowClose() {
	popup.toast('这是一条显示关闭按钮的轻量提示消息', {
		showClose: true,
	})
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用鼠标悬停持续显示的轻量提示消息', {
		hoverWait: false,
	})
}
</script>
