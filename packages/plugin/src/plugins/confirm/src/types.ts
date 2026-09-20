import type { PopupController } from 'vue-popup-plus'
import type {
	PopupPluginSharedConfig,
	PopupPluginSharedOption,
	PopupTheme,
} from '@plugin/typings'

export type PopupConfirmOption = {
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
	 * 确认框标题
	 *
	 * - 默认值：`确认`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`false`
	 */
	headerClose?: boolean
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

export interface PopupConfirm {
	/**
	 * 显示确认框
	 *
	 * - 如果需要获取点击的按钮是确定还是取消，需要通过 `await` 调用获得一个 `boolean`
	 *   类型的返回值，确认按钮点击时返回 `true`，取消按钮点击时返回 `false`
	 * - 使用示例：
	 *
	 * ```ts
	 * if (await popup.confirm('确定删除吗？')) {
	 * 	// 确认删除
	 * } else {
	 * 	// 取消删除
	 * }
	 * ```
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupConfirmOption
	): Promise<boolean>
}

export type PopupConfirmConfig = PopupPluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.confirm()` 方法的默认选项
	 */
	defaultOptions?: PopupConfirmOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		confirm: PopupConfirm
	}
}
