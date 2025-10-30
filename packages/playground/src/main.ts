import { createApp } from 'vue'
import { createPopup, definePlugin } from 'vue-popup-plus'
import popupPluginPreset from 'vue-popup-plus-plugin-preset'
import router from './router'
import App from './App.vue'
import GlobalComponent from './views/GlobalComponent.vue'
import './assets/main.styl'

const app = createApp(App)
app.component('GlobalComponent', GlobalComponent)

const popup = createPopup({
	zIndex: 1000,
	// prototypeName: '$customPopup',
	debugMode: true,
})

popup.use(popupPluginPreset)

const plugin = definePlugin({
	name: 'test',
	install(popup) {
		popup.customProperties.test = function (message: string) {
			this.render({
				component: () => import('./views/Demo.vue'),
				componentProps: {
					message,
				},
			})
		}

		popup.customAnimations.CUSTOM = 'custom'
	},
})

popup.use(plugin)

app.use(router)
app.use(popup)

app.mount('#app')

declare module 'vue' {
	interface ComponentCustomProperties {
		// $customPopup: typeof popup
	}
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		render: (message: string) => void
	}

	interface PopupCustomAnimations {
		CUSTOM: 'custom'
	}
}

declare module 'vue' {
	export interface GlobalComponents {
		GlobalComponent: typeof GlobalComponent
	}
}

