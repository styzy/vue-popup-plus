# Loading 加载遮罩

一般用于显示 `正在加载中` 的状态，例如复杂数据运算，网络请求等。

## 基础使用

调用 `loading` 方法可以显示一个加载遮罩，全屏显示，该方法的返回值是一个函数，调用该函数可以关闭加载遮罩。

::: demo

```html
<DButton theme="primary" @click="handleLoading">加载遮罩</DButton>
```

```ts
function handleLoading() {
	// 显示加载遮罩
	const closeLoading = popup.loading() // [!code highlight]

	// 模拟异步操作
	setTimeout(() => {
		// 关闭加载遮罩
		closeLoading() // [!code highlight]
	}, 3000)
}
```

:::

## 设置主题

可以通过 `theme` 选项来自定义主题，默认值为 `default`，支持的主题有 `default`、`primary`、`info`、`success`、`warning`、`danger`。

::: demo

```html
<DButtonGroup>
	<DButton theme="primary" type="plain" @click="handleLoadingThemeDefault"
		>默认</DButton
	>
	<DButton theme="primary" @click="handleLoadingThemePrimary">主要</DButton>
	<DButton theme="info" @click="handleLoadingThemeInfo">信息</DButton>
	<DButton theme="success" @click="handleLoadingThemeSuccess">成功</DButton>
	<DButton theme="warning" @click="handleLoadingThemeWarning">警告</DButton>
	<DButton theme="danger" @click="handleLoadingThemeDanger">危险</DButton>
</DButtonGroup>
```

:::

## 自定义标题文本

可以通过 `title` 选项来自定义标题文本。

::: demo

```html
<DButton theme="primary" @click="handleLoadingCustomTitle"
	>自定义标题文本</DButton
>
```

```ts
function handleLoadingCustomTitle() {
	setTimeout(
		popup.loading({
			title: '自定义标题文本', // [!code highlight]
		}),
		3000
	)
}
```

:::

## 自定义图标尺寸

可以通过 `iconSize` 选项来自定义图标尺寸，默认值为 `60`。

::: demo

```html
<DButton theme="primary" @click="handleLoadingCustomIconSize"
	>自定义图标尺寸</DButton
>
```

```ts
function handleLoadingCustomIconSize() {
	setTimeout(
		popup.loading({
			iconSize: 100, // [!code highlight]
		}),
		3000
	)
}
```

:::

## 详细配置

具体可以查看 [API popup.loading()](/api/loading)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleLoading() {
	setTimeout(popup.loading(), 3000)
}

function handleLoadingThemeDefault(){
	setTimeout(popup.loading(), 3000)
}

function handleLoadingThemePrimary(){
	setTimeout(popup.loading({
		theme: 'primary',
	}), 3000)
}

function handleLoadingThemeInfo(){
	setTimeout(popup.loading({
		theme: 'info',
	}), 3000)
}

function handleLoadingThemeSuccess(){
	setTimeout(popup.loading({
		theme: 'success',
	}), 3000)
}

function handleLoadingThemeWarning(){
	setTimeout(popup.loading({
		theme: 'warning',
	}), 3000)
}

function handleLoadingThemeDanger(){
	setTimeout(popup.loading({
		theme: 'danger',
	}), 3000)
}

function handleLoadingCustomTitle() {
	setTimeout(
		popup.loading({
			title: '自定义标题文本',
		}),
		3000
	)
}

function handleLoadingCustomIconSize() {
	setTimeout(
		popup.loading({
			iconSize: 100,
		}),
		3000
	)
}

</script>
