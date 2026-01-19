# Core 核心 DEMO

## 渲染

::: demo

```html
<DButton @click="handlePopup" theme="primary">渲染弹出层</DButton>
```

```ts
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopup() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
	})
}
```

:::

## 组件属性

::: demo

```html
<DButton @click="handlePopupWithProps" theme="primary" type="plain"
	>传递组件属性</DButton
>
```

```ts
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupWithProps() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		componentProps: {
			test: '这是一个组件参数',
			onCustomEvent(params: string) {
				popup.toastSuccess(
					`监听组件事件 customEvent 触发，得到自定义事件参数：${params}`
				)
			},
		},
	})
}
```

:::

## 生命周期

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
		component: () => import('./HelloPopup.vue'),
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		onUnmounted() {
			popup.toastWarning('销毁回调 触发')
		},
	})
}

function handlePopupWithResult() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		onUnmounted(payload?: string) {
			if (payload) {
				popup.toastSuccess(`销毁回调 触发, 携带参数: ${payload}`)
			} else {
				popup.toastWarning('销毁回调 触发，未携带参数')
			}
		},
	})
}
```

:::

## 尺寸

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithAutoSize" type="default">自适应</DButton>
	<DButton @click="handlePopupWithFixedSize">固定尺寸</DButton>
</DButtonGroup>
```

```ts
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopupWithAutoSize() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
	})
}

function handlePopupWithFixedSize() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		width: 800,
		height: 600,
	})
}
```

:::

## 位置

::: demo

```html
<div
	style="display: flex; flex-direction: row; justify-content: center; gap: 20px">
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<DButton @click="handlePopupWithPlacementLeftTop">左上</DButton>
		<DButton @click="handlePopupWithPlacementLeft">左侧</DButton>
		<DButton @click="handlePopupWithPlacementLeftBottom">左下</DButton>
	</DButtonGroup>
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<DButton @click="handlePopupWithPlacementTop">顶部</DButton>
		<DButton @click="handlePopupWithPlacementCenter" type="default"
			>居中</DButton
		>
		<DButton @click="handlePopupWithPlacementBottom"
			>底部</DButton
		></DButtonGroup
	>
	<DButtonGroup theme="primary" type="plain" direction="vertical">
		<DButton @click="handlePopupWithPlacementRightTop">右上</DButton>
		<DButton @click="handlePopupWithPlacementRight">右侧</DButton>
		<DButton @click="handlePopupWithPlacementRightBottom"
			>右下</DButton
		></DButtonGroup
	>
</div>
```

```ts
function handlePopupWithPlacementLeftTop() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'left-top',
	})
}

function handlePopupWithPlacementLeft() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'left',
	})
}

function handlePopupWithPlacementLeftBottom() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'left-bottom',
	})
}

function handlePopupWithPlacementTop() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'top',
	})
}

function handlePopupWithPlacementCenter() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'center',
	})
}

function handlePopupWithPlacementBottom() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'bottom',
	})
}

function handlePopupWithPlacementRightTop() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'right-top',
	})
}

function handlePopupWithPlacementRight() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'right',
	})
}

function handlePopupWithPlacementRightBottom() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		placement: 'right-bottom',
	})
}
```

:::

## 位置偏移

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithTranslateX">设置横向偏移</DButton>
	<DButton @click="handlePopupWithTranslateY">设置纵向偏移</DButton>
	<DButton @click="handlePopupWithTranslateXY" theme="success"
		>设置大幅度偏移（默认溢出保护）</DButton
	>
	<DButton @click="handlePopupWithTranslateXYOverflow" theme="warning"
		>设置大幅度偏移（允许溢出）</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupWithTranslateX() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewTranslateX: 200,
	})
}

function handlePopupWithTranslateY() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewTranslateY: 200,
	})
}

function handlePopupWithTranslateXY() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
	})
}

function handlePopupWithTranslateXYOverflow() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
		viewTranslateOverflow: true,
	})
}
```

:::

## 动画

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopup" type="default">淡入淡出 (默认)</DButton>
	<DButton @click="handlePopupWithFlyTop">顶部飞入</DButton>
	<DButton @click="handlePopupWithFlyRight">右侧飞入</DButton>
	<DButton @click="handlePopupWithFlyBottom">底部飞入</DButton>
	<DButton @click="handlePopupWithFlyLeft">左侧飞入</DButton>
	<DButton @click="handlePopupWithScaleEnlarge">放大</DButton>
	<DButton @click="handlePopupWithScaleReduce">缩小</DButton>
	<DButton @click="handlePopupWithAnimationNone" theme="warning"
		>禁用动画</DButton
	>
</DButtonGroup>
```

```ts
import { POPUP_ANIMATIONS } from 'vue-popup-plus'
function handlePopup() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
	})
}

function handlePopupWithFlyTop() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_TOP,
	})
}

function handlePopupWithFlyRight() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_RIGHT,
	})
}

function handlePopupWithFlyBottom() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
	})
}

function handlePopupWithFlyLeft() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_LEFT,
	})
}

function handlePopupWithScaleEnlarge() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
	})
}

function handlePopupWithScaleReduce() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
	})
}

function handlePopupWithAnimationNone() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		viewAnimation: POPUP_ANIMATIONS.NONE,
		maskAnimation: POPUP_ANIMATIONS.NONE,
	})
}
```

:::

