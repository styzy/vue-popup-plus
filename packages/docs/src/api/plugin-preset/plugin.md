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
export type PresetPluginConfig = PluginSharedConfig & {
	/**
	 * 国际化语言包
	 *
	 * - 默认使用 `en-US` 英文语言包
	 * - 可选值包括：
	 *   - `ar-SA` 阿拉伯语
	 *   - `bg-BG` 保加利亚语
	 *   - `cs-CZ` 捷克语
	 *   - `da-DK` 丹麦语
	 *   - `de-DE` 德语
	 *   - `el-GR` 希腊语
	 *   - `en-GB` 英语（英国）
	 *   - `en-US` 英语（美国）
	 *   - `es-ES` 西班牙语
	 *   - `et-EE` 爱沙尼亚语
	 *   - `fi-FI` 芬兰语
	 *   - `fr-FR` 法语
	 *   - `ga-IE` 爱尔兰语
	 *   - `hi-IN` 印地语
	 *   - `hr-HR` 克罗地亚语
	 *   - `hu-HU` 匈牙利语
	 *   - `id-ID` 印尼语
	 *   - `it-IT` 意大利语
	 *   - `ja-JP` 日语
	 *   - `ko-KR` 韩语
	 *   - `lt-LT` 立陶宛语
	 *   - `lv-LV` 拉脱维亚语
	 *   - `ms-MY` 马来语
	 *   - `mt-MT` 马耳他语
	 *   - `nl-NL` 荷兰语
	 *   - `pl-PL` 波兰语
	 *   - `pt-BR` 葡萄牙语（巴西）
	 *   - `pt-PT` 葡萄牙语（葡萄牙）
	 *   - `ro-RO` 罗马尼亚语
	 *   - `ru-RU` 俄语
	 *   - `sk-SK` 斯洛伐克语
	 *   - `sl-SI` 斯洛文尼亚语
	 *   - `sv-SE` 瑞典语
	 *   - `th-TH` 泰语
	 *   - `tr-TR` 土耳其语
	 *   - `vi-VN` 越南语
	 *   - `zh-CN` 简体中文
	 *   - `zh-TW` 繁体中文
	 *
	 * @since 1.7.0
	 */
	locale?: PopupLocaleMessages
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

type PluginSharedConfig = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `modern` 现代皮肤
	 * - 可选值包括：
	 *   - `modern` 现代皮肤
	 *   - `classic` 经典皮肤
	 */
	skin?: Skin
}

type AlbumConfig = PluginSharedConfig & {
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

type AlertConfig = PluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.alert()` 方法的默认选项
	 */
	defaultOptions?: AlertDefaultOption
}

type AlertDefaultOption = Omit<AlertOption, 'zIndex'>

type ConfirmConfig = PluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.confirm()` 方法的默认选项
	 */
	defaultOptions?: ConfirmDefaultOption
}

type ConfirmDefaultOption = Omit<ConfirmOption, 'zIndex'>

type DialogConfig = PluginSharedConfig & {
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

type LoadingConfig = PluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.loading()` 方法的默认选项
	 */
	defaultOptions?: LoadingDefaultOption
}

type LoadingDefaultOption = LoadingOption

export type PromptConfig = PluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.prompt()` 方法的默认选项
	 */
	defaultOptions?: PromptDefaultOption
}

type PromptDefaultOption = Omit<PromptOption, 'defaultValue' | 'zIndex'>

export type ToastConfig = PluginSharedConfig & {
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
	component: () => import('./HelloDialog.vue'),
})

// 标题会被设置为 abc
popup.dialog({
	title: 'abc',
	component: () => import('./HelloDialog.vue'),
})
```

### 相关参考

- [预置插件指南 - 初始化配置](/guide-plugin-preset/config)
