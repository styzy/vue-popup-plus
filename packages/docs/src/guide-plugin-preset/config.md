# 初始化配置

在注册预置插件时，我们通过 `createPresetPlugin()` 方法创建预置插件实例，该方法接受一个可选的对象作为初始化配置选项，用于配置预置插件全局的行为。

::: warning
在 <DVersion package="plugin" version="1.6.0" /> 之前的版本，需要通过 [注册选项](#注册选项) 来配置预置插件的初始化选项。
:::

## 全局配置皮肤

通过 `skin` 选项，我们可以全局配置所有预置插件的皮肤样式。

```js
import { createPresetPlugin } from 'vue-popup-plus-plugin-preset'

const PresetPlugin = createPresetPlugin({
	// 全局配置所有插件的皮肤为 classic
	skin: 'classic',
})
```

## 单个插件独立配置

通过 `toast` 、 `dialog` 、 `prompt` 等选项，我们可以单独配置每个子插件的 **皮肤** 或者 **全局默认选项**。

下面是一个简单的示例：

```ts
createPresetPlugin({
	// 统一设置经典皮肤
	skin: 'classic',
	dialog: {
		// 单独设置 dialog 插件使用 modern 皮肤
		skin: 'classic',
		defaultOptions: {
			// 设置 dialog 插件默认使用透明遮罩层
			maskTransparent: true,
		},
	},
	toast: {
		defaultOptions: {
			// 设置 toast 插件的默认位置为顶部
			placement: 'top',
			// 设置 toast 插件的默认持续时间为 4000 毫秒
			duration: 4000,
		},
	},
})
```

## 详细配置

具体可以参考 [预置插件 API - 插件实例 createPresetPlugin()](/api/plugin-preset/plugin#create-preset-plugin)。

## 注册选项 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

::: warning
<DVersion package="plugin" version="1.6.0" /> 以及之后的版本，建议使用 `createPresetPlugin()` 方法来配置预置插件的行为。
:::

注册预置插件的时候，你可以通过给 `PopupPlus.use()` 方法传递第二个参数来配置插件的选项。

```ts [main.ts]
PopupPlus.use(plugin, {
	// 使用经典皮肤，默认是 modern， 即现代皮肤
	skin: 'classic',
})
```

具体的预置插件注册选项如下：

```ts
type PluginOptions = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `modern` 现代皮肤
	 * - 可选值包括：
	 *   - `modern` 现代皮肤
	 *   - `classic` 经典皮肤
	 */
	skin?: Skin
}
```