## 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithMask" type="default"
		>开启遮罩层 (默认)</DButton
	>
	<DButton @click="handlePopupWithoutMask">禁用遮罩层</DButton>
	<DButton @click="handlePopupWitMaskTransparent">透明遮罩层</DButton>
	<DButton @click="handlePopupWitMaskBlur" theme="warning"
		>高斯模糊遮罩层</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupWithMask() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		mask: false,
	})
}

function handlePopupWitMaskTransparent() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		maskTransparent: true,
	})
}

function handlePopupWitMaskBlur() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		maskBlur: true,
	})
}
```

:::

## 遮罩层行为

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithMaskDestroy">点击销毁弹出层</DButton>
	<DButton @click="handlePopupWithMaskDestroyHandler" theme="success"
		>点击自定义逻辑</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupWithMaskDestroy() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		maskDestroy: true,
	})
}

function handlePopupWithMaskDestroyHandler() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		maskDestroy: (destroy) => {
			if (window.confirm('确认销毁弹出层？')) {
				destroy()
			}
		},
	})
}
```

:::

<script setup lang="ts">
import { usePopup, POPUP_ANIMATIONS } from 'vue-popup-plus'
import HelloPopup from '../HelloPopup.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

function handlePopup(){
	popup.render({
		component: HelloPopup,
	})
}

function handlePopupWithProps() {
	popup.render({
		component: HelloPopup,
		componentProps: {
			test: '这是一个组件参数',
			onCustomEvent(params: string) {
				popup.toastSuccess(
					`监听组件事件 customEvent 触发，得到自定义事件参数：${params}`
				)
			},
		},
	})
}

function handlePopupWithOnMounted() {
	popup.render({
		component: HelloPopup,
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: HelloPopup,
		onUnmounted() {
			popup.toastWarning('销毁回调 触发')
		},
	})
}

function handlePopupWithResult() {
	popup.render({
		component: HelloPopup,
		onUnmounted(payload?: string) {
			if (payload) {
				popup.toastSuccess(`销毁回调 触发, 携带参数: ${payload}`)
			} else {
				popup.toastWarning('销毁回调 触发，未携带参数')
			}
		},
	})
}

function handlePopupWithAutoSize() {
	popup.render({
		component: HelloPopup,
	})
}

function handlePopupWithFixedSize() {
	popup.render({
		component: HelloPopup,
		width: 800,
		height: 600,
	})
}

function handlePopupWithPlacementLeftTop() {
	popup.render({
		component: HelloPopup,
		placement: 'left-top',
	})
}

function handlePopupWithPlacementLeft() {
	popup.render({
		component: HelloPopup,
		placement: 'left',
	})
}

function handlePopupWithPlacementLeftBottom() {
	popup.render({
		component: HelloPopup,
		placement: 'left-bottom',
	})
}

function handlePopupWithPlacementTop() {
	popup.render({
		component: HelloPopup,
		placement: 'top',
	})
}

function handlePopupWithPlacementCenter() {
	popup.render({
		component: HelloPopup,
		placement: 'center',
	})
}

function handlePopupWithPlacementBottom() {
	popup.render({
		component: HelloPopup,
		placement: 'bottom',
	})
}

function handlePopupWithPlacementRightTop() {
	popup.render({
		component: HelloPopup,
		placement: 'right-top',
	})
}

function handlePopupWithPlacementRight() {
	popup.render({
		component: HelloPopup,
		placement: 'right',
	})
}

function handlePopupWithPlacementRightBottom() {
	popup.render({
		component: HelloPopup,
		placement: 'right-bottom',
	})
}

function handlePopupWithTranslateX() {
	popup.render({
		component: HelloPopup,
		viewTranslateX: 200,
	})
}

function handlePopupWithTranslateY() {
	popup.render({
		component: HelloPopup,
		viewTranslateY: 200,
	})
}

function handlePopupWithTranslateXY() {
	popup.render({
		component: HelloPopup,
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
	})
}

function handlePopupWithTranslateXYOverflow() {
	popup.render({
		component: HelloPopup,
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
		viewTranslateOverflow: true,
	})
}

function handlePopupWithFlyTop() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.FLY_TOP,
	})
}

function handlePopupWithFlyRight() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.FLY_RIGHT,
	})
}

function handlePopupWithFlyBottom() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
	})
}

function handlePopupWithFlyLeft() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.FLY_LEFT,
	})
}

function handlePopupWithScaleEnlarge() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
	})
}

function handlePopupWithScaleReduce() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
	})
}

function handlePopupWithAnimationNone() {
	popup.render({
		component: HelloPopup,
		viewAnimation: POPUP_ANIMATIONS.NONE,
		maskAnimation: POPUP_ANIMATIONS.NONE,
	})
}

function handlePopupWithMask() {
	popup.render({
		component: HelloPopup,
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: HelloPopup,
		mask: false,
	})
}


function handlePopupWitMaskTransparent() {
	popup.render({
		component: HelloPopup,
		maskTransparent: true,
	})
}

function handlePopupWitMaskBlur() {
	popup.render({
		component: HelloPopup,
		maskBlur: true,
	})
}

function handlePopupWithMaskDestroy() {
	popup.render({
		component: HelloPopup,
		maskDestroy: true,
	})
}


function handlePopupWithMaskDestroyHandler() {
	popup.render({
		component: HelloPopup,
		maskDestroy: (destroy) => {
			if (window.confirm('确认销毁弹出层？')) {
				destroy()
			}
		},
	})
}
</script>
