# Toast 消息

一般用于提示用户 `轻量简短` 的消息，例如操作成功、操作失败等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [等待弹出层关闭](/guide/toast#等待弹出层关闭)。
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

## 设置主题

通过 `theme` 属性可以设置消息的主题，默认值为 `default`，支持的主题有 `default`、`primary`、`info`、`success`、`warning`、`danger`。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" type="plain" @click="handleToastThemeDefault"
		>默认</DButton
	>
	<DButton theme="primary" @click="handleToastThemePrimary">主要</DButton>
	<DButton theme="info" @click="handleToastThemeInfo">信息</DButton>
	<DButton theme="success" @click="handleToastThemeSuccess">成功</DButton>
	<DButton theme="warning" @click="handleToastThemeWarning">警告</DButton>
	<DButton theme="danger" @click="handleToastThemeDanger">危险</DButton>
</DButtonGroup>
```

```ts
function handleToastThemeDefault() {
	popup.toast('这是一条默认主题消息', {
		theme: 'default', // [!code highlight]
	})
}

function handleToastThemePrimary() {
	popup.toast('这是一条主要主题消息', {
		theme: 'primary', // [!code highlight]
	})
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

## 持续时间

通过 `duration` 属性可以设置消息显示的持续时间，单位为毫秒，默认值为 `2000` 毫秒。

::: demo

```html
<DButton theme="primary" @click="handleToastDuration">持续5秒的消息</DButton>
```

```ts
function handleToastDuration() {
	popup.toast('这是一条持续5秒的消息', {
		duration: 5000, // [!code highlight]
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

具体可以查看 [API popup.toast()](/api/toast)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleToast() {
	popup.toast('这是一条消息')
}

function handleToastThemeDefault() {
	popup.toast('这是一条默认主题消息', {
		theme: 'default',
	})
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

function handleToastDuration() {
	popup.toast('这是一条持续5秒的消息', {
		duration: 5000,
	})
}

async function handleToastWaitClose() {
	await popup.toast('这是一条消息')
	popup.toast('弹出层已关闭',{
		theme: 'success',
	})
}
</script>
