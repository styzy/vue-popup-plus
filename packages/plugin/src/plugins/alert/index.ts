import VuePopup from '@styzy/vue-popup'

type PopupAlertOption = {
	/**
	 * 提示框标题
	 * - 默认值：`提示`
	 */
	title?: string
	/**
	 * 确认按钮文本
	 * - 默认值：`确定`
	 */
	confirmText?: string
}

export interface IPopupPluginAlert {
	/**
	 * 显示提示框
	 * - 如果需要等待用户点击确认按钮后继续执行后续代码，需要通过 `await` 调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
	 * ```ts
	 * popup.alert('删除成功')
	 * // 即使用户不点击确定按钮，也不会阻塞后续代码执行
	 *
	 * await popup.alert('删除成功')
	 * // 只有用户点击了确认按钮，才会继续执行后续代码
	 * ```
	 */
	(content: string, options?: PopupAlertOption): Promise<void>
}

declare module '@styzy/vue-popup' {
	interface PopupCustomProperties {
		alert: IPopupPluginAlert
	}
}

export const alert = VuePopup.definePlugin({
	name: 'Alert',
	install: Popup => {
		Popup.prototype.alert = function (
			content: string = '',
			{ title = '提示', confirmText = '确定' }: PopupAlertOption = {}
		) {
			return new Promise<void>(resolve => {
				this.render({
					component: () => import('./src/PAlert.vue'),
					componentProps: {
						title,
						content,
						confirmText
					},
					destroyed: () => {
						resolve()
					}
				})
			})
		}
	}
})
