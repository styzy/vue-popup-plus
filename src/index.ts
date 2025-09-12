import type { App, Plugin } from 'vue'
import { Core, type CoreOptions } from './Core'
import { Controller } from './Controller'

export { version } from '../package.json'
export { ANIMATION_TYPES } from './CONSTANTS'
export { type CoreOptions as VuePopupPlusOptions }
export { type PopupOptions as VuePopupPlusRenderOptions } from './Popup'

let core: Core

export function createPopup(config?: CoreOptions): Plugin {
	core = new Core(config)

	return {
		install(app: App) {
			app.config.globalProperties.$popup = core.controller
		},
	}
}

export function usePopup() {
	return core.controller
}

