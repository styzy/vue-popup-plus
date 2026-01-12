# 遮罩层行为

## 默认行为

默认情况下，用户对遮罩层进行任何操作将不会有任何响应，包括点击、滑动等操作。

## 点击遮罩销毁弹出层

如果希望用户对遮罩层进行点击操作时，触发弹出层的销毁操作，可以将 `maskDestroy` 选项设置为 `true`。

```ts
popup.render({
	component: () => import('./HelloWorld.vue'),
	// 点击遮罩层销毁弹出层
	maskDestroy: true, // [!code highlight]
})
```

::: warning
对于 <DVersion version="1.6.0" /> 以前的版本，需要使用 `maskClickClose` 选项来允许点击遮罩层销毁弹出层。
:::

## 自定义销毁处理逻辑 <Badge text="1.6.0+" />

> <DVersionSupport version="1.6.0" />

部分场景下，当用户点击遮罩层时，我们可能需要先进行相应的逻辑处理，从而决定用户是否可以销毁弹出层。

为了实现这一功能，我们可以在 `maskDestroy` 选项中传递一个函数，该函数将在用户点击遮罩层时被调用。同时该函数将接收一个类型为 `(payload?: any) => Promise<void>` 的销毁回调函数 `destory()` 作为参数，只有当 `destroy()` 函数被调用时，弹出层才会被销毁。

```ts
popup.render({
	component: () => import('./HelloWorld.vue'),
	maskDestroy: (destory) => {
		// 自定义销毁处理逻辑
		if (window.confirm('是否确认销毁弹出层？')) {
			destory()
		}
	},
})
```

因为销毁动画的存在，如果希望等待弹出层销毁动画执行结束后再执行其他操作，可以通过 `await` 调用 `destory()` 函数。

```ts
popup.render({
	component: () => import('./HelloWorld.vue'),
	maskDestroy: async (destory) => {
		if (window.confirm('是否确认销毁弹出层？')) {
			// 使用 await 等待异步动画执行结束
			await destory() // [!code highlight]
			console.log('弹出层销毁动画执行结束')
		}
	},
})
```
