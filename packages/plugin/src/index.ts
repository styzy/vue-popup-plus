import { definePlugin, version as coreVersion } from 'vue-popup-plus'
import { album, type IAlbum } from './plugins/album'
import { alert, type IAlert } from './plugins/alert'
import { confirm, type IConfirm } from './plugins/confirm'
import { dialog, type IDialog } from './plugins/dialog'
import { loading, type ILoading } from './plugins/loading'
import { prompt, type IPrompt } from './plugins/prompt'
import { toast, type IToast } from './plugins/toast'
import type { GlobalPluginOption } from './typings'

import './assets/styles/main.scss'

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
	install(config, { skin = 'modern' }: GlobalPluginOption = {}) {
		const options = { skin }

		album.install(config, options)
		alert.install(config, options)
		confirm.install(config, options)
		dialog.install(config, options)
		loading.install(config, options)
		prompt.install(config, options)
		toast.install(config, options)
	},
})
