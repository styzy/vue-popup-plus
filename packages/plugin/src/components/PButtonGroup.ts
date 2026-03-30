import type { InjectionKey, Ref, VNode } from 'vue'
import {
	type PButtonSize,
	type PButtonTheme,
	type PButtonType,
} from './PButton'

export type PButtonGroupDirection = ['horizontal', 'vertical'][number]

export type PButtonGroupAlign = ['start', 'center', 'end'][number]

export type PButtonGroupProps = {
	/**
	 * 按钮组类型
	 *
	 * - 可统一设置按钮组内按钮的类型
	 * - 优先级低于按钮的类型属性
	 * - 默认值为 `fill`
	 */
	type?: PButtonType
	/**
	 * 按钮组主题
	 *
	 * - 可统一设置按钮组内按钮的主题
	 * - 优先级低于按钮的主题属性
	 * - 默认值为 `default`
	 */
	theme?: PButtonTheme
	/**
	 * 按钮组尺寸
	 *
	 * - 可统一设置按钮组内按钮的尺寸
	 * - 优先级低于按钮的尺寸属性
	 * - 默认值为 `medium`
	 */
	size?: PButtonSize
	/**
	 * 按钮组方向
	 *
	 * - 默认值为 `horizontal`
	 */
	direction?: PButtonGroupDirection
	/**
	 * 按钮组对齐方式
	 *
	 * - 默认值为 `start`
	 */
	align?: PButtonGroupAlign
	/**
	 * 按钮组交叉轴对齐方式
	 *
	 * - 默认值为 `start`
	 */
	crossAlign?: PButtonGroupAlign
	/**
	 * 是否紧凑模式
	 *
	 * - 默认值为 `false`
	 */
	tight?: boolean
	/**
	 * 是否显示分割线
	 *
	 * - 默认值为 `false`
	 */
	cutline?: boolean
	/**
	 * 是否禁用按钮组
	 *
	 * - 默认值为 `false`
	 */
	disabled?: boolean
}

export type PButtonGroupSlots = {
	default: () => VNode[]
}

export type PButtonGroupInjects = {
	/**
	 * 按钮组类型注入键
	 */
	groupType: InjectionKey<Ref<PButtonGroupProps['type']>>
	/**
	 * 按钮组主题注入键
	 */
	groupTheme: InjectionKey<Ref<PButtonGroupProps['theme']>>
	/**
	 * 按钮组尺寸注入键
	 */
	groupSize: InjectionKey<Ref<PButtonGroupProps['size']>>
	/**
	 * 按钮组禁用注入键
	 */
	groupDisabled: InjectionKey<Ref<PButtonGroupProps['disabled']>>
}

export const buttonGroupInjects: PButtonGroupInjects = {
	groupType: Symbol('groupType'),
	groupTheme: Symbol('groupTheme'),
	groupSize: Symbol('groupSize'),
	groupDisabled: Symbol('groupDisabled'),
}
