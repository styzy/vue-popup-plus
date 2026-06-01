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
	PopupDialog,
	PopupDialogClose,
	PopupDialogConfig,
	PopupDialogOption,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Dialog'
}

let seed = 1

const createId = () => `dialog-${seed++}`

export const dialog = definePlugin({
	name: 'plugin-preset-dialog',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupDialogConfig = {}
	) => {
		const recordList: Array<{
			id: string
			instanceId: PopupInstanceId
			resolve: (payload?: any) => void
		}> = []

		const dialog: PopupDialog = function ({
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
					component: () => import('./index.vue'),
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
					disableScroll: true,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<PopupDialogOption> = {
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
							maskBlur,
							maskTransparent,
							maskClose,
							draggable,
							dragOverflow,
							zIndex,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.dialog()',
									type: 'function',
									value: dialog,
								},
								message: `打开对话框 ${id} 成功`,
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
										title: '对话框ID',
										content: id,
										important: true,
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[0],
										dataType: 'DialogOption',
									},
									{
										type: PopupLogGroupItemType.Data,
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

		const dialogClose: PopupDialogClose = async function (payload) {
			const { id, instanceId, resolve } = recordList.pop() || {}

			if (!instanceId) {
				printLog(
					new PopupLog({
						type: PopupLogType.Warning,
						caller: {
							name: 'popup.dialogClose()',
							type: 'function',
							value: dialogClose,
						},
						message: `关闭对话框失败，当前没有正在显示的对话框`,
						group: [
							{
								type: PopupLogGroupItemType.Data,
								title: '控制器',
								dataName: this.id,
								dataValue: this,
								dataType: 'PopupController',
							},
							{
								type: PopupLogGroupItemType.Data,
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
				new PopupLog({
					type: PopupLogType.Info,
					caller: {
						name: 'popup.dialogClose()',
						type: 'function',
						value: dialogClose,
					},
					message: `关闭对话框 ${id} 成功`,
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
							title: '对话框ID',
							content: id!,
							important: true,
						},
						{
							type: PopupLogGroupItemType.Data,
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
