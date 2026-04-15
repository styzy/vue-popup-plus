import type { ComputedRef, InjectionKey } from 'vue'
import type { AnchorPlacement } from '../controller'
import type { ICore } from '../core'
import type { Instance, InstanceId } from '../instance'
import type { ComputedStyle } from '../typings'

// 组件名称
export const P_COMPONENT_NAMES = {
	ROOT: 'PopupRoot',
} as const

// 内部组件名称
export const P_INSIDE_COMPONENT_NAMES = {
	ANCHOR_FRAME: 'PopupAnchorFrame',
	ANIMATION: 'PopupAnimation',
	FRAME: 'PopupFrame',
	INSTANCE: 'PopupInstance',
	MASK: 'PopupMask',
	VIEW: 'PopupView',
} as const

// BEM 命名规范
export const P_BEM_CONFIG = {
	COMMON_SPERATOR: '-',
	ELEMENT_SPERATOR: '__',
	MODIFY_SPERATOR: '--',
	STATE_SPERATOR: 'is-',
}

/**
 * 命名空间
 */
const P_NAME_SPACE: string = 'vue-popup-plus'

/**
 * 组件注入键类型
 */
type PComponentInjectKeys = {
	/**
	 * 当前组件所在弹出层的实例ID
	 *
	 * - 可用于销毁当前弹出层
	 * - 使用示例：
	 *
	 * ```ts
	 * // 弹出层渲染的所有子代组件中
	 * import { inject } from 'vue'
	 * import {
	 * 	usePopup,
	 * 	POPUP_COMPONENT_INJECTS,
	 * } from 'vue-popup-plus'
	 *
	 * // 获取弹出层控制器
	 * const popup = usePopup()
	 *
	 * // 获取当前组件所在弹出层的实例ID
	 * const instanceId = inject(
	 * 	POPUP_COMPONENT_INJECTS.INSTANCE_ID
	 * )
	 *
	 * // 销毁当前弹出层
	 * popup.destroy(instanceId)
	 * ```
	 */
	INSTANCE_ID: InjectionKey<InstanceId>
	/**
	 * 弹出层视图样式
	 *
	 * - 可在弹出层内部组件内获取弹出层根级视图组件的样式
	 * - 所有的样式具有响应性。
	 * - 使用示例：
	 *
	 * ```ts
	 * // 弹出层渲染的所有子代组件中
	 * import { inject } from 'vue'
	 * import {
	 * 	usePopup,
	 * 	POPUP_COMPONENT_INJECTS,
	 * } from 'vue-popup-plus'
	 *
	 * // 获取弹出层控制器
	 * const popup = usePopup()
	 *
	 * // 获取当前组件所在弹出层的实例ID
	 * const instanceId = inject(
	 * 	POPUP_COMPONENT_INJECTS.INSTANCE_ID
	 * )
	 *
	 * // 获取弹出层根级视图组件的样式
	 * const computedViewStyle = inject(
	 * 	POPUP_COMPONENT_INJECTS.INSTANCE_VIEW_STYLE
	 * )
	 * ```
	 */
	COMPUTED_STYLE: InjectionKey<ComputedStyle>
	/**
	 * 锚点弹出层实际位置
	 *
	 * - 可在弹出层内部组件内获取锚点弹出层的实际位置
	 * - 使用示例：
	 *
	 * ```ts
	 * // 弹出层渲染的所有子代组件中
	 * import { inject } from 'vue'
	 * import {
	 * 	usePopup,
	 * 	POPUP_COMPONENT_INJECTS,
	 * } from 'vue-popup-plus'
	 *
	 * // 获取弹出层控制器
	 * const popup = usePopup()
	 *
	 * // 获取当前组件所在弹出层的实际位置
	 * const actualAnchorPlacement = inject(
	 * 	POPUP_COMPONENT_INJECTS.ACTUAL_ANCHOR_PLACEMENT
	 * )
	 * ```
	 */
	ACTUAL_ANCHOR_PLACEMENT: InjectionKey<ComputedRef<AnchorPlacement>>
}

/**
 * 弹出层内部组件注入属性
 *
 * - 在弹出层内部渲染的所有子代组件中，都可以通过 inject 注入弹出层所提供的相关参数
 */
export const POPUP_COMPONENT_INJECTS: Readonly<PComponentInjectKeys> = {
	INSTANCE_ID: Symbol(`${P_NAME_SPACE}-instance-id`),
	COMPUTED_STYLE: Symbol(`${P_NAME_SPACE}-computed-style`),
	ACTUAL_ANCHOR_PLACEMENT: Symbol(`${P_NAME_SPACE}-actual-anchor-placement`),
}

/**
 * 内置源码组件注入键类型
 */
type PInsideComponentInjectKeys = {
	/**
	 * 弹出层核心实例
	 */
	CORE: InjectionKey<ICore>
	/**
	 * 弹出层实例
	 */
	INSTANCE: InjectionKey<Instance>
}

/**
 * 内置源码组件注入键
 */
export const P_INSIDE_COMPONENT_INJECTS: Readonly<PInsideComponentInjectKeys> =
	{
		CORE: Symbol(`${P_NAME_SPACE}-core`),
		INSTANCE: Symbol(`${P_NAME_SPACE}-instance`),
	}

/**
 * 文档地址
 */
export const P_DOCUMENT_URL = 'http://vue-popup-plus.styzy.cn'
