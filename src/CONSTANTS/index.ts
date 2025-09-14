/**
 * 动画类型
 */
export interface AnimationTypes {
	/**
	 * 淡入淡出
	 */
	FADE: string
	/**
	 * 缩放放大
	 */
	SCALE_ENLARGE: string
	/**
	 * 缩放缩小
	 */
	SCALE_SHRINK: string
	/**
	 * 顶部飞入
	 */
	FLY_TOP: string
	/**
	 * 左侧飞入
	 */
	FLY_LEFT: string
	/**
	 * 右侧飞入
	 */
	FLY_RIGHT: string
	/**
	 * 底部飞入
	 */
	FLY_BOTTOM: string
}

/** @type {AnimationTypes} 动画类型常量 */
export const ANIMATION_TYPES: AnimationTypes = {
	FADE: 'fade',
	SCALE_ENLARGE: 'scale-enlarge',
	SCALE_SHRINK: 'scale-shrink',
	FLY_TOP: 'fly-top',
	FLY_LEFT: 'fly-left',
	FLY_RIGHT: 'fly-right',
	FLY_BOTTOM: 'fly-bottom',
}
