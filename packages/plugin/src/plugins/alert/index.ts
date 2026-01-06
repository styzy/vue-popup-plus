import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	type IController,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import type { GlobalOption } from '../../typings'

class Log extends PluginLog {
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
	 *
	 * @since 1.3.0
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
	(this: IController, content: string, options?: AlertOption): Promise<void>
}

export const alert = definePlugin({
	name: 'plugin-preset-alert',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (config, { skin = 'modern' }: GlobalOption = {}) => {
		const alert: IAlert = function (
			content = '',
			{
				title = '提示',
				headerClose = true,
				confirmText = '确定',
				draggable = false,
				dragOverflow = false,
				maskBlur = true,
			} = {}
		) {
			return new Promise<void>((resolve) => {
				const instanceId = this.render({
					component: () => import('./src/PAlert.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						content,
						confirmText,
						draggable,
						onClose: () => {
							this.destroy(instanceId)
						},
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					onMounted: () => {
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
								caller: {
									name: 'popup.alert()',
									type: 'Function',
									value: alert,
								},
								message: `打开提示框成功`,
								group: [
									{
										type: LogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'IController',
									},
									{
										type: LogGroupItemType.Data,
										title: '内容文本',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: LogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[1],
										dataType: 'AlertOption',
									},
									{
										type: LogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<AlertOption>',
									},
								],
							})
						)
					},
					onUnmounted: () => {
						printLog(
							new Log({
								type: LogType.Info,
								caller: {
									name: 'popup.destroy()',
									type: 'Function',
									value: this.destroy,
								},
								message: `关闭提示框成功`,
								group: [
									{
										type: LogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'IController',
									},
									{
										type: LogGroupItemType.Data,
										title: '内容文本',
										dataValue: content,
										dataType: 'string',
									},
								],
							})
						)

						resolve()
					},
				})
			})
		}

		config.customProperties.alert = alert
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		alert: IAlert
	}
}
