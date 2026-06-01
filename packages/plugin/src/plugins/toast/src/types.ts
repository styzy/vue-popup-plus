import type { PopupController, PopupPlacement } from 'vue-popup-plus'
import type { GlobalPluginConfig, SharedOption, Theme } from '@plugin/typings'

export type PopupToastOption = {
	/**
	 * 主题
	 *
	 * - 默认值： 'primary'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 显示位置
	 *
	 * - 默认值为 `center`
	 *
	 * @since 1.5.0
	 */
	placement?: PopupPlacement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 * @since 1.5.0
	 */
	hoverWait?: boolean
} & SharedOption

type PopupToastOptionWithoutTheme = Omit<PopupToastOption, 'theme'>

export interface PopupToast {
	/**
	 * 显示轻量提示
	 *
	 * - 第一个参数为提示内容
	 * - 第二个参数为提示选项，可自定义显示时间，默认值为 `2000` 毫秒
	 *   如果设置为 `0` ，则提示不会自动关闭
	 * - 如果需要等待提示消失后继续执行后续代码，需要通过 `await` 调用，
	 *   等待执行结束后继续执行后续代码
	 * - 使用示例：
	 *
	 * ```ts
	 * popup.toast('这是一条轻量提示')
	 * // 不会阻塞后续代码执行
	 *
	 * await popup.toast('这是一条轻量提示')
	 * // 只有提示消失后，才会继续执行后续代码
	 * ```
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupToastOption
	): Promise<void>
}

export interface PopupToastPrimary {
	/**
	 * 显示主要轻量提示
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupToastOptionWithoutTheme
	): Promise<void>
}

export interface PopupToastSuccess {
	/**
	 * 显示成功轻量提示
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupToastOptionWithoutTheme
	): Promise<void>
}

export interface PopupToastInfo {
	/**
	 * 显示信息轻量提示
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupToastOptionWithoutTheme
	): Promise<void>
}

export interface PopupToastWarning {
	/**
	 * 显示警告轻量提示
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupToastOptionWithoutTheme
	): Promise<void>
}

export interface PopupToastDanger {
	/**
	 * 显示错误轻量提示
	 */
	(
		this: PopupController,
		content: string,
		options?: PopupToastOptionWithoutTheme
	): Promise<void>
}

type PopupToastDefaultOption = Omit<PopupToastOption, 'zIndex'>

export type PopupToastConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.toast()` 方法的默认选项
	 */
	defaultOptions?: PopupToastDefaultOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		toast: PopupToast
		toastPrimary: PopupToastPrimary
		toastSuccess: PopupToastSuccess
		toastInfo: PopupToastInfo
		toastWarning: PopupToastWarning
		toastDanger: PopupToastDanger
	}
}
