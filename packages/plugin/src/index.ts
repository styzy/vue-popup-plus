import { definePlugin } from 'vue-popup-plus'
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

export type { IAlbum, IAlert, IConfirm, IDialog, ILoading, IPrompt, IToast }

export { album, alert, confirm, dialog, loading, prompt, toast }

export const presetPlugin = definePlugin({
	name: 'preset-plugin',
	install(controller, config, { skin = 'classic' }: GlobalOption = {}) {
		controller.use(album, { skin })
		controller.use(alert, { skin })
		controller.use(confirm, { skin })
		controller.use(dialog, { skin })
		controller.use(loading, { skin })
		controller.use(prompt, { skin })
		controller.use(toast, { skin })
	},
})

