# 消息 Toast

一般用于弹出提示消息，例如操作成功、操作失败等。

## 基础使用

调用 `toast` 方法可以弹出一条消息，在屏幕居中显示。

```ts [Vue]
popup.toast('这是一条消息文本')
```

::: demo

```html
<DButton theme="primary">消息</DButton>
```

:::

## 持续时间

通过 `duration` 属性可以设置消息显示的持续时间，单位为毫秒，默认值为 `2000` 毫秒。

```ts [Vue]
popup.toast('这是一条持续5秒的消息文本', {
	duration: 5000,
})
```

## 更多配置

具体可以查看 [API popup.toast()](/api/toast)。
