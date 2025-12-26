# 初始化

## 创建并注册

在项目入口文件（如 `main.ts` ）中引入 `vue-popup-plus` 的 `createPopup` 方法，调用该方法即可创建插件，然后将插件注册到 Vue 实例中。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)

// 创建插件
const popup = createPopup() // [!code highlight]

// 注册插件到 Vue 实例
app.use(popup) // [!code highlight]

app.mount('#app')
```

`popup` 是弹出层插件实例，并不是用于渲染的控制器实例，仅作为注册插件到 Vue 实例的桥梁。

## 初始化配置

::: warning
初始化选项作为 `全局配置` ，会影响所有弹出层的行为。
:::

您可以在创建插件时，设置相关选项来自定义插件的初始化配置。

```ts [main.ts]
import { createPopup } from 'vue-popup-plus'

// 创建插件并传递配置
const popup = createPopup({
	// 全局起始 z-index 值
	zIndex: 1000,
	// 是否自动禁用滚动
	autoDisableScroll: true,
	// ... 其他全局配置项
})
```

具体的配置项，请参考 [全局 API - 控制器实例 createPopup()](/api/controller#createpopup)。

## 同步应用上下文 <Badge type="tip" text="1.5.0+" />

> <DVersionSupport version="1.5.0" />

如果你的应用使用了三方组件库，例如 `Element Plus` 或 `Ant Design Vue` ，并且使用了 `ConfigProvider` 组件来进行全局配置，那么为了同步这些组件库的上下文配置，你需要在 `App.vue` 中引入 `PopupRoot` 根组件，并将其放在 `ConfigProvider` 组件的内部，`PopupRoot` 根组件会自动向弹出层渲染组件提供同步的应用上下文。

这里以 `Element Plus` 为例，具体使用方式如下:

```vue [App.vue]
<template>
	<ElConfigProvider :locale="zhCN">
		<PopupRoot>
			<HelloWorld />
		</PopupRoot>
	</ElConfigProvider>
</template>

<script lang="ts" setup>
import { PopupRoot } from 'vue-popup-plus'
import { ElConfigProvider } from 'element-plus'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
```

## 注册预置插件

::: tip
如果您不需要使用预置插件提供的功能，则可以 [跳过](/guide/render) 这一步。
:::

具体请查看 [注册预置插件](/guide-plugin-preset/register)。

## 组件中使用

注册成功后，一般我们需要在组件中使用 `弹出层控制器` 来调用弹出层的相关方法。

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
