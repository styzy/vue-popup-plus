import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
} from 'vue-popup-plus'
import { useLocale } from '@plugin/locale'
import { PluginLog } from '@plugin/log'
import { requiredCoreVersion } from '@plugin/version'
import type {
	PopupConfirm,
	PopupConfirmConfig,
	PopupConfirmOption,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Confirm'
}

const { t } = useLocale()

export const confirm = definePlugin({
	name: 'plugin-preset-confirm',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupConfirmConfig = {}
	) => {
		const confirm: PopupConfirm = function (
			content,
			{
				title = defaultOptions.title ?? t('confirm.title'),
				headerClose = defaultOptions.headerClose ?? false,
				confirmText = defaultOptions.confirmText ??
					t('confirm.confirmText'),
				cancelText = defaultOptions.cancelText ??
					t('confirm.cancelText'),
				draggable = defaultOptions.draggable ?? false,
				dragOverflow = defaultOptions.dragOverflow ?? false,
				maskBlur = defaultOptions.maskBlur ?? false,
			} = {}
		) {
			return new Promise((resolve) => {
				const instanceId = this.render({
					component: () => import('./index.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						content,
						draggable,
						confirmText,
						cancelText,
						onClose: (isConfirm) => {
							this.destroy(instanceId, isConfirm)
						},
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					disableScroll: true,
					onMounted: () => {
						const mergedOptions: Required<PopupConfirmOption> = {
							title,
							headerClose,
							confirmText,
							cancelText,
							draggable,
							dragOverflow,
							maskBlur,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.confirm()',
									type: 'Function',
									value: confirm,
								},
								message: `打开确认框成功`,
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
										dataName: 'content',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[1],
										dataType: 'ConfirmOption',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<ConfirmOption>',
									},
								],
							})
						)
					},
					onUnmounted: (isConfirm: boolean) => {
						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.destroy()',
									type: 'Function',
									value: this.destroy,
								},
								message: `关闭确认框成功，确认结果: ${isConfirm}`,
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
										dataName: 'content',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '确认结果',
										dataName: 'isConfirm',
										dataValue: isConfirm,
										dataType: 'boolean',
										important: true,
									},
								],
							})
						)

						resolve(isConfirm)
					},
				})
			})
		}

		config.customProperties.confirm = confirm
	},
})
