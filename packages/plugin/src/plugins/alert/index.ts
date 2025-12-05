import {
	definePlugin,
	Log as CoreLog,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
} from 'vue-popup-plus'
import type { GlobalOption } from '../../typings'

class Log extends CoreLog {
	namespace = 'VuePopupPlusPluginPreset Alert'
}

type AlertOption = {
	/**
	 * 提示框标题
	 *
	 * - 默认值：`提示`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 是否可拖动
	 *
	 * - 默认值：`false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖动超出窗口边界
	 *
	 * - 默认值：`false`
	 */
	dragOverflow?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 */
	maskBlur?: boolean
}

export interface IAlert {
	/**
	 * 显示提示框
	 *
	 * - 如果需要等待用户点击确认按钮后继续执行后续代码，需要通过 `await`
	 *   调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
	 *
	 * ```ts
	 * popup.alert('删除成功')
	 * // 即使用户不点击确定按钮，也不会阻塞后续代码执行
	 *
	 * await popup.alert('删除成功')
	 * // 只有用户点击了确认按钮，才会继续执行后续代码
	 * ```
	 */
	(content: string, options?: AlertOption): Promise<void>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		alert: IAlert
	}
}

export const alert = definePlugin({
	name: 'plugin-preset-alert',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (controller, config, { skin = 'classic' }: GlobalOption = {}) => {
		controller.customProperties.alert = function (
			content: string = '',
			{
				title = '提示',
				headerClose = true,
				confirmText = '确定',
				draggable = false,
				dragOverflow = false,
				maskBlur = true,
			}: AlertOption = {}
		) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PAlert.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						content,
						confirmText,
						draggable,
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					onUnmounted: () => {
						resolve()

						printLog(
							new Log({
								type: LogType.Info,
								caller: 'popup.destroy()',
								message: `关闭提示框成功`,
							})
						)
					},
				})

				const mergedOptions: Required<AlertOption> = {
					title,
					headerClose,
					confirmText,
					draggable,
					dragOverflow,
					maskBlur,
				}

				printLog(
					new Log({
						type: LogType.Info,
						caller: 'popup.alert()',
						message: `打开提示框成功`,
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
								dataType: 'AlertOption',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'merged options',
								dataValue: mergedOptions,
								dataType: 'Required<AlertOption>',
							},
						],
					})
				)
			})
		}
	},
})
