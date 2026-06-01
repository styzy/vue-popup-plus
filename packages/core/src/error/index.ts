import { type PopupLog } from '@core/log'

type ErrorOption =
	| {
			namespace: string
			caller: string
			message: string
	  }
	| PopupLog

export class PopupError extends Error {
	/**
	 * 弹出层错误类
	 *
	 * - 建议从 {@link PopupLog} 日志实例创建错误
	 * @param {ErrorOption} options 错误参数
	 * @example
	 * new PopupError(new PopupLog({
	 * 	type: PopupLogType.Error,
	 * 	caller: 'controller.render()',
	 * 	message: '弹出层渲染失败',
	 * }))
	 */
	constructor({ namespace, caller, message }: ErrorOption) {
		super()
		this.message = `[${namespace} error] ${caller}: ${message}`
	}
}
