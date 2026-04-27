import {
	definePlugin,
	PopupLogGroupItemType,
	PopupLogType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from './log'
import { album, type AlbumConfig, type IAlbum } from './plugins/album'
import { alert, type AlertConfig, type IAlert } from './plugins/alert'
import { bubble, type BubbleConfig, type IBubble } from './plugins/bubble'
import { confirm, type ConfirmConfig, type IConfirm } from './plugins/confirm'
import { dialog, type DialogConfig, type IDialog } from './plugins/dialog'
import { drawer, type DrawerConfig, type IDrawer } from './plugins/drawer'
import { loading, type ILoading, type LoadingConfig } from './plugins/loading'
import { message, type IMessage, type MessageConfig } from './plugins/message'
import { prompt, type IPrompt, type PromptConfig } from './plugins/prompt'
import { toast, type IToast, type ToastConfig } from './plugins/toast'
import { type GlobalPluginConfig } from './typings'
import { requiredCoreVersion } from './version'

import './assets/styles/main.scss'

export { type Skin } from './skin'
export { version } from './version'
export type {
	IAlbum,
	IAlert,
	IBubble,
	IConfirm,
	IDialog,
	IDrawer,
	ILoading,
	IMessage,
	IPrompt,
	IToast,
}

export type PresetPluginConfig = GlobalPluginConfig & {
	/**
	 * 媒体相册 插件配置
	 */
	album?: AlbumConfig
	/**
	 * 提示 插件配置
	 */
	alert?: AlertConfig
	/**
	 * 气泡 插件配置
	 */
	bubble?: BubbleConfig
	/**
	 * 确认 插件配置
	 */
	confirm?: ConfirmConfig
	/**
	 * 对话 插件配置
	 */
	dialog?: DialogConfig
	/**
	 * 抽屉 插件配置
	 */
	drawer?: DrawerConfig
	/**
	 * 加载遮罩 插件配置
	 */
	loading?: LoadingConfig
	/**
	 * 消息提示 插件配置
	 */
	message?: MessageConfig
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
export function createPresetPlugin(config?: PresetPluginConfig) {
	const {
		skin = 'modern',
		album: albumConfig = {},
		alert: alertConfig = {},
		bubble: bubbleConfig = {},
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
	bubbleConfig.skin = bubbleConfig.skin || skin
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
			bubble.install(_, bubbleConfig)
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
