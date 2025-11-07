import { definePlugin } from 'vue-popup-plus'

type LoadingOption = {
	/**
	 * 加载遮罩图标大小
	 * - 默认值：60
	 */
	iconSize?: number
}

export interface ILoading {
	/**
	 * 显示加载遮罩
	 * - 返回关闭加载遮罩的方法，调用后关闭加载遮罩
	 * - 使用示例：
	 * ```ts
	 * const stopLoading = popup.loading()
	 * // 关闭加载遮罩
	 * stopLoading()
	 * ```
	 */
	(content?: string, option?: LoadingOption): () => void
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		loading: ILoading
	}
}

export const loading = definePlugin({
	name: 'Loading',
	install: (controller, config) => {
		controller.customProperties.loading = function (
			content: string = '',
			{ iconSize = 60 }: LoadingOption = {}
		) {
			const instanceId = this.render({
				component: () => import('./src/PLoadingMask.vue'),
				componentProps: {
					content,
					iconSize,
					debugMode: config.debugMode,
				},
				width: '100%',
				height: '100%',
				mask: false,
				zIndex: 99999999,
			})

			return () => {
				this.destroy(instanceId)
			}
		}
	},
})
