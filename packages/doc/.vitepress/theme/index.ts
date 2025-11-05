// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { components } from './components'

import './style.css'
import 'virtual:group-icons.css'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		})
	},
	enhanceApp({ app, router, siteData }) {
		// ...
		Object.entries(components).forEach(([name, component]) => {
			app.component(name, component)
		})
	},
} satisfies Theme

