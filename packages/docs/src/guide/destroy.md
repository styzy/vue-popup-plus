# 销毁弹出层

## 销毁

要销毁已渲染的弹出层，可以调用弹出层插件实例的 `destroy` 方法。该方法需要传入已渲染弹出层实例的 `instanceId`，它是 `render` 方法的返回值。

::: code-group

```ts [Vue 组合式 API]
import { usePopup, type InstanceId } from 'vue-popup-plus'
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
import { type InstanceId } from 'vue-popup-plus'
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

## 渲染组件内销毁

虽然`render` 方法总是返回弹出层实例的 `instanceId`，但让开发者自己手动维护并传递 `instanceId` 并不是一个好的实践，因为通常关闭弹出层的代码是在渲染组件内部编写，这意味着每一个弹出层的渲染组件都需要定义一个属性去接收当前弹出层的实例 `instanceId`，这会增加代码的复杂度和出错的风险，因此我们提供了 `渲染组件内` 获取弹出层实例 `instanceId` 的方式。

针对弹出层内所有的组件（包括子组件），我们都通过 `Vue` 的注入功能（ `provide/inject` ）将弹出层实例的 `instanceId` 注入到这些组件中，因此你可以在弹出层内的组件中通过 `inject` 选项获取到组件所处于的弹出层的实例 `instanceId`，并在需要时进行销毁操作。

同时为了提供更完整的类型推断，我们在内部使用了 `Vue` 支持类型推断的 `InjectionKey` 类型工具，并将所有可供渲染组件注入的键集中在一起，作为常量通过 `POPUP_COMPONENT_INJECTS` 进行导出，这是一个常量对象，为了获取弹出层实例 `instanceId`，我们需要使用 `INSTANCE_ID` 属性来获取。

::: code-group

```ts [Vue 组合式 API]
// 弹出层渲染的组件内部
import { inject } from 'vue'
// 导入 POPUP_COMPONENT_INJECTS 常量
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

// 传入 POPUP_COMPONENT_INJECTS.INSTANCE_ID
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID) // [!code highlight]

function handleClose() {
	// 在用户点击关闭按钮的处理事件中销毁弹出层
	popup.destroy(instanceId)
}
```

```ts [Vue 选项式 API]
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
			this.$popup.destroy(this.instanceId)
		},
	},
}
```

:::
