# 注册预置插件

::: tip
如果您不需要使用预置插件提供的功能，则可以 [跳过](/guide/render) 这一步。
:::

## 注册

如果您已安装预置插件，则只需要在创建插件实例后，调用 `usePlugin` 方法注册插件即可完成预置插件的注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
// 引入预置插件
import presetPlugins from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)

const popup = createPopup()

// 注册预置插件
popup.usePlugin(presetPlugins) // [!code highlight]

app.use(popup)

app.mount('#app')
```

如果想了解如何使用预置插件，请参考 [预置插件 使用说明](/guide/preset-plugin-usage)。
