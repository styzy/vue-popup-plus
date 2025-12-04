import { type ILog } from '../log'

type ErrorOption =
	| {
			namespace: string
			caller: string
			message: string
	  }
	| ILog

export class PopupError extends Error {
	/**
	 * 弹出层错误类
	 *
	 * - 建议从 {@link ILog} 日志实例创建错误
	 * @param {ErrorOption} options 错误参数
	 * @example
	 * new PopupError(new Log({
	 * 	type: LogType.Error,
	 * 	caller: 'controller.render()',
	 * 	message: '弹出层渲染失败',
	 * }))
	 */
	constructor({ namespace, caller, message }: ErrorOption) {
		super()
		this.message = `[${namespace} error] ${caller}: ${message}`
	}
}

