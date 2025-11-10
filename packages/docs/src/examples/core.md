# 基础示例

::: tip
以下示例由 `vue-popup-plus` 核心包提供技术支持。
:::

## 基础功能

### 渲染

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopup" type="default">基础弹出层</DButton>
	<DButton @click="handlePopupWithProps">携带组件参数</DButton>
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
```

:::

### 生命周期

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithOnMounted">渲染回调</DButton>
	<DButton @click="handlePopupWithOnUnmounted">销毁回调</DButton>
	<DButton @click="handlePopupWithResult">获取销毁携带参数</DButton>
</DButtonGroup>
```

```ts
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupWithOnMounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toast('渲染回调 触发', {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted() {
			popup.toast('销毁回调 触发', {
				theme: 'warning',
			})
		},
	})
}

function handlePopupWithResult() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted(payload?: string) {
			if (payload) {
				popup.toast(`销毁回调 触发, 携带参数: ${payload}`, {
					theme: 'success',
				})
			} else {
				popup.toast('销毁回调 触发，未携带参数', {
					theme: 'warning',
				})
			}
		},
	})
}
```

:::

## 进阶功能

### 遮罩层

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
			popup.toast('渲染回调 触发', {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted() {
			popup.toast('销毁回调 触发', {
				theme: 'warning',
			})
		},
	})
}

function handlePopupWithResult() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted(payload?: string) {
			if (payload) {
				popup.toast(`销毁回调 触发, 携带参数: ${payload}`, {
					theme: 'success',
				})
			} else {
				popup.toast('销毁回调 触发，未携带参数', {
					theme: 'warning',
				})
			}
		},
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
</script>
