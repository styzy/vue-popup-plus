import { definePlugin } from 'vue-popup-plus'

export type PromptType = 'input' | 'textarea'

type PromptOption = {
	/**
	 * 提示输入框类型
	 * - 支持的类型包括：
	 * 	- `input`：单行输入框
	 * 	- `textarea`：多行文本域
	 */
	type?: PromptType
	/**
	 * 提示输入框标题
	 * - 默认值：`提示输入`
	 */
	title?: string
	/**
	 * 提示输入框最大长度
	 * - 默认值：`null`
	 */
	maxLength?: number | null
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
	/**
	 * 提示输入框是否可拖拽
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 提示输入框是否可拖拽溢出屏幕
	 * - 默认值：`false`
	 */
	dragOverflow?: boolean
}

export interface IPrompt {
	/**
	 * 显示提示输入
	 * - 可以在提示用户的同时，获取用户输入的内容，支持输入框和文本域
	 * - 第一个参数为提示文本，如果不需要渲染提示文本，传入 `false` 即可
	 * - 第二个参数为输入框默认值，第三个参数为选项对象，可以自定义输入框类型、标题、最大长度、占位符、确认按钮文本、取消按钮文本等，具体可以参考 {@link PromptOption}
	 * - 获取输入的内容，需要通过 `await` 调用，等待执行结束后返回用户输入的内容，类型为 `string` | `null`，如果用户点击了取消按钮，则返回 `null`
	 * - 使用示例：
	 * ```ts
	 *
	 * const name = await popup.prompt('请输入您的姓名')
	 * ```
	 */
	(
		message: string | boolean,
		defaultValue?: string,
		options?: PromptOption
	): Promise<string>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		prompt: IPrompt
	}
}

export const prompt = definePlugin({
	name: 'Prompt',
	install: (controller) => {
		controller.customProperties.prompt = function (
			message: string,
			defaultValue: string = '',
			{
				type = 'input',
				title = '提示输入',
				maxLength = null,
				placeholder = '请输入',
				confirmText = '确定',
				cancelText = '取消',
				draggable = false,
				dragOverflow = false,
			}: PromptOption = {}
		) {
			return new Promise<string>((resolve) => {
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
						cancelText,
						draggable,
					},
					viewTranslateOverflow: dragOverflow,
					onUnmounted: (value: string) => {
						resolve(value)
					},
				})
			})
		}
	},
})
