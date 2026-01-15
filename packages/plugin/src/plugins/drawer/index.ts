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
import type {
	GlobalPluginConfig,
	MergedOption,
	SharedOption,
} from '../../typings'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Drawer'
}

// 抽屉的配置（插件使用者传入的参数类型）
type DrawerOption<TComponent extends Component = Component> = {
	/**
	 * 抽屉标题
	 *
	 * - 默认值为 `抽屉`
	 */
	title?: string
	/**
	 * 抽屉内容组件
	 */
	component: TComponent
	/**
	 * 抽屉内容组件props
	 */
	componentProps?: ExtractComponentPropTypes<TComponent>
	/**
	 * 抽屉渲染完成时调用的回调函数
	 */
	onMounted?: () => void
	/**
	 * 是否显示抽屉标题栏
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
	 * 抽屉尺寸
	 *
	 * - 默认值为 `auto`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表高度
	 * - 支持 `string` 或 `number` 类型
	 */
	size?: string | number
	/**
	 * 抽屉最大尺寸
	 *
	 * - 默认值为 `100%`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表抽屉最大宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表抽屉最大高度
	 */
	maxSize?: string | number
	/**
	 * 抽屉最小尺寸
	 *
	 * - 默认值为 `auto`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表抽屉最小宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表抽屉最小高度
	 * - 支持 `string` 或 `number` 类型
	 */
	minSize?: string | number
	/**
	 * 抽屉位置
	 *
	 * - 默认值为 `right`
	 */
	placement?: 'top' | 'right' | 'bottom' | 'left'
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
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 */
	maskTransparent?: boolean
	/**
	 * 是否点击遮罩层关闭对话框
	 *
	 * - 默认值为 `false`
	 */
	maskClose?: boolean
} & SharedOption

// popup.drawer()这个方法的类型
export interface IDrawer {
	/**
	 * 显示抽屉
	 *
	 * - 抽屉内部组件可通过调用 `drawerClose(payload)`
	 *   关闭抽屉，payload 为关闭时传递的参数
	 * - 如需获取抽屉关闭时传递的参数，可在调用 `drawer` 方法时使用 `await` 关键字等待
	 *   Promise resolve 后获取
	 * - 抽屉关闭时，无论是否传递了参数，Promise 都将 resolve，因此需要在调用时判断是	否有返回参数
	 */
	<T extends any = any, TComponent extends Component = Component>(
		this: IController,
		options: DrawerOption<TComponent>
	): Promise<T | void>
}

export interface IDrawerClose {
	/**
	 * 关闭抽屉
	 *
	 * - 将会关闭最后一个创建的抽屉
	 * - 如果当前没有抽屉正在显示，则不会有任何效果	，调试模式下会抛出警告
	 * - 可传递任意类型的参数，该参数将会被传递给打开对话框时的 Promise resolve 函数
	 * @param payload 关闭时传递的参数
	 */
	<T extends any = any>(this: IController, payload?: T): Promise<void>
}

// 给全局安装插件定义类型
type DrawerDefaultOption = Omit<
	DrawerOption,
	'component' | 'componentProps' | 'onMounted' | 'zIndex'
>

export type DrawerConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.drawer()` 方法的默认选项
	 */
	defaultOptions?: DrawerDefaultOption
}

let seed = 1

const createId = () => `drawer-${seed++}`

// 注册插件
export const drawer = definePlugin({
	name: 'plugin-preset-drawer',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: DrawerConfig = {}
	) => {
		const recordList: Array<{
			id: string
			instanceId: InstanceId
			resolve: (payload?: any) => void
		}> = []

		const drawer: IDrawer = function ({
			title = defaultOptions.title ?? '抽屉',
			component,
			componentProps = {},
			onMounted = () => {},
			header = defaultOptions.header ?? true,
			headerClose = defaultOptions.headerClose ?? true,
			size = defaultOptions.size ?? 'auto',
			maxSize = defaultOptions.maxSize ?? '100%',
			minSize = defaultOptions.minSize ?? 'auto',
			placement = defaultOptions.placement ?? 'right',
			mask = defaultOptions.mask ?? true,
			maskClose = defaultOptions.maskClose ?? false,
			maskBlur = defaultOptions.maskBlur ?? false,
			maskTransparent = defaultOptions.maskTransparent ?? false,
			zIndex,
		}) {
			return new Promise((resolve) => {
				const id = createId()
				const instanceId = this.render({
					component: () => import('./src/PDrawer.vue'),
					componentProps: {
						skin,
						id,
						title,
						customComponent: component,
						customComponentProps: componentProps,
						draggable: false,
						header,
						headerClose,
						onClose: () => {
							this.drawerClose()
						},
						debugMode: config.debugMode,
					},
					width: ['left', 'right'].includes(placement)
						? size
						: '100%',
					maxWidth: ['left', 'right'].includes(placement)
						? maxSize
						: undefined,
					minWidth: ['left', 'right'].includes(placement)
						? minSize
						: undefined,
					height: ['top', 'bottom'].includes(placement)
						? size
						: '100%',
					maxHeight: ['top', 'bottom'].includes(placement)
						? maxSize
						: undefined,
					minHeight: ['top', 'bottom'].includes(placement)
						? minSize
						: undefined,
					placement,
					mask,
					maskDestroy: maskClose,
					maskBlur,
					maskTransparent,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<DrawerOption> = {
							title,
							component,
							componentProps,
							onMounted,
							header,
							headerClose,
							maxSize,
							minSize,
							size,
							placement,
							mask,
							maskClose,
							maskBlur,
							maskTransparent,
							zIndex,
						}

						printLog(
							new Log({
								type: LogType.Info,
								caller: {
									name: 'popup.drawer()',
									type: 'function',
									value: drawer,
								},
								message: `打开抽屉 ${id} 成功`,
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
										dataType: 'DrawerOption',
									},
									{
										type: LogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<DrawerOption>',
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
							// id 存在，代表抽屉并非被 drawerClose 关闭
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

		const drawerClose: IDrawerClose = async function (payload) {
			const { id, instanceId, resolve } = recordList.pop() || {}

			if (!instanceId) {
				printLog(
					new Log({
						type: LogType.Warning,
						caller: {
							name: 'popup.drawerClose()',
							type: 'function',
							value: drawerClose,
						},
						message: `关闭抽屉失败，当前没有正在显示的抽屉`,
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
						name: 'popup.drawerClose()',
						type: 'function',
						value: drawerClose,
					},
					message: `关闭抽屉 ${id} 成功`,
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

		config.customProperties.drawer = drawer
		config.customProperties.drawerClose = drawerClose
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		drawer: IDrawer
		drawerClose: IDrawerClose
	}
}
