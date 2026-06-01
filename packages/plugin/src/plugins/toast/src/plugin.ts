import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
	POPUP_ANIMATIONS,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type {
	PopupToast,
	PopupToastConfig,
	PopupToastDanger,
	PopupToastInfo,
	PopupToastOption,
	PopupToastPrimary,
	PopupToastSuccess,
	PopupToastWarning,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Toast'
}

export const toast = definePlugin({
	name: 'plugin-preset-toast',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupToastConfig = {}
	) => {
		const toast: PopupToast = function (
			content = '',
			{
				theme = defaultOptions.theme ?? 'primary',
				placement = defaultOptions.placement ?? 'center',
				duration = defaultOptions.duration ?? 2000,
				showClose = defaultOptions.showClose ?? false,
				hoverWait = defaultOptions.hoverWait ?? true,
				zIndex,
			} = {}
		) {
			return new Promise<void>((resolve) => {
				const instanceId = this.render({
					component: () => import('./index.vue'),
					componentProps: {
						skin,
						content,
						theme,
						duration,
						showClose,
						hoverWait,
						onClose: () => {
							this.destroy(instanceId)
						},
					},
					placement,
					viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
					mask: false,
					disableScroll: false,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<PopupToastOption> = {
							theme,
							placement,
							duration,
							showClose,
							hoverWait,
							zIndex,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.toast()',
									type: 'Function',
									value: toast,
								},
								message: `打开轻量提示成功`,
								group: [
									{
										type: PopupLogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'PopupController',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '内容文本',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[1],
										dataType: 'ToastOption',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<ToastOption>',
									},
								],
							})
						)
					},
					onUnmounted: () => {
						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.destroy()',
									type: 'Function',
									value: this.destroy,
								},
								message: `关闭轻量提示成功`,
								group: [
									{
										type: PopupLogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'PopupController',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '内容文本',
										dataValue: content,
										dataType: 'string',
									},
								],
							})
						)

						resolve()
					},
				})
			})
		}

		const toastPrimary: PopupToastPrimary = function (content, options) {
			return toast.call(this, content, { theme: 'primary', ...options })
		}

		const toastSuccess: PopupToastSuccess = function (content, options) {
			return toast.call(this, content, { theme: 'success', ...options })
		}

		const toastInfo: PopupToastInfo = function (content, options) {
			return toast.call(this, content, { theme: 'info', ...options })
		}

		const toastWarning: PopupToastWarning = function (content, options) {
			return toast.call(this, content, { theme: 'warning', ...options })
		}

		const toastDanger: PopupToastDanger = function (content, options) {
			return toast.call(this, content, { theme: 'danger', ...options })
		}

		config.customProperties.toast = toast
		config.customProperties.toastPrimary = toastPrimary
		config.customProperties.toastSuccess = toastSuccess
		config.customProperties.toastInfo = toastInfo
		config.customProperties.toastWarning = toastWarning
		config.customProperties.toastDanger = toastDanger
	},
})
