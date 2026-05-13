---
pageClass: todo
outline: 2
---

# 版本规划

## v1.8.0

### 预置插件

#### `plugin`

- <DVersionTodo version="1.8.0" level="high" author="STYZY" /> 新增 `ContextMenu 右键菜单` 插件。

#### `component`

- <DVersionTodo version="1.8.0" level="high" author="STYZY" /> 新增 `PopupContextMenu` 组件。

<!-- - <DVersionTodo version="1.8.0" level="low" author="STYZY" /> 公开组件 `PopupScaffold`
- <DVersionTodo version="1.8.0" level="low" author="STYZY" /> 公开组件 `PopupHeader`
- <DVersionTodo version="1.8.0" level="low" author="STYZY" /> 公开组件 `PopupBody`
- <DVersionTodo version="1.8.0" level="low" author="STYZY" /> 公开组件 `PopupFooter` -->

## v1.7.0

### 核心

#### `render()`

- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `viewport` 参数，用于设置弹出层的视口元素选择器，默认值为 `undefined` 。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `anchor` 参数，用于设置弹出层的锚点元素，默认值为 `undefined` 。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `anchorPlacement` 参数，用于设置锚点弹出层的位置，默认值为 `top` 。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `anchorFlip` 参数，用于设置锚点弹出层是否在空间不足时自动翻转，默认值为 `false` 。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `anchorFlipAdvance` 参数，用于设置锚点弹出层在空间不足时自动翻转的偏移量，默认值为 `0` 。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `anchorShift` 参数，用于设置锚点弹出层是否在空间不足时的自动平移方式，默认值为 `none` 。

#### `component`

- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `PopupAnchorTrigger` 组件。

#### `directive`

- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `v-popup` 指令，用于在元素上通过指令快速添加弹出层。

#### `other`

- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `createPopupDirective()` 工具函数，帮助插件开发者快速创建弹出层预置指令。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" done /> 新增 `PopupDirective<T, K>` 工具类型，帮助插件开发者快速定义弹出层预置指令类型。

### 预置插件

#### `plugin`

- <DVersionTodo version="1.6.0" level="high" author="STYZY" /> 新增 `Bubble 气泡` 插件。

#### `component`

- <DVersionTodo version="1.7.0" level="high" author="STYZY" /> 新增 `PopupAnchor` 组件。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" /> 新增 `PopupBubble` 组件。
- <DVersionTodo version="1.7.0" level="high" author="STYZY" /> 新增 `PopupTooltip` 组件。

## v1.6.1

### 核心

#### `createPopupPlus()`

- <DVersionTodo version="1.6.1" level="high" author="STYZY" done /> 修改 `zIndex` 参数，支持传入一个工厂函数，返回一个 `number` 类型的 `z-index` 值。

## v1.6.0

### 核心

#### `render()`

- <DVersionTodo version="1.6.0" level="high" author="STYZY" done /> 新增 `maskTransparent` 参数，用于设置是否启用透明遮罩层，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" done /> 新增 `maskDestroy` 参数，用于设置遮罩层点击是否可以销毁弹出层，可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>` 类型的函数作为参数，执行后将销毁弹出层，可传入销毁携带的负载参数，返回的 `Promise` 对象会在弹出层销毁动画完成后 `resolve()` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" done /> 移除 `maskClickClose` 参数，可使用功能更强大的 `maskDestroy` 参数代替。

### 预置插件

#### `plugin`

- <DVersionTodo version="1.6.0" level="high" author="HL" done /> 新增 `Drawer 抽屉` 插件。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" done /> 新增 `createPresetPlugin()` 方法，用于创建预置插件。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" done /> 所有插件支持公共参数 `zIndex`。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" done /> 所有插件支持全局配置参数默认值。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" done /> `Loading 加载遮罩` 新增 `maskTransparent` 参数，用于设置加载遮罩是否透明，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="high" author="STYZY" done /> `Dialog 对话` 新增 `maskTransparent` 参数，用于设置是否启用透明遮罩层，默认值为 `false` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" done /> `Dialog 对话` 新增 `maskClose` 参数，用于设置遮罩层点击是否可以关闭对话框，可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>` 类型的函数作为参数，执行后将关闭对话框，可传入关闭携带的负载参数，返回的 `Promise` 对象会在对话框关闭动画完成后 `resolve()` 。
- <DVersionTodo version="1.6.0" level="medium" author="STYZY" done /> `Dialog 对话` 移除 `maskClickClose` 参数，可使用功能更强大的 `maskClose` 参数代替。
