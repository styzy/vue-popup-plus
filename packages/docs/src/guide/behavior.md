# 渲染行为

## 节点挂载位置

所有的弹出层默认挂载到 `body` 元素上。如果需要挂载到其他元素上，可以通过 `appendTo` 选项来指定。

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	appendTo: '#custom',
})
```

`appendTo` 选项除了支持 `string` 类型的选择器，也支持 `Element` 类型的 DOM 元素。

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	appendTo: document.getElementById('custom'),
})
```

## 禁用滚动

默认情况下，弹出层会在渲染期间，自动禁用浏览器 `body` 元素的滚动条，并在销毁后自动恢复。

如果不希望自动禁用滚动条，可以通过 `disableScroll` 选项来关闭。

```ts
popup.render({
	component: () => import('./HelloPopup.vue'),
	// 关闭自动禁用滚动条
	disableScroll: true, // [!code highlight]
})
```

需要注意的是，`disableScroll` 选项仅对当前弹出层生效，不会影响其他弹出层的自动禁用滚动条行为。

全局自动禁用滚动条的行为，是在创建弹出层核心实例时设置的，如果希望全局关闭自动禁用滚动条的行为，可参考 [指南 - 初始化配置 自动禁用滚动条](/guide/config#自动禁用滚动条)。
