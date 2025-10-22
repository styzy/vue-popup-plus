import VuePopup from '@styzy/vue-popup'

type PromptOption = {
	/**
	 * 提示输入框类型
	 * - 支持的类型包括：
	 * 	- `input`：单行输入框
	 * 	- `textarea`：多行文本域
	 */
	type?: 'input' | 'textarea'
	/**
	 * 提示输入框标题
	 * - 默认值：`提示输入`
	 */
	title?: string
	/**
	 * 提示输入框最大长度
	 * - 默认值：`null`
	 */
	maxLength?: number
	/**
	 * 提示输入框占位符
	 * - 默认值：`请输入`
	 */
	placeholder?: string
	/**
	 * 确认按钮文本
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 取消按钮文本
	 * - 默认值：`取消`
	 */
	cancelText?: string
}

export interface IPopupPluginPrompt {
	/**
	 * 显示提示输入
	 * - 可以在提示用户的同时，获取用户输入的内容，支持输入框和文本域
	 * - 第一个参数为提示文本，必填，第二个参数为输入框默认值，第三个参数为选项对象，可以自定义输入框类型、标题、最大长度、占位符、确认按钮文本、取消按钮文本等，具体可以参考 {@link PromptOption}
	 * - 获取输入的内容，需要通过 `await` 调用，等待执行结束后返回用户输入的内容，类型为 `string`
	 * - 使用示例：
	 * ```ts
	 *
	 * const name = await popup.prompt('请输入您的姓名')
	 * ```
	 */
	(
		message: string,
		defaultValue?: string,
		options?: PromptOption
	): Promise<string>
}

declare module '@styzy/vue-popup' {
	interface PopupCustomProperties {
		prompt: IPopupPluginPrompt
	}
}

export const prompt = VuePopup.definePlugin({
	name: 'Prompt',
	install: Popup => {
		Popup.prototype.prompt = function (
			message: string,
			defaultValue?: string,
			{
				type,
				title,
				maxLength,
				placeholder,
				confirmText = '确定',
				cancelText = '取消'
			}: PromptOption = {}
		) {
			return new Promise<string>(resolve => {
				this.render({
					component: () => import('./src/PPrompt.vue'),
					componentProps: {
						title,
						message,
						type,
						defaultValue,
						maxLength,
						placeholder,
						confirmText,
						cancelText
					},
					viewAnimations: [VuePopup.ANIMATION_TYPES.FADE],
					destroyed: (value: string) => {
						resolve(value)
					}
				})
			})
		}
	}
})
