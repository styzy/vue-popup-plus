import {
	version as coreVersion,
	definePlugin,
	LogGroupItemType,
	LogType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from './log'
import { album, type AlbumConfig, type IAlbum } from './plugins/album'
import { alert, type AlertConfig, type IAlert } from './plugins/alert'
import { confirm, type ConfirmConfig, type IConfirm } from './plugins/confirm'
import { dialog, type DialogConfig, type IDialog } from './plugins/dialog'
import { loading, type ILoading, type LoadingConfig } from './plugins/loading'
import { prompt, type IPrompt, type PromptConfig } from './plugins/prompt'
import { toast, type IToast, type ToastConfig } from './plugins/toast'
import { type GlobalPluginConfig } from './typings'

import './assets/styles/main.scss'

export { type Skin } from './skin'
export { version } from './version'
export type { IAlbum, IAlert, IConfirm, IDialog, ILoading, IPrompt, IToast }

export type PresetPluginOption = GlobalPluginConfig & {
	/**
	 * 媒体相册 插件配置
	 */
	album?: AlbumConfig
	/**
	 * 提示 插件配置
	 */
	alert?: AlertConfig
	/**
	 * 确认 插件配置
	 */
	confirm?: ConfirmConfig
	/**
	 * 对话 插件配置
	 */
	dialog?: DialogConfig
	/**
	 * 加载遮罩 插件配置
	 */
	loading?: LoadingConfig
	/**
	 * 提示输入 插件配置
	 */
	prompt?: PromptConfig
	/**
	 * 轻量提示 插件配置
	 */
	toast?: ToastConfig
}

/**
 * 创建预置插件
 *
 * - 可全局定义默认皮肤
 * - 可全局配置所有子插件的默认参数
 */
export function createPresetPlugin(options?: PresetPluginOption) {
	const {
		skin = 'modern',
		album: albumConfig = {},
		alert: alertConfig = {},
		confirm: confirmConfig = {},
		dialog: dialogConfig = {},
		loading: loadingConfig = {},
		prompt: promptConfig = {},
		toast: toastConfig = {},
	} = options || {}

	albumConfig.skin = albumConfig.skin || skin
	alertConfig.skin = alertConfig.skin || skin
	confirmConfig.skin = confirmConfig.skin || skin
	dialogConfig.skin = dialogConfig.skin || skin
	loadingConfig.skin = loadingConfig.skin || skin
	promptConfig.skin = promptConfig.skin || skin
	toastConfig.skin = toastConfig.skin || skin

	return definePlugin({
		name: 'plugin-preset',
		author: 'STYZY',
		requiredCoreVersion: {
			min: coreVersion,
			max: coreVersion,
		},
		install(config) {
			album.install(config, albumConfig)
			alert.install(config, alertConfig)
			confirm.install(config, confirmConfig)
			dialog.install(config, dialogConfig)
			loading.install(config, loadingConfig)
			prompt.install(config, promptConfig)
			toast.install(config, toastConfig)

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
