# 销毁弹出层

要销毁已渲染的弹出层，可以调用弹出层插件实例的 `destroy` 方法。该方法需要传入已渲染弹出层的 `id`，它是 `render` 方法的返回值。

::: code-group

```ts [Vue 组合式 API]
import { usePopup } from 'vue-popup-plus'
import MyPopupComponent from './MyPopupComponent.vue'

const popup = usePopup()

const id = popup.render({
	component: MyPopupComponent,
})

// 调用 destroy 方法并传入 id 即可销毁弹出层
popup.destroy(id)
```

```ts [Vue 选项式 API]
import MyPopupComponent from './MyPopupComponent.vue'

export default {
	methods: {
		handlePopup() {
			const id = this.$popup.render({
				component: MyPopupComponent,
				},
			})

			// 调用 destroy 方法并传入 id 即可销毁弹出层
			this.$popup.destroy(id)
		},
	},
}
```

:::

一般不会在调用 `render` 方法后立即销毁弹出层，因此你可以将 `id` 先存储起来，等需要销毁时再提供给 `destroy` 方法。
