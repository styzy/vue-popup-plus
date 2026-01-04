# 初始化

## 创建并注册

在项目入口文件（如 `main.ts` ）中引入 `vue-popup-plus` 的 `createPopupPlus()` 方法，调用该方法即可创建插件核心实例，然后将其注册到 Vue 实例中。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)

// 创建插件
const PopupPlus = createPopupPlus() // [!code highlight]

// 注册插件到 Vue 实例
app.use(PopupPlus) // [!code highlight]

app.mount('#app')
```

`PopupPlus` 是弹出层插件的核心实例，并不是用于渲染的控制器实例，仅作为注册插件到 Vue 实例的桥梁。

## 初始化配置

::: warning
初始化选项作为 `全局配置` ，会影响所有弹出层的行为。
:::

您可以在创建插件核心实例时，设置相关选项来自定义插件的初始化配置。

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'

// 创建插件核心实例并传递配置
const PopupPlus = createPopupPlus({
	// 全局起始 z-index 值
	zIndex: 1000,
	// 是否自动禁用滚动
	autoDisableScroll: true,
	// ... 其他全局配置项
})
```

具体的配置项，请参考 [核心 API - 核心实例 createPopupPlus()](/api/core#create-popup-plus)。

## 同步应用上下文 <Badge text="1.5.0+" />

> <DVersionSupport version="1.5.0" />

::: tip
从 <DVersion version="1.6.0" /> 开始，`usePopup()` 函数会自动根据组件上下文同步应用上下文，无需手动配置。

只有当你需要在非组件环境下调用 `usePopup()` 获取弹出层控制器的时候，如果出现无法继承应用上下文的情况，才需要手动配置。
:::

如果你的应用使用了三方组件库，例如 `Element Plus` 或 `Ant Design Vue` ，并且使用了 `ConfigProvider` 组件来进行全局配置，那么为了同步这些组件库的上下文配置，你可以在 `App.vue` 中引入 `PopupRoot` 根组件，并将其放在 `ConfigProvider` 组件的内部，`PopupRoot` 根组件会自动向弹出层渲染组件提供同步的应用上下文。

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

::: tip
需要注意的是，配置了 `PopupRoot` 根组件后，所有的弹出层组件将会作为根组件的子代组件渲染，而非独立渲染。
:::

## 注册预置插件

::: tip
如果您不需要使用预置插件提供的功能，则可以 [跳过](/guide/render) 这一步。
:::

具体请查看 [注册预置插件](/guide-plugin-preset/register)。
