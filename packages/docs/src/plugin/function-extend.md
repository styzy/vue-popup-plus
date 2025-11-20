# 功能扩展

## 介绍

因为弹出层所有的功能都依赖于弹出层的控制器实例，因此如果想扩展弹出层的功能，只需要扩展弹出层的控制器实例即可。

## 扩展控制器实例

如果需要对弹出层的控制器实例进行扩展，例如添加自定义的方法和属性，可以使用 `popup` 的 `customPropertise` 属性，该属性是一个对象，用于存储自定义的方法和属性。

::: tip
需要注意的是， `customPropertise` 属性仅在 `install` 函数提供的 `popup` （即支持扩展的控制器实例）中存在，并且你也不应该将其暴露给插件的使用者，因为它是一个内部实现细节，不应该被插件的使用者直接访问。
:::

下面是一个示例，展示了如何对弹出层的控制器实例添加一个自定义的方法 `test`，用于渲染一个测试组件 `Test.vue`。

```ts{5} [test_plugin.ts]
const testPlugin = definePlugin({
	name: 'test-plugin',
	install(popup, config, options) {
		// 对控制器实例扩展test方法
		popup.customPropertise.test = function (testString: string) {
			// 因为扩展的是控制器实例的方法，因此这里的 this 指向的是控制器实例
			this.render({
				component: () => import('./Test.vue'),
				componentProps: {
					testString,
				},
			})
		}
	},
})
```

当 `testPlugin` 被成功安装后，插件使用者就可以像调用内置的 `render()` 方法一样，调用 `test()` 方法，例如：

::: code-group

```ts [组合式 API  ~vscode-icons:file-type-vue~]
import { onMounted } from 'vue'
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

onMounted(() => {
	popup.test('hello test')
})
```

```ts [选项式 API  ~vscode-icons:file-type-vue~]
export default {
	mounted() {
		this.$popup.test('hello test')
	},
}
```

:::

## TypeScript 类型支持

作为一款基于 `TypeScript` 编写的类型安全的弹出层插件，为了保证使用者能够获得完整的类型提示和检查，我们需要对插件的类型进行定义。

为此，我们为所有插件开发者提供了一个用于扩展控制器实例的接口，即 `PopupCustomProperties` 接口。

插件开发者只需要在插件定义代码中，为 `PopupCustomProperties` 接口添加自定义的方法和属性的类型声明即可。

```ts [test_plugin.ts]
const testPlugin = definePlugin({
	name: 'test-plugin',
	install(popup, config, options) {
		popup.customPropertise.test = function (testString: string) {
			this.render({
				component: () => import('./Test.vue'),
				componentProps: {
					testString,
				},
			})
		}
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		// 提供 test 方法的类型声明
		test: (testString: string) => void // [!code highlight]
	}
}
```
