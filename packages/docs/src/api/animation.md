---
pageClass: api
outline: 2
---

# 动画类型

## POPUP_ANIMATIONS

提供弹出层动画类型的常量。

### 类型

```ts
const POPUP_ANIMATIONS: {
	/**
	 * 无动画
	 */
	readonly NONE: 'none'
	/**
	 * 淡入淡出
	 */
	readonly FADE: 'fade'
	/**
	 * 缩放放大
	 */
	readonly SCALE_ENLARGE: 'scale-enlarge'
	/**
	 * 缩放缩小
	 */
	readonly SCALE_REDUCE: 'scale-reduce'
	/**
	 * 顶部飞入
	 */
	readonly FLY_TOP: 'fly-top'
	/**
	 * 左侧飞入
	 */
	readonly FLY_LEFT: 'fly-left'
	/**
	 * 右侧飞入
	 */
	readonly FLY_RIGHT: 'fly-right'
	/**
	 * 底部飞入
	 */
	readonly FLY_BOTTOM: 'fly-bottom'
}
```

### 详细信息

任何修改其值的操作都将被忽略。

支持在插件中进行扩展，具体可以参考 [插件 - 动画扩展](/plugin/animation-extend)。

### 示例

```ts
import { usePopup, POPUP_ANIMATIONS } from 'vue-popup-plus'

const popup = usePopup()

popup.render({
	component: () => import('./HelloWorld.vue'),
	viewAnimation: POPUP_ANIMATIONS.FLY_TOP,
	maskAnimation: POPUP_ANIMATIONS.FADE,
})
```

### 参考

[指南 - 过渡动画](/guide/animation)
