# 遮罩层样式

## 默认遮罩层

`mask` 选项默认为 `true`，表示弹出层渲染时会先创建一个遮罩层。该遮罩层的层级和视图层级相同，但因为遮罩层是先创建的，因此可以确保遮罩层在视图层下方。

默认的遮罩层是一个半透明的黑色背景，提供了基本的遮罩效果。

## 禁用遮罩层

部分场景下，例如弹出一个轻量提示，此时使用遮罩层会导致过于强调提示内容，因此可以将 `mask` 选项设置为 `false` 来禁用遮罩层。

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	// 禁用遮罩层
	mask: false, // [!code highlight]
})
```

::: warning
需要注意的是，因为禁用了遮罩层，此时弹出层视图下方的区域将是 **完全暴露** 的，用户对文档的操作将不受限制。
:::

## 透明遮罩层 <Badge text="1.6.0+" />

> <DVersionSupport version="1.6.0" />

如果希望在不显示遮罩层的同时，阻止用户对文档的操作，可以使用 `maskTransparent` 选项。当 `maskTransparent` 为 `true` 时，遮罩层将是一个完全透明的背景，同时用户无法操作文档。

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	// 使用透明遮罩层
	maskTransparent: true, // [!code highlight]
})
```

::: tip
当遮罩层被禁用时，`maskTransparent` 选项将被忽略。
:::

## 高斯模糊遮罩层

使用遮罩层的目的一方面是为了阻止用户对文档的操作，另一方面则是为了提升用户对弹出层视图的关注度，因此为了进一步凸显弹出层视图的关注度，我们提供了高斯模糊遮罩层的功能。

`maskBlur` 选项可以为遮罩层添加高斯模糊效果，只需要将其设置为 `true` 即可。

::: warning
启用高斯模糊遮罩层，对浏览器的渲染性能有一定要求，具体取决于设备性能，请根据实际情况选择是否启用。
:::

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	// 使用高斯模糊遮罩层
	maskBlur: true, // [!code highlight]
})
```
