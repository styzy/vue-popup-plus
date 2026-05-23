# 自动翻转 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

::: tip
自动翻转仅在锚点视图位置的 **主轴** 上进行翻转。
:::

## 介绍

当锚点元素在页面中滚动时，可能会导致锚点弹出层的视图在视区内无法拥有足够的显示空间，为了保证视图的持续可见性，我们提供了基于视区空间计算的自动翻转功能。

## 启用自动翻转

通过将 `anchorFlip` 选项设置为 `true`，可以使得弹出层的视图在视区空间不足时自动翻转。例如：

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	anchor: '#anchor',
	anchorPlacement: 'bottom',
	anchorFlip: true,
})
```

上方示例中，`anchorPlacement` 设置为 `bottom`，因此弹出层的视图将在锚点元素的底部居中显示。当页面发生滚动导致锚点元素底部没有足够的空间时，弹出层会自动翻转到顶部显示。

## 翻转规则

自动翻转会将弹出层视图翻转到定义方向的相反方向。具体如下：

- `left` -> `right`
- `right` -> `left`
- `top` -> `bottom`
- `bottom` -> `top`

而当初始指定的方向空间足够时，将会自动恢复到初始方向。

## 设置翻转提前量

有些时候为了更好的用户体验，我们可能不希望当空间完全不足的时候才会触发自动翻转，因此为自动翻转设置一定的提前量可以在视觉上提供一定的缓冲效果。

通过 `anchorFlipAdvance` 选项可以设置翻转提前量。例如：

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	anchor: '#anchor',
	anchorPlacement: 'bottom',
	anchorFlip: true,
	anchorFlipAdvance: 100,
})
```

上方示例中，`anchorFlipAdvance` 设置为 `100`，即当视区内剩余空间距离临界情况还有 `100` 像素时，将会提前触发自动翻转。
