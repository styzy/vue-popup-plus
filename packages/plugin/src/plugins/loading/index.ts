import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	type InstanceId,
	type IController,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import {
	type GlobalPluginConfig,
	type MergedOption,
	type SharedOption,
	type Theme,
} from '../../typings'
import { requiredCoreVersion } from '../../version'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Loading'
}

type LoadingOption = {
	/**
	 * 加载遮罩主题
	 *
	 * - 默认值：'primary'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 加载遮罩标题文本
	 *
	 * - 默认值：''
	 *
	 * @since 1.3.3
	 */
	title?: string
	/**
	 * 加载遮罩图标大小
	 *
	 * - 默认值：60
	 */
	iconSize?: number
	/**
	 * 是否显示遮罩层
	 *
	 * - 默认值：`true`
	 *
	 * @since 1.5.0
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.3
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 是否禁用滚动
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.6.0
	 */
	disableScroll?: boolean
} & SharedOption

export interface ILoading {
	/**
	 * 显示加载遮罩
	 *
	 * - 全局只会显示一个加载遮罩，每次调用时会先进行判断是否有已存在的加载遮罩
	 * 如果有，则会先关闭已存在的加载遮罩，再显示新的加载遮罩
	 *
	 * - 使用示例：
	 *
	 * ```ts
	 * // 显示加载遮罩
	 * popup.loading()
	 * // 关闭加载遮罩
	 * popup.loadingClose()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await popup.loadingClose()
	 * ```
	 */
	(this: IController, option?: LoadingOption): void
}

export interface ILoadingClose {
	/**
	 * 关闭加载遮罩
	 *
	 * - 使用示例：
	 *
	 * ```ts
	 * // 关闭加载遮罩
	 * popup.loadingClose()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await popup.loadingClose()
	 * ```
	 */
	(this: IController): Promise<void>
}

type LoadingDefaultOption = LoadingOption

export type LoadingConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.loading()` 方法的默认选项
	 */
	defaultOptions?: LoadingDefaultOption
}

let seed = 1

const createId = () => `loading-${seed++}`

export const loading = definePlugin({
	name: 'plugin-preset-loading',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: LoadingConfig = {}
	) => {
		const record: {
			id?: string
			instanceId?: InstanceId
		} = {}

		const loading: ILoading = function ({
			theme = defaultOptions.theme || 'primary',
			title = defaultOptions.title || '',
			iconSize = defaultOptions.iconSize || 60,
			mask = defaultOptions.mask || true,
			maskBlur = defaultOptions.maskBlur || false,
			maskTransparent = defaultOptions.maskTransparent || false,
			disableScroll = defaultOptions.disableScroll || true,
			zIndex = defaultOptions.zIndex,
		} = {}) {
			if (record.id) {
				printLog(
					new Log({
						type: LogType.Warning,
						caller: {
							name: 'popup.loading()',
							type: 'Function',
							value: loading,
						},
						message: `即将自动关闭加载遮罩 ${record.id} ，因为有新的加载遮罩打开`,
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
								title: '待关闭加载遮罩ID',
								content: record.id,
								important: true,
							},
						],
					})
				)

				this.loadingClose()
			}

			const id = createId()

			record.id = id
			record.instanceId = this.render({
				component: () => import('./src/PLoading.vue'),
				componentProps: {
					skin,
					theme,
					title,
					iconSize,
					mask,
					maskTransparent,
					onClose: () => {
						this.loadingClose()
					},
					debugMode: config.debugMode,
				},
				mask,
				maskBlur,
				maskTransparent,
				disableScroll,
				zIndex,
				onMounted: () => {
					const mergedOptions: MergedOption<LoadingOption> = {
						theme,
						title,
						iconSize,
						mask,
						maskBlur,
						maskTransparent,
						disableScroll,
						zIndex,
					}

					printLog(
						new Log({
							type: LogType.Info,
							caller: {
								name: 'popup.loading()',
								type: 'Function',
								value: loading,
							},
							message: `显示加载遮罩 ${id} 成功`,
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
									title: '加载遮罩ID',
									content: id,
									important: true,
								},
								{
									type: LogGroupItemType.Data,
									title: '调用参数',
									dataName: 'options',
									dataValue: arguments[0],
									dataType: 'LoadingOption',
								},
								{
									type: LogGroupItemType.Data,
									title: '合并参数',
									dataName: 'mergedOptions',
									dataValue: mergedOptions,
									dataType: 'Required<LoadingOption>',
								},
							],
						})
					)
				},
			})
		}

		const loadingClose: ILoadingClose = async function () {
			if (!record.id) {
				printLog(
					new Log({
						type: LogType.Warning,
						caller: {
							name: 'popup.loadingClose()',
							type: 'Function',
							value: loadingClose,
						},
						message: `关闭加载遮罩失败，当前不存在加载遮罩`,
						group: [
							{
								type: LogGroupItemType.Data,
								title: '控制器',
								dataName: this.id,
								dataValue: this,
								dataType: 'IController',
							},
						],
					})
				)
				return
			}

			const id = record.id
			const instanceId = record.instanceId!

			record.id = undefined
			record.instanceId = undefined

			await this.destroy(instanceId)

			const log = new Log({
				type: LogType.Info,
				caller: {
					name: 'popup.loadingClose()',
					type: 'Function',
					value: loadingClose,
				},
				message: `关闭加载遮罩 ${id} 成功`,
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
						title: '加载遮罩ID',
						content: id,
						important: true,
					},
				],
			})

			printLog(log)
		}

		config.customProperties.loading = loading
		config.customProperties.loadingClose = loadingClose
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		loading: ILoading
		loadingClose: ILoadingClose
	}
}
