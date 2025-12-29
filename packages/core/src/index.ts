import { createCore, type ICore as IPopup } from './core'
import { type ConfigOption } from './config'
import { type IController } from './controller'
import './assets/style/main.styl'

export { POPUP_ANIMATIONS, type PopupCustomAnimations } from './animation'
export { type ConfigOption } from './config'
export {
	type PopupCustomProperties,
	type RenderOption,
	type Placement,
	type UpdateOption,
	type ExtractComponentPropTypes,
} from './controller'
export { type InstanceId } from './instance'
export {
	printLog,
	Log,
	LogType,
	LogGroupItemType,
	type ILog,
	type ILogHandler,
	type LogOption,
	type LogGroup,
} from './log'
export { definePlugin, type PopupPlugin } from './plugin'
export { usePopup } from './use-api'
export { version, type Version } from './version'
export { POPUP_COMPONENT_INJECTS } from './CONSTANTS'
export { default as PopupRoot } from './components/PopupRoot.vue'

/**
 * 创建一个弹出层插件
 *
 * - 通过 Vue 的 app.use() 函数安装插件
 *
 * @param options 插件配置，具体请参考 {@link CreateOption}
 * @returns 弹出层插件
 */
export function createPopup(options?: ConfigOption): IPopup {
	return createCore(options)
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$popup: IController
	}
}
