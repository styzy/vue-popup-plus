---
pageClass: api
outline: 2
---

# 定义插件

## definePlugin()

用于定义一个可以被 Vue Popup Plus 注册的插件。

其返回值为一个 `插件实例` ，用于在 [注册插件](/plugin/register.md) 时使用。

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
	 */
	name: string
	/**
	 * 插件安装函数
	 *
	 * - 第一个参数接收安装此插件的弹出层控制器实例
	 * - 第二个参数接收安装此插件的弹出层的创建配置
	 * - 第三个参数接收插件自定义选项，可自行定义，插件使用者可在调用
	 *  `popup.use` 方法时传入
	 */
	install: (
		controller: PluginPopupController,
		config: Readonly<PopupConfig>,
		option?: any
	) => void
}

type PluginPopupController = PopupController & {
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

// 弹出层控制器实例的创建选项
type PopupConfig = Required<CreateOption>
```

### 详细信息

使用该函数可以创建自定义的插件实例，方便插件开发者将插件作为独立的包发布和维护，提供给插件使用者更多 `开箱即用` 的功能。

### 相关参考

- [插件 - 定义插件](/plugin/define.md)
- [全局 API - 控制器实例](/api/controller.md)
