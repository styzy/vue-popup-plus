import type { InjectionKey } from 'vue'
import type { InstanceId, InstanceStore } from '../Instance'

/**
 * 命名空间
 */
export const NAME_SPACE: string = 'vue-popup-plus'

/**
 * 组件注入键类型
 */
export type ComponentInjectKeys = {
	/**
	 * 当前组件所在弹出层的实例ID，可用于销毁当前弹出层
	 * @example
	 * // 弹出层渲染的所有子代组件中
	 * const instanceId = inject(POPUP_COMPONENT_INJECT_KEYS.INSTANCE_ID)
	 *
	 * // 销毁当前弹出层
	 * this.$popup.destroy(instanceId)
	 */
	INSTANCE_ID: InjectionKey<InstanceId>
}

/**
 * 弹出层内部组件注入属性，在弹出层内部渲染的所有子代组件中，都可以通过 inject 注入弹出层所提供的相关参数
 */
export const POPUP_COMPONENT_INJECT_KEYS: Readonly<ComponentInjectKeys> = {
	INSTANCE_ID: Symbol(`${NAME_SPACE}-instance-id`),
}

/**
 * 内置源码组件注入键类型
 */
export type insideComponentInjectKeys = {
	/**
	 * 弹出层响应式数据存储
	 */
	INSTANCE_STORE: InjectionKey<InstanceStore>
}

/**
 * 内置源码组件注入键
 */
export const POPUP_INSIDE_COMPONENT_INJECT_KEYS: Readonly<insideComponentInjectKeys> =
	{
		INSTANCE_STORE: Symbol(`${NAME_SPACE}-instance-store`),
	}

/**
 * 动画类型集合类型
 */
export interface PopupAnimationCollection {
	/**
	 * 无动画
	 */
	NONE: symbol
	/**
	 * 淡入淡出
	 */
	FADE: symbol
	/**
	 * 缩放放大
	 */
	SCALE_ENLARGE: symbol
	/**
	 * 缩放缩小
	 */
	SCALE_SHRINK: symbol
	/**
	 * 顶部飞入
	 */
	FLY_TOP: symbol
	/**
	 * 左侧飞入
	 */
	FLY_LEFT: symbol
	/**
	 * 右侧飞入
	 */
	FLY_RIGHT: symbol
	/**
	 * 底部飞入
	 */
	FLY_BOTTOM: symbol
}

/**
 * 动画类型集合
 */
export const POPUP_ANIMATIONS: Readonly<PopupAnimationCollection> = {
	NONE: Symbol('none'),
	FADE: Symbol('fade'),
	SCALE_ENLARGE: Symbol('scale-enlarge'),
	SCALE_SHRINK: Symbol('scale-shrink'),
	FLY_TOP: Symbol('fly-top'),
	FLY_LEFT: Symbol('fly-left'),
	FLY_RIGHT: Symbol('fly-right'),
	FLY_BOTTOM: Symbol('fly-bottom'),
}

