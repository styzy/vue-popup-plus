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
import {
	type GlobalPluginOption,
	type MergedOption,
	type SharedOption,
	type Theme,
} from '../../typings'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Toast'
}

type ToastOption = {
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
	placement?: Placement
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

type ToastOptionWithoutTheme = Omit<ToastOption, 'theme'>

export interface IToast {
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
	(this: IController, content: string, options?: ToastOption): Promise<void>
}

export interface IToastPrimary {
	/**
	 * 显示主要轻量提示
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastSuccess {
	/**
	 * 显示成功轻量提示
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastInfo {
	/**
	 * 显示信息轻量提示
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastWarning {
	/**
	 * 显示警告轻量提示
	 */
	(
		this: IController,
		content: string,
		options?: ToastOptionWithoutTheme
	): Promise<void>
}

export interface IToastDanger {
	/**
	 * 显示错误轻量提示
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
	install: (config, { skin = 'modern' }: GlobalPluginOption = {}) => {
		const toast: IToast = function (
			content = '',
			{
				theme = 'primary',
				placement = 'center',
				duration = 2000,
				showClose = false,
				hoverWait = true,
				zIndex,
			} = {}
		) {
			return new Promise<void>((resolve) => {
				const instanceId = this.render({
					component: () => import('./src/PToast.vue'),
					componentProps: {
						skin,
						content,
						theme,
						duration,
						showClose,
						hoverWait,
						onClose: () => {
							this.destroy(instanceId)
						},
					},
					placement,
					viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
					mask: false,
					disableScroll: false,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<ToastOption> = {
							theme,
							placement,
							duration,
							showClose,
							hoverWait,
							zIndex,
						}

						printLog(
							new Log({
								type: LogType.Info,
								caller: {
									name: 'popup.toast()',
									type: 'Function',
									value: toast,
								},
								message: `打开轻量提示成功`,
								group: [
									{
										type: LogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'IController',
									},
									{
										type: LogGroupItemType.Data,
										title: '内容文本',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: LogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[1],
										dataType: 'ToastOption',
									},
									{
										type: LogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<ToastOption>',
									},
								],
							})
						)
					},
					onUnmounted: () => {
						printLog(
							new Log({
								type: LogType.Info,
								caller: {
									name: 'popup.destroy()',
									type: 'Function',
									value: this.destroy,
								},
								message: `关闭轻量提示成功`,
								group: [
									{
										type: LogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'IController',
									},
									{
										type: LogGroupItemType.Data,
										title: '内容文本',
										dataValue: content,
										dataType: 'string',
									},
								],
							})
						)

						resolve()
					},
				})
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
