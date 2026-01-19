# 常见问题

## 第三方组件库的层级冲突

对于目前主流的 **Vue 3** 开源组件库，例如 `ElementPlus` 、 `Ant Design Vue` 等，这些组件库内部在实现部分组件以及弹出层时，自己维护了一套层级 zIndex 体系。

### ElementPlus 适配

从 <DVersion version="1.6.1" /> 版本开始，`Vue Popup Plus` 的 `createPopupPlus()` 函数的 `zIndex` 配置项支持传入一个工厂函数，每次渲染弹出层时，会调用该函数获取一个新的 `z-index` 值。

对于 `Element Plus` 组件库，其暴露了一个 `useZIndex()` 钩子函数用于获取其内部维护的 `z-index` 值，因此可以通过下面示例将 `Vue Popup Plus` 的 `zIndex` 托管给 `Element Plus` 组件库去统一维护。

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'
import { useZIndex } from 'element-plus'

const PopupPlus = createPopupPlus({
	zIndex: () => useZIndex().nextZIndex(),
})
```

对于 <DVersion version="1.6.1" /> 之前的版本，则只能通过降低 `zIndex` 基准值来解决冲突问题。

```ts
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 默认 1000，这里降低为 500 来提供更好的兼容性
	zIndex: 500,
})
```

### Ant Design Vue 适配

由于 `Ant Design Vue` 组件库内部目前并没有暴露其内部维护的 `z-index` 值，因此无法直接将 `Vue Popup Plus` 的 `zIndex` 托管给 `Ant Design Vue` 组件库去统一维护，所以只能通过降低 `zIndex` 基准值来解决冲突问题。

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

## 预置插件依赖的核心版本

从 <DVersion package="plugin" version="1.6.2" /> 版本开始，预置插件对核心的版本要求 **更加包容** ，这是因为核心从 <DVersion version="1.6.0" /> 版本开始进入稳定迭代状态，因此后续预置插件只需要 `主要版本` 和 `次版本号` 与核心保持一致即可。例如：

| 预置插件版本    | 依赖的核心版本 |
| :-------------- | :------------- |
| `1.8.x`         | `1.8.x`        |
| `1.7.x`         | `1.7.x`        |
| `1.6.x(x >= 2)` | `1.6.x`        |

对于 <DVersion package="plugin" version="1.6.1" /> 版本及之前的版本，核心版本号 **必须** 和预置插件的版本号 **保持一致** 。例如：

| 预置插件版本 | 依赖的核心版本 |
| :----------- | :------------- |
| `1.6.1`      | `1.6.1`        |
| `1.6.0`      | `1.6.0`        |
| `1.5.0`      | `1.5.0`        |
| `1.4.0`      | `1.4.0`        |
