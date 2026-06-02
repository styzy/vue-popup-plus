import { type Reactive } from 'vue'
import type {
	PopupController,
	PopupInstanceId,
	PopupPlacement,
} from 'vue-popup-plus'
import type { PluginSharedConfig, SharedOption, Theme } from '@plugin/typings'

export type PopupMessageOption = {
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
	placement?: PopupPlacement
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

type PopupMessageOptionWithoutTheme = Omit<PopupMessageOption, 'theme'>

export interface PopupMessage {
	(
		this: PopupController,
		content: string,
		options?: PopupMessageOption
	): Promise<void>
}

export interface PopupMessagePrimary {
	(
		this: PopupController,
		content: string,
		options?: PopupMessageOptionWithoutTheme
	): Promise<void>
}

export interface PopupMessageSuccess {
	(
		this: PopupController,
		content: string,
		options?: PopupMessageOptionWithoutTheme
	): Promise<void>
}

export interface PopupMessageInfo {
	(
		this: PopupController,
		content: string,
		options?: PopupMessageOptionWithoutTheme
	): Promise<void>
}

export interface PopupMessageWarning {
	(
		this: PopupController,
		content: string,
		options?: PopupMessageOptionWithoutTheme
	): Promise<void>
}

export interface PopupMessageDanger {
	(
		this: PopupController,
		content: string,
		options?: PopupMessageOptionWithoutTheme
	): Promise<void>
}

export type PopupMessageDefaultOption = Omit<PopupMessageOption, 'zIndex'>

export type PopupMessageConfig = PluginSharedConfig & {
	defaultOptions?: PopupMessageDefaultOption
}

export type PopupMessageRecord = {
	id: string
	content: string
	theme: Theme
	duration: number
	showClose: boolean
	hoverWait: boolean
	resolve: () => void
}

export type PopupMessageGroup = {
	placement: PopupPlacement
	messages: Reactive<PopupMessageRecord[]>
	instanceId?: PopupInstanceId
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		message: PopupMessage
		messagePrimary: PopupMessagePrimary
		messageSuccess: PopupMessageSuccess
		messageInfo: PopupMessageInfo
		messageWarning: PopupMessageWarning
		messageDanger: PopupMessageDanger
	}
}
