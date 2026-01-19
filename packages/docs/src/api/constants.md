---
pageClass: api
outline: 2
---

# 常量 API

## POPUP_ANIMATIONS

弹出层动画类型常量。

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
	component: () => import('./HelloPopup.vue'),
	viewAnimation: POPUP_ANIMATIONS.FLY_TOP,
	maskAnimation: POPUP_ANIMATIONS.FADE,
})
```

### 参考

[指南 - 过渡动画](/guide/animation)

## POPUP_COMPONENT_INJECTS

弹出层视图组件注入的常量键。

### 类型

```ts
const POPUP_COMPONENT_INJECTS: {
	/**
	 * 当前组件所在弹出层的实例ID
	 *
	 * - 可用于销毁当前弹出层
	 */
	readonly INSTANCE_ID: InjectionKey<InstanceId>
	/**
	 * 弹出层视图样式
	 *
	 * - 可在弹出层内部组件内获取弹出层根级视图组件的样式
	 * - 所有的样式具有响应性。
	 */
	readonly COMPUTED_STYLE: InjectionKey<ComputedStyle>
}
```

### 详细信息

所有的弹出层所渲染的子孙组件都可以通过 `inject()` 传入对应常量键来获取相应的数据。

### 示例

```ts [HelloPopup.vue]
// 弹出层渲染的所有子代组件中
import { inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

// 获取弹出层控制器
const popup = usePopup()

// 获取当前组件所在弹出层的实例ID
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
// 获取弹出层视图的响应式样式
const computedStyle = inject(POPUP_COMPONENT_INJECTS.COMPUTED_STYLE)!
```

### 参考

[指南 - 销毁弹出层 获取弹出层实例ID](/guide/destroy#获取弹出层实例ID)
