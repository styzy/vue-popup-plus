---
pageClass: api
outline: 2
---

# 日志工具 API

::: tip
**Vue Popup Plus** 为开发者提供了完善的日志工具，特别是对于 `插件开发者` ，使用这些日志工具可以帮助其开发出稳定、可靠的插件。
:::

## printLog() <Badge text="1.5.0+" /> {#print-log}

> <DVersionSupport version="1.5.0" />

用于打印日志。

### 类型

```ts
function printLog(log: PopupLog): void
```

### 参数类型

具体可以参考 [核心 API - 日志工具 PopupLog](/api/log#log)。

### 详细信息

当核心实例的配置参数 `debugMode` 处于 `true` 状态时，调用该方法会打印日志到控制台。

### 示例

```ts
import { printLog, PopupLog } from 'vue-popup-plus'

// 创建日志实例
const log = new PopupLog({
	message: 'hello world',
})

// 打印日志
printLog(log)
```

## PopupLog <Badge text="1.5.0+" />

> <DVersionSupport version="1.5.0" />

用于创建日志实例。

### 类型

```ts
class PopupLog implements IPopupLog {
	constructor(options: PopupLogOption)
}
```

### 接口类型

```ts
interface IPopupLog {
	/**
	 * 命名空间
	 */
	namespace: string
	/**
	 * 类型
	 */
	type: PopupLogType
	/**
	 * 调用者
	 */
	caller: LogCaller
	/**
	 * 消息
	 */
	message: string
	/**
	 * 日志组
	 */
	group: PopupLogGroup
	/**
	 * 是否有调用者
	 */
	readonly hasCaller: boolean
	/**
	 * 是否有日志组
	 */
	readonly hasGroup: boolean
}

const PopupLogType = {
	/**
	 * 成功
	 */
	Success: 'success',
	/**
	 * 信息
	 */
	Info: 'info',
	/**
	 * 警告
	 */
	Warning: 'warning',
	/**
	 * 错误
	 */
	Error: 'error',
	/**
	 * 组件
	 */
	Component: 'component',
} as const

type PopupLogType = (typeof PopupLogType)[keyof typeof PopupLogType]

type LogCallerRecord = {
	/**
	 * 调用者名称
	 */
	name: string
	/**
	 * 调用者参考类型
	 *
	 * - 如不传，将自动设置为 any
	 */
	type?: string
	/**
	 * 调用者值
	 */
	value: any
}

type LogCaller = string | LogCallerRecord

/**
 * 日志组元素类型
 */
const PopupLogGroupItemType = {
	/**
	 * 消息类型
	 */
	Message: 'message',
	/**
	 * 信息类型
	 */
	Info: 'info',
	/**
	 * 数据类型
	 */
	Data: 'data',
	/**
	 * 组件类型
	 */
	Component: 'component',
} as const

type PopupLogGroupItemType =
	(typeof PopupLogGroupItemType)[keyof typeof PopupLogGroupItemType]

type LogGroupMessage = {
	/**
	 * 消息类型
	 */
	type: typeof PopupLogGroupItemType.Message
	/**
	 * 消息标题
	 */
	title?: string
	/**
	 * 消息内容
	 */
	content: string
}

type LogGroupInfo = {
	/**
	 * 信息类型
	 */
	type: typeof PopupLogGroupItemType.Info
	/**
	 * 信息标题
	 */
	title: string
	/**
	 * 信息内容
	 */
	content: string
	/**
	 * 是否重要信息
	 */
	important?: boolean
}

type LogGroupData = {
	/**
	 * 数据类型
	 */
	type: typeof PopupLogGroupItemType.Data
	/**
	 * 数据标题
	 */
	title: string
	/**
	 * 数据名称
	 */
	dataName?: string
	/**
	 * 数据值
	 */
	dataValue: any
	/**
	 * 数据参考类型
	 *
	 * - 如不传，将自动设置为 any
	 */
	dataType?: string
	/**
	 * 是否重要数据
	 */
	important?: boolean
}

type LogGroupComponent = {
	/**
	 * 组件类型
	 */
	type: typeof PopupLogGroupItemType.Component
	/**
	 * 组件标题
	 */
	title: string
	/**
	 * 组件实例
	 */
	instance?: ComponentInternalInstance | null
}

type LogGroupItem =
	| LogGroupMessage
	| LogGroupInfo
	| LogGroupData
	| LogGroupComponent

type PopupLogGroup = Array<LogGroupItem>
```

### 参数类型

```ts
type PopupLogOption = {
	/**
	 * 日志类型
	 */
	type?: PopupLogType
	/**
	 * 日志调用者
	 */
	caller?: LogCaller
	/**
	 * 日志消息
	 */
	message?: string
	/**
	 * 日志组
	 *
	 * - 用于在日志消息中展示多个数据项
	 */
	group?: PopupLogGroup
}
```

### 详细信息

通过 `PopupLog` 类可以创建满足大部分场景的日志信息，插件开发者可以指定日志的类型、调用者、消息和具体的数据项。

### 示例

这里以 `PopupPlus.use()` 函数安装插件成功时的日志信息为例（不包括具体实现，仅展示日志实例的创建过程）：

```ts
import {
	printLog,
	PopupLog,
	PopupLogType,
	PopupLogGroupItemType,
} from 'vue-popup-plus'
import { plugin } from 'vue-popup-plus-plugin-preset'

// 创建成功日志实例
const log = new PopupLog({
	type: PopupLogType.Success,
	caller: 'core.use()',
	group: [
		{
			type: PopupLogGroupItemType.Info,
			title: '插件名称',
			content: plugin.name,
		},
		{
			type: PopupLogGroupItemType.Info,
			title: '插件作者',
			content: plugin.author ?? '未知（可能存在安全风险）',
		},
		{
			type: PopupLogGroupItemType.Info,
			title: '插件要求最低核心版本',
			content: plugin.requiredCoreVersion?.min ?? '-',
			important: true,
		},
		{
			type: PopupLogGroupItemType.Info,
			title: '插件要求最高核心版本',
			content: plugin.requiredCoreVersion?.max ?? '-',
			important: true,
		},
		{
			type: PopupLogGroupItemType.Info,
			title: `插件版本校验`,
			content: `通过`,
			important: true,
		},
		{
			type: PopupLogGroupItemType.Data,
			title: '插件注册选项',
			dataName: 'options',
			dataValue: options,
		},
	],
})

// 打印日志
printLog(log)
```
