# Vitepress Plugin Markdown Container Demo

为 Vitepress 提供 Markdown 容器 Demo 功能，获得类似于 `Element-Plus` 中的示例组件的效果。

提供开箱即用的内置组件 `MarkdownDemo`，用于在 Markdown 中嵌入 Vue 组件的演示代码。

## 安装

```bash
npm install vitepress-plugin-markdown-container-demo
```

```yarn
yarn add vitepress-plugin-markdown-container-demo
```

## 使用

在 Vitepress 配置文件中引入插件：

```ts [.vitepress/config.ts]
import { demoContainerMdPlugin } from 'vitepress-plugin-markdown-container-demo'

export default defineConfig({
	markdown: {
		config: (md) => {
			md.use(demoContainerMdPlugin)
		},
	},
})
```

在 启动入口文件中注册插件：

```ts [.vitepress/theme/index.ts]
import { MarkdownDemo } from 'vitepress-plugin-markdown-container-demo'

export default {
	enhanceApp({ app, router, siteData }) {
		// 全局注册 MarkdownDemo 组件
		app.component(MarkdownDemo.name!, MarkdownDemo)
	},
} satisfies Theme
```

在 Markdown 中使用示例容器：

````md
::: demo

```html
<YourComponent>Hello World</YourComponent>
```

```ts
console.log('Hello World')
```

:::
````

## 自定义渲染组件

可以自定义渲染组件，以实现自定义的演示效果。

在 Vitepress 配置文件中修改配置项：

```ts [.vitepress/config.ts]
import { demoContainerMdPlugin } from 'vitepress-plugin-markdown-container-demo'

export default defineConfig({
	markdown: {
		config: (md) => {
			md.use(demoContainerMdPlugin, {
				// 自定义示例容器名称
				spoiler: 'custom-demo',
				// 自定义渲染组件名称
				resolveTag: 'CustomDemo',
			})
		},
	},
})
```

在 启动入口文件中注册自定义示例插件：

```ts [.vitepress/theme/index.ts]
import CustomDemo from './CustomDemo.vue'

export default {
	enhanceApp({ app, router, siteData }) {
		// 全局注册 CustomDemo 组件
		app.component(CustomDemo.name!, CustomDemo)
	},
} satisfies Theme
```

然后，在 Markdown 中使用自定义示例容器：

````md
::: custom-demo

```html
<CustomDemo>Hello World</CustomDemo>
```

```ts
console.log('Hello World')
```

:::
````
