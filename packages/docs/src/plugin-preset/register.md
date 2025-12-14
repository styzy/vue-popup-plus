# 注册预置插件

## 全量注册

预置插件包含了多个常用子功能插件，**推荐使用** 全量注册方式进行注册。

只需要引入预置插件，并在创建插件实例后调用 `use` 方法即可完成预置插件的注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
// 引入预置插件
import { plugin } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)

const popup = createPopup()

// 注册预置插件
popup.use(plugin) // [!code highlight]

app.use(popup)

app.mount('#app')
```

## 按需注册 <Badge type="tip" text="1.4.0+" />

> <DVersionSupport package="plugin" version="1.4.0" />

如果你只需要特定的子功能插件，也可以按需注册。

只需要引入对应的子功能插件，并在创建插件实例后调用 `use` 方法即可完成注册。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
// 引入 dialog , toast 子功能插件
import { dialog, toast } from 'vue-popup-plus-plugin-preset' // [!code highlight]
import App from './App.vue'

const app = createApp(App)

const popup = createPopup()

// 注册子功能插件
popup.use(dialog) // [!code highlight]
popup.use(toast) // [!code highlight]

app.use(popup)

app.mount('#app')
```
