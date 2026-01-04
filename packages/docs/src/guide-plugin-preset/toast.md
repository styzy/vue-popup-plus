# Toast 消息

一般用于提示用户 `轻量简短` 的消息，例如操作成功、操作失败等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [等待弹出层关闭](/guide-plugin-preset/toast#等待弹出层关闭)。
:::

## 基础使用

调用 `toast` 方法可以弹出一条消息，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleToast">消息</DButton>
```

```ts
function handleToast() {
	popup.toast('这是一条消息') // [!code highlight]
}
```

:::

## 快速使用主题 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

直接使用 `toastPrimary()` 、 `toastSuccess()` 、 `toastInfo()` 、 `toastWarning()` 、 `toastDanger()` 方法可以快速显示不同主题的消息。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleToastPrimary">主要</DButton>
	<DButton theme="info" @click="handleToastInfo">信息</DButton>
	<DButton theme="success" @click="handleToastSuccess">成功</DButton>
	<DButton theme="warning" @click="handleToastWarning">警告</DButton>
	<DButton theme="danger" @click="handleToastDanger">危险</DButton>
</DButtonGroup>
```

```ts
function handleToastPrimary() {
	popup.toastPrimary('这是一条主要主题消息')
}

function handleToastInfo() {
	popup.toastInfo('这是一条信息主题消息')
}

function handleToastSuccess() {
	popup.toastSuccess('这是一条成功主题消息')
}

function handleToastWarning() {
	popup.toastWarning('这是一条警告主题消息')
}

function handleToastDanger() {
	popup.toastDanger('这是一条危险主题消息')
}
```

:::

::: warning
在 `1.5.x` 版本，快速主题方法的使用方式是：

- `toast.success()`
- `toast.info()`
- `toast.warning()`
- `toast.danger()`

这些方法使用的是静态方法，无法动态同步组件上下文，因此从 `1.6.0` 版本开始被废弃，因此请使用新的主题方法代替：

- `toastPrimary()`
- `toastSuccess()`
- `toastInfo()`
- `toastWarning()`
- `toastDanger()`

:::

## 设置主题

通过 `theme` 属性可以设置消息的主题，默认值为 `primary`，支持的主题有 `primary`、`info`、`success`、`warning`、`danger`。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleToastThemePrimary">主要</DButton>
	<DButton theme="info" @click="handleToastThemeInfo">信息</DButton>
	<DButton theme="success" @click="handleToastThemeSuccess">成功</DButton>
	<DButton theme="warning" @click="handleToastThemeWarning">警告</DButton>
	<DButton theme="danger" @click="handleToastThemeDanger">危险</DButton>
</DButtonGroup>
```

```ts
function handleToastThemePrimary() {
	popup.toast('这是一条主要主题消息')
}

function handleToastThemeInfo() {
	popup.toast('这是一条信息主题消息', {
		theme: 'info', // [!code highlight]
	})
}

function handleToastThemeSuccess() {
	popup.toast('这是一条成功主题消息', {
		theme: 'success', // [!code highlight]
	})
}

function handleToastThemeWarning() {
	popup.toast('这是一条警告主题消息', {
		theme: 'warning', // [!code highlight]
	})
}

function handleToastThemeDanger() {
	popup.toast('这是一条危险主题消息', {
		theme: 'danger', // [!code highlight]
	})
}
```

:::

## 设置位置 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

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
	<DButton theme="primary" @click="handleToastPlacementLeft">左侧</DButton>
	<DButton theme="primary" @click="handleToastPlacementTop">顶部</DButton>
	<DButton theme="primary" @click="handleToastPlacementRightTop"
		>右上</DButton
	>
</DButtonGroup>
```

```ts
function handleToastPlacementLeft() {
	popup.toast('这是一条左侧位置的消息', {
		placement: 'left', // [!code highlight]
	})
}

function handleToastPlacementTop() {
	popup.toast('这是一条顶部位置的消息', {
		placement: 'top', // [!code highlight]
	})
}

function handleToastPlacementRightTop() {
	popup.toast('这是一条右上位置的消息', {
		placement: 'right-top', // [!code highlight]
	})
}
```

:::

## 持续时间

通过 `duration` 属性可以设置消息显示的持续时间，单位为毫秒，默认值为 `2000` 毫秒。

从 <DVersion package="plugin" version="1.5.0" plus /> 开始，`duration` 属性支持设置为 `0` ，表示消息不会自动关闭，会强制显示关闭按钮。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" @click="handleToastDuration"
		>持续5秒的消息</DButton
	>
	<DButton theme="primary" @click="handleToastDurationZero"
		>不会自动关闭的消息</DButton
	>
</DButtonGroup>
```

```ts
function handleToastDuration() {
	popup.toast('这是一条持续5秒的消息', {
		duration: 5000, // [!code highlight]
	})
}

function handleToastDurationZero() {
	popup.toast('这是一条不会自动关闭的消息', {
		duration: 0, // [!code highlight]
	})
}
```

:::

## 显示关闭按钮 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

通过 `showClose` 属性可以设置是否显示关闭按钮，允许用户手动关闭消息，默认值为 `false`。

::: demo

```html
<DButton theme="primary" @click="handleToastShowClose"
	>显示关闭按钮的消息</DButton
>
```

```ts
function handleToastShowClose() {
	popup.toast('这是一条显示关闭按钮的消息', {
		showClose: true, // [!code highlight]
	})
}
```

:::

## 禁用鼠标悬停持续显示 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

从 <DVersion package="plugin" version="1.5.0" plus /> 开始，消息默认开启鼠标悬停持续显示，当用户鼠标悬停在消息上时，消息将会持续显示，直到鼠标移出消息区域，消息才会自动关闭。

通过将 `hoverWait` 属性设置为 `false` 可以禁用鼠标悬停持续显示。

::: demo

```html
<DButton theme="primary" @click="handleToastHoverWaitFalse"
	>禁用鼠标悬停持续显示</DButton
>
```

```ts
function handleToastHoverWaitFalse() {
	popup.toast('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false, // [!code highlight]
	})
}
```

:::

## 等待弹出层关闭

该方法返回一个 `Promise<void>` 对象，当弹出层关闭后，会执行 `resolve` 方法，因此你可以通过 `await` 来等待弹出层关闭。

::: demo

```html
<DButton theme="primary" @click="handleToastWaitClose">等待弹出层关闭</DButton>
```

```ts
async function handleToastWaitClose() {
	await popup.toast('这是一条消息')
	popup.toast('弹出层已关闭')
}
```

:::

## 详细配置

具体可以参考 [API 控制器实例 popup.toast()](/api/plugin-preset-controller#popup-toast)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handleToast() {
	popup.toast('这是一条消息')
}

function handleToastPrimary() {
	popup.toastPrimary('这是一条主要主题消息')
}

function handleToastInfo() {
	popup.toastInfo('这是一条信息主题消息')
}

function handleToastSuccess() {
	popup.toastSuccess('这是一条成功主题消息')
}

function handleToastWarning() {
	popup.toastWarning('这是一条警告主题消息')
}

function handleToastDanger() {
	popup.toastDanger('这是一条危险主题消息')
}

function handleToastThemePrimary() {
	popup.toast('这是一条主要主题消息', {
		theme: 'primary',
	})
}

function handleToastThemeInfo() {
	popup.toast('这是一条信息主题消息', {
		theme: 'info',
	})
}

function handleToastThemeSuccess() {
	popup.toast('这是一条成功主题消息', {
		theme: 'success',
	})
}

function handleToastThemeWarning() {
	popup.toast('这是一条警告主题消息', {
		theme: 'warning',
	})
}

function handleToastThemeDanger() {
	popup.toast('这是一条危险主题消息', {
		theme: 'danger',
	})
}

function handleToastPlacementLeft() {
	popup.toast('这是一条左侧位置的消息', {
		placement: 'left',
	})
}

function handleToastPlacementTop() {
	popup.toast('这是一条顶部位置的消息', {
		placement: 'top',
	})
}

function handleToastPlacementRightTop() {
	popup.toast('这是一条右上位置的消息', {
		placement: 'right-top',
	})
}

function handleToastDuration() {
	popup.toast('这是一条持续5秒的消息', {
		duration: 5000,
	})
}

function handleToastDurationZero() {
	popup.toast('这是一条不会自动关闭的消息', {
		duration: 0,
	})
}


function handleToastShowClose() {
	popup.toast('这是一条显示关闭按钮的消息', {
		showClose: true,
	})
}

function handleToastHoverWaitFalse() {
	popup.toast('这是一条禁用鼠标悬停持续显示的消息', {
		hoverWait: false,
	})
}

async function handleToastWaitClose() {
	await popup.toast('这是一条消息')
	popup.toast('弹出层已关闭',{
		theme: 'success',
	})
}
</script>
