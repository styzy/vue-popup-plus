import { getCore } from '../core'

export const enum LogType {
	/**
	 * 信息日志
	 */
	Info = 'info',
	/**
	 * 警告日志
	 */
	Warn = 'warn',
	/**
	 * 错误日志
	 */
	Error = 'error',
}

export interface ILog {
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
}

export class Log implements ILog {
	type: LogType
	caller: string
	message: string
	/**
	 * 创建日志实例
	 * @param type 日志类型
	 * @param name 日志名称
	 * @param message 日志消息
	 * @returns 日志实例
	 */
	constructor(
		type: LogType = LogType.Info,
		caller: string,
		message: string = ''
	) {
		this.type = type
		this.caller = caller
		this.message = message
	}
}

export interface ILogHandler {
	/**
	 * 日志处理函数
	 * @param log 日志实例
	 */
	(log: Log): any
}

/**
 * 打印日志
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
 * @param log 日志实例
 */
export const defaultPrintLog: ILogHandler = (log) => {
	const printString = `[VuePupupPlus ${log.type}] ${log.caller}: ${log.message}`
	switch (log.type) {
		case LogType.Info:
		default:
			console.info(printString)
			break
		case LogType.Warn:
			console.warn(printString)
			break
		case LogType.Error:
			console.error(printString)
			break
	}
}
