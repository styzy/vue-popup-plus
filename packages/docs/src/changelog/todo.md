---
pageClass: todo
outline: 2
---

# 版本规划

## 1.6.0

### 核心

#### `render()`

- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> 新增选项 `maskTransparent` ，设置透明遮罩，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" /> 优化选项 `maskClickClose` ，支持传入函数，接受一个 `(payload?: any)=>Promise<void>` 类型的异步函数，执行后关闭弹出层，可 `await` 执行等待关闭动画结束。

### 预置插件

#### `plugin`

- <DVersionTodo version="1.6.0" level="high" author="Sakura" /> 新增 `Message 消息` 插件。
- <DVersionTodo version="1.6.0" level="high" author="HL" /> 新增 `Drawer 抽屉` 插件。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> 所有插件支持公共参数 `zIndex`。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" /> 所有插件支持全局配置参数默认值。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" finish /> `Loading 加载遮罩` 新增 `maskTransparent` 参数，用于设置加载遮罩是否透明，默认值为 `false` 。

#### `component`

- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PScaffold`
- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PHeader`
- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PBody`
- <DVersionTodo version="1.7.0" level="low" author="STYZY" /> 公开组件 `PFooter`
