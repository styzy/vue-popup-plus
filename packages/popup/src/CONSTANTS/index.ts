import type { InjectionKey } from 'vue'
import type { InstanceId, InstanceStore } from '../Instance'

/**
 * 命名空间
 */
const NAME_SPACE: string = 'vue-popup-plus'

/**
 * 组件注入键类型
 */
type ComponentInjectKeys = {
	/**
	 * 当前组件所在弹出层的实例ID，可用于销毁当前弹出层
	 * @example
	 * // 弹出层渲染的所有子代组件中
	 * const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)
	 *
	 * // 销毁当前弹出层
	 * this.$popup.destroy(instanceId)
	 */
	INSTANCE_ID: InjectionKey<InstanceId>
}

/**
 * 弹出层内部组件注入属性，在弹出层内部渲染的所有子代组件中，都可以通过 inject 注入弹出层所提供的相关参数
 */
export const POPUP_COMPONENT_INJECTS: Readonly<ComponentInjectKeys> = {
	INSTANCE_ID: Symbol(`${NAME_SPACE}-instance-id`),
}

/**
 * 内置源码组件注入键类型
 */
type insideComponentInjectKeys = {
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
		INSTANCE_STORE: Symbol(`${NAME_SPACE}-instance-store`),
	}

