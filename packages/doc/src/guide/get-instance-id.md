# 获取实例 id

## render 方法返回

`render` 方法总是返回弹出层实例的 `id`，你可以将其存储起来，后续需要时再使用。

但让开发者自己手动维护并传递 `id` 并不是一个好的实践，因为通常关闭弹出层的代码是在弹出层所渲染的组件内部编写，这意味着每一个弹出层的组件都需要设置一个属性去接收当前弹出层的实例 `id`，这会增加代码的复杂度和出错的风险，因此我们提供了其他获取弹出层实例 `id` 的方式。

## 弹出层组件内注入

Vue Popup Plus 针对弹出层内所有的组件（包括子组件），都通过 `Vue` 的注入功能（ `provide/inject` ）将弹出层实例的 `id` 注入到这些组件中，因此你可以在弹出层内的组件中通过 `inject` 选项获取到组件所处于的弹出层的实例 `id`，并在需要时进行销毁操作。

同时为了提供更完整的类型推断，我们在内部使用了 `vue` 支持类型推断的 `InjectionKey` 类型工具，并将所有可供渲染组件注入的键集中在一起，作为常量通过 `POPUP_COMPONENT_INJECTS` 进行导出，这是一个常量对象，为了获取弹出层实例 `id`，我们需要使用 `INSTANCE_ID` 属性来获取。

::: code-group

```ts [Vue 组合式 API]
// 弹出层渲染的组件内部
import { inject } from 'vue'
// 导入 POPUP_COMPONENT_INJECTS 常量
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

// 传入 POPUP_COMPONENT_INJECTS.INSTANCE_ID
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)

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
			from: POPUP_COMPONENT_INJECTS.INSTANCE_ID,
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

除了注入弹出层实例 `id` ，Vue Popup Plus 还为弹出层内的组件注入了一些其他的数据，他们的 `键` 全都通过 `POPUP_COMPONENT_INJECTS` 常量提供，具体可以查看 [API POPUP_COMPONENT_INJECTS](/api/POPUP_COMPONENT_INJECTS)。
