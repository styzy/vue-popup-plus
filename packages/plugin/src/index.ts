import {
	definePlugin,
	PopupLogGroupItemType,
	PopupLogType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import {
	album,
	type PopupAlbumConfig,
	type PopupAlbum,
} from '@plugin/plugins/album'
import {
	alert,
	type PopupAlertConfig,
	type PopupAlert,
} from '@plugin/plugins/alert'
import {
	confirm,
	type PopupConfirmConfig,
	type PopupConfirm,
} from '@plugin/plugins/confirm'
import {
	dialog,
	type PopupDialogConfig,
	type PopupDialog,
} from '@plugin/plugins/dialog'
import {
	drawer,
	type PopupDrawerConfig,
	type PopupDrawer,
} from '@plugin/plugins/drawer'
import {
	loading,
	type PopupLoading,
	type PopupLoadingConfig,
} from '@plugin/plugins/loading'
import {
	message,
	type PopupMessage,
	type PopupMessageConfig,
} from '@plugin/plugins/message'
import {
	prompt,
	type PopupPrompt,
	type PopupPromptConfig,
} from '@plugin/plugins/prompt'
import {
	toast,
	type PopupToast,
	type PopupToastConfig,
} from '@plugin/plugins/toast'
import { type GlobalPluginConfig } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'

import '@plugin/assets/styles/main.scss'

export { type PopupSkin } from '@plugin/skin'
export { version } from '@plugin/version'
export type {
	PopupAlbum,
	PopupAlert,
	PopupConfirm,
	PopupDialog,
	PopupDrawer,
	PopupLoading,
	PopupMessage,
	PopupPrompt,
	PopupToast,
}

export type PresetPluginConfig = GlobalPluginConfig & {
	/**
	 * 媒体相册 插件配置
	 */
	album?: PopupAlbumConfig
	/**
	 * 提示 插件配置
	 */
	alert?: PopupAlertConfig
	/**
	 * 确认 插件配置
	 */
	confirm?: PopupConfirmConfig
	/**
	 * 对话 插件配置
	 */
	dialog?: PopupDialogConfig
	/**
	 * 抽屉 插件配置
	 */
	drawer?: PopupDrawerConfig
	/**
	 * 加载遮罩 插件配置
	 */
	loading?: PopupLoadingConfig
	/**
	 * 消息提示 插件配置
	 */
	message?: PopupMessageConfig
	/**
	 * 提示输入 插件配置
	 */
	prompt?: PopupPromptConfig
	/**
	 * 轻量提示 插件配置
	 */
	toast?: PopupToastConfig
}

/**
 * 创建预置插件
 *
 * - 可全局定义默认皮肤
 * - 可全局配置所有子插件的默认参数
 */
export function createPresetPlugin(config?: PresetPluginConfig) {
	const {
		skin = 'modern',
		album: albumConfig = {},
		alert: alertConfig = {},
		confirm: confirmConfig = {},
		dialog: dialogConfig = {},
		drawer: drawerConfig = {},
		loading: loadingConfig = {},
		message: messageConfig = {},
		prompt: promptConfig = {},
		toast: toastConfig = {},
	} = config || {}

	albumConfig.skin = albumConfig.skin || skin
	alertConfig.skin = alertConfig.skin || skin
	confirmConfig.skin = confirmConfig.skin || skin
	dialogConfig.skin = dialogConfig.skin || skin
	drawerConfig.skin = drawerConfig.skin || skin
	loadingConfig.skin = loadingConfig.skin || skin
	messageConfig.skin = messageConfig.skin || skin
	promptConfig.skin = promptConfig.skin || skin
	toastConfig.skin = toastConfig.skin || skin

	return definePlugin({
		name: 'plugin-preset',
		author: 'STYZY',
		requiredCoreVersion,
		install(_) {
			album.install(_, albumConfig)
			alert.install(_, alertConfig)
			confirm.install(_, confirmConfig)
			dialog.install(_, dialogConfig)
			drawer.install(_, drawerConfig)
			loading.install(_, loadingConfig)
			message.install(_, messageConfig)
			prompt.install(_, promptConfig)
			toast.install(_, toastConfig)

			printLog(
				new PluginLog({
					type: PopupLogType.Success,
					caller: {
						name: 'createPlugin()',
						type: 'Function',
						value: createPresetPlugin,
					},
					message: '创建预置插件 plugin-preset 成功',
					group: [
						{
							type: PopupLogGroupItemType.Info,
							title: '皮肤',
							content:
								skin === 'modern'
									? 'modern 现代'
									: 'classic 经典',
						},
						{
							type: PopupLogGroupItemType.Data,
							title: '配置',
							dataName: 'config',
							dataType: 'PresetPluginConfig',
							dataValue: config,
						},
					],
				})
			)
		},
	})
}
