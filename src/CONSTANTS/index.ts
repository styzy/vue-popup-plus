/**
 * 动画类型
 */
export interface AnimationTypes {
	/**
	 * 淡入淡出
	 */
	FADE: string
	/**
	 * 缩放
	 */
	SCALE: string
	/**
	 * 飞入
	 */
	FLY: string
}

/** @type {AnimationTypes} 动画类型常量 */
export const ANIMATION_TYPES: AnimationTypes = {
	FADE: 'fade',
	SCALE: 'scale',
	FLY: 'fly',
}
