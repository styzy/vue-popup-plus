import { type PopupConfigOption } from '@core/config'
import { createCore, type PopupCore } from '@core/core'
import {
	PopupLog,
	PopupLogGroupItemType,
	PopupLogType,
	printLog,
} from '@core/log'

import '@core/assets/styles/main.scss'

export { POPUP_ANIMATIONS, type PopupCustomAnimations } from '@core/animation'
export { type PopupConfigOption } from '@core/config'
export {
	PopupAnchorTrigger,
	PopupRoot,
	type PopupAnchorTriggerEmits,
	type PopupAnchorTriggerProps,
	type PopupAnchorTriggerSlots,
	type PopupRootProps,
	type PopupRootSlots,
} from '@core/components'
export {
	type PopupController,
	type PopupMaskDestroyHandler,
	type PopupPlacement,
	type PopupAnchorPlacement,
	type PopupAnchorShift,
	type PopupCustomProperties,
	type PopupRenderOption,
	type PopupUpdateOption,
} from '@core/controller'
export { createCore, type PopupCore } from '@core/core'
export {
	createPopupDirective,
	type PopupDirective,
	type PopupDirectiveCreator,
} from '@core/directive'
export {
	usePopup,
	usePopupInstanceId,
	usePopupComputedStyle,
} from '@core/hooks'
export { type PopupInstanceId } from '@core/instance'
export {
	printLog,
	PopupLog,
	PopupLogType,
	PopupLogGroupItemType,
	type PopupLogHandler,
	type PopupLogOption,
	type PopupLogGroup,
} from '@core/log'
export { definePlugin, type PopupPlugin } from '@core/plugin'
export type { ExtractComponentPropTypes } from '@core/typings'
export { version, type PopupVersion } from '@core/version'
export { POPUP_COMPONENT_INJECTS } from '@core/CONSTANTS'

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
