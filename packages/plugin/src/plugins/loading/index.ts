import { definePlugin } from 'vue-popup-plus'
import { type Theme } from '../../typings'

type LoadingOption = {
	/**
	 * 加载遮罩主题
	 * - 默认值：'primary'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 加载遮罩标题文本
	 * - 默认值：''
	 */
	title?: string
	/**
	 * 加载遮罩图标大小
	 * - 默认值：60
	 */
	iconSize?: number
	/**
	 * 遮罩层是否模糊
	 * - 默认值：`true`
	 */
	maskBlur?: boolean
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
	(option?: LoadingOption): () => void
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		loading: ILoading
	}
}

export const loading = definePlugin({
	name: 'Loading',
	install: (controller, config) => {
		controller.customProperties.loading = function ({
			theme = 'default',
			title = '',
			iconSize = 60,
			maskBlur = true,
		}: LoadingOption = {}) {
			const instanceId = this.render({
				component: () => import('./src/PLoading.vue'),
				componentProps: {
					theme,
					title,
					iconSize,
					debugMode: config.debugMode,
				},
				maskBlur,
				zIndex: 99999999,
			})

			return () => {
				this.destroy(instanceId)
			}
		}
	},
})
