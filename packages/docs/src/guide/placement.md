# 视图位置

## 默认位置

弹出层的视图位置使用视区作为渲染边界，在视区内进行定位。

默认情况下，视图位置为 `center`，即视区中心居中显示。

## 手动指定位置

使用 `placement` 选项可以手动指定弹出层的视图位置，例如：

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	placement: 'top',
})
```

上方示例将 `placement` 设置为 `top`，因此弹出层的视图将在视区顶部居中显示。

## 可选位置

`placement` 的可选值包括：

- `left-top`：视区左上角
- `left`：视区左侧
- `left-bottom`：视区左下角
- `top`：视区顶部
- `center`：视区中心（默认）
- `bottom`：视区底部
- `right-top`：视区右上角
- `right`：视区右侧
- `right-bottom`：视区右下角
