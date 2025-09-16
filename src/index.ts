import { createCore, getCore, type CoreConfig } from './Core'
import { type PopupController } from './Controller'

export { version } from '../package.json'
export { POPUP_ANIMATIONS, POPUP_COMPONENT_INJECT_KEYS } from './CONSTANTS'

/**
 * 创建一个弹出层控制器实例，该实例需要通过 app.use() 安装到Vue实例上才能使用
 * @param options 弹出层核心配置
 * @returns 弹出层控制器实例
 */
export function createPopup(options?: CoreConfig): PopupController {
	return createCore(options).controller
}

/**
 * 获取弹出层控制器实例
 * @returns 弹出层控制器实例
 */
export function usePopup(): PopupController {
	return getCore().controller
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$popup: PopupController
	}
}

