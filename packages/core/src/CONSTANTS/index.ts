import type { InjectionKey } from 'vue'
import type { ICore } from '../core'
import type { InstanceId, InstanceStore } from '../instance'
import type { ComputedStyle } from '../typings'

/**
 * 命名空间
 */
const NAME_SPACE: string = 'vue-popup-plus'

/**
 * 组件注入键类型
 */
type ComponentInjectKeys = {
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
}

/**
 * 弹出层内部组件注入属性
 *
 * - 在弹出层内部渲染的所有子代组件中，都可以通过 inject 注入弹出层所提供的相关参数
 */
export const POPUP_COMPONENT_INJECTS: Readonly<ComponentInjectKeys> = {
	INSTANCE_ID: Symbol(`${NAME_SPACE}-instance-id`),
	COMPUTED_STYLE: Symbol(`${NAME_SPACE}-computed-style`),
}

/**
 * 内置源码组件注入键类型
 */
type insideComponentInjectKeys = {
	/**
	 * 弹出层核心实例
	 */
	CORE: InjectionKey<ICore>
	/**
	 * 弹出层响应式数据存储
	 */
	INSTANCE_STORE: InjectionKey<InstanceStore>
}

/**
 * 内置源码组件注入键
 */
export const POPUP_INSIDE_COMPONENT_INJECTS: Readonly<insideComponentInjectKeys> =
	{
		CORE: Symbol(`${NAME_SPACE}-core`),
		INSTANCE_STORE: Symbol(`${NAME_SPACE}-instance-store`),
	}

/**
 * 文档地址
 */
export const DOCUMENT_URL = 'http://vue-popup-plus.styzy.cn'
