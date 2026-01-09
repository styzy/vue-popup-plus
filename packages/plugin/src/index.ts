import {
	version as coreVersion,
	definePlugin,
	LogGroupItemType,
	LogType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from './log'
import { album, type IAlbum } from './plugins/album'
import { alert, type IAlert } from './plugins/alert'
import { confirm, type IConfirm } from './plugins/confirm'
import { dialog, type IDialog } from './plugins/dialog'
import { loading, type ILoading } from './plugins/loading'
import { prompt, type IPrompt } from './plugins/prompt'
import { toast, type IToast } from './plugins/toast'
import type { GlobalPluginOption } from './typings'

import './assets/styles/main.scss'

export { type Skin } from './skin'
export { version } from './version'
export type { IAlbum, IAlert, IConfirm, IDialog, ILoading, IPrompt, IToast }

/**
 * @deprecated 从 1.6.0 开始，推荐使用 {@link createPresetPlugin} 来创建预置插件
 *
 * - 将在 1.7.0 移除
 */
export const plugin = definePlugin({
	name: 'plugin-preset',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install(config, { skin = 'modern' }: GlobalPluginOption = {}) {
		const options = { skin }

		album.install(config, options)
		alert.install(config, options)
		confirm.install(config, options)
		dialog.install(config, options)
		loading.install(config, options)
		prompt.install(config, options)
		toast.install(config, options)
	},
})

export type PresetPluginOption = GlobalPluginOption & {}

/**
 * 创建预置插件
 *
 * - 可全局定义默认皮肤
 * - 可全局配置所有子插件的默认参数
 */
export function createPresetPlugin(options?: PresetPluginOption) {
	const { skin = 'modern' } = options || {}

	return definePlugin({
		name: 'plugin-preset',
		author: 'STYZY',
		requiredCoreVersion: {
			min: coreVersion,
			max: coreVersion,
		},
		install(config) {
			album.install(config, { skin })
			alert.install(config, { skin })
			confirm.install(config, { skin })
			dialog.install(config, { skin })
			loading.install(config, { skin })
			prompt.install(config, { skin })
			toast.install(config, { skin })

			printLog(
				new PluginLog({
					type: LogType.Success,
					caller: {
						name: 'createPlugin()',
						type: 'Function',
						value: createPresetPlugin,
					},
					message: '创建预置插件 plugin-preset 成功',
					group: [
						{
							type: LogGroupItemType.Info,
							title: '皮肤',
							content:
								skin === 'modern'
									? 'modern 现代'
									: 'classic 经典',
						},
						{
							type: LogGroupItemType.Data,
							title: '调用参数',
							dataName: 'options',
							dataType: 'PresetPluginOption',
							dataValue: options,
						},
					],
				})
			)
		},
	})
}
