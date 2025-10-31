# 更新渲染参数

当一个弹出层已经渲染，如果需要修改其初始的渲染参数，可以通过调用 `update` 方法更新，例如一个已经设置了 `width` 和 `height` 参数的弹出层，我们可以通过调用 `update` 方法更新其宽度和高度：

::: code-group

```ts [Vue 组合式 API]
import { usePopup, type InstanceId } from 'vue-popup-plus'
import MyPopupComponent from './MyPopupComponent.vue'

const popup = usePopup()

let instanceId: InstanceId | null = null

function handlePopup() {
	// 渲染并获取实例 id
	instanceId = popup.render({
		component: MyPopupComponent,
		width: '500px',
		height: 300,
	})
}

function handlePopupResize() {
	// 更新实例 id 对应的弹出层的宽度和高度
	popup.update(instanceId!, {
		width: 800,
		height: 'auto',
	})
}
```

```ts [Vue 选项式 API]
export default {
	data () {
		return {
			instanceId: null as InstanceId | null,
		}
	}
	methods: {
		handlePopup() {
			this.instanceId = this.$popup.render({
				component: MyPopupComponent,
				width: '500px',
				height: 300,
			})
		},
		handlePopupResize() {
			// 更新实例 id 对应的弹出层的宽度和高度
			this.$popup.update(this.instanceId!, {
				width: 800,
				height: 'auto',
			})
		},
	},
}
```

:::
