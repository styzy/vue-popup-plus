# 视图位置

## 默认位置

弹出层的视图默认使用 `窗口中心` 作为弹出位置，对于大部分场景来说，这是最通用的弹出位置。当然，我们也提供了相应的位置选项，你可以根据需要选择不同的弹出位置。

## 手动指定位置

使用 `placement` 选项可以手动指定弹出层的视图位置，例如：

```ts
popup.render({
	component: () => import('./HelloWorld.vue'),
	placement: 'top',
})
```

上方示例将 `placement` 设置为 `top`，因此弹出层的视图将在窗口顶部居中显示。

## 可选位置

`placement` 的可选值包括：

- `left-top`：窗口左上角
- `left`：窗口左侧
- `left-bottom`：窗口左下角
- `top`：窗口顶部
- `center`：窗口中心（默认）
- `bottom`：窗口底部
- `right-top`：窗口右上角
- `right`：窗口右侧
- `right-bottom`：窗口右下角
