import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
} from 'vue-popup-plus'
import { useLocale } from '@plugin/locale'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type {
	PopupPrompt,
	PopupPromptConfig,
	PopupPromptOption,
	PopupPromptValidator,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Prompt'
}

const { t } = useLocale()

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
				title = defaultOptions.title ?? t('prompt.title'),
				headerClose = defaultOptions.headerClose ?? true,
				maxLength = defaultOptions.maxLength ?? null,
				placeholder = defaultOptions.placeholder ??
					t('prompt.placeholder'),
				validator = defaultOptions.validator,
				validateTrigger = defaultOptions.validateTrigger ?? 'blur',
				confirmText = defaultOptions.confirmText ??
					t('prompt.confirmText'),
				cancelText = defaultOptions.cancelText ??
					t('prompt.cancelText'),
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
						validator,
						validateTrigger,
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
						const mergedOptions: MergedOption<
							Omit<PopupPromptOption, 'validator'>
						> & { validator?: PopupPromptValidator } = {
							defaultValue,
							type,
							title,
							headerClose,
							maxLength,
							placeholder,
							validator,
							validateTrigger,
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
