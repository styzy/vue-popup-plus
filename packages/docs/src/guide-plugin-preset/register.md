# 注册

## 创建插件实例并注册

只需要引入并调用 `createPresetPlugin()` 方法，并将返回的插件实例传递给 `PopupPlus.use()` 方法即可完成预置插件的注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
// 引入预置插件
import { createPresetPlugin } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)
const PopupPlus = createPopupPlus()

// 创建预置插件实例
const PresetPlugin = createPresetPlugin() // [!code highlight]

// 注册预置插件实例
PopupPlus.use(PresetPlugin) // [!code highlight]

app.use(PopupPlus)

app.mount('#app')
```

在 <DVersion package="plugin" version="1.6.0" /> 之前，预置插件是以一个 `plugin` 实例对象的形式提供的，具体的注册方式如下。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
// 1.6.0- 引入预置插件
import { plugin } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)
const PopupPlus = createPopupPlus()

// 1.6.0- 注册预置插件
PopupPlus.use(plugin) // [!code highlight]

app.use(PopupPlus)

app.mount('#app')
```

<!-- ## 按需注册 <Badge text="1.4.0+" />

> <DVersionSupport package="plugin" version="1.4.0" />

如果你只需要特定的子功能插件，也可以按需注册。

只需要引入对应的子功能插件，并在创建弹出层插件后调用 `use` 方法即可完成注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
// 引入 dialog , toast 子功能插件
import { dialog, toast } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)

const PopupPlus = createPopupPlus()

// 注册子功能插件
PopupPlus.use(dialog) // [!code highlight]
PopupPlus.use(toast) // [!code highlight]

app.use(PopupPlus)

app.mount('#app')
``` -->

## 预置插件配置 <Badge text="1.6.0+" />

> <DVersionSupport package="plugin" version="1.6.0" />

通过给 `createPresetPlugin()` 方法传递配置选项，可以全局指定或单独指定某个子插件的 **皮肤选项** ，或者是对每一个子插件提供的方法的 **默认值** 进行修改。

这里是一个简单的示例：

```ts
createPresetPlugin({
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

具体可以参考 [预置插件 API - 插件实例 createPresetPlugin()](/api/plugin-preset/plugin#create-preset-plugin)。

## 注册选项 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

::: warning
从 <DVersion package="plugin" version="1.6.0" /> 开始，我们更加推荐使用 `createPresetPlugin()` 方法来创建预置插件实例，
注册选项是为了适配以前版本的预置插件而提供的。
:::

注册预置插件的时候，你可以通过给 `use()` 方法传递第二个参数来配置插件的选项。

```ts [main.ts]
popup.use(plugin, {
	// 使用经典皮肤，默认是 modern， 即现代皮肤
	skin: 'classic',
})
```

不管是全量注册还是按需注册，都可以通过传递第二个参数来配置插件的选项。

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
