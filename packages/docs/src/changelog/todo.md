---
pageClass: todo
outline: 2
---

# 版本规划

## 1.6.0

### 核心

#### `render()`

- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> 新增 `maskTransparent` 参数，用于设置是否启用透明遮罩层，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" finish /> 新增 `maskDestroy` 参数，用于设置遮罩层点击是否可以销毁弹出层，可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>` 类型的函数作为参数，执行后将销毁弹出层，可传入销毁携带的负载参数，返回的 `Promise` 对象会在弹出层销毁动画完成后 `resolve()` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" finish /> 移除 `maskClickClose` 参数，可使用功能更强大的 `maskDestroy` 参数代替。

### 预置插件

#### `plugin`

- <DVersionTodo version="1.6.0" level="high" author="STYZY"  /> 新增 `createPresetPlugin()` 方法，用于创建预置插件。
- <DVersionTodo version="1.6.0" level="high" author="Sakura" /> 新增 `Message 消息` 插件。
- <DVersionTodo version="1.6.0" level="high" author="HL" /> 新增 `Drawer 抽屉` 插件。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> 所有插件支持公共参数 `zIndex`。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> 所有插件支持全局配置参数默认值。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> `Loading 加载遮罩` 新增 `maskTransparent` 参数，用于设置加载遮罩是否透明，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" /> `Dialog 对话` 新增 `maskTransparent` 参数，用于设置是否启用透明遮罩层，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" finish /> `Dialog 对话` 新增 `maskClose` 参数，用于设置遮罩层点击是否可以关闭对话框，可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>` 类型的函数作为参数，执行后将关闭对话框，可传入关闭携带的负载参数，返回的 `Promise` 对象会在对话框关闭动画完成后 `resolve()` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" finish /> `Dialog 对话` 移除 `maskClickClose` 参数，可使用功能更强大的 `maskClose` 参数代替。

#### `component`

- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PScaffold`
- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PHeader`
- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PBody`
- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PFooter`
