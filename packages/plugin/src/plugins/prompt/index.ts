import {
	definePlugin,
	Log as CoreLog,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
} from 'vue-popup-plus'
import type { GlobalOption } from '../../typings'

class Log extends CoreLog {
	namespace = 'VuePopupPlusPluginPreset Prompt'
}

export type PromptType = 'input' | 'textarea'

type PromptOption = {
	/**
	 * 提示输入框默认值
	 *
	 * - 默认值：`''`
	 */
	defaultValue?: string
	/**
	 * 提示输入框类型
	 *
	 * - 支持的类型包括：
	 *
	 *   - `input`：单行输入框
	 *   - `textarea`：多行文本域
	 */
	type?: PromptType
	/**
	 * 提示输入框标题
	 *
	 * - 默认值：`提示输入`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 提示输入框最大长度
	 *
	 * - 默认值：`null`
	 */
	maxLength?: number | null
	/**
	 * 提示输入框占位符
	 *
	 * - 默认值：`请输入`
	 */
	placeholder?: string
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 取消按钮文本
	 *
	 * - 默认值：`取消`
	 */
	cancelText?: string
	/**
	 * 提示输入框是否可拖拽
	 *
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 提示输入框是否可拖拽溢出屏幕
	 *
	 * - 默认值：`false`
	 */
	dragOverflow?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 */
	maskBlur?: boolean
}

export interface IPrompt {
	/**
	 * 显示提示输入
	 *
	 * - 可以在提示用户的同时，获取用户输入的内容，支持输入框和文本域
	 * - 第一个参数为提示文本，如果不需要渲染提示文本，传入 `false` 即可
	 * - 第二个参数为选项对象，可以自定义输入框默认值、类型、标题、最大长度、
	 *   占位符、确认按钮文本、取消按钮文本等，具体可以参考 {@link PromptOption}
	 * - 获取输入的内容，需要通过 `await` 调用，等待执行结束后返回用户输入的内容，类型为 `string`
	 *   | `void`，如果用户点击了取消按钮或者直接关闭弹出层，则返回 `undefined`
	 * - 使用示例：
	 *
	 * ```ts
	 * const name = await popup.prompt('请输入您的姓名')
	 * if (name === undefined) {
	 * 	console.log('用户取消了输入')
	 * } else {
	 * 	console.log('您的姓名是：' + name)
	 * }
	 * ```
	 */
	(message: string | boolean, options?: PromptOption): Promise<string | void>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		prompt: IPrompt
	}
}

export const prompt = definePlugin({
	name: 'plugin-preset-prompt',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (controller, config, { skin = 'classic' }: GlobalOption = {}) => {
		controller.customProperties.prompt = function (
			message: string,
			{
				defaultValue = '',
				type = 'input',
				title = '提示输入',
				headerClose = true,
				maxLength = null,
				placeholder = '请输入',
				confirmText = '确定',
				cancelText = '取消',
				draggable = false,
				dragOverflow = false,
				maskBlur = true,
			}: PromptOption = {}
		) {
			return new Promise<string>((resolve) => {
				this.render({
					component: () => import('./src/PPrompt.vue'),
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
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					onUnmounted: (value: string) => {
						resolve(value)

						printLog(
							new Log({
								type: LogType.Info,
								caller: 'popup.destroy()',
								message: `关闭提示输入框成功，输入值为：${value}`,
								group: [
									{
										type: LogGroupItemType.Data,
										dataName: 'input value',
										dataValue: value,
										dataType: 'string',
									},
								],
							})
						)
					},
				})

				const mergedOptions: Required<PromptOption> = {
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
				}

				printLog(
					new Log({
						type: LogType.Info,
						caller: 'popup.prompt()',
						message: `打开提示输入框成功`,
						group: [
							{
								type: LogGroupItemType.Data,
								dataName: 'content',
								dataValue: message,
								dataType: 'string',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'original options',
								dataValue: arguments[1],
								dataType: 'PromptOption',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'merged options',
								dataValue: mergedOptions,
								dataType: 'Required<PromptOption>',
							},
						],
					})
				)
			})
		}
	},
})
