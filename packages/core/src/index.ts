import { createCore, type ICore } from './core'
import { type ConfigOption } from './config'
import { type IController } from './controller'
import './assets/styles/main.scss'
import { type InstanceId } from './instance'
import { Log, LogGroupItemType, LogType, printLog } from './log'
import type { ComputedStyle } from './typings'

export { POPUP_ANIMATIONS, type PopupCustomAnimations } from './animation'
export {
	usePopup,
	usePopupInstanceId,
	usePopupComputedStyle,
} from './composition-api'
export { type ConfigOption } from './config'
export {
	type ExtractComponentPropTypes,
	type IController,
	type MaskDestroyHandler,
	type Placement,
	type PopupCustomProperties,
	type RenderOption,
	type UpdateOption,
} from './controller'
export { type ICore } from './core'
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
export { version, type Version } from './version'
export { POPUP_COMPONENT_INJECTS } from './CONSTANTS'
export { default as PopupRoot } from './components/PopupRoot.vue'

/**
 * 创建弹出层插件
 *
 * - 通过 Vue 的 app.use() 函数安装插件
 *
 * @param options 插件配置，具体请参考 {@link ConfigOption}
 * @returns 弹出层插件
 *
 * @example
 * ```ts
 * import { createPopupPlus } from 'vue-popup-plus'
 *
 * // 创建插件实例
 * const PopupPlus = createPopupPlus()
 *
 * // 安装插件
 * app.use(PopupPlus)
 * ```
 */
export function createPopupPlus(options?: ConfigOption): ICore {
	const core = createCore(options)

	printLog(
		new Log({
			type: LogType.Success,
			caller: {
				name: 'createPopupPlus()',
				type: 'Function',
				value: createPopupPlus,
			},
			message: `创建弹出层核心 ${core.id} 成功`,
			group: [
				{
					type: LogGroupItemType.Data,
					title: '核心',
					dataName: core.id,
					dataType: 'ICore',
					dataValue: core,
				},
				{
					type: LogGroupItemType.Data,
					title: '调用参数',
					dataName: 'options',
					dataType: 'ConfigOption',
					dataValue: options,
				},
				{
					type: LogGroupItemType.Data,
					title: '合并参数',
					dataName: 'mergedOptions',
					dataType: 'ConfigOption',
					dataValue: core.config,
				},
			],
		})
	)
	return core
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$popup: IController
		$popupInstanceId: InstanceId | undefined
		$popupComputedStyle: ComputedStyle | undefined
	}
}
