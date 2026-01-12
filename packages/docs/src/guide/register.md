# 注册

## 创建并注册

在项目入口文件（如 `main.ts` ）中引入 `vue-popup-plus` 的 `createPopupPlus()` 方法，调用该方法即可创建插件核心实例，然后将其注册到 Vue 实例中。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)

// 创建插件
const PopupPlus = createPopupPlus() // [!code highlight]

// 注册插件到 Vue 实例
app.use(PopupPlus) // [!code highlight]

app.mount('#app')
```

`PopupPlus` 是弹出层插件的核心实例，并不是用于渲染的控制器实例，仅作为注册弹出层插件到 **Vue 应用** 的桥梁。

## 注册预置插件

::: tip
如果您不需要使用预置插件提供的功能，则可以 [跳过](/guide/render) 这一步。
:::

具体请查看 [预置插件指南 - 注册](/guide-plugin-preset/register)。
