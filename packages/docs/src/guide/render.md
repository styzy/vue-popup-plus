# 渲染弹出层

## 渲染

作为最核心的渲染功能，只需要调用弹出层控制器的 `render()` 方法即可。

::: code-group

```ts{9} [组合式 API ~vscode-icons:file-type-vue~]
import { usePopup } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

// 获取弹出层控制器
const popup = usePopup()

function handlePopup() {
	// 调用 render 方法渲染弹出层
	popup.render({
		// 弹出层渲染的组件
		component: HelloWorld,
	})
}
```

```ts{7} [选项式 API ~vscode-icons:file-type-vue~]
import HelloWorld from './HelloWorld.vue'

export default {
	methods: {
		handlePopup() {
			// 通过 this.$popup 访问弹出层控制器
			this.$popup.render({
				// 弹出层渲染的组件
				component: HelloWorld,
			})
		},
	},
}
```

:::

## 定义渲染组件

从上面的示例可以看到，我们调用 `render()` 方法的时候，传递了一个 `component` 渲染参数，该参数用于指定弹出层渲染的 `Vue` 组件，是 **_唯一必填_** 的参数。

所有符合 `Vue` 规范的组件都可以作为弹出层的渲染组件，包括 `同步组件` 、 `异步组件` 等。

## 渲染组件懒加载

我们 **_推荐_** 使用 `懒加载` 的方式引入渲染组件，因为该组件仅在 `render()` 方法被调用时才会真正渲染，考虑到构建时的 **代码体积** 以及 **页面渲染的性能** ，使用懒加载可以极大地减少用户等待的时间，提供更加流畅的用户体验。

和 `Vue` 官方的路由插件 `Vue Router` 一样，我们支持开箱即用的动态导入，而无需使用 `defineAsyncComponent` 函数。

```ts [Vue]
popup.render({
	component: () => import('./HelloWorld.vue'),
})
```

这样弹出层的渲染组件会被独立打包，并且仅在需要用到的时候才会被加载，从而提高页面加载速度。

## 给渲染组件传递参数

通过 `componentProps` 渲染参数，我们可以给渲染的组件传递 **属性** 以及 **事件监听函数**。

::: code-group

```ts [Parent.vue]
popup.render({
	component: () => import('./HelloWorld.vue'),
	componentProps: {
		// 传递 props 属性
		message: 'Hello World',
		// 传递事件监听函数
		onSubmit: () => {},
	},
})
```

```vue [HelloWorld.Vue]
<script lang="ts" setup>
type Props = {
	// 定义 message 属性
	message: string
}

const props = defineProps<Props>()

type Emits = {
	// 定义 submit 事件
	submit: []
}

const emit = defineEmits<Emits>()
</script>
```

:::

需要注意的是，遵从 `Vue 3` 的设计原理，所有的组件事件，都会被统一添加 `on` 前缀，例如 `submit` 事件，其监听函数的名称应该为 `onSubmit`。

## 渲染组件参数类型推导 <Badge type="tip" text="v1.5.0+" />

> <DVersionSupport version="1.5.0" />

如果你使用 `TypeScript` ，`componentProps` 渲染参数会自动根据所传入的组件进行类型推导，从而提供类型提示。

以上面的代码为例，`message` 属性的类型会被推导为 `string`，而 `onSubmit` 事件的类型会被推导为 `() => void`。

```ts [Parent.vue]
popup.render({
	component: () => import('./HelloWorld.vue'),
	componentProps: {
		// 只能够传递 string 类型的数据
		message: 'Hello World',
	},
})
```

## 更多渲染参数

除了 `component` 和 `componentProps` 参数，`render()` 方法支持包括 `功能` 和 `样式` 在内的非常多的渲染参数，下面将展示一些常用的渲染参数。

```ts [Vue]
popup.render({
	// 挂载回调函数
	onMounted: () => {},
	// 卸载回调函数，可携带参数
	onUnmounted: (payload) => {},
	// 是否渲染遮罩层
	mask: true,
	// 弹出层宽度，默认值为 auto，即自适应
	width: 'auto',
	// 弹出层高度，默认值为 auto，即自适应
	height: 'auto',
	// 弹出层位置，默认值为 center，即居中
	placement: 'center',
	// 弹出层 zIndex ，若不设置，则使用全局递增的 zIndex 值
	zIndex: 1234,
})
```

具体的渲染参数可以参考 [核心 API - 控制器实例 popup.render()](/api/controller#popup-render)。

## 返回值

`render` 方法的返回值是弹出层的 `id` ，可以用来 [更新弹出层的渲染参数](/guide/update) 以及 [销毁弹出层](/guide/destroy)。
