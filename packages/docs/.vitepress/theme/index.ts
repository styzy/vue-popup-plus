// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { MarkdownDemo } from 'vitepress-plugin-markdown-container-demo'
import { components } from './components'
import { createPopup } from 'vue-popup-plus'
import popupPlugins from 'vue-popup-plus-plugin-preset'

import './style.css'
import 'virtual:group-icons.css'
import './style/main.styl'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		})
	},
	enhanceApp({ app, router, siteData }) {
		const popup = createPopup()

		popup.use(popupPlugins)

		app.use(popup)

		Object.entries(components).forEach(([name, component]) => {
			app.component(name, component)
		})

		app.component(MarkdownDemo.name!, MarkdownDemo)
	},
} satisfies Theme

