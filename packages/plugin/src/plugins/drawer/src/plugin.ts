import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
	POPUP_ANIMATIONS,
	type PopupInstanceId,
} from 'vue-popup-plus'
import { useLocale } from '@plugin/locale'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type {
	PopupDrawer,
	PopupDrawerClose,
	PopupDrawerConfig,
	PopupDrawerOption,
	PopupDrawerPlacement,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Drawer'
}

const { t } = useLocale()

let seed = 1

const createId = () => `drawer-${seed++}`

// 注册插件
export const drawer = definePlugin({
	name: 'plugin-preset-drawer',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupDrawerConfig = {}
	) => {
		const recordList: Array<{
			id: string
			instanceId: PopupInstanceId
			resolve: (payload?: any) => void
		}> = []

		const drawer: PopupDrawer = function ({
			title = defaultOptions.title ?? t('drawer.title'),
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
			maskClose = defaultOptions.maskClose ?? true,
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
					viewAnimation: getAnimation(placement),
					mask,
					maskDestroy: maskClose,
					maskBlur,
					maskTransparent,
					disableScroll: true,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<PopupDrawerOption> = {
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
							maskBlur,
							maskTransparent,
							maskClose,
							zIndex,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.drawer()',
									type: 'function',
									value: drawer,
								},
								message: `打开抽屉 ${id} 成功`,
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
										title: '抽屉ID',
										content: id,
										important: true,
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[0],
										dataType: 'DrawerOption',
									},
									{
										type: PopupLogGroupItemType.Data,
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

		const drawerClose: PopupDrawerClose = async function (payload) {
			const { id, instanceId, resolve } = recordList.pop() || {}

			if (!instanceId) {
				printLog(
					new PopupLog({
						type: PopupLogType.Warning,
						caller: {
							name: 'popup.drawerClose()',
							type: 'function',
							value: drawerClose,
						},
						message: `关闭抽屉失败，当前没有正在显示的抽屉`,
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
						name: 'popup.drawerClose()',
						type: 'function',
						value: drawerClose,
					},
					message: `关闭抽屉 ${id} 成功`,
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
							title: '抽屉ID',
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

		function getAnimation(placement: PopupDrawerPlacement) {
			switch (placement) {
				case 'top':
					return POPUP_ANIMATIONS.FLY_TOP
				case 'right':
					return POPUP_ANIMATIONS.FLY_RIGHT
				case 'bottom':
					return POPUP_ANIMATIONS.FLY_BOTTOM
				case 'left':
					return POPUP_ANIMATIONS.FLY_LEFT
				default:
					return
			}
		}

		config.customProperties.drawer = drawer
		config.customProperties.drawerClose = drawerClose
	},
})
