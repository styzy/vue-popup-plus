import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type { PopupAlertConfig, PopupAlertOption, PopupAlert } from './types.ts'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Alert'
}

export const alert = definePlugin({
	name: 'plugin-preset-alert',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupAlertConfig = {}
	) => {
		const alert: PopupAlert = function (
			content = '',
			{
				title = defaultOptions.title ?? '提示',
				headerClose = defaultOptions.headerClose ?? true,
				confirmText = defaultOptions.confirmText ?? '确定',
				draggable = defaultOptions.draggable ?? false,
				dragOverflow = defaultOptions.dragOverflow ?? false,
				maskBlur = defaultOptions.maskBlur ?? false,
				zIndex,
			} = {}
		) {
			return new Promise<void>((resolve) => {
				const instanceId = this.render({
					component: () => import('./index.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						content,
						confirmText,
						draggable,
						onClose: () => {
							this.destroy(instanceId)
						},
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					disableScroll: true,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<PopupAlertOption> = {
							title,
							headerClose,
							confirmText,
							draggable,
							dragOverflow,
							maskBlur,
							zIndex,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.alert()',
									type: 'Function',
									value: alert,
								},
								message: `打开提示框成功`,
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
										dataType: 'AlertOption',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<AlertOption>',
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
								message: `关闭提示框成功`,
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

		config.customProperties.alert = alert
	},
})
