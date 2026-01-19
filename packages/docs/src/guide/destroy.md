# 销毁弹出层

## 销毁

要销毁已渲染的弹出层，可以调用弹出层控制器实例的 `destroy()` 方法。该方法需要传入已渲染弹出层实例的 `instanceId`，它是 `render` 方法的返回值。

::: code-group

```ts [组合式 API ~vscode-icons:file-type-vue~]
import { usePopup, type InstanceId } from 'vue-popup-plus'

const popup = usePopup()

let instanceId: InstanceId | null = null

function handlePopup() {
	instanceId = popup.render({
		component: () => import('./HelloPopup.vue'),
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

```ts [选项式 API ~vscode-icons:file-type-vue~]
import { type InstanceId } from 'vue-popup-plus'

export default {
	data () {
		return {
			instanceId: null as InstanceId | null,
		}
	},
	methods: {
		handlePopup() {
			this.instanceId = this.$popup.render({
				component: ()=>import('./HelloPopup.vue'),
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

## 携带自定义数据

在销毁弹出层时，你可以携带自定义数据，这在某些场景下非常有用，例如在弹出层关闭时需要将一些数据传递给父组件。

要携带自定义数据，只需要在调用 `destroy` 方法时传入第二个参数即可。

```ts
// 弹出层视图组件
function handleClose() {
	// 在用户点击关闭按钮的处理事件中销毁弹出层
	popup.destroy(instanceId, 'This is a custom payload')
}
```

携带的自定义数据将在弹出层关闭时作为参数传递给渲染弹出层时的 `onUnmounted` 回调函数。

```ts
// 渲染弹出层的组件
function handleRender() {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		onUnmounted(payload) {
			console.log(payload) // 'This is a custom payload'
		},
	})
}
```
