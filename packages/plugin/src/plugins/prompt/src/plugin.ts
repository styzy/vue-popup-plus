import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type { PopupPrompt, PopupPromptConfig, PopupPromptOption } from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Prompt'
}

export const prompt = definePlugin({
	name: 'plugin-preset-prompt',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupPromptConfig = {}
	) => {
		const prompt: PopupPrompt = function (
			message,
			{
				defaultValue = '',
				type = defaultOptions.type ?? 'input',
				title = defaultOptions.title ?? '提示输入',
				headerClose = defaultOptions.headerClose ?? true,
				maxLength = defaultOptions.maxLength ?? null,
				placeholder = defaultOptions.placeholder ?? '请输入',
				confirmText = defaultOptions.confirmText ?? '确定',
				cancelText = defaultOptions.cancelText ?? '取消',
				draggable = defaultOptions.draggable ?? false,
				dragOverflow = defaultOptions.dragOverflow ?? false,
				maskBlur = defaultOptions.maskBlur ?? false,
				zIndex,
			} = {}
		) {
			return new Promise((resolve) => {
				const instanceId = this.render({
					component: () => import('./index.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						message,
						type,
						defaultValue,
						maxLength,
						placeholder,
						confirmText,
						cancelText,
						draggable,
						onClose: (inputValue) => {
							this.destroy(instanceId, inputValue)
						},
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					disableScroll: true,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<PopupPromptOption> = {
							defaultValue,
							type,
							title,
							headerClose,
							maxLength,
							placeholder,
							confirmText,
							cancelText,
							draggable,
							dragOverflow,
							maskBlur,
							zIndex,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.prompt()',
									type: 'Function',
									value: prompt,
								},
								message: `打开提示输入框成功`,
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
										title: '提示文本',
										dataValue: message,
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
										dataType: 'Required<PromptOption>',
									},
								],
							})
						)
					},
					onUnmounted: (inputValue?: string) => {
						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.destroy()',
									type: 'Function',
									value: this.destroy,
								},
								message: `关闭提示输入框成功，输入值为：${inputValue}`,
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
										title: '提示文本',
										dataName: 'content',
										dataValue: message,
										dataType: 'string',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '输入文本值',
										dataValue: inputValue,
										dataType: 'string',
									},
								],
							})
						)

						resolve(inputValue)
					},
				})
			})
		}

		config.customProperties.prompt = prompt
	},
})
