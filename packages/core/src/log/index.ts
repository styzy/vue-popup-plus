import type { ComponentInternalInstance } from 'vue'
import { typeOf, TypeEnum } from 'utils'
import { getCore } from '@core/core'
import { version } from '@core/version'

/**
 * 日志类型
 */
export const PopupLogType = {
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

export type PopupLogType = (typeof PopupLogType)[keyof typeof PopupLogType]

export type LogCallerRecord = {
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

export type LogCaller = string | LogCallerRecord

/**
 * 日志组元素类型
 */
export const PopupLogGroupItemType = {
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

export type PopupLogGroupItemType =
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

export type PopupLogGroup = Array<LogGroupItem>

export type PopupLogOption = {
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

export class PopupLog implements IPopupLog {
	namespace = 'VuePopupPlus'
	type: PopupLogType
	caller: LogCaller
	message: string
	group: PopupLogGroup
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
		type = PopupLogType.Info,
		caller = '',
		message = '',
		group = [],
	}: PopupLogOption = {}) {
		this.type = type
		this.caller = caller
		this.message = message
		this.group = group
	}
}

export interface PopupLogHandler {
	/**
	 * 日志处理函数
	 *
	 * @param log 日志实例
	 */
	(log: PopupLog): any
}

export type LogFilter = (log: PopupLog) => boolean

/**
 * 打印日志
 *
 * - 仅在开启调试模式时打印输出日志
 * @param log 日志实例
 * @returns
 */
export const printLog = ((log) => {
	const core = getCore()

	if (!core?.config.debugMode) return

	if (core?.config.logFilter?.(log) === false) return

	core.config.logHandler(log)
}) satisfies PopupLogHandler

const PRINTER_TEXT = {
	CORE_VERSION_KEY: '核心版本',
	CALLER_KEY: '调用者',
	DATA_VALUE_KEY: '数据值',
	DATA_TYPE_KEY: '参考类型',
	DATA_ACTUAL_TYPE_KEY: '实际类型',
	COMPONENT_PATH_KEY: '组件路径',
	COMPONENT_EDITOR_PATH_KEY: '唤起编辑器',
	COMPONENT_INSTANCE_KEY: '组件实例',
	COMPONENT_UNKNOWN_NAME: '未知',
	COMPONENT_UNKNOWN_PATH: '未知',
	COMPONENT_UNKNOWN_EDITOR_PATH: '未知',
	KEY_VALUE_CONNECTOR: '：',
	// NEXT_LINE_TIP: '👇👇👇👇👇👇',
	// NEXT_LINE_TIP: '↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴↴‌↴‌↴',
	NEXT_LINE_TIP: '👇 复杂数据换行查看 👇',
}

function isSimpleType(data: any) {
	return [
		TypeEnum.BigInt,
		TypeEnum.Number,
		TypeEnum.String,
		TypeEnum.Boolean,
		TypeEnum.Symbol,
		TypeEnum.Null,
		TypeEnum.Undefined,
	].includes(typeOf(data))
}

/**
 * 默认日志处理函数
 *
 * @param log 日志实例
 */
export const defaultPrintLog: PopupLogHandler = (log) => {
	const messageWithPrefixPrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Prefix,
		},
		{
			theme: log.type,
			style: PrinterStyle.Message,
		}
	)
	const plainDataPrinter = console.dir
	const groupStartWithPrefixPrinter = createPrinter(
		console.groupCollapsed,
		{ theme: log.type, style: PrinterStyle.Prefix },
		{
			theme: log.type,
			style: PrinterStyle.Message,
		}
	)
	const groupMessagePrinter = createPrinter(console.log, {
		theme: log.type,
		style: PrinterStyle.Message,
	})
	const groupMessageWithTitlePrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.Message,
		}
	)
	const groupInfoPrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.Info,
		}
	)
	const groupInfoImportantPrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.InfoImportant,
		}
	)
	const groupDataStartPrinter = createPrinter(
		console.groupCollapsed,
		{
			theme: log.type,
			style: PrinterStyle.Title,
			customStyle: 'margin-left: 0px;',
		},
		{
			theme: log.type,
			style: PrinterStyle.Data,
		}
	)
	const groupDataImportantStartPrinter = createPrinter(
		console.groupCollapsed,
		{
			theme: log.type,
			style: PrinterStyle.Title,
			customStyle: 'margin-left: 0px;',
		},
		{
			theme: log.type,
			style: PrinterStyle.DataImportant,
		}
	)
	const groupDataSimplePrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.Data,
		}
	)
	const groupDataImportantSimplePrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.DataImportant,
		}
	)
	const groupDataReferencePrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.Message,
		}
	)

	const groupComponentStartPrinter = createPrinter(
		console.groupCollapsed,
		{
			theme: PopupLogType.Component,
			style: PrinterStyle.Title,
			customStyle: 'margin-left: 0px;',
		},
		{
			theme: PopupLogType.Component,
			style: PrinterStyle.DataImportant,
		}
	)

	const groupComponentMessagePrinter = createPrinter(
		console.log,
		{
			theme: PopupLogType.Component,
			style: PrinterStyle.Title,
		},
		{
			theme: PopupLogType.Component,
			style: PrinterStyle.MessageImportant,
		}
	)

	const groupComponentDataPrinter = createPrinter(
		console.log,
		{
			theme: PopupLogType.Component,
			style: PrinterStyle.Title,
		},
		{
			theme: PopupLogType.Component,
			style: PrinterStyle.Data,
		}
	)

	const groupComponentUnknownPrinter = createPrinter(
		console.log,
		{
			theme: log.type,
			style: PrinterStyle.Title,
		},
		{
			theme: log.type,
			style: PrinterStyle.Data,
		}
	)

	const primaryPrefix = `${log.namespace} ${log.type.toUpperCase()}`
	const primaryMessage = log.message

	if (log.hasGroup) {
		groupStartWithPrefixPrinter(primaryPrefix, primaryMessage)

		const group = [...log.group]

		if (log.hasCaller) {
			if (typeof log.caller === 'string') {
				group.unshift({
					type: PopupLogGroupItemType.Info,
					title: PRINTER_TEXT.CALLER_KEY,
					content: log.caller,
					important: true,
				})
			} else {
				group.unshift({
					type: PopupLogGroupItemType.Data,
					title: PRINTER_TEXT.CALLER_KEY,
					dataName: log.caller.name,
					dataType: log.caller.type,
					dataValue: log.caller.value,
					important: true,
				})
			}
		}

		group.unshift({
			type: PopupLogGroupItemType.Info,
			title: PRINTER_TEXT.CORE_VERSION_KEY,
			content: version,
			important: true,
		})

		group.forEach((item) => {
			if (item.type === PopupLogGroupItemType.Message) {
				if (item.title) {
					groupMessageWithTitlePrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						item.content
					)
				} else {
					groupMessagePrinter(item.content)
				}
			} else if (item.type === PopupLogGroupItemType.Info) {
				if (item.important) {
					groupInfoImportantPrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						item.content
					)
				} else {
					groupInfoPrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						item.content
					)
				}
			} else if (item.type === PopupLogGroupItemType.Data) {
				const isSimple = isSimpleType(item.dataValue)

				if (item.important) {
					groupDataImportantStartPrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						isSimple
							? formatData(item.dataValue)
							: item.dataName || item.dataValue
					)
				} else {
					groupDataStartPrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						isSimple
							? formatData(item.dataValue)
							: item.dataName || item.dataValue
					)
				}
				// if (item.dataName) {
				// 	groupDataSimplePrinter(
				// 		`数据名称${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
				// 		item.dataName
				// 	)
				// }
				groupDataSimplePrinter(
					`${PRINTER_TEXT.DATA_TYPE_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
					item.dataType || 'any'
				)
				groupDataSimplePrinter(
					`${PRINTER_TEXT.DATA_ACTUAL_TYPE_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
					typeOf(item.dataValue)
				)
				if (isSimple) {
					if (item.important) {
						groupDataImportantSimplePrinter(
							`${PRINTER_TEXT.DATA_VALUE_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
							formatData(item.dataValue)
						)
					} else {
						groupDataSimplePrinter(
							`${PRINTER_TEXT.DATA_VALUE_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
							formatData(item.dataValue)
						)
					}
				} else {
					groupDataReferencePrinter(
						`${PRINTER_TEXT.DATA_VALUE_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						PRINTER_TEXT.NEXT_LINE_TIP
					)
					plainDataPrinter(item.dataValue)
				}
				console.groupEnd()
			} else if (item.type === PopupLogGroupItemType.Component) {
				if (item.instance) {
					const name =
						item.instance.type?.name ||
						item.instance.type?.__name ||
						PRINTER_TEXT.COMPONENT_UNKNOWN_NAME
					const file = item.instance.type?.__file
					const path = file || PRINTER_TEXT.COMPONENT_UNKNOWN_PATH
					const editorPath = file
						? `vscode://${file}`
						: PRINTER_TEXT.COMPONENT_UNKNOWN_EDITOR_PATH

					groupComponentStartPrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						name
					)
					groupComponentMessagePrinter(
						`${PRINTER_TEXT.COMPONENT_PATH_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						path
					)
					groupComponentMessagePrinter(
						`${PRINTER_TEXT.COMPONENT_EDITOR_PATH_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						editorPath
					)
					groupComponentDataPrinter(
						`${PRINTER_TEXT.COMPONENT_INSTANCE_KEY}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						PRINTER_TEXT.NEXT_LINE_TIP
					)
					plainDataPrinter(item.instance)
					console.groupEnd()
				} else {
					groupComponentUnknownPrinter(
						`${item.title}${PRINTER_TEXT.KEY_VALUE_CONNECTOR}`,
						PRINTER_TEXT.COMPONENT_UNKNOWN_NAME
					)
				}
			}
		})
		console.groupEnd()
	} else {
		messageWithPrefixPrinter(primaryPrefix, primaryMessage)
	}
}

function formatData(value: any) {
	if (typeof value === 'string') return `'${value}'`

	if (value === null) return 'null'
	if (value === undefined) return 'undefined'
	return value
}

const COLOR_TYPE_MAP = {
	[PopupLogType.Success]: '#4caf50',
	[PopupLogType.Info]: '#3499fe',
	[PopupLogType.Warning]: '#e6a23c',
	[PopupLogType.Error]: '#f56c6c',
	[PopupLogType.Component]: '#42b883',
}

const enum PrinterStyle {
	Prefix = 'prefix',
	Message = 'message',
	MessageImportant = 'messageImportant',
	Title = 'title',
	Info = 'info',
	InfoImportant = 'infoImportant',
	Data = 'data',
	DataImportant = 'dataImportant',
}

type PrinterOption = {
	theme: PopupLogType
	style: PrinterStyle
	customStyle?: string
}

interface ICreatePrinter {
	<T extends PrinterOption[]>(
		printer: (...args: any[]) => void,
		...styleOptions: T
	): (
		...args: {
			[K in keyof T]: string
		}
	) => void
}

const createPrinter: ICreatePrinter = function (printer, ...styleOptions) {
	const baseStyle = `font-family:
	Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
	'Microsoft YaHei', '微软雅黑', Arial, sans-serif;`

	const styleList = styleOptions.map(({ theme, style, customStyle }) => {
		const color = COLOR_TYPE_MAP[theme]

		const prefixStyle =
			baseStyle +
			`color: #FFFFFF;` +
			`background-color: ${color};` +
			`padding: 4px 8px;` +
			`margin-right: 8px;` +
			`border-radius: 4px;` +
			`font-weight: 700;`

		const messageStyle =
			baseStyle +
			`background-color: ${color}22;` +
			`padding: 4px 6px;` +
			`border-radius: 4px;` +
			`font-weight: 400;`

		const messageImportantStyle = messageStyle + `color: ${color};`

		const titleStyle =
			baseStyle +
			`margin-left: 4px;` +
			`padding: 4px 4px;` +
			`border-radius: 4px;` +
			`font-weight: 400;`

		const infoStyle =
			baseStyle +
			`background-color: ${color}22;` +
			`padding: 4px 6px;` +
			`border-radius: 4px;` +
			`font-weight: 700;`

		const infoImportantStyle = infoStyle + `color: ${color};`

		const dataStyle =
			baseStyle +
			`background-color: ${color}22;` +
			`padding: 4px 8px;` +
			`border-radius: 4px;` +
			`font-weight: 700;`

		const dataImportantStyle = dataStyle + `color: ${color};`

		switch (style) {
			case PrinterStyle.Prefix:
				return prefixStyle + customStyle
			case PrinterStyle.Message:
			default:
				return messageStyle + customStyle
			case PrinterStyle.MessageImportant:
				return messageImportantStyle + customStyle
			case PrinterStyle.Title:
				return titleStyle + customStyle
			case PrinterStyle.Info:
				return infoStyle + customStyle
			case PrinterStyle.InfoImportant:
				return infoImportantStyle + customStyle
			case PrinterStyle.Data:
				return dataStyle + customStyle
			case PrinterStyle.DataImportant:
				return dataImportantStyle + customStyle
		}
	})

	return (...messages) => {
		printer(`%c${messages.join('%c')}`, ...styleList)
	}
}
