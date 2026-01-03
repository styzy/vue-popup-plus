import { type Component } from 'vue'
import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	type InstanceId,
	type ExtractComponentPropTypes,
	type Placement,
	type IController,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import type { GlobalOption } from '../../typings'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Dialog'
}

type DialogOption<TComponent extends Component = Component> = {
	/**
	 * 对话框标题
	 *
	 * - 默认值为 `对话`
	 */
	title?: string
	/**
	 * 对话框内容组件
	 */
	component: TComponent
	/**
	 * 对话框内容组件props
	 */
	componentProps?: ExtractComponentPropTypes<TComponent>
	/**
	 * 对话框渲染完成时调用的回调函数
	 */
	onMounted?: () => void
	/**
	 * 是否显示对话框标题栏
	 *
	 * - 默认值为 `true`
	 */
	header?: boolean
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 对话框宽度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	width?: string | number
	/**
	 * 对话框最大宽度
	 *
	 * - 默认值为 `100%`
	 * - 支持 `string` 或 `number` 类型
	 */
	maxWidth?: string | number
	/**
	 * 对话框最小宽度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	minWidth?: string | number
	/**
	 * 对话框高度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	height?: string | number
	/**
	 * 对话框最大高度
	 *
	 * - 默认值为 `100%`
	 * - 支持 `string` 或 `number` 类型
	 */
	maxHeight?: string | number
	/**
	 * 对话框最小高度
	 *
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	minHeight?: string | number
	/**
	 * 对话框位置
	 *
	 * - 默认值为 `center`
	 * @since 1.5.0
	 */
	placement?: Placement
	/**
	 * 是否显示对话框遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 是否点击遮罩层关闭对话框
	 *
	 * - 默认值为 `false`
	 */
	maskClickClose?: boolean
	/**
	 * 是否可拖拽
	 *
	 * - 默认值为 `false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖拽溢出屏幕
	 *
	 * - 默认值为 `false`
	 */
	dragOverflow?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 */
	maskBlur?: boolean
}

export interface IDialog {
	/**
	 * 显示对话框
	 *
	 * - 对话框内部组件可通过调用 `dialogClose(payload)`
	 *   关闭对话框，payload 为关闭时传递的参数
	 * - 如需获取对话框关闭时传递的参数，可在调用 `dialog` 方法时使用 `await` 关键字等待
	 *   Promise resolve 后获取
	 * - 对话框关闭时，无论是否传递了参数，Promise 都将 resolve，因此需要在调用时判断是否有返回参数
	 */
	<T extends any = any, TComponent extends Component = Component>(
		this: IController,
		options: DialogOption<TComponent>
	): Promise<T | void>
}

export interface IDialogClose {
	/**
	 * 关闭对话框
	 *
	 * - 将会关闭最后一个创建的对话框
	 * - 如果当前没有对话框正在显示，则不会有任何效果，调试模式下会抛出警告
	 * - 可传递任意类型的参数，该参数将会被传递给打开对话框时的 Promise resolve 函数
	 * @param payload 关闭时传递的参数
	 */
	<T extends any = any>(this: IController, payload?: T): Promise<void>
}

let seed = 1

const createId = () => `dialog-${seed++}`

export const dialog = definePlugin({
	name: 'plugin-preset-dialog',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (config, { skin = 'modern' }: GlobalOption = {}) => {
		const recordList: Array<{
			id: string
			instanceId: InstanceId
			resolve: (payload?: any) => void
		}> = []

		const dialog: IDialog = function ({
			title = '对话',
			component,
			componentProps = {},
			onMounted = () => {},
			header = true,
			headerClose = true,
			width = 'auto',
			maxWidth = '100%',
			minWidth = 'auto',
			height = 'auto',
			maxHeight = '100%',
			minHeight = 'auto',
			placement = 'center',
			mask = true,
			maskClickClose = false,
			draggable = false,
			dragOverflow = false,
			maskBlur = true,
		}) {
			return new Promise((resolve) => {
				const id = createId()
				const instanceId = this.render({
					component: () => import('./src/PDialog.vue'),
					componentProps: {
						skin,
						id,
						title,
						customComponent: component,
						customComponentProps: componentProps,
						header,
						headerClose,
						draggable,
						onClose: () => {
							this.dialogClose()
						},
						debugMode: config.debugMode,
					},
					width,
					maxWidth,
					minWidth,
					height,
					maxHeight,
					minHeight,
					placement,
					mask,
					maskClickClose,
					viewTranslateOverflow: dragOverflow,
					maskBlur,
					onMounted: () => {
						const mergedOptions: Required<DialogOption> = {
							title,
							component,
							componentProps,
							onMounted,
							header,
							headerClose,
							width,
							maxWidth,
							minWidth,
							height,
							maxHeight,
							minHeight,
							placement,
							mask,
							maskClickClose,
							draggable,
							dragOverflow,
							maskBlur,
						}

						printLog(
							new Log({
								type: LogType.Info,
								caller: {
									name: 'popup.dialog()',
									type: 'function',
									value: dialog,
								},
								message: `打开对话框 ${id} 成功`,
								group: [
									{
										type: LogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'IController',
									},
									{
										type: LogGroupItemType.Info,
										title: '对话框ID',
										content: id,
										important: true,
									},
									{
										type: LogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[0],
										dataType: 'DialogOption',
									},
									{
										type: LogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<DialogOption>',
									},
								],
							})
						)

						onMounted()
					},
					onUnmounted: (payload?: any) => {
						const index = recordList.findIndex(
							(item) => item.id === id
						)

						if (index !== -1) {
							// id 存在，代表对话框并非被 dialogClose 关闭
							recordList.splice(index, 1)

							resolve(payload)
						}
					},
				})

				recordList.push({
					id,
					instanceId,
					resolve,
				})
			})
		}

		const dialogClose: IDialogClose = async function (payload) {
			const { id, instanceId, resolve } = recordList.pop() || {}

			if (!instanceId) {
				printLog(
					new Log({
						type: LogType.Warning,
						caller: {
							name: 'popup.dialogClose()',
							type: 'function',
							value: dialogClose,
						},
						message: `关闭对话框失败，当前没有正在显示的对话框`,
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
								title: '携带参数',
								dataName: 'payload',
								dataValue: payload,
								dataType: 'any',
							},
						],
					})
				)
				return
			}

			await this.destroy(instanceId, payload)

			printLog(
				new Log({
					type: LogType.Info,
					caller: {
						name: 'popup.dialogClose()',
						type: 'function',
						value: dialogClose,
					},
					message: `关闭对话框 ${id} 成功`,
					group: [
						{
							type: LogGroupItemType.Data,
							title: '控制器',
							dataName: this.id,
							dataValue: this,
							dataType: 'IController',
						},
						{
							type: LogGroupItemType.Info,
							title: '对话框ID',
							content: id!,
							important: true,
						},
						{
							type: LogGroupItemType.Data,
							title: '携带参数',
							dataName: 'payload',
							dataValue: payload,
							dataType: 'any',
						},
					],
				})
			)

			resolve!(payload)
		}

		config.customProperties.dialog = dialog
		config.customProperties.dialogClose = dialogClose
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		dialog: IDialog
		dialogClose: IDialogClose
	}
}
