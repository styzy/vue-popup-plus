import { type PopupConfigOption } from './config'
import { createCore, type PopupCore } from './core'
import { PopupLog, PopupLogGroupItemType, PopupLogType, printLog } from './log'

import './assets/styles/main.scss'

export { POPUP_ANIMATIONS, type PopupCustomAnimations } from './animation'
export { type PopupConfigOption } from './config'
export {
	PopupAnchorTrigger,
	type PopupAnchorTriggerEmits,
	type PopupAnchorTriggerProps,
	type PopupAnchorTriggerSlots,
} from './components'
export {
	type PopupController,
	type PopupMaskDestroyHandler,
	type PopupPlacement,
	type PopupAnchorPlacement,
	type PopupAnchorShift,
	type PopupCustomProperties,
	type PopupRenderOption,
	type PopupUpdateOption,
} from './controller'
export { type PopupCore } from './core'
export {
	createPopupDirective,
	type PopupDirective,
	type PopupDirectiveCreator,
} from './directive'
export { usePopup, usePopupInstanceId, usePopupComputedStyle } from './hooks'
export { type PopupInstanceId } from './instance'
export {
	printLog,
	PopupLog,
	PopupLogType,
	PopupLogGroupItemType,
	type PopupLogHandler,
	type PopupLogOption,
	type PopupLogGroup,
} from './log'
export { definePlugin, type PopupPlugin } from './plugin'
export type { ExtractComponentPropTypes } from './typings'
export { version, type PopupVersion } from './version'
export { POPUP_COMPONENT_INJECTS } from './CONSTANTS'
export { default as PopupRoot } from './components/PopupRoot.vue'

/**
 * 创建弹出层插件
 *
 * - 通过 Vue 的 app.use() 函数安装插件
 *
 * @param options 插件配置，具体请参考 {@link PopupConfigOption}
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
export function createPopupPlus(options?: PopupConfigOption): PopupCore {
	const core = createCore(options)

	printLog(
		new PopupLog({
			type: PopupLogType.Success,
			caller: {
				name: 'createPopupPlus()',
				type: 'Function',
				value: createPopupPlus,
			},
			message: `创建弹出层核心 ${core.id} 成功`,
			group: [
				{
					type: PopupLogGroupItemType.Data,
					title: '核心',
					dataName: core.id,
					dataType: 'PopupCore',
					dataValue: core,
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '调用参数',
					dataName: 'options',
					dataType: 'PopupConfigOption',
					dataValue: options,
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '合并参数',
					dataName: 'mergedOptions',
					dataType: 'PopupConfigOption',
					dataValue: core.config,
				},
			],
		})
	)
	return core
}
