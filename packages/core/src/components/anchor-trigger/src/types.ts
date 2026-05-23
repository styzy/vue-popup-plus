import type { VNodeChild } from 'vue'
import type {
	PopupAnchorPlacement,
	PopupAnchorShift,
	PopupRenderAnchorOption,
	PopupRenderConfigOption,
	PopupRenderMaskOption,
	PopupRenderStyleOption,
	PopupRenderViewOption,
} from '../../../controller'

export type PopupAnchorTrigger = [
	'click',
	'hover',
	'focus',
	'contextmenu',
][number]

type TriggerProps = {
	/**
	 * 触发方式
	 *
	 * - 默认值为 `'hover'` ，即鼠标悬停触发
	 * - 可以使用数组指定多个触发方式
	 *
	 * - 可选值包括：
	 *   - `click` ：点击触发
	 *   - `hover` ：鼠标悬停触发
	 *   - `focus` ：焦点触发
	 *   - `contextmenu` ：右键菜单触发
	 */
	trigger?: PopupAnchorTrigger | PopupAnchorTrigger[]
	/**
	 * 渲染延迟时间
	 *
	 * - 默认值为 0 ，单位为毫秒
	 * - 用于设置渲染弹出层的延迟时间
	 */
	renderDelay?: number
	/**
	 * 销毁延迟时间
	 *
	 * - 默认值为 200 ，单位为毫秒
	 * - 用于设置销毁弹出层的延迟时间
	 */
	destroyDelay?: number
}

type AnchorProps = Omit<PopupRenderAnchorOption, 'anchor'>

type ConfigProps = Omit<PopupRenderConfigOption, 'placement'>

export type PopupAnchorTriggerProps = TriggerProps &
	ConfigProps &
	AnchorProps &
	PopupRenderStyleOption &
	PopupRenderViewOption &
	PopupRenderMaskOption

export type PopupAnchorTriggerEmits = {
	/**
	 * 显示时触发
	 */
	render: []
	/**
	 * 隐藏时触发
	 */
	destroy: []
}

export type PopupAnchorTriggerSlots = {
	/**
	 * 锚点元素
	 */
	default: () => VNodeChild
	/**
	 * 锚点弹出层视图
	 */
	popup: (props: { destroy: () => void }) => VNodeChild
}
