import { createApp } from 'vue'
import {
	createPopupPlus,
	definePlugin,
	version as coreVersion,
	LogType,
} from 'vue-popup-plus'
import { createPresetPlugin, type Skin } from 'vue-popup-plus-plugin-preset'
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
	// autoDisableScroll: false,
	debugMode: true,
	// logFilter: (log) => log.type === LogType.Success,
})

const skin = (localStorage.getItem('skin') || 'modern') as Skin

const presetPlugin = createPresetPlugin({
	skin,
	// album: {
	// 	defaultOptions: {
	// 		disableCounter: true,
	// 	},
	// },
	// alert: {
	// 	skin: 'classic',
	// 	defaultOptions: {
	// 		confirmText: '123',
	// 	},
	// },
	// confirm: {
	// 	skin: 'modern',
	// 	defaultOptions: {
	// 		draggable: true,
	// 	},
	// },
	// dialog: {
	// 	skin: 'modern',
	// 	defaultOptions: {
	// 		title: '卡机到拉萨就打算',
	// 		draggable: true,
	// 	},
	// },
	// loading: {
	// 	skin: 'modern',
	// 	defaultOptions: {
	// 		theme: 'danger',
	// 		title: '加载中',
	// 		iconSize: 560,
	// 		maskTransparent: true,
	// 		// maskBlur: true,
	// 	},
	// },
	// prompt: {
	// 	skin: 'classic',
	// 	defaultOptions: {
	// 		type: 'textarea',
	// 		title: '132',
	// 		headerClose: false,
	// 		maxLength: 3,
	// 		placeholder: '请输入aaaa',
	// 		confirmText: '取消',
	// 		cancelText: '确定',
	// 		draggable: true,
	// 		dragOverflow: true,
	// 		maskBlur: true,
	// 	},
	// },
	// toast: {
	// 	skin: 'modern',
	// 	defaultOptions: {
	// 		theme: 'danger',
	// 		duration: 3000,
	// 		showClose: true,
	// 		placement: 'top',
	// 		hoverWait: false,
	// 	},
	// },
})

PopupPlus.use(presetPlugin)

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

// PopupPlus.use(testPlugin, {
// 	a: 'test',
// 	b: true,
// })
// PopupPlus.use(testPlugin, {
// 	a: 'test',
// 	b: true,
// })

app.use(PopupPlus)
app.use(router)

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
