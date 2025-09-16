import type { InjectionKey } from 'vue'
import type { PopupId, PopupStore } from '@/Popup'

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
	 * const popupId = inject(COMPONENT_INJECT_KEYS.POPUP_ID)
	 *
	 * // 销毁当前弹出层
	 * this.$popup.destroy(popupId)
	 */
	POPUP_ID: InjectionKey<PopupId>
}

/**
 * 弹出层内部组件注入属性，在弹出层内部渲染的所有子代组件中，都可以通过 inject 注入弹出层所提供的相关参数
 */
export const COMPONENT_INJECT_KEYS: Readonly<ComponentInjectKeys> = {
	POPUP_ID: Symbol('popupId'),
}

/**
 * 内置源码组件注入键类型
 */
export type insideComponentInjectKeys = {
	/**
	 * 弹出层响应式数据存储
	 */
	POPUP_STORE: InjectionKey<PopupStore>
}

/**
 * 内置源码组件注入键
 */
export const INSIDE_COMPONENT_INJECT_KEYS: Readonly<insideComponentInjectKeys> =
	{
		POPUP_STORE: Symbol('popupStore'),
	}

/**
 * 动画类型
 */
export interface AnimationType extends Symbol {}

/**
 * 动画类型集合类型
 */
export interface AnimationTypes {
	/**
	 * 无动画
	 */
	NONE: AnimationType
	/**
	 * 淡入淡出
	 */
	FADE: AnimationType
	/**
	 * 缩放放大
	 */
	SCALE_ENLARGE: AnimationType
	/**
	 * 缩放缩小
	 */
	SCALE_SHRINK: AnimationType
	/**
	 * 顶部飞入
	 */
	FLY_TOP: AnimationType
	/**
	 * 左侧飞入
	 */
	FLY_LEFT: AnimationType
	/**
	 * 右侧飞入
	 */
	FLY_RIGHT: AnimationType
	/**
	 * 底部飞入
	 */
	FLY_BOTTOM: AnimationType
}

/**
 * 动画类型集合
 */
export const ANIMATION_TYPES: Readonly<AnimationTypes> = {
	NONE: Symbol('none'),
	FADE: Symbol('fade'),
	SCALE_ENLARGE: Symbol('scale-enlarge'),
	SCALE_SHRINK: Symbol('scale-shrink'),
	FLY_TOP: Symbol('fly-top'),
	FLY_LEFT: Symbol('fly-left'),
	FLY_RIGHT: Symbol('fly-right'),
	FLY_BOTTOM: Symbol('fly-bottom'),
}
