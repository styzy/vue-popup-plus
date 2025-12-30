---
pageClass: api
outline: 2
---

# 日志工具 API

::: tip
**Vue Popup Plus** 为开发者提供了完善的日志工具，特别是对于 `插件开发者` ，使用这些日志工具可以帮助其开发出稳定、可靠的插件。
:::

## printLog() <Badge type="tip" text="1.5.0+" /> {#print-log}

> <DVersionSupport version="1.5.0" />

用于打印日志。

### 类型

```ts
function printLog(log: ILog): void
```

### 参数类型

具体可以参考 [核心 API - 日志工具 Log](/api/log#log)。

### 详细信息

当核心实例的配置参数 `debugMode` 处于 `true` 状态时，调用该方法会打印日志到控制台。

### 示例

```ts
import { printLog, Log } from 'vue-popup-plus'

// 创建日志实例
const log = new Log({
	message: 'hello world',
})

// 打印日志
printLog(log)
```

## Log <Badge type="tip" text="1.5.0+" />

> <DVersionSupport version="1.5.0" />

用于创建日志实例。

### 类型

```ts
class Log implements ILog {
	constructor(options: LogOption)
}
```

### 接口类型

```ts
interface ILog {
	/**
	 * 命名空间
	 */
	namespace: string
	/**
	 * 类型
	 */
	type: LogType
	/**
	 * 调用者
	 */
	caller: string
	/**
	 * 消息
	 */
	message: string
	/**
	 * 日志组
	 */
	group: LogGroup
	/**
	 * 是否有调用者
	 */
	readonly hasCaller: boolean
	/**
	 * 是否有日志组
	 */
	readonly hasGroup: boolean
}

const LogType = {
	/**
	 * 成功日志
	 */
	Success: 'success',
	/**
	 * 信息日志
	 */
	Info: 'info',
	/**
	 * 警告日志
	 */
	Warning: 'warning',
	/**
	 * 错误日志
	 */
	Error: 'error',
} as const

type LogType = (typeof LogType)[keyof typeof LogType]

/**
 * 日志组元素类型
 */
const LogGroupItemType = {
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
} as const

type LogGroupItemType = (typeof LogGroupItemType)[keyof typeof LogGroupItemType]

type LogGroupDefaultItem = {
	/**
	 * 组元素类型
	 */
	type?: typeof LogGroupItemType.Message
	/**
	 * 组元素消息
	 */
	message: string
}

type LogGroupInfoItem = {
	/**
	 * 信息组元素类型
	 */
	type: typeof LogGroupItemType.Info
	/**
	 * 信息组元素标题
	 */
	title: string
	/**
	 * 信息组元素内容
	 */
	content?: string
	/**
	 * 信息组元素数据
	 */
	data?: any
}

type LogGroupDataItem = {
	/**
	 * 数据组元素类型
	 */
	type: typeof LogGroupItemType.Data
	/**
	 * 数据项名称
	 */
	dataName: string
	/**
	 * 数据项值
	 */
	dataValue: any
	/**
	 * 数据项约束类型
	 *
	 * - 如不传，将自动设置为 any
	 */
	dataType?: string
}

type LogGroupItem = LogGroupDefaultItem | LogGroupDataItem | LogGroupInfoItem

type LogGroup = Array<LogGroupItem>
```

### 参数类型

```ts
type LogOption = {
	/**
	 * 日志类型
	 */
	type?: LogType
	/**
	 * 日志调用者
	 */
	caller?: string
	/**
	 * 日志消息
	 */
	message?: string
	/**
	 * 日志组
	 *
	 * - 用于在日志消息中展示多个数据项
	 */
	group?: LogGroup
}
```

### 详细信息

通过 `Log` 类可以创建满足大部分场景的日志信息，插件开发者可以指定日志的类型、调用者、消息和具体的数据项。

### 示例

这里以 `PopupPlus.use()` 函数安装插件成功时的日志信息为例（不包括具体实现，仅展示日志实例的创建过程）：

```ts
import { printLog, Log, LogType, LogGroupItemType } from 'vue-popup-plus'
import { plugin } from 'vue-popup-plus-plugin-preset'

// 创建成功日志实例
const log = new Log({
	type: LogType.Success,
	caller: 'core.use()',
	group: [
		{
			type: LogGroupItemType.Info,
			title: '插件名称',
			content: plugin.name,
		},
		{
			type: LogGroupItemType.Info,
			title: '插件作者',
			content: plugin.author ?? '未知（可能存在安全风险）',
		},
		{
			type: LogGroupItemType.Info,
			title: '插件要求最低核心版本',
			content: plugin.requiredCoreVersion?.min ?? '-',
		},
		{
			type: LogGroupItemType.Info,
			title: '插件要求最高核心版本',
			content: plugin.requiredCoreVersion?.max ?? '-',
		},
		{
			type: LogGroupItemType.Info,
			title: `插件版本校验`,
			content: `通过`,
		},
		{
			type: LogGroupItemType.Info,
			title: '插件注册选项',
			data: options,
		},
	],
})

// 打印日志
printLog(log)
```
