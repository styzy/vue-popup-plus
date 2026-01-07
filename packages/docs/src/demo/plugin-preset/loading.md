---
outline: 2
---

# Loading 加载遮罩 DEMO

::: tip
以下 DEMO 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## 基础功能

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
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithCustomTitle() {
	popup.loading({
		title: '加载中...',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithIconSize() {
	popup.loading({
		iconSize: 200,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 进阶功能

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
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeSuccess() {
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeInfo() {
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeWarning() {
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeDanger() {
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 高级功能

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
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithoutMaskBlur() {
	popup.loading({
		maskBlur: false,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
```

:::

## 详细说明

具体可以参考 [预置插件指南 - Prompt 提示输入](/guide-plugin-preset/prompt)

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopupLoading() {
	popup.loading()
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithCustomTitle() {
	popup.loading({
		title: '加载中...',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithIconSize() {
	popup.loading({
		iconSize: 200,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemePrimary() {
	popup.loading()
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeSuccess() {
	popup.loading({
		theme: 'success',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeInfo() {
	popup.loading({
		theme: 'info',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeWarning() {
	popup.loading({
		theme: 'warning',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithThemeDanger() {
	popup.loading({
		theme: 'danger',
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithoutMask() {
	popup.loading({
		mask: false,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingWithoutMaskBlur() {
	popup.loading({
		maskBlur: false,
	})
	setTimeout(() => popup.loadingClose(), 3000)
}
</script>
