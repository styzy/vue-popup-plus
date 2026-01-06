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
	 *
	 * @since 1.3.0
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
	(
		this: IController,
		content: string,
		options?: ConfirmOption
	): Promise<boolean>
}

export const confirm = definePlugin({
	name: 'plugin-preset-confirm',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (config, { skin = 'modern' }: GlobalOption = {}) => {
		const confirm: IConfirm = function (
			content = '是否确认？',
			{
				title = '确认',
				headerClose = false,
				confirmText = '确定',
				cancelText = '取消',
				draggable = false,
				dragOverflow = false,
				maskBlur = true,
			} = {}
		) {
			return new Promise((resolve) => {
				const instanceId = this.render({
					component: () => import('./src/PConfirm.vue'),
					componentProps: {
						skin,
						title,
						headerClose,
						content,
						draggable,
						confirmText,
						cancelText,
						onClose: (isConfirm) => {
							this.destroy(instanceId, isConfirm)
						},
					},
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					onMounted: () => {
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
								caller: {
									name: 'popup.confirm()',
									type: 'Function',
									value: confirm,
								},
								message: `打开确认框成功`,
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
										dataName: 'content',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: LogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[1],
										dataType: 'ConfirmOption',
									},
									{
										type: LogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<ConfirmOption>',
									},
								],
							})
						)
					},
					onUnmounted: (isConfirm: boolean) => {
						printLog(
							new Log({
								type: LogType.Info,
								caller: {
									name: 'popup.destroy()',
									type: 'Function',
									value: this.destroy,
								},
								message: `关闭确认框成功，确认结果: ${isConfirm}`,
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
										dataName: 'content',
										dataValue: content,
										dataType: 'string',
									},
									{
										type: LogGroupItemType.Data,
										title: '确认结果',
										dataName: 'isConfirm',
										dataValue: isConfirm,
										dataType: 'boolean',
										important: true,
									},
								],
							})
						)

						resolve(isConfirm)
					},
				})
			})
		}

		config.customProperties.confirm = confirm
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		confirm: IConfirm
	}
}
