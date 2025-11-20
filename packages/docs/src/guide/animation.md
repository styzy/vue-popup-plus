# 过渡动画

## 介绍

弹出层在渲染和销毁的过程中，会有一个过渡动画，并且遮罩层和视图层可以分开配置动画类型，只有动画持续时间是共享的。

过渡动画底层由 `Vue` 的 `Transition` 组件实现。

## 修改动画持续时间

动画持续时间可以通过配置渲染参数的 `animationDuration` 来改变，单位为毫秒，默认值为 100 。

```ts
popup.render({
	// 设置动画持续时间为 500 毫秒
	animationDuration: 500,
})
```

## 修改动画类型

默认的动画类型是 `淡入淡出`，可以通过配置渲染参数的 `maskAnimation` 和 `viewAnimation` 来改变动画类型。

Vue Popup Plus 提供了多个内置的过渡动画类型，全都以集合的形式通过 `POPUP_ANIMATIONS` 常量导出，下面展示使用示例：

```ts
import { POPUP_ANIMATIONS } from 'vue-popup-plus'

popup.render({
	// 禁用遮罩层动画
	maskAnimation: POPUP_ANIMATIONS.NONE,
	// 视图层动画类型为缩放放大
	viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
})
```

具体的动画类型可以参考 [全局 API - 动画类型](/api/animation)。
