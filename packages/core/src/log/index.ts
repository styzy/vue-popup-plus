import { typeOf } from 'utils'
import { getCore } from '../core'
import { version } from '../version'

/**
 * 日志类型
 */
export const LogType = {
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

export type LogType = (typeof LogType)[keyof typeof LogType]

/**
 * 日志组元素类型
 */
export const LogGroupItemType = {
	/**
	 * 默认类型
	 */
	Default: 'default',
	/**
	 * 信息类型
	 */
	Info: 'info',
	/**
	 * 数据类型
	 */
	Data: 'data',
} as const

export type LogGroupItemType =
	(typeof LogGroupItemType)[keyof typeof LogGroupItemType]

type LogGroupDefaultItem = {
	/**
	 * 组元素类型
	 */
	type: typeof LogGroupItemType.Default
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

export type LogGroup = Array<LogGroupItem>

export type LogOption = {
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

export interface ILog {
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
	readonly hasCaller: boolean
	/**
	 * 是否有日志组
	 */
	readonly hasGroup: boolean
}

export class Log implements ILog {
	namespace = 'VuePopupPlus'
	type: LogType
	caller: string
	message: string
	group: LogGroup
	get hasCaller() {
		return !!this.caller
	}
	get hasGroup() {
		return !!this.group.length
	}
	/**
	 * 创建日志实例
	 *
	 * @param type 日志类型
	 * @param name 日志名称
	 * @param message 日志消息
	 * @param group 日志组
	 * @returns 日志实例
	 */
	constructor({
		type = LogType.Info,
		caller = '',
		message = '',
		group = [],
	}: LogOption = {}) {
		this.type = type
		this.caller = caller
		this.message = message
		this.group = group

		this.group.unshift({
			type: LogGroupItemType.Default,
			message: `核心版本: ${version}`,
		})

		if (this.hasCaller) {
			this.group.unshift({
				type: LogGroupItemType.Default,
				message: `调用者: ${this.caller}`,
			})
		}
	}
}

export interface ILogHandler {
	/**
	 * 日志处理函数
	 *
	 * @param log 日志实例
	 */
	(log: ILog): any
}

/**
 * 打印日志
 *
 * - 仅在开启调试模式时打印输出日志
 * @param log 日志实例
 * @returns
 */
export const printLog: ILogHandler = (log) => {
	const core = getCore()

	if (!core?.config.debugMode) return

	core.config.logHandler(log)
}

/**
 * 默认日志处理函数
 *
 * @param log 日志实例
 */
export const defaultPrintLog: ILogHandler = (log) => {
	const groupPinterWithPrefix = withStyle({
		printer: console.groupCollapsed,
		type: log.type,
		hasPrefix: true,
	})
	const groupPrinter = withStyle({
		printer: console.log,
		type: log.type,
		isGroupContent: true,
	})
	const printerWithPrefix = withStyle({
		printer: getPrinter(log.type),
		type: log.type,
		hasPrefix: true,
	})

	const primaryPrefix = `${log.namespace} ${log.type.toUpperCase()}`
	const primaryMessage = log.message

	if (log.hasGroup) {
		groupPinterWithPrefix(primaryPrefix, primaryMessage)
		log.group?.forEach((item, index) => {
			const isCallerItem = index === 0 && log.hasCaller

			if (isCallerItem) {
				const callerItem = item as LogGroupDefaultItem
				const callerStyle = ''
				groupPrinter(callerItem.message, callerStyle)
			} else {
				if (
					item.type === undefined ||
					item.type === LogGroupItemType.Default
				) {
					groupPrinter(item.message)
				} else if (item.type === LogGroupItemType.Info) {
					groupPrinter(item.title)
					if (item.content) {
						groupPrinter(item.content)
					}
					if (item.data) {
						console.dir(item.data)
					}
				} else if (item.type === LogGroupItemType.Data) {
					// groupPrinter(
					// 	`数据名称: ${item.dataName} | 约束类型: ${item.dataType ?? 'any'} | 实际类型: ${typeOf(item.dataValue)}`
					// )
					groupPrinter(
						`${item.dataName} : ${item.dataType ?? 'any'} ( ${typeOf(item.dataValue)} )`,
						'font-weight: 700;'
					)
					console.dir(item.dataValue)
				}
			}
		})
		console.groupEnd()
	} else {
		printerWithPrefix(primaryPrefix, primaryMessage)
	}
}

function getPrinter(type: LogType) {
	switch (type) {
		case LogType.Success:
			return console.log
		case LogType.Info:
		default:
			return console.log
		case LogType.Warning:
			return console.warn
		case LogType.Error:
			return console.error
	}
}

const COLOR_TYPE_MAP = {
	[LogType.Success]: '#4caf50',
	[LogType.Info]: '#3499fe',
	[LogType.Warning]: '#e6a23c',
	[LogType.Error]: '#f56c6c',
}

type IWithStyleOption = {
	printer: (...args: any[]) => void
	type: LogType
	hasPrefix?: boolean
	isGroupContent?: boolean
}

interface IWithStyle {
	(
		options: IWithStyleOption & { hasPrefix: true }
	): (prefix: string, message: string, customStyle?: string) => void
	(options: IWithStyleOption): (message: string, customStyle?: string) => void
}

const withStyle: IWithStyle = function ({
	printer,
	type,
	hasPrefix = false,
	isGroupContent = false,
}) {
	const color = COLOR_TYPE_MAP[type]

	const baseStyle = `font-family:
		Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
		'Microsoft YaHei', '微软雅黑', Arial, sans-serif;`

	const prefixStyle =
		baseStyle +
		`color: #FFFFFF;` +
		`background-color: ${color};` +
		`padding: 4px 8px;` +
		`margin-right: 6px;` +
		`border-radius: 4px;` +
		`font-weight: 700;`

	const contentStyle =
		baseStyle +
		`background-color: ${color}22;` +
		`padding: 4px 8px;` +
		`border-radius: 4px;` +
		`font-weight: 400;`

	const groupContentStyle =
		baseStyle +
		`color: ${color};` +
		`background-color: ${color}22;` +
		`padding: 4px 8px;` +
		`border-radius: 4px;` +
		`font-weight: 400;`

	return (
		hasPrefix
			? (prefix: string, message: string, customStyle: string = '') => {
					printer(
						`%c${prefix}%c${message}`,
						prefixStyle,
						(isGroupContent ? groupContentStyle : contentStyle) +
							customStyle
					)
				}
			: (message: string, customStyle: string = '') => {
					printer(
						`%c${message}`,
						(isGroupContent ? groupContentStyle : contentStyle) +
							customStyle
					)
				}
	) as (message: string, customStyle?: string) => void
}
