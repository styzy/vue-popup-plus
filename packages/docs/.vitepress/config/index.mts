import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import {
	groupIconMdPlugin,
	groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
import { demoContainerMdPlugin } from 'vitepress-plugin-markdown-container-demo'
import { themeConfig as cnThemeConfig } from './cn.mts'
import { themeConfig as enThemeConfig } from './en.mts'

export default defineConfig({
	title: 'Vue Popup Plus | Vue3 弹出层插件',
	description: 'Vue3 弹出层插件',
	lang: 'zh-CN',
	// cleanUrls: true,
	srcDir: 'src',
	outDir: 'dist',
	metaChunk: true,
	appearance: 'dark',
	themeConfig: {
		logo: '/logo.svg',
		siteTitle: 'Vue Popup Plus',
		i18nRouting: true,
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/styzy/vue-popup-plus',
			},
		],
		footer: {
			message: 'Released under the MIT License.',
			copyright: `Copyright © ${new Date().getFullYear()} Vue Popup Plus`,
		},
	},
	locales: {
		root: {
			label: '中文',
			lang: 'zh-CN',
			link: '/',
			themeConfig: cnThemeConfig,
		},
		en: {
			label: 'English',
			lang: 'en-US',
			link: '/en/',
			themeConfig: enThemeConfig,
		},
	},
	markdown: {
		theme: {
			dark: 'one-dark-pro',
			light: 'github-light',
		},
		config: (md) => {
			md.use(groupIconMdPlugin)
			md.use(demoContainerMdPlugin)
		},
	},
	vite: {
		// resolve: {
		// 	alias: {
		// 		'vitepress-plugin-markdown-container-demo': fileURLToPath(
		// 			new URL('../../../md-demo/src/index', import.meta.url)
		// 		),
		// 	},
		// },
		plugins: [groupIconVitePlugin()],
		css: {
			preprocessorOptions: {
				stylus: {
					additionalData: `@import "${fileURLToPath(new URL('../theme/style/inject.styl', import.meta.url))}";`,
				},
			},
		},
	},
})
