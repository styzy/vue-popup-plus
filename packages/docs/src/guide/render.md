# 渲染弹出层

## 渲染

作为最核心的渲染功能，只需要调用插件实例的 `render` 方法即可。

::: code-group

```html [Vue 组合式 API]
<script setup lang="ts">
// 组合式API 通过 usePopup 函数获取插件实例
import { usePopup } from 'vue-popup-plus'
import MyPopupComponent from './MyPopupComponent.vue'

// 获取插件实例
const popup = usePopup()

function handlePopup() {
	// 调用 render 方法渲染弹出层
	popup.render({ // [!code highlight]
		// 弹出层渲染的组件
		component: MyPopupComponent,
		// 弹出层渲染组件的 props
		componentProps: {
			title: 'Hello Vue Popup Plus',
		},
	})
}

```

```html [Vue 选项式 API]
<script lang="ts">
import MyPopupComponent from './MyPopupComponent.vue'

export default {
	methods: {
		handlePopup() {
			// 通过 this.$popup 访问插件实例
			this.$popup.render({ // [!code highlight]
				// 弹出层渲染的组件
				component: MyPopupComponent,
				// 弹出层渲染组件的 props
				componentProps: {
					title: 'Hello Vue Popup Plus',
				},
			})
		},
	},
}
<script>
```

:::

`component` 参数用于指定弹出层渲染的视图组件，是唯一必填项。

## 渲染视图组件懒加载

我们 `推荐使用懒加载` 的方式加载视图组件，因为弹出层的渲染视图组件仅在弹出层被触发渲染的时候才会真正渲染，考虑到构建时的代码体积以及页面渲染的性能，使用懒加载可以极大地减少用户等待的时间，提供更加流畅的用户体验。

和 `Vue` 官方的路由插件 `Vue Router` 一样，我们支持开箱即用的动态导入，而无需使用 `defineAsyncComponent` 函数。

```ts
popup.render({
	component: () => import('./MyPopupComponent.vue'),
})
```

这样弹出层的视图组件会被独立打包，并且仅在弹出层被触发渲染的时候才会被加载，而不是在页面加载时就被加载。

## 更多渲染参数

除了 `component` 参数，`render` 方法支持包括 `功能` 和 `样式` 在内的非常多的渲染参数，下面将展示一些常用的渲染参数。

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
	// 弹出层 zIndex ，若不设置，则使用全局递增的 zIndex 值
	zIndex: 1234,
})
```

具体的渲染参数可以参考 [API popup.render()](/api/render)。

## 返回值

`render` 方法的返回值是弹出层的 `id` ，可以用来 [更新弹出层的渲染参数](/guide/update) 以及 [销毁弹出层](/guide/destroy)。
