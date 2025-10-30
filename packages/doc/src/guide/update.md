# 更新渲染选项

当一个弹出层已经渲染，如果需要修改其初始的渲染选项，可以通过调用 `update` 方法更新，例如一个已经设置了 `width` 和 `height` 属性的弹出层，我们可以通过调用 `update` 方法更新其宽度和高度：

::: code-group

```ts [Vue 组合式 API]
import { usePopup } from 'vue-popup-plus'
import MyPopupComponent from './MyPopupComponent.vue'

const popup = usePopup()
const instanceId: = null

function handlePopup() {
	// 渲染并获取实例 id
	const instanceId = popup.render({
		component: MyPopupComponent,
		width: '500px',
		height: 300,
	})
}

// 更新实例 id 对应的弹出层的宽度和高度
popup.update(instanceId, {
	width: 800,
	height: 'auto',
})
```

```ts [Vue 选项式 API]
export default {
	methods: {
		handlePopup() {
			const instanceId = this.$popup.render({
				component: MyPopupComponent,
				width: '500px',
				height: 300,
			})

			// 更新实例 id 对应的弹出层的宽度和高度
			this.$popup.update(instanceId, {
				width: 800,
				height: 'auto',
			})
		},
	},
}
```

:::
