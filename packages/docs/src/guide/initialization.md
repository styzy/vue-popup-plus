# 初始化

## 创建插件

只需要在你的项目入口文件中引入 `vue-popup-plus` 的 `createPopup` 方法即可创建插件。

```ts [main.ts]
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)

// 创建插件实例
const popup = createPopup() // [!code highlight]

// 注册插件到 Vue 实例
app.use(popup) // [!code highlight]

app.mount('#app')
```

## 初始化配置

::: warning
初始化选项作为 `全局配置` ，会影响所有弹出层的行为。
:::

您可以在创建插件实例时，设置相关选项来自定义插件的初始化配置。

```ts [main.ts]
import { createPopup } from 'vue-popup-plus'

// 创建插件实例并传递配置
const popup = createPopup({
	// 全局起始 z-index 值
	zIndex: 1000,
	// 是否自动禁用滚动
	autoDisableScroll: true,
	// ... 其他全局配置项
})
```

具体的配置项，请参考 [API createPopup()](/api/createPopup)。

## 注册预置插件

::: tip
如果您不需要使用预置插件提供的功能，则可以 [跳过](/guide/render) 这一步。
:::

具体请查看 [注册预置插件](/preset-plugin/register)。
