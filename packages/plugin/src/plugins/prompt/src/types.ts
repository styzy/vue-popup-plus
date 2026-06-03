import type { PopupController } from 'vue-popup-plus'
import type { PluginSharedConfig, SharedOption } from '@plugin/typings'

export type PopupPromptType = 'input' | 'textarea'

export type PopupPromptValidator = (value: string) => void

export type PopupPromptValidateType = ['input', 'change', 'blur'][number]

export type PopupPromptOption = {
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
	type?: PopupPromptType
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
	 * 提示输入框验证器
	 *
	 * - 验证器函数，参数为用户输入的内容
	 * - 如果验证失败，直接抛出异常即可，异常信息为验证失败的提示信息
	 *
	 * ```ts
	 * function validateName(value: string) {
	 * 	if (!value) {
	 * 		throw new Error('请输入姓名')
	 * 	}
	 * 	if (value.length < 2) {
	 * 		throw new Error('姓名长度不能小于2个字符')
	 * 	}
	 * }
	 * ```
	 *
	 * @since 1.7.0
	 */
	validator?: PopupPromptValidator
	/**
	 * 提示输入框验证类型
	 *
	 * - 默认值：`blur`
	 * - 指定触发校验的时机，仅在设置 `validator` 时生效
	 * - 支持的类型包括：
	 *
	 *   - `input`：输入框内容改变时验证
	 *   - `change`：输入框内容改变时验证
	 *   - `blur`：输入框失去焦点时验证
	 *
	 * @since 1.7.0
	 */
	validateType?: PopupPromptValidateType
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
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
} & SharedOption

export interface PopupPrompt {
	/**
	 * 显示提示输入
	 *
	 * - 可以在提示用户的同时，获取用户输入的内容，支持输入框和文本域
	 * - 第一个参数为提示文本，如果不需要渲染提示文本，传入 `false` 即可
	 * - 第二个参数为选项对象，可以自定义输入框默认值、类型、标题、最大长度、
	 *   占位符、确认按钮文本、取消按钮文本等，具体可以参考 {@link PromptOption}
	 * - 获取输入的内容，需要通过 `await` 调用，等待执行结束后返回用户输入的内容，类型为 `string`
	 *   | `undefined`，如果用户点击了取消按钮或者直接关闭弹出层，则返回 `undefined`
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
	(
		this: PopupController,
		message: string | boolean,
		options?: PopupPromptOption
	): Promise<string | undefined>
}

type PromptDefaultOption = Omit<PopupPromptOption, 'defaultValue' | 'zIndex'>

export type PopupPromptConfig = PluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.prompt()` 方法的默认选项
	 */
	defaultOptions?: PromptDefaultOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		prompt: PopupPrompt
	}
}
