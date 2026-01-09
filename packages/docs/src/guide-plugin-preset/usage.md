# 使用说明

## 基础用法

当你安装预置插件并且成功注册后，预置插件会自动扩展控制器实例 `popup` 对象，因此你可以像使用 `popup.render()` 方法一样使用预置插件的方法，例如：

```ts
// 调用 Toast 轻量提示
popup.toast('这是一条 Toast 提示')

// 调用 Dialog 对话
popup.dialog({
	component: () => import('./HelloWorld.vue'),
})
```

## 类型支持

预置插件提供了完整的类型声明，保证了对 `ts` 的完全类型支持，因此你无需进行任何额外的类型声明。

## 功能清单

预置插件提供了开箱即用的功能，包括：

- [Toast 轻量提示](/guide-plugin-preset/toast)
- [Message 消息](/guide-plugin-preset/message)
- [Alert 提示](/guide-plugin-preset/alert)
- [Confirm 确认](/guide-plugin-preset/confirm)
- [Prompt 提示输入](/guide-plugin-preset/prompt)
- [Dialog 对话](/guide-plugin-preset/dialog)
- [Drawer 抽屉](/guide-plugin-preset/drawer)
- [Loading 加载遮罩](/guide-plugin-preset/loading)
- [Album 媒体相册](/guide-plugin-preset/album)
