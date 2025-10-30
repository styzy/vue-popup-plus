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
	popup.render({
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
			this.$popup.render({
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

`component` 选项用于指定弹出层渲染的组件，是唯一必填项，其他选项都是可选的。

具体的选项可以参考 [API popup.render()](/api/render)。

## 返回值

`render` 方法的返回值是弹出层的 `id` ，可以用来更新弹出层的渲染选项以及销毁弹出层。
