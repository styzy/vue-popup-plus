# 销毁弹出层

## 销毁

要销毁已渲染的弹出层，可以调用弹出层插件实例的 `destroy` 方法。该方法需要传入已渲染弹出层的 `id`，它是 `render` 方法的返回值。

::: code-group

```ts [Vue 组合式 API]
import { usePopup, type InstanceId } from 'vue-popup-plus' // [!code highlight]
import MyPopupComponent from './MyPopupComponent.vue'

const popup = usePopup()

let instanceId: InstanceId | null = null

function handlePopup() {
	instanceId = popup.render({
		component: MyPopupComponent,
	})
}

function handlePopupDestroy() {
	if (instanceId) {
		// 调用 destroy 方法并传入 instanceId 即可销毁弹出层
		popup.destroy(instanceId) // [!code highlight]
		instanceId = null
	}
}
```

```ts [Vue 选项式 API]
import { type InstanceId } from 'vue-popup-plus' // [!code highlight]
import MyPopupComponent from './MyPopupComponent.vue'

export default {
	data () {
		return {
			instanceId: null as InstanceId | null,
		}
	},
	methods: {
		handlePopup() {
			this.instanceId = this.$popup.render({
				component: MyPopupComponent,
				},
			})
		},
		handlePopupDestroy() {
			if (this.instanceId) {
				// 调用 destroy 方法并传入 instanceId 即可销毁弹出层
				this.$popup.destroy(this.instanceId) // [!code highlight]
				this.instanceId = null
			}
		},
	},
}
```

:::
