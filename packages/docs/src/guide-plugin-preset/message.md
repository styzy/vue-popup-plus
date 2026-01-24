# Message 消息 <Badge text="1.7.0+" />

> <DVersionSupport package="plugin" version="1.7.0" />

一般用于主动操作后的`反馈提示`，如删除成功、保存成功等。

## 基础使用

调用 `message` 方法可以弹出一条提示，默认在屏幕上方显示。

::: demo

```html
<DButton theme="primary" @click="handleMessage">消息</DButton>
```

```ts
function handleMessage() {
	popup.message('这是一条消息') // [!code highlight]
}
```

:::

## 快速使用主题 <Badge text="1.7.0+" />

> <DVersionSupport package="plugin" version="1.7.0" />

直接使用 `messagePrimary()` 、 `messageSuccess()` 、 `messageInfo()` 、 `messageWarning()` 、 `messageDanger()` 方法可以快速显示不同主题的消息提示。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleMessagePrimary">主要</DButton>
	<DButton theme="info" @click="handleMessageInfo">信息</DButton>
	<DButton theme="success" @click="handleMessageSuccess">成功</DButton>
	<DButton theme="warning" @click="handleMessageWarning">警告</DButton>
	<DButton theme="danger" @click="handleMessageDanger">危险</DButton>
</DButtonGroup>
```

```ts
function handleMessagePrimary() {
	popup.messagePrimary('这是一条主要主题的消息')
}

function handleMessageInfo() {
	popup.messageInfo('这是一条信息主题的消息')
}

function handleMessageSuccess() {
	popup.messageSuccess('这是一条成功主题的消息')
}

function handleMessageWarning() {
	popup.messageWarning('这是一条警告主题的消息')
}

function handleMessageDanger() {
	popup.messageDanger('这是一条危险主题的消息')
}
```

:::

## 设置主题

通过 `theme` 属性可以设置消息的主题，默认值为 `primary`，支持的主题有 `primary`、`info`、`success`、`warning`、`danger`。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleMessageThemePrimary">主要</DButton>
	<DButton theme="info" @click="handleMessageThemeInfo">信息</DButton>
	<DButton theme="success" @click="handleMessageThemeSuccess">成功</DButton>
	<DButton theme="warning" @click="handleMessageThemeWarning">警告</DButton>
	<DButton theme="danger" @click="handleMessageThemeDanger">危险</DButton>
</DButtonGroup>
```

```ts
function handleMessageThemePrimary() {
	popup.message('这是一条主要主题的消息')
}

function handleMessageThemeInfo() {
	popup.message('这是一条信息主题的消息', {
		theme: 'info', // [!code highlight]
	})
}

function handleMessageThemeSuccess() {
	popup.message('这是一条成功主题的消息', {
		theme: 'success', // [!code highlight]
	})
}

function handleMessageThemeWarning() {
	popup.message('这是一条警告主题的消息', {
		theme: 'warning', // [!code highlight]
	})
}

function handleMessageThemeDanger() {
	popup.message('这是一条危险主题的消息', {
		theme: 'danger', // [!code highlight]
	})
}
```

:::

## 设置位置 <Badge text="1.7.0+" />

> <DVersionSupport package="plugin" version="1.7.0" />

通过 `placement` 属性可以设置消息的位置，默认值为 `center`，支持的位置有：

- `left-top`
- `left`
- `left-bottom`
- `top`
- `center`
- `bottom`
- `right-top`
- `right`
- `right-bottom`

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleMessagePlacementLeftTop"
		>左上</DButton
	>
	<DButton theme="primary" @click="handleMessagePlacementTop">顶部</DButton>
	<DButton theme="primary" @click="handleMessagePlacementRightTop"
		>右上</DButton
	>
	<DButton theme="primary" @click="handleMessagePlacementLeft">左中</DButton>
	<DButton theme="primary" @click="handleMessagePlacementCenter"
		>居中</DButton
	>
	<DButton theme="primary" @click="handleMessagePlacementRight">右中</DButton>
	<DButton theme="primary" @click="handleMessagePlacementLeftBottom"
		>左下</DButton
	>
	<DButton theme="primary" @click="handleMessagePlacementBottom"
		>底部</DButton
	>
	<DButton theme="primary" @click="handleMessagePlacementRightBottom"
		>右下</DButton
	>
</DButtonGroup>
```

```ts
function handleMessagePlacementLeftTop() {
	popup.message('这是一条左上位置的消息', {
		placement: 'left-top', // [!code highlight]
	})
}

function handleMessagePlacementTop() {
	popup.message('这是一条顶部位置的消息', {
		placement: 'top', // [!code highlight]
	})
}

function handleMessagePlacementRightTop() {
	popup.message('这是一条右上位置的消息', {
		placement: 'right-top', // [!code highlight]
	})
}

function handleMessagePlacementLeft() {
	popup.message('这是一条左中位置的消息', {
		placement: 'left', // [!code highlight]
	})
}

function handleMessagePlacementCenter() {
	popup.message('这是一条居中位置的消息', {
		placement: 'center', // [!code highlight]
	})
}

function handleMessagePlacementRight() {
	popup.message('这是一条右中位置的消息', {
		placement: 'right', // [!code highlight]
	})
}

function handleMessagePlacementLeftBottom() {
	popup.message('这是一条左下位置的消息', {
		placement: 'left-bottom', // [!code highlight]
	})
}

function handleMessagePlacementBottom() {
	popup.message('这是一条底部的消息', {
		placement: 'bottom', // [!code highlight]
	})
}

