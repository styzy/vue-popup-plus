import {
	definePlugin,
	Log as CoreLog,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	POPUP_ANIMATIONS,
} from 'vue-popup-plus'
import { type GlobalOption, type Theme } from '../../typings'

class Log extends CoreLog {
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
}

export interface IToast {
	/**
	 * 显示消息
	 *
	 * - 第一个参数为消息内容
	 * - 第二个参数为消息选项，可自定义消息显示时间，默认值为 2000 毫秒
	 * - 如果需要等待消息消失后继续执行后续代码，需要通过 `await` 调用， 等待执行结束后继续执行后续代码
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
	(content: string, options?: ToastOption): Promise<void>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		toast: IToast
	}
}

export const toast = definePlugin({
	name: 'plugin-preset-toast',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (controller, config, { skin = 'classic' }: GlobalOption = {}) => {
		controller.customProperties.toast = function (
			content: string = '',
			{ theme = 'default', duration = 2000 }: ToastOption = {}
		) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PToast.vue'),
					componentProps: {
						skin,
						content,
						theme,
						duration,
					},
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
					duration,
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
	},
})

