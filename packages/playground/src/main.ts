import { createApp } from 'vue'
import {
	createPopupPlus,
	definePlugin,
	version as coreVersion,
	LogType,
} from 'vue-popup-plus'
import { plugin } from 'vue-popup-plus-plugin-preset'
import router from './router'
import App from './App.vue'
import GlobalComponent from './views/GlobalComponent.vue'
import './assets/main.styl'

const app = createApp(App)
app.component('GlobalComponent', GlobalComponent)

import Antd from 'ant-design-vue'
app.use(Antd)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

const PopupPlus = createPopupPlus({
	zIndex: 1000,
	// prototypeName: '$customPopup',
	debugMode: true,
	// logFilter: (log) => log.type === LogType.Success,
})

PopupPlus.use(plugin, {
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
		// min: coreVersion,
		// max: '1.4.0',
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

// PopupPlus.use(testPlugin, {
// 	a: 'test',
// 	b: true,
// })
// PopupPlus.use(testPlugin, {
// 	a: 'test',
// 	b: true,
// })

app.use(router)
app.use(PopupPlus)

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
