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
	readonly SCALE_REDUCE: 'scale-reduce'
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
	get NONE() {
		return 'none' as 'none'
	}
	get FADE() {
		return 'fade' as 'fade'
	}
	get SCALE_ENLARGE() {
		return 'scale-enlarge' as 'scale-enlarge'
	}
	get SCALE_REDUCE() {
		return 'scale-reduce' as 'scale-reduce'
	}
	get FLY_TOP() {
		return 'fly-top' as 'fly-top'
	}
	get FLY_LEFT() {
		return 'fly-left' as 'fly-left'
	}
	get FLY_RIGHT() {
		return 'fly-right' as 'fly-right'
	}
	get FLY_BOTTOM() {
		return 'fly-bottom' as 'fly-bottom'
	}
	constructor() {}
}

export const POPUP_ANIMATIONS: IAnimations = new Animations()
