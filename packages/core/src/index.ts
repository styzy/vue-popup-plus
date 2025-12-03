import { createCore, getCore, type CoreOption as CreateOption } from './core'
import { type IController } from './controller'
import { PopupError } from './error'
import './assets/style/main.styl'

export { POPUP_ANIMATIONS, type PopupCustomAnimations } from './animation'
export {
	type PopupCustomProperties,
	type RenderOption,
	type UpdateOption,
	type ExtractComponentProps,
} from './controller'
export { type CoreOption as CreateOption } from './core'
export { PopupError } from './error'
export { type InstanceId } from './instance'
export { definePlugin, type PopupPlugin } from './plugin'
export { POPUP_COMPONENT_INJECTS } from './CONSTANTS'
export { version } from '../package.json'

/**
 * 创建一个弹出层控制器实例
 *
 * - 该实例需要通过 app.use() 安装后才能使用
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
 * @returns 弹出层控制器实例
 */
export function usePopup(): IController {
	const core = getCore()

	if (!core)
		throw new PopupError(
			`调用 usePopup 前请先调用 createPopup 创建弹出层控制器实例`
		)

	return core.controller
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$popup: IController
	}
}

