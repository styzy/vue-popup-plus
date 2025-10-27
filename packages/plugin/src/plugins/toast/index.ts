import { definePlugin } from 'vue-popup-plus'

type ToastOption = {
	/**
	 * 消息显示时间，单位毫秒
	 * @default 2000
	 */
	duration?: number
}

export interface IToast {
	/**
	 * 显示消息
	 * - 第一个参数为消息内容
	 * - 第二个参数为消息选项，可自定义消息显示时间，默认值为 2000 毫秒
	 * - 如果需要等待消息消失后继续执行后续代码，需要通过 `await` 调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
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
	name: 'Toast',
	install: (controller) => {
		controller.customProperties.toast = function (
			content: string = '',
			{ duration = 2000 }: ToastOption = {}
		) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PToast.vue'),
					componentProps: {
						content,
						duration,
					},
					mask: false,
					onUnmounted: () => {
						resolve()
					},
				})
			})
		}
	},
})
