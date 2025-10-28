export interface PopupCustomAnimations {}

export interface IAnimations extends PopupCustomAnimations {
	/**
	 * 无动画
	 */
	readonly NONE: 'none'
	/**
	 * 淡入淡出
	 */
	readonly FADE: 'fade'
	/**
	 * 缩放放大
	 */
	readonly SCALE_ENLARGE: 'scale-enlarge'
	/**
	 * 缩放缩小
	 */
	readonly SCALE_SHRINK: 'scale-shrink'
	/**
	 * 顶部飞入
	 */
	readonly FLY_TOP: 'fly-top'
	/**
	 * 左侧飞入
	 */
	readonly FLY_LEFT: 'fly-left'
	/**
	 * 右侧飞入
	 */
	readonly FLY_RIGHT: 'fly-right'
	/**
	 * 底部飞入
	 */
	readonly FLY_BOTTOM: 'fly-bottom'
}

export type Animation = IAnimations[keyof IAnimations]

class Animations implements IAnimations {
	readonly NONE = 'none'
	readonly FADE = 'fade'
	readonly SCALE_ENLARGE = 'scale-enlarge'
	readonly SCALE_SHRINK = 'scale-shrink'
	readonly FLY_TOP = 'fly-top'
	readonly FLY_LEFT = 'fly-left'
	readonly FLY_RIGHT = 'fly-right'
	readonly FLY_BOTTOM = 'fly-bottom'
	constructor() {}
}

export const POPUP_ANIMATIONS: IAnimations = new Animations()
