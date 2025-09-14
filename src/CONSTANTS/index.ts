/**
 * 动画类型
 */
export type AnimationType = Symbol

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

/** @type {AnimationTypes} 动画类型集合 */
export const ANIMATION_TYPES: AnimationTypes = {
	NONE: Symbol('none'),
	FADE: Symbol('fade'),
	SCALE_ENLARGE: Symbol('scale-enlarge'),
	SCALE_SHRINK: Symbol('scale-shrink'),
	FLY_TOP: Symbol('fly-top'),
	FLY_LEFT: Symbol('fly-left'),
	FLY_RIGHT: Symbol('fly-right'),
	FLY_BOTTOM: Symbol('fly-bottom'),
}
