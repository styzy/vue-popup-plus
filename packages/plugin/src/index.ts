import { definePlugin } from 'vue-popup-plus'
import { plugins } from './plugins'

export default definePlugin({
	name: 'VuePopupPlusPluginPreset',
	install(controller) {
		plugins.forEach((plugin) => {
			controller.use(plugin)
		})
	},
})
