# 获取控制器实例

弹出层包括 **渲染** 在内的所有功能，都依赖于 `控制器实例` ，它才是弹出层的核心。

不同于传统的弹出层插件只能在组件环境中使用，`vue-popup-plus` 支持在任何地方获取控制器实例，下面将介绍如何在不同的地方获取 **控制器实例**。

## 在组件中获取

对于组合式 API ，你可以通过 `vue-popup-plus` 提供的 `usePopup` 函数来获取弹出层控制器。

而对于选项式 API ，默认会在 `所有` 的组件实例上全局挂载 `$popup` 属性，您可以直接在组件中通过 `this.$popup` 来访问弹出层控制器。

::: code-group

```ts [组合式 API ~vscode-icons:file-type-vue~]
import { usePopup } from 'vue-popup-plus'

// 获取弹出层控制器
const popup = usePopup() // [!code highlight]

onMounted(() => {
	// 调用弹出层渲染方法
	popup.render({
		component: () => import('@/components/HelloWorld.vue'),
	})
})
```

```ts{4} [选项式 API ~vscode-icons:file-type-vue~]
export default {
	mounted() {
		// 调用弹出层渲染方法
		this.$popup.render({
			component: () => import('@/components/HelloWorld.vue'),
		})
	},
}
```

:::

## 非组件环境获取

`usePopup()` 函数并不是一个普通的组合式 API 函数，我们对其进行了增强，使其在任何非组件的环境下，依然可以正常使用。

::: tip
使用 `usePopup()` 唯一的前提，是需要先调用 `createPpupPlus()` 函数。
:::

下面以路由配置文件 `router.ts` 为例，展示如何在路由配置中获取弹出层控制器。

```ts [router.ts]
// 在路由文件中使用
import { createRouter, createWebHashHistory } from 'vue-router'
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: () => import('./Home.vue') },
		{ path: '/login', component: () => import('./Login.vue') },
	],
})

router.beforeEach((to, from, next) => {
	if (!checkAuth() && to.path !== '/login') {
		popup.render({
			component: () => import('./HelloWorld.vue'),
		})
	} else {
		next()
	}
})
```
