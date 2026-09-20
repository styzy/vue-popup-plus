import type { PopupController } from 'vue-popup-plus'
import type {
	PopupPluginSharedConfig,
	PopupPluginSharedOption,
	PopupTheme,
} from '@plugin/typings'

export type PopupAlertOption = {
	/**
	 * 主题
	 *
	 * - 默认值： 'primary'
	 * - 具体的可选主题请参考 {@link PopupTheme}
	 *
	 * @since 1.7.0
	 */
	theme?: PopupTheme
	/**
	 * 提示框标题
	 *
	 * - 默认值：`提示`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 是否可拖动
	 *
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖动超出窗口边界
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
} & PopupPluginSharedOption

export interface PopupAlert {
	/**
	 * 显示提示框
	 *
	 * - 如果需要等待用户点击确认按钮后继续执行后续代码，需要通过 `await`
	 *   调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
	 *
	 * ```ts
	 * popup.alert('删除成功')
	 * // 即使用户不点击确定按钮，也不会阻塞后续代码执行
	 *
	 * await popup.alert('删除成功')
	 * // 只有用户点击了确认按钮，才会继续执行后续代码
	 * ```
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupAlertOption
	): Promise<void>
}

export type PopupAlertConfig = PopupPluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.alert()` 方法的默认选项
	 */
	defaultOptions?: PopupAlertOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		alert: PopupAlert
	}
}
