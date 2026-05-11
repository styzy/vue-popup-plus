import type { VNodeChild } from 'vue'
import type {
	PopupAnchorPlacement,
	PopupAnchorShift,
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

type AnchorProps = {
	/**
	 * 是否在视窗空间不足时进行翻转
	 *
	 * - 默认值为 false，即不进行自动翻转
	 * - 当视窗空间不足时，自动进行翻转以保持弹出层在视窗范围内，
	 *   并在视窗空间满足渲染时恢复到原始定义的位置
	 */
	flip?: boolean
	/**
	 * 自动翻转时的提前偏移量
	 *
	 * - 自动翻转时的提前移量，主要用于
	 *   防止出现达到临界值时的闪烁现象
	 * - 默认值为 0 ，即不提前移移，与原始定义位置一致
	 * - 仅在 `flip` 参数为 `true` 时有效
	 */
	flipAdvance?: number
	/**
	 * 是否在视窗空间不足时进行平移
	 *
	 * - 默认为 `'none'`，即不进行平移
	 * - 当视窗空间不足时，自动进行平移以保持弹出层在视窗范围内，
	 *   并在视窗空间满足渲染时恢复到原始定义的位置
	 *
	 * - 可选值包括：
	 *   - `both` ：在主轴和侧轴上都进行平移，相当于完全
	 *     不会超出视窗范围
	 *   - `mainAxis` ：在主轴上进行平移
	 *   - `crossAxis` ：在侧轴上进行平移
	 *   - `none` ：不进行平移
	 */
	shift?: PopupAnchorShift
}

type ConfigProps = Omit<PopupRenderConfigOption, 'placement'> & {
	/**
	 * 锚点弹出层位置与对齐方式
	 *
	 * - 默认为 `'top'` ，即顶部居中对齐
	 * - 指定弹出层渲染对于锚点的对齐方式
	 * - 仅在 `anchor` 参数指定锚点元素时有效
	 *
	 * - 可选值包括：
	 *   - `left-start` ：左侧，顶部对齐
	 *   - `left` ：左侧，居中对齐
	 *   - `left-end` ：左侧，底部对齐
	 *   - `top-start` ：顶部，左侧对齐
	 *   - `top` ：顶部，居中对齐
	 *   - `top-end` ：顶部，右侧对齐
	 *   - `bottom-start` ：底部，左侧对齐
	 *   - `bottom` ：底部，居中对齐
	 *   - `bottom-end` ：底部，右侧对齐
	 *   - `right-start` ：右侧，顶部对齐
	 *   - `right` ：右侧，居中对齐
	 *   - `right-end` ：右侧，底部对齐
	 */
	placement?: PopupAnchorPlacement
}

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
