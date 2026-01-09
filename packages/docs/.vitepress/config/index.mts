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
	head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
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
		search: {
			provider: 'local',
		},
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/styzy/vue-popup-plus',
			},
		],
		lastUpdated: {
			formatOptions: {
				dateStyle: 'long',
				timeStyle: 'medium',
			},
		},
		footer: {
			message: 'Released under the MIT License.',
			copyright: `Copyright © ${new Date().getFullYear()} Vue Popup Plus`,
		},
		externalLinkIcon: true,
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
			light: 'one-dark-pro',
			// light: 'github-light',
		},
		anchor: {},
		config: (md) => {
			md.use(groupIconMdPlugin)
			md.use(demoContainerMdPlugin)
		},
	},
	vite: {
		server: {
			port: 9528,
		},
		resolve: {
			alias: {
				// 'vitepress-plugin-markdown-container-demo': fileURLToPath(
				// 	new URL('../../../md-demo/src/index', import.meta.url)
				// ),
				'@theme': fileURLToPath(new URL('../theme', import.meta.url)),
			},
		},
		plugins: [groupIconVitePlugin()],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use '@theme/styles/inject.scss' as *;`,
				},
			},
		},
	},
})
