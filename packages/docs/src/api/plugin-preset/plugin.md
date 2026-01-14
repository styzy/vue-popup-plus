---
pageClass: api
outline: 2
---

# 插件实例 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## createPresetPlugin() <Badge text="1.6.0+" /> {#create-preset-plugin}

> <DVersionSupport package="plugin" version="1.6.0" />

创建一个预置插件实例，可以通过 [PopupPlus.use()](/api/core#popup-plus-use) 方法对预置插件进行注册。

### 类型

```ts
function createPresetPlugin(config?: PresetPluginConfig): PopupPlugin
```

### 参数类型

```ts
export type PresetPluginConfig = GlobalPluginConfig & {
	/**
	 * 媒体相册 插件配置
	 */
	album?: AlbumConfig
	/**
	 * 提示 插件配置
	 */
	alert?: AlertConfig
	/**
	 * 确认 插件配置
	 */
	confirm?: ConfirmConfig
	/**
	 * 对话 插件配置
	 */
	dialog?: DialogConfig
	/**
	 * 加载遮罩 插件配置
	 */
	loading?: LoadingConfig
	/**
	 * 提示输入 插件配置
	 */
	prompt?: PromptConfig
	/**
	 * 轻量提示 插件配置
	 */
	toast?: ToastConfig
}

type GlobalPluginConfig = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `modern` 现代皮肤
	 * - 可选值包括：
	 *   - `modern` 现代皮肤
	 *   - `classic` 经典皮肤
	 */
	skin?: Skin
}

type AlbumConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.album()` 方法的默认选项
	 */
	defaultOptions?: AlbumDefaultOption
}

type AlbumDefaultOption = Omit<
	AlbumOption,
	'sources' | 'defaultIndex' | 'zIndex'
>

type AlertConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.alert()` 方法的默认选项
	 */
	defaultOptions?: AlertDefaultOption
}

type AlertDefaultOption = Omit<AlertOption, 'zIndex'>

type ConfirmConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.confirm()` 方法的默认选项
	 */
	defaultOptions?: ConfirmDefaultOption
}

type ConfirmDefaultOption = Omit<ConfirmOption, 'zIndex'>

type DialogConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.dialog()` 方法的默认选项
	 */
	defaultOptions?: DialogDefaultOption
}

type DialogDefaultOption = Omit<
	DialogOption,
	'component' | 'componentProps' | 'onMounted' | 'zIndex'
>

type LoadingConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.loading()` 方法的默认选项
	 */
	defaultOptions?: LoadingDefaultOption
}

type LoadingDefaultOption = LoadingOption

export type PromptConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.prompt()` 方法的默认选项
	 */
	defaultOptions?: PromptDefaultOption
}

type PromptDefaultOption = Omit<PromptOption, 'defaultValue' | 'zIndex'>

export type ToastConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.toast()` 方法的默认选项
	 */
	defaultOptions?: ToastDefaultOption
}

type ToastDefaultOption = Omit<ToastOption, 'zIndex'>
```

### 详细信息

通过配置顶层 `skin` 属性，可以统一设置所有子插件的皮肤，同时每个插件也支持单独配置皮肤。

每个子插件支持通过 `defaultOptions` 属性配置默认选项，这些默认选项会在调用子插件方法时生效。

### 示例

```ts
import { createPresetPlugin } from 'vue-popup-plus-plugin-preset'

const presetPlugin = createPresetPlugin({
	// 统一设置经典皮肤
	skin: 'classic',
	dialog: {
		// 单独设置 dialog 插件使用 modern 皮肤
		skin: 'modern',
		defaultOptions: {
			// 设置 dialog 插件的默认标题为 hello
			title: 'hello',
		},
	},
})

// 标题会被设置为 hello
popup.dialog({
	component: () => import('./HelloWorld.vue'),
})

// 标题会被设置为 abc
popup.dialog({
	title: 'abc',
	component: () => import('./HelloWorld.vue'),
})
```

### 相关参考

- [预置插件指南 - 初始化配置](/guide-plugin-preset/config)