function handleMessagePlacementRightBottom() {
	popup.message('这是一条右下位置的消息', {
		placement: 'right-bottom', // [!code highlight]
	})
}

function handleMessagePlacementRightBottom() {
	popup.message('这是一条右下位置的消息', {
		placement: 'right-bottom', // [!code highlight]
	})
}
```

:::

## 持续时间

通过 `duration` 属性可以设置消息显示的持续时间，单位为毫秒，默认值为 `2000` 毫秒。

从 <DVersion package="plugin" version="1.7.0" plus /> 开始，`duration` 属性支持设置为 `0` ，表示不会自动关闭，同时会强制显示关闭按钮。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleMessageDuration"
		>持续5秒的消息</DButton
	>
	<DButton theme="primary" @click="handleMessageDurationZero"
		>不会自动关闭的消息</DButton
	>
</DButtonGroup>
```

```ts
function handleMessageDuration() {
	popup.message('这是一条持续5秒的消息', {
		duration: 5000, // [!code highlight]
	})
}

function handleMessageDurationZero() {
	popup.message('这是一条不会自动关闭的消息', {
		duration: 0, // [!code highlight]
	})
}
```

:::

## 显示关闭按钮 <Badge text="1.7.0+" />

> <DVersionSupport package="plugin" version="1.7.0" />

通过 `showClose` 属性可以设置是否显示关闭按钮，允许用户手动关闭消息，默认值为 `false`。

::: demo

```html
<DButton theme="primary" @click="handleMessageShowClose"
	>显示关闭按钮的消息</DButton
>
```

```ts
function handleMessageShowClose() {
	popup.message('这是一条显示关闭按钮的消息', {
		showClose: true, // [!code highlight]
	})
}
```

:::

## 禁用鼠标悬停持续显示 <Badge text="1.7.0+" />

> <DVersionSupport package="plugin" version="1.7.0" />

从 <DVersion package="plugin" version="1.7.0" plus /> 开始，消息默认开启鼠标悬停持续显示，当用户鼠标悬停在消息上时，将会持续显示，直到鼠标移出消息区域，消息才会自动关闭。

通过将 `hoverWait` 属性设置为 `false` 可以禁用鼠标悬停持续显示。

::: demo

```html
<DButton theme="primary" @click="handleMessageHoverWaitFalse"
	>禁用鼠标悬停持续显示</DButton
>
```

```ts
function handleMessageHoverWaitFalse() {
	popup.message('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false, // [!code highlight]
	})
}
```

:::

## 详细配置

具体可以参考 [预置插件 API - Message 消息](/api/plugin-preset/message)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleMessage() {
	popup.message('这是一条消息')
}

function handleMessagePrimary() {
	popup.messagePrimary('这是一条主要主题的消息')
}

function handleMessageInfo() {
	popup.messageInfo('这是一条信息主题的消息')
}

function handleMessageSuccess() {
	popup.messageSuccess('这是一条成功主题的消息')
}

function handleMessageWarning() {
	popup.messageWarning('这是一条警告主题的消息')
}

function handleMessageDanger() {
	popup.messageDanger('这是一条危险主题的消息')
}

function handleMessageThemePrimary() {
	popup.message('这是一条主要主题的消息', {
		theme: 'primary',
	})
}

function handleMessageThemeInfo() {
	popup.message('这是一条信息主题的消息', {
		theme: 'info',
	})
}

function handleMessageThemeSuccess() {
	popup.message('这是一条成功主题的消息', {
		theme: 'success',
	})
}

function handleMessageThemeWarning() {
	popup.message('这是一条警告主题的消息', {
		theme: 'warning',
	})
}

function handleMessageThemeDanger() {
	popup.message('这是一条危险主题的消息', {
		theme: 'danger',
	})
}

function handleMessagePlacementLeftTop() {
	popup.message('这是一条左上位置的消息', {
		placement: 'left-top',
	})
}

function handleMessagePlacementTop() {
	popup.message('这是一条顶部位置的消息', {
		placement: 'top',
	})
}

function handleMessagePlacementRightTop() {
	popup.message('这是一条右上位置的消息', {
		placement: 'right-top',
	})
}

function handleMessagePlacementLeft() {
	popup.message('这是一条左中位置的消息', {
		placement: 'left',
	})
}

function handleMessagePlacementCenter() {
	popup.message('这是一条居中位置的消息', {
		placement: 'center',
	})
}

function handleMessagePlacementRight() {
	popup.message('这是一条右中位置的消息', {
		placement: 'right',
	})
}

function handleMessagePlacementLeftBottom() {
	popup.message('这是一条左下位置的消息', {
		placement: 'left-bottom',
	})
}

function handleMessagePlacementBottom() {
	popup.message('这是一条底部的消息', {
		placement: 'bottom',
	})
}

function handleMessagePlacementRightBottom() {
	popup.message('这是一条右下位置的消息', {
		placement: 'right-bottom',
	})
}

function handleMessageDuration() {
	popup.message('这是一条持续5秒的消息', {
		duration: 5000,
	})
}

function handleMessageDurationZero() {
	popup.message('这是一条不会自动关闭的消息', {
		duration: 0,
	})
}


function handleMessageShowClose() {
	popup.message('这是一条显示关闭按钮的消息', {
		showClose: true,
	})
}

function handleMessageHoverWaitFalse() {
	popup.message('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false,
	})
}

async function handleMessageWaitClose() {
	await popup.message('这是一条消息')
	popup.message('弹出层已关闭',{
		theme: 'success',
	})
}
</script>
