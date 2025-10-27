import { definePlugin } from 'vue-popup-plus'
import { plugins } from './plugins'
import './assets/stylus/iconfont.styl'

export default definePlugin({
	name: 'VuePopupPlusPluginPreset',
	install(controller) {
		plugins.forEach((plugin) => {
			controller.use(plugin)
		})
	},
})
