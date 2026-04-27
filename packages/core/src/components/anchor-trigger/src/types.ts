import type { VNodeChild } from 'vue'

export type PopupAnchorTrigger = [
	'click',
	'hover',
	'focus',
	'contextmenu',
][number]

export type PopupAnchorTriggerProps = {
	/**
	 * 触发方式
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
	 * 锚点弹出层视图
	 */
	default: (props: { destroy: () => void }) => VNodeChild
	/**
	 * 锚点元素
	 */
	anchor: () => VNodeChild
}
