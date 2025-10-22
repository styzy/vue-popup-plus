import VuePopup from '@styzy/vue-popup'

export interface IPopupPluginLoading {
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
	(): () => void
}

declare module '@styzy/vue-popup' {
	interface PopupCustomProperties {
		loading: IPopupPluginLoading
	}
}

export const loading = VuePopup.definePlugin({
	name: 'Loading',
	install: Popup => {
		Popup.prototype.loading = function () {
			const stopLoading = () => {
				destroy && destroy()
			}

			const destroy = this.render({
				component: () => import('./src/PLoading.vue'),
				componentProps: {
					stopLoading
				},
				width: '100%',
				height: '100%',
				mask: false,
				viewAnimations: [VuePopup.ANIMATION_TYPES.FADE],
				zIndex: 99999999
			})

			return stopLoading
		}
	}
})
