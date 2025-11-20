import { definePlugin, POPUP_ANIMATIONS } from 'vue-popup-plus'
import { type GlobalOption, type Theme } from '../../typings'

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
					},
				})
			})
		}
	},
})

