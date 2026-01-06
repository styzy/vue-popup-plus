---
pageClass: api
outline: 2
---

# 插件开发 API

## definePlugin() {#define-plugin}

用于定义一个可以被 Vue Popup Plus 注册的插件。

其返回值为一个 `插件实例` ，用于在 [注册插件](/plugin/register) 时使用。

### 类型

```ts
function definePlugin(options: PluginOption) => void }): PluginInstance
```

### 参数类型

```ts
type PluginOption = {
	/**
	 * 插件名称
	 *
	 * - 插件名称必须唯一
	 * - 名称冲突将导致插件注册失败
	 */
	name: string
	/**
	 * 插件作者
	 *
	 * - 插件作者可以是个人或组织名称
	 * - 不设置插件作者将会导致在插件注册时
	 * 通过日志输出一个警告，用以提示插件使用者相关风险
	 *
	 * @since 1.5.0
	 */
	author?: string
	/**
	 * 插件核心版本要求
	 *
	 * - 插件作者可以指定插件所适配的最低和最高核心版本
	 * - 不符合要求的核心将无法注册该插件
	 *
	 * @since 1.5.0
	 */
	requiredCoreVersion?: {
		/**
		 * 插件所适配的最低核心版本
		 */
		min?: Version
		/**
		 * 插件所适配的最高核心版本
		 */
		max?: Version
	}
	/**
	 * 插件安装函数
	 *
	 * - 第一个参数接收注册此插件的弹出层的创建配置
	 * - 第二个参数接收插件自定义选项，可自行定义，插件使用者可在调用
	 *  `popup.use` 方法时传入
	 */
	install: PluginInstall<TOption>
}

type PluginInstall<TOption extends PluginOption> = (
	config: Readonly<IPluginWrappedConfig>,
	option?: TOption
) => void

export interface IPluginWrappedConfig extends IConfig {
	/**
	 * 控制器实例自定义属性原型对象
	 *
	 * - 可在插件的 `install` 方法中扩展方法或属性
	 * - 该属性为只读属性，只允许扩展，并且内置方法不能被覆盖
	 */
	readonly customProperties: ControllerPrototype
	/**
	 * 动画类型自定义属性原型对象
	 *
	 * - 可在插件的 `install` 方法中扩展动画类型
	 * - 该属性为只读属性，只允许扩展，并且内置动画类型不能被覆盖
	 */
	readonly customAnimations: PopupCustomAnimations
}

interface IConfig {
	/**
	 * 弹出层 zIndex 基础值
	 */
	zIndex: number
	/**
	 * 是否自动禁用滚动
	 */
	autoDisableScroll: boolean
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 */
	prototypeName: string
	/**
	 * 日志器
	 */
	logHandler: ILogHandler
	/**
	 * 日志过滤器
	 */
	logFilter?: LogFilter
	/**
	 * 开启调试模式
	 */
	debugMode: boolean
}
```

### 详细信息

使用该函数可以创建自定义的插件实例，方便插件开发者将插件作为独立的包发布和维护，提供给插件使用者更多 `开箱即用` 的功能。

### 相关参考

- [插件 - 定义插件](/plugin/define)
- [核心 API - 核心实例 PopupPlus.use()](/api/core#popup-plus-use)
