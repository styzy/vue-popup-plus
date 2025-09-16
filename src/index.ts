import { createCore, getCore, type CoreOptions, type ICore } from './Core'
import { Controller, type IController } from './Controller'

export { type ICore as VuePopupPlus }
export { type CoreOptions as VuePopupPlusOptions } from './Core'
export { type IController as VuePopupPlusController } from './Controller'

export { version } from '../package.json'
export { ANIMATION_TYPES, COMPONENT_INJECT_KEYS } from './CONSTANTS'

/**
 * 创建一个弹出层控制器实例，该实例需要通过 app.use() 安装到Vue实例上才能使用
 * @param options 弹出层全局配置
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

declare module 'vue' {
	interface ComponentCustomProperties {
		$popup: IController
	}
}

