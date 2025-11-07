# 提示 Alert

一般用于弹出用户 `需要关注` 的提示信息，例如关键信息、重要文本等。

::: tip
为了提升用户关注度，该弹出层使用了 `动态模糊` 背景遮罩。
:::

## 基础使用

调用 `alert` 方法可以弹出一条消息，在屏幕居中显示。

::: demo

```html
<DButton theme="primary" @click="handleAlert">提示</DButton>
```

```ts
function handleAlert() {
	popup.alert('这是一条提示信息')
}
```

:::

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handleAlert() {
	popup.alert('这是一条提示信息')
}
</script>
