# 自动平移 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

::: tip
自动平移支持在锚点视图位置的 **主轴** 和 **交叉轴** 上进行平移。
:::

## 介绍

对于空间不足的情况，仅仅依赖自动翻转无法覆盖所有的场景，因为自动翻转只能在锚点视图位置的 **主轴** 上进行翻转。

而自动平移，则可以让弹出层视图在空间不足时，在 **主轴** 和 **交叉轴** 上进行平移。

## 启用自动平移

通过 `anchorShift` 选项，可以启用自动平移。例如：

```ts
// 主轴自动平移
popup.render({
	component: () => import('./HelloPopup.vue'),
	anchor: '#anchor',
	anchorShift: 'mainAxis',
})

// 交叉轴自动平移
popup.render({
	component: () => import('./HelloPopup.vue'),
	anchor: '#anchor',
	anchorShift: 'crossAxis',
})

// 主轴和交叉轴都自动平移
popup.render({
	component: () => import('./HelloPopup.vue'),
	anchor: '#anchor',
	anchorShift: 'both',
})
```

## 可选值

`anchorShift` 选项的可选值包括：

- `none`：不进行自动平移（默认）。
- `mainAxis`：仅在主轴上进行平移。
- `crossAxis`：仅在交叉轴上进行平移。
- `both`：在主轴和交叉轴上都进行平移。
