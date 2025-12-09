import { definePlugin, version as coreVersion } from 'vue-popup-plus'
import { album, type IAlbum } from './plugins/album'
import { alert, type IAlert } from './plugins/alert'
import { confirm, type IConfirm } from './plugins/confirm'
import { dialog, type IDialog } from './plugins/dialog'
import { loading, type ILoading } from './plugins/loading'
import { prompt, type IPrompt } from './plugins/prompt'
import { toast, type IToast } from './plugins/toast'
import type { GlobalOption } from './typings'

import './assets/stylus/color.styl'
import './assets/stylus/fontSize.styl'
import './assets/stylus/iconfont.styl'

export { version } from './version'
export type { IAlbum, IAlert, IConfirm, IDialog, ILoading, IPrompt, IToast }

export { album, alert, confirm, dialog, loading, prompt, toast }

export const plugin = definePlugin({
	name: 'plugin-preset',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install(controller, config, { skin = 'classic' }: GlobalOption = {}) {
		const options = { skin }

		album.install(controller, config, options)
		alert.install(controller, config, options)
		confirm.install(controller, config, options)
		dialog.install(controller, config, options)
		loading.install(controller, config, options)
		prompt.install(controller, config, options)
		toast.install(controller, config, options)
	},
})
