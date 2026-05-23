# 锚点视图位置 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

::: tip
对于锚点弹出层，`placement` 位置选项无效，此时需要使用 `anchorPlacement` 选项来指定位置。
:::

## 默认位置

默认情况下，锚点弹出层视图位于锚点元素的上方，并且水平居中。

## 自定义位置

通过 `anchorPlacement` 选项可以自定义锚点弹出层视图的位置，例如：

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	anchor: '#anchor',
	anchorPlacement: 'left-start',
})
```

上方示例将 `anchorPlacement` 设置为 `left-start` ，因此锚点弹出层的视图将在锚点元素的左侧，并且顶部对齐。

## 可选位置

`anchorPlacement` 选项的可选值包括：

- `left-start`：锚点元素左侧，顶部对齐
- `left`：锚点元素左侧，居中对齐
- `left-end`：锚点元素左侧，底部对齐
- `top-start`：锚点元素顶部，左侧对齐
- `top`：锚点元素顶部，居中对齐（默认）
- `top-end`：锚点元素顶部，右侧对齐
- `bottom-start`：锚点元素底部，左侧对齐
- `bottom`：锚点元素底部，居中对齐
- `bottom-end`：锚点元素底部，右侧对齐
- `right-start`：锚点元素右侧，顶部对齐
- `right`：锚点元素右侧，居中对齐
- `right-end`：锚点元素右侧，底部对齐

::: tip 位置定义

所有的位置采用 `[方向]-[对齐方式]` 的格式表示，其中方向作为 **主轴** ，对齐方式作为 **交叉轴**。

后续的 **自动翻转** 和 **自动平移** 功能都将沿用这个位置定义。

:::
