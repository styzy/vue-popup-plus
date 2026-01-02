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
		component: () => import('./HelloWorld.vue'),
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
				component: ()=>import('./HelloWorld.vue'),
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

虽然`render` 方法总是返回弹出层实例的 `instanceId`，但让开发者自己手动维护并传递 `instanceId` 并不是一个好的实践，因为通常关闭弹出层的代码是在渲染组件内部编写，这意味着每一个弹出层的渲染组件都需要定义一个属性去接收当前弹出层的实例 `instanceId`，这会增加代码的复杂度和出错的风险，因此我们提供了 `渲染组件内` 获取弹出层实例 `instanceId` 的方式。

## 获取弹出层实例ID

从 <DVersion version="1.6.0" /> 开始，获取弹出层实例 `instanceId` 变得更加方便。

对于组合式 API，我们提供了 [usePopupInstanceId()](/api/composition-api#use-popup-instance-id) 工具函数用于在渲染组件内获取当前弹出层的实例 `instanceId`。

```ts
import { usePopupInstanceId } from 'vue-popup-plus'

const instanceId = usePopupInstanceId()!
```

而对于选项式 API ，我们也对 `Vue` 的组件实例提供了 `$popupInstanceId` 属性，用于在渲染组件内获取当前弹出层的实例 `instanceId`。

```ts
export default {
	onMounted() {
		console.log(this.$popupInstanceId)
	},
}
```

在 <DVersion version="1.6.0" /> 版本之前，则需要使用常量提供的 `inject` 键来获取弹出层实例 `instanceId`。

针对弹出层内所有的组件（包括子组件），我们都通过 `Vue` 的注入功能（ `provide/inject` ）将弹出层实例的 `instanceId` 注入到这些组件中，因此你可以在弹出层内的组件中通过 `inject` 选项获取到组件所处于的弹出层的实例 `instanceId`，并在需要时进行销毁操作。

同时为了提供更完整的类型推断，我们在内部使用了 `Vue` 支持类型推断的 `InjectionKey` 类型工具，并将所有可供渲染组件注入的键集中在一起，作为常量通过 [POPUP_COMPONENT_INJECTS](/api/constants#popup-component-injects) 进行导出，这是一个常量对象，为了获取弹出层实例 `instanceId`，我们需要使用 `INSTANCE_ID` 属性来获取。

::: code-group

```ts [组合式 API ~vscode-icons:file-type-vue~]
// 弹出层渲染的组件内部
import { inject } from 'vue'
// 导入 POPUP_COMPONENT_INJECTS 常量
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

// 传入 POPUP_COMPONENT_INJECTS.INSTANCE_ID
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)! // [!code highlight]

function handleClose() {
	// 在用户点击关闭按钮的处理事件中销毁弹出层
	popup.destroy(instanceId)
}
```

```ts [选项式 API ~vscode-icons:file-type-vue~]
// 导入 POPUP_COMPONENT_INJECTS 常量
import { POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

export default {
	inject: {
		instanceId: {
			// 传入 POPUP_COMPONENT_INJECTS.INSTANCE_ID
			from: POPUP_COMPONENT_INJECTS.INSTANCE_ID, // [!code highlight]
		},
	},
	methods: {
		handleClose() {
			// 在用户点击关闭按钮的处理事件中销毁弹出层
			this.$popup.destroy(this.instanceId!)
		},
	},
}
```

:::

## 携带自定义数据

在销毁弹出层时，你可以携带自定义数据，这在某些场景下非常有用，例如在弹出层关闭时需要将一些数据传递给父组件。

要携带自定义数据，只需要在调用 `destroy` 方法时传入第二个参数即可。

```ts
// 弹出层渲染组件
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)

function handleClose() {
	// 在用户点击关闭按钮的处理事件中销毁弹出层
	popup.destroy(instanceId, 'This is a custom payload')
}
```

携带的自定义数据将在弹出层关闭时作为参数传递给渲染弹出层时的 `onUnmounted` 回调函数。

```ts
// 渲染弹出层的组件
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleRender() {
	popup.render({
		component: () => import('./HelloWorld.vue'),
		onUnmounted(payload) {
			console.log(payload) // 'This is a custom payload'
		},
	})
}
```
