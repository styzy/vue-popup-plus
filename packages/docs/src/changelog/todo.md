# 开发规划

## 核心

### `render()`

- <DVersionTodo version="1.6.0" level="high"/> 新增选项 `maskTransparent` ，设置透明遮罩
- <DVersionTodo version="1.6.0" level="medium"/> 优化选项 `maskClickClose` ，支持传入函数，接受一个 `(payload?: any)=>Promise<void>` 类型的异步函数，执行后关闭弹出层，可 `await` 执行等待关闭动画结束。

## 预置插件

### `plugin`

- <DVersionTodo version="1.6.0" level="high"/> 消息 `Message`
- <DVersionTodo version="1.6.0" level="high"/> 抽屉 `Drawer`

### `component`

- <DVersionTodo version="1.7.0" level="low"/> 公开组件 `PScaffold`
- <DVersionTodo version="1.7.0" level="low"/> 公开组件 `PHeader`
- <DVersionTodo version="1.7.0" level="low"/> 公开组件 `PBody`
- <DVersionTodo version="1.7.0" level="low"/> 公开组件 `PFooter`
