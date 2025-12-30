// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { MarkdownDemo } from 'vitepress-plugin-markdown-container-demo'
import { components } from './components'
import { createPopupPlus } from 'vue-popup-plus'
import { plugin } from 'vue-popup-plus-plugin-preset'

import './style.css'
import 'virtual:group-icons.css'
import './style/main.styl'

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
			const PopupPlus = createPopupPlus()

			PopupPlus.use(plugin)

			app.use(PopupPlus)

			Object.entries(components).forEach(([name, component]) => {
				app.component(name, component)
			})

			app.component(MarkdownDemo.name!, MarkdownDemo)
		}
	},
} satisfies Theme
