import { type Component } from 'vue'
import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	type ExtractComponentPropTypes,
	type IController,
	type InstanceId,
	type MaskDestroyHandler,
	type Placement,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import type {
	GlobalPluginConfig,
	MergedOption,
	SharedOption,
} from '../../typings'

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
	 *
	 * @since 1.5.0
	 */
	placement?: Placement
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
	 * 是否显示对话框遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 点击遮罩层是否关闭对话框
	 *
	 * - 默认值为 `false` ，点击遮罩层不会关闭对话框
	 * - 传入 `true` ，点击遮罩层将关闭对话框
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将关闭对话框，可传入关闭携带的负载参数，返回的
	 *   `Promise` 对象会在对话框关闭动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有
	 *
	 * - 使用示例：
	 * ```ts
	 * popup.dialog({
	 *     component: () => import('./HelloWorld.vue'),
	 *     componentProps: {
	 *         maskClose: async (close)=>{
	 *             if(...自定义拦截条件) return
	 *
	 *             // 直接关闭
	 *             close('携带的关闭参数')
	 *
	 *             // 异步等待关闭动画结束
	 *             await close('携带的关闭参数')
	 *             // 关闭后执行其他操作
	 *         },
	 *     },
	 * })
	 * ```
	 *
	 * @since 1.6.0
	 */
	maskClose?: boolean | MaskDestroyHandler
} & SharedOption

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

type DialogDefaultOption = Omit<
	DialogOption,
	'component' | 'componentProps' | 'onMounted' | 'zIndex'
>

export type DialogConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.dialog()` 方法的默认选项
	 */
	defaultOptions?: DialogDefaultOption
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
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: DialogConfig = {}
	) => {
		const recordList: Array<{
			id: string
			instanceId: InstanceId
			resolve: (payload?: any) => void
		}> = []

		const dialog: IDialog = function ({
			title = defaultOptions.title ?? '对话',
			component,
			componentProps = {},
			onMounted = () => {},
			header = defaultOptions.header ?? true,
			headerClose = defaultOptions.headerClose ?? true,
			width = defaultOptions.width ?? 'auto',
			maxWidth = defaultOptions.maxWidth ?? '100%',
			minWidth = defaultOptions.minWidth ?? 'auto',
			height = defaultOptions.height ?? 'auto',
			maxHeight = defaultOptions.maxHeight ?? '100%',
			minHeight = defaultOptions.minHeight ?? 'auto',
			placement = defaultOptions.placement ?? 'center',
			mask = defaultOptions.mask ?? true,
			maskClose = defaultOptions.maskClose ?? false,
			draggable = defaultOptions.draggable ?? false,
			dragOverflow = defaultOptions.dragOverflow ?? false,
			maskBlur = defaultOptions.maskBlur ?? false,
			maskTransparent = defaultOptions.maskTransparent ?? false,
			zIndex,
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
					viewTranslateOverflow: dragOverflow,
					mask,
					maskBlur,
					maskTransparent,
					maskDestroy: maskClose,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<DialogOption> = {
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
							maskClose,
							draggable,
							dragOverflow,
							maskBlur,
							maskTransparent,
							zIndex,
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
