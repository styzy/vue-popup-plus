# Message 消息 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupMessage" type="default">消息</DButton>
</DButtonGroup>
```

```ts
function handlePopupMessage() {
	popup.message('这是一条消息')
}
```

:::

## 主题

::: demo

```html
<DButtonGroup>
	<DButton @click="handlePopupMessagePrimary" theme="primary"
		>主要主题</DButton
	>
	<DButton @click="handlePopupMessageSuccess" theme="success"
		>成功主题</DButton
	>
	<DButton @click="handlePopupMessageInfo" theme="info">信息主题</DButton>
	<DButton @click="handlePopupMessageWarning" theme="warning"
		>警告主题</DButton
	>
	<DButton @click="handlePopupMessageDanger" theme="danger">危险主题</DButton>
</DButtonGroup>
```

```ts
function handlePopupMessagePrimary() {
	popup.messagePrimary('这是一条主要主题的消息')
}

function handlePopupMessageSuccess() {
	popup.messageSuccess('这是一条成功主题的消息')
}

function handlePopupMessageInfo() {
	popup.messageInfo('这是一条信息主题的消息')
}

function handlePopupMessageWarning() {
	popup.messageWarning('这是一条警告主题的消息')
}

function handlePopupMessageDanger() {
	popup.messageDanger('这是一条危险主题的消息')
}
```

:::

## 持续时间

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupMessageDuration">持续10秒</DButton>
	<DButton @click="handlePopupMessageDurationZero">持续显示</DButton>
</DButtonGroup>
```

```ts
function handlePopupMessageDuration() {
	popup.message('这是一条持续10秒的消息', {
		duration: 10000,
	})
}

function handlePopupMessageDurationZero() {
	popup.message('这是一条持续显示的消息', {
		duration: 0,
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
		<DButton @click="handlePopupMessageLeftTop" theme="primary"
			>左上</DButton
		>
		<DButton @click="handlePopupMessageLeft" theme="primary">左侧</DButton>
		<DButton @click="handlePopupMessageLeftBottom" theme="primary"
			>左下</DButton
		>
	</DButtonGroup>
	<DButtonGroup type="plain" direction="vertical">
		<DButton @click="handlePopupMessageTop" theme="primary">顶部</DButton>
		<DButton
			@click="handlePopupMessageCenter"
			theme="primary"
			type="default"
			>居中</DButton
		>
		<DButton @click="handlePopupMessageBottom" theme="primary"
			>底部</DButton
		>
	</DButtonGroup>
	<DButtonGroup type="plain" direction="vertical">
		<DButton @click="handlePopupMessageRightTop" theme="primary"
			>右上</DButton
		>
		<DButton @click="handlePopupMessageRight" theme="primary">右侧</DButton>
		<DButton @click="handlePopupMessageRightBottom" theme="primary"
			>右下</DButton
		>
	</DButtonGroup>
</div>
```

```ts
function handlePopupMessageLeftTop() {
	popup.message('这是一条左上位置的消息', {
		placement: 'left-top',
	})
}

function handlePopupMessageLeft() {
	popup.message('这是一条左侧位置的消息', {
		placement: 'left',
	})
}

function handlePopupMessageLeftBottom() {
	popup.message('这是一条左下位置的消息', {
		placement: 'left-bottom',
	})
}

function handlePopupMessageTop() {
	popup.message('这是一条顶部位置的消息', {
		placement: 'top',
	})
}

function handlePopupMessageCenter() {
	popup.message('这是一条居中位置的消息', {
		placement: 'center',
	})
}

function handlePopupMessageBottom() {
	popup.message('这是一条底部位置的消息', {
		placement: 'bottom',
	})
}

function handlePopupMessageRightTop() {
	popup.message('这是一条右上位置的消息', {
		placement: 'right-top',
	})
}

function handlePopupMessageRight() {
	popup.message('这是一条右侧位置的消息', {
		placement: 'right',
	})
}

function handlePopupMessageRightBottom() {
	popup.message('这是一条右下位置的消息', {
		placement: 'right-bottom',
	})
}
```

:::

## 交互

::: demo

```html
<DButtonGroup type="plain">
	<DButton @click="handlePopupMessageShowClose" theme="primary"
		>显示关闭按钮</DButton
	>
	<DButton @click="handlePopupMessageHoverWait" theme="primary"
		>禁用鼠标悬停持续显示</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupMessageShowClose() {
	popup.message('这是一条显示关闭按钮的消息', {
		showClose: true,
	})
}

function handlePopupMessageHoverWait() {
	popup.message('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false,
	})
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Message 消息提示](/guide-plugin-preset/message)。

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupMessage() {
	popup.message('这是一条消息')
}

function handlePopupMessagePrimary() {
	popup.messagePrimary('这是一条主要主题的消息')
}

function handlePopupMessageSuccess() {
	popup.messageSuccess('这是一条成功主题的消息')
}

function handlePopupMessageInfo() {
	popup.messageInfo('这是一条信息主题的消息')
}

function handlePopupMessageWarning() {
	popup.messageWarning('这是一条警告主题的消息')
}

function handlePopupMessageDanger() {
	popup.messageDanger('这是一条危险主题的消息')
}

function handlePopupMessageDuration() {
	popup.message('这是一条持续10秒的消息', {
		duration: 10000,
	})
}

function handlePopupMessageDurationZero() {
	popup.message('这是一条持续显示的消息', {
		duration: 0,
	})
}

function handlePopupMessageLeftTop() {
	popup.message('这是一条左上位置的消息', {
		placement: 'left-top',
	})
}

function handlePopupMessageLeft() {
	popup.message('这是一条左侧位置的消息', {
		placement: 'left',
	})
}

function handlePopupMessageLeftBottom() {
	popup.message('这是一条左下位置的消息', {
		placement: 'left-bottom',
	})
}

function handlePopupMessageTop() {
	popup.message('这是一条顶部位置的消息', {
		placement: 'top',
	})
}

function handlePopupMessageCenter() {
	popup.message('这是一条居中位置的消息', {
		placement: 'center',
	})
}

function handlePopupMessageBottom() {
	popup.message('这是一条底部位置的消息', {
		placement: 'bottom',
	})
}

function handlePopupMessageRightTop() {
	popup.message('这是一条右上位置的消息', {
		placement: 'right-top',
	})
}

function handlePopupMessageRight() {
	popup.message('这是一条右侧位置的消息', {
		placement: 'right',
	})
}

function handlePopupMessageRightBottom() {
	popup.message('这是一条右下位置的消息', {
		placement: 'right-bottom',
	})
}

function handlePopupMessageShowClose() {
	popup.message('这是一条显示关闭按钮的消息', {
		showClose: true,
	})
}

function handlePopupMessageHoverWait() {
	popup.message('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false,
	})
}
</script>
