import VuePopup from '@styzy/vue-popup'

type PopupConfirmOption = {
	/**
	 * 确认框标题
	 * - 默认值：`确认`
	 */
	title?: string
	/**
	 * 确认按钮文本
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 取消按钮文本
	 * - 默认值：`取消`
	 */
	cancelText?: string
}

export interface IPopupPluginConfirm {
	/**
	 * 显示确认框
	 * - 如果需要获取点击的按钮是确定还是取消，需要通过 `await` 调用获得一个 `boolean` 类型的返回值，
	 *   确认按钮点击时返回 `true`，取消按钮点击时返回 `false`
	 * - 使用示例：
	 * ```ts
	 * if (await popup.confirm('确定删除吗？')) {
	 * 	// 确认删除
	 * } else {
	 * 	// 取消删除
	 * }
	 * ```
	 */
	(content: string, options?: PopupConfirmOption): Promise<boolean>
}

declare module '@styzy/vue-popup' {
	interface PopupCustomProperties {
		confirm: IPopupPluginConfirm
	}
}

export const confirm = VuePopup.definePlugin({
	name: 'Confirm',
	install: Popup => {
		Popup.prototype.confirm = function (
			content: string = '是否确认？',
			{
				title = '确认',
				confirmText = '确定',
				cancelText = '取消'
			}: PopupConfirmOption = {}
		) {
			return new Promise<boolean>(resolve => {
				this.render({
					component: () => import('./src/PConfirm.vue'),
					componentProps: {
						title,
						content,
						confirmText,
						cancelText
					},
					destroyed: (isConfirm: boolean) => {
						resolve(isConfirm)
					}
				})
			})
		}
	}
})
