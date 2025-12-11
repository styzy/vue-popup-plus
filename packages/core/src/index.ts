import { createCore, getCore, type CoreOption as CreateOption } from './core'
import { type IController } from './controller'
import { defaultPrintLog, Log, LogType } from './log'
import { PopupError } from './error'
import './assets/style/main.styl'

export { POPUP_ANIMATIONS, type PopupCustomAnimations } from './animation'
export {
	type PopupCustomProperties,
	type RenderOption,
	type UpdateOption,
	type ExtractComponentPropTypes,
} from './controller'
export { type CoreOption as CreateOption } from './core'
export { PopupError } from './error'
export { type InstanceId } from './instance'
export {
	printLog,
	Log,
	LogType,
	LogGroupItemType,
	type ILog,
	type ILogHandler,
	type LogGroup,
} from './log'
export { definePlugin, type PopupPlugin } from './plugin'
export { POPUP_COMPONENT_INJECTS } from './CONSTANTS'
export { version, type Version } from './version'

/**
 * 创建一个弹出层控制器实例
 *
 * - 该实例需要被 Vue 的 app.use() 函数后才能使用
 *
 * @param options 创建配置，具体请参考 {@link CreateOption}
 * @returns 弹出层控制器实例
 */
export function createPopup(options?: CreateOption): IController {
	return createCore(options).controller
}

/**
 * 获取弹出层控制器实例
 *
 * - 必须先调用 {@link createPopup} 创建弹出层控制器实例，才能使用该函数
 * ，否则会抛出异常
 *
 * @returns 弹出层控制器实例
 */
export function usePopup(): IController {
	const core = getCore()

	if (!core) {
		const log = new Log({
			type: LogType.Error,
			caller: 'usePopup()',
			message: `调用 usePopup() 前请先调用 createPopup() 创建弹出层控制器实例`,
		})
		defaultPrintLog(log)
		throw new PopupError(log)
	}

	return core.controller
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$popup: IController
	}
}
