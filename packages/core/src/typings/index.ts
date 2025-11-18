import type { ComputedRef } from 'vue'

export type PopupViewStyle = ComputedRef<{
	width: number
	height: number
	zIndex: number
	translateX: number
	translateY: number
}>
