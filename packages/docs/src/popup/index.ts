import { createPopup } from 'vue-popup-plus'
import VuePopupPlusPluginPreset from 'vue-popup-plus-plugin-preset'

const popup = createPopup({
	zIndex: 1000,
	prototypeName: '$popup',
})

popup.use(VuePopupPlusPluginPreset)

export default popup
