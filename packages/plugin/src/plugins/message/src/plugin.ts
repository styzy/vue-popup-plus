import { reactive } from 'vue'
import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
	type PopupController,
	type PopupPlacement,
	POPUP_ANIMATIONS,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import type { PopupSkin } from '@plugin/skin'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type {
	PopupMessage,
	PopupMessageConfig,
	PopupMessageDefaultOption,
	PopupMessageGroup,
	PopupMessageOption,
	PopupMessageRecord,
} from './types'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Message'
}

const groupMap = new Map<PopupPlacement, PopupMessageGroup>()

let seed = 1
const createId = () => `message-${seed++}`

function getOrCreateGroup(
	controller: PopupController,
	placement: PopupPlacement,
	skin: PopupSkin,
	zIndex?: number
): PopupMessageGroup {
	let group = groupMap.get(placement)

	if (!group) {
		group = {
			placement,
			messages: reactive<PopupMessageRecord[]>([]),
		}

		const instanceId = controller.render({
			component: () => import('./index.vue'),
			componentProps: {
				messages: group.messages,
				skin,
				onMessageClose: (id: string) => {
					removeMessage(controller, placement, id)
				},
			},
			placement,
			viewAnimation: POPUP_ANIMATIONS.FADE,
			mask: false,
			disableScroll: false,
			zIndex,
		})

		group.instanceId = instanceId
		groupMap.set(placement, group)
	}

	return group
}

function removeMessage(
	controller: PopupController,
	placement: PopupPlacement,
	id: string
) {
	const group = groupMap.get(placement)
	if (!group) return

	const index = group.messages.findIndex((item) => item.id === id)
	if (index !== -1) {
		const { content, theme, duration, showClose, hoverWait } =
			group.messages[index]

		const messageValue: PopupMessageDefaultOption = {
			theme,
			duration,
			showClose,
			hoverWait,
		}

		const [item] = group.messages.splice(index, 1)

		printLog(
			new PopupLog({
				type: PopupLogType.Info,
				caller: {
					name: 'popup.message()',
					type: 'Function',
					value: message,
				},
				message: `关闭消息成功`,
				group: [
					{
						type: PopupLogGroupItemType.Data,
						title: '控制器',
						dataName: controller.id,
						dataValue: controller,
						dataType: 'PopupController',
					},
					{
						type: PopupLogGroupItemType.Data,
						title: '内容文本',
						dataValue: content,
						dataType: 'string',
					},
					{
						type: PopupLogGroupItemType.Data,
						title: '渲染参数',
						dataName: 'options',
						dataValue: messageValue,
						dataType: 'MessageOption',
					},
				],
			})
		)

		item.resolve()
	}

	if (group.messages.length === 0 && group.instanceId) {
		controller.destroy(group.instanceId)
		groupMap.delete(placement)
	}
}

export const message = definePlugin({
	name: 'plugin-preset-message',
	author: 'Sakura',
	requiredCoreVersion,
	install(
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupMessageConfig = {}
	) {
		const message: PopupMessage = function (
			content = '',
			{
				theme = defaultOptions.theme ?? 'primary',
				placement = defaultOptions.placement ?? 'top',
				duration = defaultOptions.duration ?? 2000,
				showClose = defaultOptions.showClose ?? false,
				hoverWait = defaultOptions.hoverWait ?? true,
				zIndex,
			} = {}
		) {
			return new Promise((resolve) => {
				const id = createId()

				const group = getOrCreateGroup(this, placement, skin, zIndex)

				group.messages.push({
					id,
					content,
					theme,
					duration,
					showClose,
					hoverWait,
					resolve,
				})

				const mergedOptions: MergedOption<PopupMessageOption> = {
					theme,
					placement,
					duration,
					showClose,
					hoverWait,
					zIndex,
				}

				printLog(
					new PopupLog({
						type: PopupLogType.Info,
						caller: {
							name: 'popup.message()',
							type: 'Function',
							value: message,
						},
						message: `打开消息成功`,
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
								title: '内容文本',
								dataValue: content,
								dataType: 'string',
							},
							{
								type: PopupLogGroupItemType.Data,
								title: '调用参数',
								dataName: 'options',
								dataValue: arguments[1],
								dataType: 'MessageOption',
							},
							{
								type: PopupLogGroupItemType.Data,
								title: '合并参数',
								dataName: 'mergedOptions',
								dataValue: mergedOptions,
								dataType: 'Required<MessageOption>',
							},
						],
					})
				)
			})
		}

		config.customProperties.message = message

		config.customProperties.messagePrimary = function (content, options) {
			return message.call(this, content, { theme: 'primary', ...options })
		}

		config.customProperties.messageSuccess = function (content, options) {
			return message.call(this, content, { theme: 'success', ...options })
		}

		config.customProperties.messageInfo = function (content, options) {
			return message.call(this, content, { theme: 'info', ...options })
		}

		config.customProperties.messageWarning = function (content, options) {
			return message.call(this, content, { theme: 'warning', ...options })
		}

		config.customProperties.messageDanger = function (content, options) {
			return message.call(this, content, { theme: 'danger', ...options })
		}
	},
})
