import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import type { GlobalOption } from '../../typings'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Confirm'
}

type ConfirmOption = {
	/**
	 * 确认框标题
	 *
	 * - 默认值：`确认`
	 */
	title?: string
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`false`
	 */
	headerClose?: boolean
	/**
	 * 确认按钮文本
	 *
	 * - 默认值：`确定`
	 */
	confirmText?: string
	/**
	 * 取消按钮文本
	 *
	 * - 默认值：`取消`
	 */
	cancelText?: string
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

export interface IConfirm {
	/**
	 * 显示确认框
	 *
	 * - 如果需要获取点击的按钮是确定还是取消，需要通过 `await` 调用获得一个 `boolean`
	 *   类型的返回值，确认按钮点击时返回 `true`，取消按钮点击时返回 `false`
	 * - 使用示例：
	 *
	 * ```ts
	 * if (await popup.confirm('确定删除吗？')) {
	 * 	// 确认删除
	 * } else {
	 * 	// 取消删除
	 * }
	 * ```
	 */
	(content: string, options?: ConfirmOption): Promise<boolean>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		confirm: IConfirm
	}
}

export const confirm = definePlugin({
	name: 'plugin-preset-confirm',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (controller, config, { skin = 'modern' }: GlobalOption = {}) => {
		controller.customProperties.confirm = function (
			content: string = '是否确认？',
			{
				title = '确认',
				headerClose = false,
				confirmText = '确定',
				cancelText = '取消',
				draggable = false,
				dragOverflow = false,
				maskBlur = true,
			}: ConfirmOption = {}
		) {
			return new Promise((resolve) => {
				this.render({
					component: () => import('./src/PConfirm.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						content,
						draggable,
						confirmText,
						cancelText,
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					onUnmounted: (isConfirm: boolean) => {
						resolve(isConfirm)

						printLog(
							new Log({
								type: LogType.Info,
								caller: 'popup.destroy()',
								message: `关闭确认框成功，确认结果: ${isConfirm}`,
								group: [
									{
										type: LogGroupItemType.Data,
										dataName: 'isConfirm',
										dataValue: isConfirm,
										dataType: 'boolean',
									},
								],
							})
						)
					},
				})

				const mergedOptions: Required<ConfirmOption> = {
					title,
					headerClose,
					confirmText,
					cancelText,
					draggable,
					dragOverflow,
					maskBlur,
				}

				printLog(
					new Log({
						type: LogType.Info,
						caller: 'popup.confirm()',
						message: `打开确认框成功`,
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
								dataType: 'ConfirmOption',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'merged options',
								dataValue: mergedOptions,
								dataType: 'Required<ConfirmOption>',
							},
						],
					})
				)
			})
		}
	},
})
