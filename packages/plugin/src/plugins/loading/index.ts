import {
	definePlugin,
	Log as CoreLog,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	type InstanceId,
} from 'vue-popup-plus'
import { type GlobalOption, type Theme } from '../../typings'

class Log extends CoreLog {
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
	 */
	title?: string
	/**
	 * 加载遮罩图标大小
	 *
	 * - 默认值：60
	 */
	iconSize?: number
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 */
	maskBlur?: boolean
}

export interface ILoading {
	/**
	 * 显示加载遮罩
	 *
	 * - 返回关闭加载遮罩的方法，调用后关闭加载遮罩
	 * - 使用示例：
	 *
	 * ```ts
	 * const stopLoading = popup.loading()
	 * // 关闭加载遮罩
	 * stopLoading()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await stopLoading()
	 * ```
	 */
	(option?: LoadingOption): () => Promise<void>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		loading: ILoading
	}
}

let seed = 1

const createId = () => `loading-${seed++}`

export const loading = definePlugin({
	name: 'plugin-preset-loading',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (controller, config, { skin = 'classic' }: GlobalOption = {}) => {
		const record: {
			id?: string
			instanceId?: InstanceId
			stopLoading?: () => Promise<void>
		} = {}

		const loading: ILoading = function ({
			theme = 'default',
			title = '',
			iconSize = 60,
			maskBlur = true,
		}: LoadingOption = {}) {
			if (record.id) {
				printLog(
					new Log({
						type: LogType.Warning,
						caller: 'popup.loading()',
						message: `即将自动关闭加载遮罩 ${record.id} ，因为有新的加载遮罩打开`,
						group: [
							{
								type: LogGroupItemType.Data,
								dataName: 'id',
								dataValue: record.id,
								dataType: 'string',
							},
						],
					})
				)

				record.stopLoading?.()
			}

			const id = createId()

			const instanceId = controller.render({
				component: () => import('./src/PLoading.vue'),
				componentProps: {
					skin,
					theme,
					title,
					iconSize,
					debugMode: config.debugMode,
				},
				maskBlur,
				zIndex: 99999999,
				onUnmounted() {
					const log = new Log({
						type: LogType.Info,
					})

					if (!record.id) {
						log.caller = 'popup.loading()()'
						log.message = `关闭加载遮罩 ${id} 成功`
						printLog(log)
						return
					}

					if (record.id !== id) {
						log.caller = 'popup.loading()'
						log.message = `关闭加载遮罩 ${id} 成功，因为有新的加载遮罩打开`
						log.group.push({
							type: LogGroupItemType.Data,
							dataName: 'id',
							dataValue: id,
							dataType: 'string',
						})
						log.group.push({
							type: LogGroupItemType.Data,
							dataName: 'new loading id',
							dataValue: record.id,
							dataType: 'string',
						})
						printLog(log)
					} else {
						printLog(
							new Log({
								type: LogType.Info,
								caller: 'popup.destroy()',
								message: `关闭加载遮罩 ${id} 成功`,
							})
						)
					}
				},
			})

			const stopLoading = async () => {
				const log = new Log({
					caller: 'popup.loading()()',
				})

				if (!record.id) {
					log.type = LogType.Warning
					log.message = `关闭加载遮罩 ${id} 失败，该加载遮罩已被关闭`
					printLog(log)
					return
				}

				if (record.id !== id) {
					log.type = LogType.Warning
					log.message = `关闭加载遮罩 ${id} 失败，该加载遮罩已被关闭`
					printLog(log)
					return
				}

				record.id = undefined
				record.instanceId = undefined

				await controller.destroy(instanceId)
			}

			record.id = id
			record.instanceId = instanceId
			record.stopLoading = stopLoading

			const mergedOptions: Required<LoadingOption> = {
				theme,
				title,
				iconSize,
				maskBlur,
			}

			printLog(
				new Log({
					type: LogType.Info,
					caller: 'popup.loading()',
					message: `显示加载遮罩 ${id} 成功`,
					group: [
						{
							type: LogGroupItemType.Data,
							dataName: 'original options',
							dataValue: arguments[1],
							dataType: 'LoadingOption',
						},
						{
							type: LogGroupItemType.Data,
							dataName: 'merged options',
							dataValue: mergedOptions,
							dataType: 'Required<LoadingOption>',
						},
					],
				})
			)

			return stopLoading
		}

		controller.customProperties.loading = loading
	},
})
