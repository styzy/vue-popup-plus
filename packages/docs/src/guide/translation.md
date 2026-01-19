# 视图位置偏移 <Badge text="1.1.0+" />

> <DVersionSupport version="1.1.0" />

有些时候，仅仅依靠位置参数无法满足我们的需求，例如我们希望弹出层在 _顶部显示_ ，同时希望距离窗口顶部有一定的偏移量，这时候就可以使用视图位置偏移参数。

## 设置偏移量

通过 `viewTranslateX` 和 `viewTranslateY` 可以分别设置弹出层视图在水平方向和垂直方向的偏移量，单位为 `像素(px)`。

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	placement: 'top',
	// 垂直方向偏移量为 20px
	viewTranslateY: 20, // [!code highlight]
})
```

上面我们设置了弹出层在顶部显示，同时垂直方向偏移量为 `20`，因此弹出层视图将和窗口顶部保持 `20px` 的距离。

和尺寸参数不同的是，为了保持更加严谨的位移计算，`viewTranslateX` 和 `viewTranslateY` 都不支持百分比单位，只能使用像素单位。
