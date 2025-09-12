import type { Component } from 'vue'
import type { Core } from '@/Core'
import { Popup, type PopupOptions } from '@/Popup'
import { ANIMATION_TYPES } from '@/CONSTANTS'

export interface RenderOptions {
	component: Component
	componentProps?: Record<string, any>
	onMounted?: () => void
	onUnmounted?: (payload: any) => void
	mask?: boolean
	maskClickCloseEnabled?: boolean
	width?: string | number
	maxWidth?: string | number
	minWidth?: string | number
	height?: string | number
	maxHeight?: string | number
	minHeight?: string | number
	animationDuration?: number
	maskAnimations?: string[]
	viewAnimations?: string[]
	el?: HTMLElement | string
	zIndex?: number
}

const defaultOptions: RenderOptions = {
	component: () => {},
	componentProps: {},
	onMounted: () => {},
	onUnmounted: () => {},
	mask: true,
	maskClickCloseEnabled: true,
	width: 'auto',
	maxWidth: 'auto',
	minWidth: 'auto',
	height: 'auto',
	maxHeight: 'auto',
	minHeight: 'auto',
	animationDuration: 100,
	maskAnimations: [ANIMATION_TYPES.FADE],
	viewAnimations: [ANIMATION_TYPES.FADE, ANIMATION_TYPES.SCALE],
}

export class Controller {
	#core: Core
	constructor(core: Core) {
		this.#core = core
	}
	render({ el, ...options }: RenderOptions): Popup {
		options = { ...defaultOptions, ...options }
		options.zIndex = options.zIndex ?? this.#core.zIndex

		const popup: Popup = new Popup(this.#core.seed, options as PopupOptions)

		this.#core.addPopup(popup)
		popup.mount(el)

		return popup
	}
	async destroy(popupId: string, payload?: any): Promise<void> {
		const popup = this.#core.getPopup(popupId)

		if (!popup) return

		await popup.unmount(payload)

		this.#core.removePopup(popup)
	}
}
