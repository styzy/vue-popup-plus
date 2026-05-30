# 指令扩展 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

## 介绍

**Vue Popup Plus** 内置了通用的 `v-popup` 指令，用于在元素上添加触发和渲染弹出层功能，同时我们也提供了一些工具函数，用于快速创建自定义的弹出层指令。

## 创建指令

使用 `createPopupDirective()` 函数可以快速创建自带事件触发器的自定义弹出层指令。由于 `createPopupDirective()` 函数内置了元素事件触发器，因此你只需要关注弹出层的具体实现即可。

`createPopupDirective()` 函数接受一个 **渲染函数** ，该函数会在需要渲染弹出层时被执行。该函数的参数包括 **元素实例** 、**指令绑定** 、**虚拟节点** 、**上一个虚拟节点** 和 **获取控制器的函数** 。

```ts [custom-popup-directive.ts]
import { createPopupDirective } from 'vue-popup-plus'

export const customPopupDirective = createPopupDirective(
	({ el, binding, vNode, prevVNode, getController }) => {
		const options = binding.value
		const controller = getController()
		const renderOptions = {
			/**
			 * 自定义渲染选项，用于自定义弹出层的渲染逻辑
			 */
		}
		controller.render(renderOptions)
	}
)
```

## 注册指令

所有通过 `createPopupDirective()` 创建的指令都需要在创建 **插件实例** 时注册，才能在模板中使用。

::: tip
注册时使用的 **键名** 将会统一加上 `v-popup-` 前缀，并且自动注册到 `Vue` 中。
:::

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
import { customPopupDirective } from './custom-popup-directive'

import App from './App.vue'

const PopupPlus = createPopupPlus({
	directives: {
		// 这里的 `custom` 键名将会创建 `v-popup-custom` 指令
		custom: customPopupDirective, // [!code highlight]
	},
})

const app = createApp(App)
app.use(PopupPlus)
```

## TypeScript 类型支持

和插件一样，指令也需要向使用者提供类型定义，以确保类型安全。

为此，我们提供了一些工具类型，方便指令开发者快速创建自定义指令的类型定义。

只需要在创建指令时，使用工具类型 `PopupDirective` 即可。

::: tip
工具类型 `PopupDirective` 接受两个泛型参数，第一个参数为指令的 **值类型** ，第二个参数为指令的 **修饰符类型** 。
:::

```ts [custom-popup-directive.ts] {4,7,23}
import { createPopupDirective, type PopupDirective } from 'vue-popup-plus'

// 通过 PopupDirective 工具类型创建自定义指令类型
type CustomPopupDirective = PopupDirective<'number', 'custom1' | 'custom2'>

// 传入泛型参数 CustomPopupDirective ，此时内部变量会自动获得类型支持
const customPopupDirective = createPopupDirective<CustomPopupDirective>(
	({ el, binding, vNode, prevVNode, getController }) => {
		const options = binding.value
		const controller = getController()
		const renderOptions = {}
		controller.render(renderOptions)
	}
)

// 通过 Vue 的全局指令类型定义，为自定义指令添加类型支持
declare module 'vue' {
	export interface GlobalDirectives {
		/**
		 * 这里必须使用 vPopup 作为前缀，并且使用我们
		 * 刚刚定义的 CustomPopupDirective 类型
		 */
		vPopupCustom: CustomPopupDirective
	}
}
```

## 相关参考

具体可以参考 [核心 API - 插件开发 createPopupDirective()](/api/plugin#create-popup-directive)。
