# 注册预置插件

## 注册

引入预置插件，并在创建插件实例后调用 `use` 方法即可完成预置插件的注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
// 引入预置插件
import { presetPlugin } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)

const popup = createPopup()

// 注册预置插件
popup.use(presetPlugin) // [!code highlight]

app.use(popup)

app.mount('#app')
```
