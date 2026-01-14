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
