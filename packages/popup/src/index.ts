import { createCore, getCore, type CoreOptions } from './core'
import { type IController } from './controller'

export { type PopupCustomProperties } from './controller'
export { POPUP_ANIMATIONS, type PopupCustomAnimations } from './animation'
export { definePlugin, type IPluginWrappedController } from './plugin'
export { POPUP_COMPONENT_INJECTS } from './CONSTANTS'
export { version } from '../package.json'

/**
 * 创建一个弹出层控制器实例，该实例需要通过 app.use() 安装到Vue实例上才能使用
 * @param options 弹出层核心配置
 * @returns 弹出层控制器实例
 */
export function createPopup(options?: CoreOptions): IController {
	return createCore(options).controller
}

/**
 * 获取弹出层控制器实例
 * @returns 弹出层控制器实例
 */
export function usePopup(): IController {
	return getCore().controller
}

export interface ComponentCustomProperties {
	$popup: IController
}
