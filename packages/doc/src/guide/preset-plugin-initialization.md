# 注册预置插件

::: tip
如果您不需要使用预置插件提供的功能，则可以 [跳过](/guide/render) 这一步。
:::

如果您已安装预置插件，则只需要在创建插件实例后，调用 `usePlugin` 方法注册插件即可完成预置插件的注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
// 引入预置插件
import presetPlugins from 'vue-popup-plus-plugin-preset'
import App from './App.vue'

const app = createApp(App)

const popup = createPopup()

// 注册预置插件
popup.usePlugin(presetPlugins)

app.use(popup)

app.mount('#app')
```

预置插件会自动扩展弹出层插件实例 `popup` 的相关方法，您可以直接调用这些方法来使用预置插件提供的功能。
