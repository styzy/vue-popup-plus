# 常见问题

## 与组件库的层级冲突问题

对于目前主流的 **Vue3** 开源组件库，例如 `ElementPlus` 、 `Ant Design Vue` 等，这些组件库内部在实现部分组件以及弹出层时，自己维护了一套层级 zIndex 体系。

如果出现和 **vue-popup-plus** 弹出层 `zIndex` 冲突的情况，可以通过 `createPopupPlus()` 的 `zIndex` 选项来降低 **vue-popup-plus** 的全局 `zIndex` 基准值。

```ts
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 默认 2000，这里降低为 1000 来提供更好的兼容性
	zIndex: 1000,
})
```

## 预置插件版本问题

预置插件对核心版本具有较强的依赖关系，因此最佳实践是使用与核心版本相同的预置插件版本。

## 同步应用上下文 <Badge text="1.5.0+" />

> <DVersionSupport version="1.5.0" />

::: tip
从 <DVersion version="1.6.0" /> 开始，`usePopup()` 函数会自动根据组件上下文同步应用上下文，无需手动配置。

只有当你需要在非组件环境下调用 `usePopup()` 获取弹出层控制器的时候，如果出现无法继承应用上下文的情况，才需要手动配置。
:::

如果你的应用使用了三方组件库，例如 `Element Plus` 或 `Ant Design Vue` ，并且使用了 `ConfigProvider` 组件来进行全局配置，那么为了同步这些组件库的上下文配置，你可以在 `App.vue` 中引入 `PopupRoot` 根组件，并将其放在 `ConfigProvider` 组件的内部，`PopupRoot` 根组件会自动向弹出层视图组件提供同步的应用上下文。

这里以 `Element Plus` 为例，具体使用方式如下:

```vue [App.vue]
<template>
	<ElConfigProvider :locale="zhCN">
		<PopupRoot>
			<RouterView />
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

具体可以参考 [核心 API - 内置组件 {{ '<PopupRoot>' }}](/api/components#popup-root)。
