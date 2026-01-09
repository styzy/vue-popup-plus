# 核心 DEMO

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
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted() {
			popup.toastWarning('销毁回调 触发')
		},
	})
}

function handlePopupWithResult() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
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

### 遮罩层

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithMask" type="default"
		>默认开启遮罩层</DButton
	>
	<DButton @click="handlePopupWithoutMask">禁用遮罩层</DButton>
	<DButton @click="handlePopupWithMaskDestroy"
		>启用遮罩层点击销毁弹出层</DButton
	>
	<DButton @click="handlePopupWitMaskTransparent">启用透明遮罩层</DButton>
	<DButton @click="handlePopupWitMaskBlur" theme="warning"
		>启用遮罩层高斯模糊</DButton
	>
</DButtonGroup>
```

```ts
function handlePopupWithMask() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		mask: false,
	})
}

function handlePopupWithMaskDestroy() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskDestroy: true,
	})
}

function handlePopupWitMaskTransparent() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskTransparent: true,
	})
}

function handlePopupWitMaskBlur() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskBlur: true,
	})
}
```

:::

## 进阶功能

### 位置

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithPlacementCenter" type="default"
		>默认居中</DButton
	>
	<DButton @click="handlePopupWithPlacementLeftTop">左上</DButton>
	<DButton @click="handlePopupWithPlacementLeft">左侧</DButton>
	<DButton @click="handlePopupWithPlacementLeftBottom">左下</DButton>
	<DButton @click="handlePopupWithPlacementTop">顶部</DButton>
	<DButton @click="handlePopupWithPlacementBottom">底部</DButton>
	<DButton @click="handlePopupWithPlacementRightTop">右上</DButton>
	<DButton @click="handlePopupWithPlacementRight">右侧</DButton>
	<DButton @click="handlePopupWithPlacementRightBottom">右下</DButton>
</DButtonGroup>
```

```ts
function handlePopupWithPlacementCenter() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'center',
	})
}

function handlePopupWithPlacementLeftTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'left-top',
	})
}

function handlePopupWithPlacementLeft() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'left',
	})
}

function handlePopupWithPlacementLeftBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'left-bottom',
	})
}

function handlePopupWithPlacementTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'top',
	})
}

function handlePopupWithPlacementBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'bottom',
	})
}

function handlePopupWithPlacementRightTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'right-top',
	})
}

function handlePopupWithPlacementRight() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'right',
	})
}

function handlePopupWithPlacementRightBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'right-bottom',
	})
}
```

:::

### 位置偏移

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopupWithTranslateX">设置横向偏移</DButton>
	<DButton @click="handlePopupWithTranslateY">设置纵向偏移</DButton>
	<DButton @click="handlePopupWithTranslateXY"
		>设置大幅度偏移（默认溢出保护）</DButton
	>
	<DButton @click="handlePopupWithTranslateXYOverflow"
		>设置大幅度偏移（允许溢出）</DButton
	>
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

function handlePopupWithTranslateXY() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
	})
}

function handlePopupWithTranslateXYOverflow() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
		viewTranslateOverflow: true,
	})
}
```

:::

### 动画类型

::: demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton @click="handlePopup" type="default">默认淡入淡出</DButton>
	<DButton @click="handlePopupWithFlyTop">顶部飞入</DButton>
	<DButton @click="handlePopupWithFlyRight">右侧飞入</DButton>
	<DButton @click="handlePopupWithFlyBottom">底部飞入</DButton>
	<DButton @click="handlePopupWithFlyLeft">左侧飞入</DButton>
	<DButton @click="handlePopupWithScaleEnlarge">放大</DButton>
	<DButton @click="handlePopupWithScaleReduce">缩小</DButton>
	<DButton @click="handlePopupWithAnimationNone">禁用动画</DButton>
</DButtonGroup>
```

```ts
import { POPUP_ANIMATIONS } from 'vue-popup-plus'
function handlePopup() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupWithFlyTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_TOP,
	})
}

function handlePopupWithFlyRight() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_RIGHT,
	})
}

function handlePopupWithFlyBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
	})
}

function handlePopupWithFlyLeft() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_LEFT,
	})
}

function handlePopupWithScaleEnlarge() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
	})
}

function handlePopupWithScaleReduce() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
	})
}

function handlePopupWithAnimationNone() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.NONE,
		maskAnimation: POPUP_ANIMATIONS.NONE,
	})
}
```

:::

<script setup lang="ts">
import { usePopup, POPUP_ANIMATIONS } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

let popup

if (!import.meta.env.SSR) {
	popup = usePopup()
}

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
		component: () => import('../HelloWorld.vue'),
		onMounted() {
			popup.toastSuccess('渲染回调 触发')
		},
	})
}

function handlePopupWithOnUnmounted() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted() {
			popup.toastWarning('销毁回调 触发')
		},
	})
}

function handlePopupWithResult() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		onUnmounted(payload?: string) {
			if (payload) {
				popup.toastSuccess(`销毁回调 触发, 携带参数: ${payload}`)
			} else {
				popup.toastWarning('销毁回调 触发，未携带参数')
			}
		},
	})
}

function handlePopupWithMask() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		mask: false,
	})
}

function handlePopupWithMaskDestroy() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskDestroy: true,
	})
}

function handlePopupWitMaskTransparent() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskTransparent: true,
	})
}

function handlePopupWitMaskBlur() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		maskBlur: true,
	})
}

function handlePopupWithPlacementCenter() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'center',
	})
}

function handlePopupWithPlacementLeftTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'left-top',
	})
}

function handlePopupWithPlacementLeft() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'left',
	})
}

function handlePopupWithPlacementLeftBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'left-bottom',
	})
}

function handlePopupWithPlacementTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'top',
	})
}

function handlePopupWithPlacementBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'bottom',
	})
}

function handlePopupWithPlacementRightTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'right-top',
	})
}

function handlePopupWithPlacementRight() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'right',
	})
}

function handlePopupWithPlacementRightBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		placement: 'right-bottom',
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

function handlePopupWithTranslateXY() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
	})
}

function handlePopupWithTranslateXYOverflow() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewTranslateX: (window.innerWidth - 300) / 2 + 100,
		viewTranslateY: (window.innerHeight - 300) / 2 + 100,
		viewTranslateOverflow: true,
	})
}

function handlePopupWithFlyTop() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_TOP,
	})
}

function handlePopupWithFlyRight() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_RIGHT,
	})
}

function handlePopupWithFlyBottom() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
	})
}

function handlePopupWithFlyLeft() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.FLY_LEFT,
	})
}

function handlePopupWithScaleEnlarge() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
	})
}

function handlePopupWithScaleReduce() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
	})
}

function handlePopupWithAnimationNone() {
	popup.render({
		component: () => import('../HelloWorld.vue'),
		viewAnimation: POPUP_ANIMATIONS.NONE,
		maskAnimation: POPUP_ANIMATIONS.NONE,
	})
}
</script>
