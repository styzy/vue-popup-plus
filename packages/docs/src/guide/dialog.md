# 对话 Dialog

一般用于展示 `复杂业务` ，例如数据列表、提交表单等。

::: tip
该弹出层支持 `Promise 风格` 调用，具体可以查看 [获取关闭携带参数](/guide/dialog#获取关闭携带参数)。
:::

## 基础使用

`对话 Dialog` 更像是对最基础的 `popup.render()` 方法的二次封装，提供了更多开箱即用的对话框功能。

和 `render` 方法一样，调用 `dialog` 方法并传入 `component` 属性可以弹出一个对话框，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleDialog">基础使用</DButton>
```

```ts
import HelloWorld from 'HelloWorld.vue'

function handleDialog() {
	popup.dialog({
		component: HelloWorld,
	})
}
```

:::

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

const popup = usePopup()

function handleDialog() {
	popup.dialog({
		component: HelloWorld,
	})
}
</script>
