# 定义插件 <Badge text="1.5.x" />

这篇文档将介绍如何定义插件以及插件的相关配置参数。

::: tip

这里是 `1.5.x` 版本的插件定义方式，最新版本的插件定义方式请参考 [插件 - 定义插件](/plugin/define)。

:::

## 定义插件

Vue Popup Plus 提供了 `definePlugin` 函数，用于定义插件，插件开发者可以使用该方法定义自己的插件。

下面是一个简单的插件定义示例：

```ts
import { definePlugin } from 'vue-popup-plus'

const myPlugin = definePlugin({
	// 插件名称，不可重复
	name: 'my-plugin',
	// 插件安装函数，将在 popup.use 方法调用时执行
	install(popup) {
		console.log('myPlugin 安装成功')
	},
})
```

这里我们通过 `definePlugin` 方法定义了一个名为 `my-plugin` 的插件，插件安装函数会在插件被 `注册` 时执行，打印出 `myPlugin 安装成功` 。

## 插件名称

`name` 属性用于定义插件的名称，需要注意的是，名称不能与已有的插件名称重复，插件在安装的时候会进行名称检查，因此建议插件开发者使用带有命名空间前缀（类似于 `my-` ）的插件名称，例如 `my-toast` 、 `@my/dialog` 等。

如果你想要开发一个开源插件提供给插件使用者使用，建议使用语义化的命名空间前缀，例如 `material-` 、 `modern-` 等，这样做可以帮助插件使用者更好地理解插件的功能和使用场景。

又或者你想开发一整个系列的多个插件，这时候建议使用你的组织名称作为命名空间前缀，以 Vue 官方组织发布的插件为例，规范的做法是所有的插件统一使用 `@vue/` 作为命名空间前缀，例如 `@vue/dialog` 、 `@vue/toast` 等，这样做的好处是在避免插件名称冲突的同时，可以提高系列插件的整体性和辨识度。

## 安装函数

`install` 属性用于定义插件的安装函数，插件在安装时会调用该函数，该函数接收三个参数，分别是：

- `popup` 支持扩展的弹出层控制器实例
- `config` 弹出层控制器初始化配置对象
- `options` 自定义插件配置对象

```ts
definePlugin({
	name: 'my-plugin',
	install(popup, config, options) {},
})
```

::: tip
需要注意的是，和正常的控制器实例不同，这里的 `popup` 控制器实例，是一个支持扩展的控制器实例，它除了包含原有控制器实例的相关方法和属性之外，还提供了一些额外的方法和属性，用于插件的开发。

这些额外的方法和属性，仅在 `install` 函数提供的 `popup` 控制器实例中存在。
:::

这里只是简单的介绍了 `install` 安装函数的参数，插件开发者可以根据实际需求，在安装函数中定义自己的逻辑。

同时我们也针对不同的插件场景，提供了不同扩展方式的详细文档，包括：

- [插件 - 功能扩展 1.5.x](/plugin/function-extend-1.5.x)
- [插件 - 动画扩展 1.5.x](/plugin/animation-extend-1.5.x)

## 自定义注册选项

为了方便插件使用者能够灵活的配置插件的行为，插件开发者可以在 `install` 安装函数的第三个参数接收自定义的注册选项。

`definePlugin` 函数内置了对注册选项的类型支持，插件开发者只需要显式的定义好其类型，插件使用者在注册插件时，就可以自动获得对应的类型支持和代码提示。

```ts
// 因为注册选项本身是可选的，所以其内部属性也需要是可选的
type MyPluginOptions = {
	// 自定义选项 foo，类型为字符串，可选
	foo?: string
	// 自定义选项 bar，类型为数字，可选
	bar?: number
}

const myPlugin = definePlugin({
	name: 'my-plugin',
	// 指定注册选项的类型为 MyPluginOptions，同时因为插件注册选项本身是可选的，
	// 所以需要指定其默认值为空对象
	// 这里推荐使用解构赋值的方式，为注册选项指定默认值
	install(popup, config, { foo = '', bar = 0 }: MyPluginOptions = {}) {
		console.log('foo: ', foo)
		console.log('bar: ', bar)
	},
})
```

这样定义好插件的注册选项类型后，插件使用者就可以在注册插件时，传入相应的注册选项，并且获得对应的类型支持和代码提示。

```ts
popup.use(myPlugin, {
	foo: 'bar', // 这里将提供 foo 选项的类型提示 // [!code highlight]
})
```

## 返回值

`definePlugin` 函数的返回值是一个 `插件实例` ，用于在 [注册插件](/plugin/register) 时使用。

## 相关参考

具体可以参考 [核心 API - 插件开发 definePlugin()](/api/plugin#define-plugin)。
