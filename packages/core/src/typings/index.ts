import type { ComputedRef } from 'vue'

export type ComputedStyle = ComputedRef<{
	/**
	 * 弹出层的宽度
	 */
	width: number
	/**
	 * 弹出层的高度
	 */
	height: number
	/**
	 * 弹出层的 z-index
	 */
	zIndex: number
	/**
	 * 弹出层的 translateX
	 */
	translateX: number
	/**
	 * 弹出层的 translateY
	 */
	translateY: number
}>
