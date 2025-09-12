import { markRaw } from 'vue'
import type { Core } from '@/Core'
import { Popup, type PopupOptions, type RawPopupComponent } from '@/Popup'
import { ANIMATION_TYPES } from '@/CONSTANTS'

export interface RenderOptions {
	component: RawPopupComponent
	componentProps?: Record<string, any>
	onMounted?: () => void
	onUnmounted?: (payload: any) => void
	mask?: boolean
	maskClickCloseEnabled?: boolean
	windowScrollDisabled?: boolean
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
	maskClickCloseEnabled: false,
	windowScrollDisabled: true,
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
	render({ component, el, zIndex, ...options }: RenderOptions): string {
		component = markRaw(component) as RawPopupComponent
		zIndex = zIndex ?? this.#core.zIndex
		options = { ...defaultOptions, ...options, ...{ component, zIndex } }

		const popup: Popup = new Popup(this.#core.seed, options as PopupOptions)

		this.#core.addPopup(popup)

		popup.mount(el)

		return popup.id
	}
	async destroy(popupId: string, payload?: any): Promise<void> {
		const popup = this.#core.getPopup(popupId)

		if (!popup) return

		await popup.unmount(payload)

		this.#core.removePopup(popup)
	}
}
