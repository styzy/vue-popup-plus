# 加载遮罩 Loading

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

## 自定义提示文本

可以通过传入一个字符串来自定义提示文本。

::: demo

```html
<DButton theme="primary" @click="handleLoadingCustomContent"
	>自定义提示文本</DButton
>
```

```ts
function handleLoadingCustomContent() {
	const closeLoading = popup.loading('自定义提示文本') // [!code highlight]

	setTimeout(() => {
		closeLoading()
	}, 3000)
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
	const closeLoading = popup.loading('', {
		iconSize: 100, // [!code highlight]
	})

	setTimeout(() => {
		closeLoading()
	}, 3000)
}
```

:::

## 详细配置

具体可以查看 [API popup.loading()](/api/loading)。

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleLoading() {
	const closeLoading = popup.loading()
	setTimeout(() => {
		closeLoading()
	}, 3000)
}

function handleLoadingCustomContent() {
	const closeLoading = popup.loading('自定义提示文本')
	setTimeout(() => {
		closeLoading()
	}, 3000)
}

function handleLoadingCustomIconSize() {
	const closeLoading = popup.loading('', {
		iconSize: 100,
	})
	setTimeout(() => {
		closeLoading()
	}, 3000)
}

</script>
