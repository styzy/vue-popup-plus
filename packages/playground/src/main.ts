import { createApp } from 'vue'
import {
	createPopup,
	definePlugin,
	version as coreVersion,
} from 'vue-popup-plus'
import { plugin } from 'vue-popup-plus-plugin-preset'
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

popup.use(plugin, {
	// skin: 'classic',
})

type TestPluginOption = {
	/**
	 * test a
	 */
	a?: string
	/**
	 * test b
	 */
	b?: boolean
}

const testPlugin = definePlugin({
	name: 'test',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install(
		popup,
		config,
		{ a = 'default a', b = false }: TestPluginOption = {}
	) {
		popup.customProperties.test = function (test: string) {
			this.render({
				component: () => import('./views/Demo.vue'),
				componentProps: {
					test,
				},
			})
		}

		popup.customAnimations.CUSTOM = 'custom'
	},
})

popup.use(testPlugin, {
	a: 'test',
	b: true,
})
// popup.use(testPlugin, {
// 	a: 'test',
// 	b: true,
// })

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
