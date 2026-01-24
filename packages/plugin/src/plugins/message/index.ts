import {
	definePlugin,
	LogType,
	LogGroupItemType,
	printLog,
	type IController,
	type InstanceId,
	type Placement,
	POPUP_ANIMATIONS,
} from 'vue-popup-plus'
import { reactive, type Reactive } from 'vue'
import { PluginLog } from '../../log'
import {
	type GlobalPluginConfig,
	type MergedOption,
	type SharedOption,
	type Theme,
} from '../../typings'
import type { Skin } from 'src/skin'
import { requiredCoreVersion } from '../../version'

class Log extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Message'
}

type MessageOption = {
	/**
	 * 主题
	 *
	 * - 默认值： 'primary'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 显示时间，单位毫秒
	 *
	 * - 默认值： 2000 毫秒
	 */
	duration?: number
	/**
	 * 显示位置
	 *
	 * - 默认值为 `top`
	 *
	 */
	placement?: Placement
	/**
	 * 是否显示关闭按钮
	 *
	 * - 默认值： `false`
	 * - 当持续时间为 `0` 时，关闭按钮将会强制显示
	 *
	 */
	showClose?: boolean
	/**
	 * 是否开启鼠标悬停持续显示
	 *
	 * - 默认值： `true`
	 * - 当持续时间为 `0` 时，该参数无效
	 *
	 */
	hoverWait?: boolean
} & SharedOption

type MessageOptionWithoutTheme = Omit<MessageOption, 'theme'>

export interface IMessage {
	(this: IController, content: string, options?: MessageOption): Promise<void>
}

export interface IMessagePrimary {
	(
		this: IController,
		content: string,
		options?: MessageOptionWithoutTheme
	): Promise<void>
}

export interface IMessageSuccess {
	(
		this: IController,
		content: string,
		options?: MessageOptionWithoutTheme
	): Promise<void>
}

export interface IMessageInfo {
	(
		this: IController,
		content: string,
		options?: MessageOptionWithoutTheme
	): Promise<void>
}

export interface IMessageWarning {
	(
		this: IController,
		content: string,
		options?: MessageOptionWithoutTheme
	): Promise<void>
}

export interface IMessageDanger {
	(
		this: IController,
		content: string,
		options?: MessageOptionWithoutTheme
	): Promise<void>
}

type MessageDefaultOption = Omit<MessageOption, 'zIndex'>

export type MessageConfig = GlobalPluginConfig & {
	defaultOptions?: MessageDefaultOption
}

export type MessageRecord = {
	id: string
	content: string
	theme: Theme
	duration: number
	showClose: boolean
	hoverWait: boolean
	resolve: () => void
}

export type MessageGroup = {
	placement: Placement
	list: Reactive<MessageRecord[]>
	instanceId?: InstanceId
}

const groupMap = new Map<Placement, MessageGroup>()

let seed = 1
const createId = () => `message-${seed++}`

function getOrCreateGroup(
	controller: IController,
	placement: Placement,
	skin: Skin,
	zIndex?: number
): MessageGroup {
	let group = groupMap.get(placement)

	if (!group) {
		group = {
			placement,
			list: reactive<MessageRecord[]>([]),
		}

		const instanceId = controller.render({
			component: () => import('./src/PMessageGroup.vue'),
			componentProps: {
				placement,
				list: group.list,
				skin,
				onItemClose: (id: string) => {
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
	controller: IController,
	placement: Placement,
	id: string
) {
	const group = groupMap.get(placement)
	if (!group) return

	const index = group.list.findIndex((item) => item.id === id)
	if (index !== -1) {
		const { content, theme, duration, showClose, hoverWait } =
			group.list[index]

		const messageValue: MessageDefaultOption = {
			theme,
			duration,
			showClose,
			hoverWait,
		}

		const [item] = group.list.splice(index, 1)

		printLog(
			new Log({
				type: LogType.Info,
				caller: {
					name: 'popup.message()',
					type: 'Function',
					value: message,
				},
				message: `关闭消息成功`,
				group: [
					{
						type: LogGroupItemType.Data,
						title: '控制器',
						dataName: controller.id,
						dataValue: controller,
						dataType: 'IController',
					},
					{
						type: LogGroupItemType.Data,
						title: '内容文本',
						dataValue: content,
						dataType: 'string',
					},
					{
						type: LogGroupItemType.Data,
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

	if (group.list.length === 0 && group.instanceId) {
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
		{ skin = 'modern', defaultOptions = {} }: MessageConfig = {}
	) {
		const message: IMessage = function (
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

				group.list.push({
					id,
					content,
					theme,
					duration,
					showClose,
					hoverWait,
					resolve,
				})

				const mergedOptions: MergedOption<MessageOption> = {
					theme,
					placement,
					duration,
					showClose,
					hoverWait,
					zIndex,
				}

				printLog(
					new Log({
						type: LogType.Info,
						caller: {
							name: 'popup.message()',
							type: 'Function',
							value: message,
						},
						message: `打开消息提示成功`,
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
								title: '内容文本',
								dataValue: content,
								dataType: 'string',
							},
							{
								type: LogGroupItemType.Data,
								title: '调用参数',
								dataName: 'options',
								dataValue: arguments[1],
								dataType: 'MessageOption',
							},
							{
								type: LogGroupItemType.Data,
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

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		message: IMessage
		messagePrimary: IMessagePrimary
		messageSuccess: IMessageSuccess
		messageInfo: IMessageInfo
		messageWarning: IMessageWarning
		messageDanger: IMessageDanger
	}
}
