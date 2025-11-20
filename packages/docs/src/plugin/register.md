# 注册插件

所有的插件都需要完成 `注册` ，才能生效。

## 注册

控制器实例 `popup` 的 `use` 方法，专门用于插件的注册。

```ts
import { createPopup, definePlugin } from 'vue-popup-plus'

const myPlugin = definePlugin({
	name: 'my-plugin',
	install(popup, config, options) {
		console.log('myPlugin 安装成功')
	},
})

const popup = createPopup()

// 完成插件的注册
popup.use(myPlugin) // [!code highlight]
```

## 注册选项

插件注册时，还可以传递一个注册选项对象，用于配置插件的行为。

注册选项由插件开发者定义，插件使用者可以根据需要进行配置。

```ts
popup.use(myPlugin, {
	// 注册选项，具体请参考插件开发者的文档
})
```
