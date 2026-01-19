# 初始化配置

在注册插件时，我们通过 `createPopupPlus()` 方法创建插件核心实例，该方法接受一个可选的对象作为初始化配置选项，用于配置插件全局的行为。

::: warning
初始化配置作为 `全局配置` ，会影响所有弹出层的行为。
:::

## 设置初始层级

通过 `zIndex` 配置项可以设置全局起始 `z-index` 值，默认值为 `1000`。

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 自定义全局起始 z-index 值
	zIndex: 2468,
})
```

作为全局起始的 `z-index` 值，所有的弹出层如果自身不指定的 `zIndex` ，则会从该值开始递增。

## 自动禁用滚动条

通过 `autoDisableScroll` 配置项可以全局控制所有的弹出层在弹出期间，是否自动禁用滚动条，默认值为 `true`。

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 关闭自动禁用滚动条
	autoDisableScroll: false,
})
```

::: tip
`autoDisableScroll` 配置项仅对 `body` 元素的滚动条生效，如果其样式的 `overflow` 属性已经设置为 `hidden` ，则不会生效，因为自动禁用滚动条的原理是先获取当前 `body` 元素的 `overflow` 属性值作为备份，然后将其设置为 `hidden` ，待弹出层销毁后，再将其恢复为备份值。
:::

## 自定义挂载属性

对于 **选项式 API** 来说，弹出层控制器默认会作为 `$popup` 属性挂载到组件实例上，你可以通过 `this.$popup` 来访问弹出层控制器。

如果需要自定义挂载属性名，你可以通过 `prototypeName` 配置项来设置，默认值为 `$popup`。

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 自定义挂载属性名
	prototypeName: '$customPopup',
})
```

修改后对于使用 **选项式 API** 的组件，可以通过 `this.$customPopup` 来访问弹出层控制器。

```js [Vue]
export default {
	methods: {
		handlePopup() {
			this.$customPopup.render({
				component: () => import('./HelloPopup.vue'),
			})
		},
	},
}
```

如果使用 `TypeScript` ，则需要手动维护 **Vue 自定义属性** 的类型：

```ts [main.ts]
declare module 'vue' {
	import { type IController } from 'vue-popup-plus'
	interface ComponentCustomProperties {
		$customPopup: IController
	}
}
```

## 开启调试模式

通过 `debugMode` 配置项可以开启调试模式，默认值为 `false`。

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 开启调试模式
	debugMode: true,
})
```

开启调试模式后，在未使用 `PopupRoot` 根组件的情况下，所有的弹出层将以独立 `Vue App 实例` 的方式渲染，方便开发者通过 `Vue DevTools` 来调试弹出层组件。

同时开启调试模式，会在控制台输出弹出层的详细日志信息，极大地 **提升开发体验**。

## 日志过滤

开启调试模式后，会在控制台输出弹出层的详细日志信息，包括弹出层的创建、销毁、更新等操作。

但过于详尽的日志有时候会对开发者造成干扰，如果只希望打印一些较为关键的日志操作，例如只打印警告和错误日志，你可以通过 `logFilter` 配置项来过滤日志信息。

```ts [main.ts]
import { createPopupPlus, LogType } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 自定义日志过滤器
	logFilter: (log) => {
		// 只有警告和错误日志才会 return true ，表示允许打印
		return [LogType.warning, LogType.error].includes(log.type)
	},
})
```

## 自定义日志处理函数

开启调试模式后，日志默认是在浏览器的控制台进行打印输出，如果你想自行处理日志信息，可以通过 `logHandler` 配置项来自定义日志的处理函数。

::: tip
当使用自定义日志处理函数时，日志过滤器依然有效，但控制台将不会再打印日志信息。
:::

```ts [main.ts]
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 自定义日志处理函数
	logHandler: (log) => {
		// 自行处理日志信息
	},
})
```

## 详细配置

具体的配置项，请参考 [核心 API - 核心实例 createPopupPlus()](/api/core#create-popup-plus)。
