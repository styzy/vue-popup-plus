// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
import { createPresetPlugin } from 'vue-popup-plus-plugin-preset'
import zhCN from 'vue-popup-plus-plugin-preset/locales/zh-CN'
import type { Theme } from 'vitepress'
import { MarkdownDemo } from 'vitepress-plugin-markdown-container-demo'
import DefaultTheme from 'vitepress/theme'
import { components } from './components'

import 'virtual:group-icons.css'
import '@theme/styles/main.scss'
import './style.css'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'home-hero-info-after': () =>
				h(components.DVersionPanel, { mode: 'home' }),
			'sidebar-nav-before': () => h(components.DVersionPanel),
		})
	},
	async enhanceApp({ app, router, siteData }) {
		if (!import.meta.env.SSR) {
			const PopupPlus = createPopupPlus({
				debugMode: import.meta.env.DEV,
			})

			const presetPlugin = createPresetPlugin({
				locale: zhCN,
			})

			PopupPlus.use(presetPlugin)

			app.use(PopupPlus)

			Object.entries(components).forEach(([name, component]) => {
				app.component(name, component)
			})

			app.component(MarkdownDemo.name!, MarkdownDemo)
		}
	},
} satisfies Theme
