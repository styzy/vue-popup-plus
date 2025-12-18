import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
	type InstanceId,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import { type GlobalOption, type Theme } from '../../typings'

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
	 * - 全局只会显示一个加载遮罩，每次调用时会先进行判断是否有已存在的加载遮罩
	 * 如果有，则会先关闭已存在的加载遮罩，再显示新的加载遮罩
	 *
	 * - 使用示例：
	 *
	 * ```ts
	 * // 显示加载遮罩
	 * popup.loading()
	 * // 关闭加载遮罩
	 * popup.loading.close()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await popup.loading.close()
	 * ```
	 */
	(option?: LoadingOption): void
	/**
	 * 关闭加载遮罩
	 *
	 * - 使用示例：
	 *
	 * ```ts
	 * // 关闭加载遮罩
	 * popup.loading.close()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await popup.loading.close()
	 * ```
	 */
	close(): Promise<void>
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
	install: (controller, config, { skin = 'modern' }: GlobalOption = {}) => {
		const record: {
			id?: string
			instanceId?: InstanceId
		} = {}

		const loading: ILoading = function ({
			theme = 'primary',
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

				stopLoading()
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
						group: [
							{
								type: LogGroupItemType.Data,
								dataName: 'id',
								dataValue: id,
								dataType: 'string',
							},
						],
					})

					if (!record.id) {
						log.caller = 'popup.loading.close()'
						log.message = `关闭加载遮罩 ${id} 成功`
						printLog(log)
						return
					}

					if (record.id !== id) {
						log.caller = 'popup.loading()'
						log.message = `关闭加载遮罩 ${id} 成功，因为有新的加载遮罩打开`
						log.group.push({
							type: LogGroupItemType.Data,
							dataName: 'new loading id',
							dataValue: record.id,
							dataType: 'string',
						})
						printLog(log)
					} else {
						log.caller = 'popup.loading.close()'
						log.message = `关闭加载遮罩 ${id} 成功`
						printLog(log)
					}
				},
			})

			record.id = id
			record.instanceId = instanceId

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
		}

		async function stopLoading() {
			if (!record.id) {
				printLog(
					new Log({
						type: LogType.Warning,
						caller: 'popup.loading.close()',
						message: `关闭加载遮罩失败，当前不存在加载遮罩`,
					})
				)
				return
			}

			record.id = undefined
			const instanceId = record.instanceId!
			record.instanceId = undefined

			await controller.destroy(instanceId)
		}

		loading.close = stopLoading

		controller.customProperties.loading = loading
	},
})
