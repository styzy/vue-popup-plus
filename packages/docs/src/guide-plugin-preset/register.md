# 注册预置插件

## 全量注册

预置插件包含了多个常用子功能插件，**推荐使用** 全量注册方式进行注册。

只需要引入预置插件，并在创建弹出层插件后调用 `use` 方法即可完成预置插件的注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
// 引入预置插件
import { plugin } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)

const PopupPlus = createPopupPlus()

// 注册预置插件
PopupPlus.use(plugin) // [!code highlight]

app.use(PopupPlus)

app.mount('#app')
```

## 按需注册 <Badge type="tip" text="1.4.0+" />

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
```

## 注册选项 <Badge type="tip" text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />

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
