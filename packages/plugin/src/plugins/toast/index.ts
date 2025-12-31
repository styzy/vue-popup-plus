import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	POPUP_ANIMATIONS,
	type Placement,
	type IController,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import { type GlobalOption, type Theme } from '../../typings'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Toast'
}

type ToastOption = {
	/**
	 * 消息主题
	 *
	 * - 默认值： 'default'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 消息显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 消息位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 * @since 1.5.0
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 * @since 1.5.0
	 */
	hoverWait?: boolean
}

type ToastOptionWithoutTheme = Omit<ToastOption, 'theme'>

export interface IToast {
	/**
	 * 显示消息
	 *
	 * - 第一个参数为消息内容
	 * - 第二个参数为消息选项，可自定义消息显示时间，默认值为 `2000` 毫秒
	 *   ，如果设置为 `0` ，则消息不会自动关闭
	 * - 如果需要等待消息消失后继续执行后续代码，需要通过 `await` 调用，
	 *   等待执行结束后继续执行后续代码
	 * - 使用示例：
	 *
	 * ```ts
	 * popup.toast('这是一条消息')
	 * // 不会阻塞后续代码执行
	 *
	 * await popup.toast('这是一条消息')
	 * // 只有消息消失后，才会继续执行后续代码
	 * ```
	 */
	(this: IController, content: string, options?: ToastOption): Promise<void>
}

export interface IToastPrimary {
	/**
	 * 显示主要消息
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastSuccess {
	/**
	 * 显示成功消息
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastInfo {
	/**
	 * 显示信息消息
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastWarning {
	/**
	 * 显示警告消息
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastDanger {
	/**
	 * 显示错误消息
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export const toast = definePlugin({
	name: 'plugin-preset-toast',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (config, { skin = 'modern' }: GlobalOption = {}) => {
		const toast: IToast = function (
			content: string = '',
			{
				theme = 'primary',
				placement = 'center',
				duration = 2000,
				showClose = false,
				hoverWait = true,
			}: ToastOption = {}
		) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PToast.vue'),
					componentProps: {
						skin,
						content,
						theme,
						duration,
						showClose,
						hoverWait,
					},
					placement,
					mask: false,
					disableScroll: false,
					viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
					onUnmounted: () => {
						resolve()

						printLog(
							new Log({
								type: LogType.Info,
								caller: 'popup.toast()',
								message: `关闭消息成功`,
								group: [
									{
										type: LogGroupItemType.Data,
										dataName: 'content',
										dataValue: content,
										dataType: 'string',
									},
								],
							})
						)
					},
				})

				const mergedOptions: Required<ToastOption> = {
					theme,
					placement,
					duration,
					showClose,
					hoverWait,
				}

				printLog(
					new Log({
						type: LogType.Info,
						caller: 'popup.toast()',
						message: `打开消息成功`,
						group: [
							{
								type: LogGroupItemType.Data,
								dataName: 'content',
								dataValue: content,
								dataType: 'string',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'original options',
								dataValue: arguments[1],
								dataType: 'ToastOption',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'merged options',
								dataValue: mergedOptions,
								dataType: 'Required<ToastOption>',
							},
						],
					})
				)
			})
		}

		const toastPrimary: IToastPrimary = function (content, options) {
			return toast.call(this, content, { theme: 'primary', ...options })
		}

		const toastSuccess: IToastSuccess = function (content, options) {
			return toast.call(this, content, { theme: 'success', ...options })
		}

		const toastInfo: IToastInfo = function (content, options) {
			return toast.call(this, content, { theme: 'info', ...options })
		}

		const toastWarning: IToastWarning = function (content, options) {
			return toast.call(this, content, { theme: 'warning', ...options })
		}

		const toastDanger: IToastDanger = function (content, options) {
			return toast.call(this, content, { theme: 'danger', ...options })
		}

		config.customProperties.toast = toast
		config.customProperties.toastPrimary = toastPrimary
		config.customProperties.toastSuccess = toastSuccess
		config.customProperties.toastInfo = toastInfo
		config.customProperties.toastWarning = toastWarning
		config.customProperties.toastDanger = toastDanger
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		toast: IToast
		toastPrimary: IToastPrimary
		toastSuccess: IToastSuccess
		toastInfo: IToastInfo
		toastWarning: IToastWarning
		toastDanger: IToastDanger
	}
}
