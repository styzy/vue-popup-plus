import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
	type PopupInstanceId,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type {
	PopupLoading,
	PopupLoadingClose,
	PopupLoadingConfig,
	PopupLoadingOption,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Loading'
}

let seed = 1

const createId = () => `loading-${seed++}`

export const loading = definePlugin({
	name: 'plugin-preset-loading',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupLoadingConfig = {}
	) => {
		const record: {
			id?: string
			instanceId?: PopupInstanceId
		} = {}

		const loading: PopupLoading = function ({
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
					new PopupLog({
						type: PopupLogType.Warning,
						caller: {
							name: 'popup.loading()',
							type: 'Function',
							value: loading,
						},
						message: `即将自动关闭加载遮罩 ${record.id} ，因为有新的加载遮罩打开`,
						group: [
							{
								type: PopupLogGroupItemType.Data,
								title: '控制器',
								dataName: this.id,
								dataValue: this,
								dataType: 'PopupController',
							},
							{
								type: PopupLogGroupItemType.Info,
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
				component: () => import('./index.vue'),
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
					const mergedOptions: MergedOption<PopupLoadingOption> = {
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
						new PopupLog({
							type: PopupLogType.Info,
							caller: {
								name: 'popup.loading()',
								type: 'Function',
								value: loading,
							},
							message: `显示加载遮罩 ${id} 成功`,
							group: [
								{
									type: PopupLogGroupItemType.Data,
									title: '控制器',
									dataName: this.id,
									dataValue: this,
									dataType: 'PopupController',
								},
								{
									type: PopupLogGroupItemType.Info,
									title: '加载遮罩ID',
									content: id,
									important: true,
								},
								{
									type: PopupLogGroupItemType.Data,
									title: '调用参数',
									dataName: 'options',
									dataValue: arguments[0],
									dataType: 'LoadingOption',
								},
								{
									type: PopupLogGroupItemType.Data,
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

		const loadingClose: PopupLoadingClose = async function () {
			if (!record.id) {
				printLog(
					new PopupLog({
						type: PopupLogType.Warning,
						caller: {
							name: 'popup.loadingClose()',
							type: 'Function',
							value: loadingClose,
						},
						message: `关闭加载遮罩失败，当前不存在加载遮罩`,
						group: [
							{
								type: PopupLogGroupItemType.Data,
								title: '控制器',
								dataName: this.id,
								dataValue: this,
								dataType: 'PopupController',
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

			const log = new PopupLog({
				type: PopupLogType.Info,
				caller: {
					name: 'popup.loadingClose()',
					type: 'Function',
					value: loadingClose,
				},
				message: `关闭加载遮罩 ${id} 成功`,
				group: [
					{
						type: PopupLogGroupItemType.Data,
						title: '控制器',
						dataName: this.id,
						dataValue: this,
						dataType: 'PopupController',
					},
					{
						type: PopupLogGroupItemType.Info,
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
