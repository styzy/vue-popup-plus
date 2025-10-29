import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'Vue Popup Plus | Vue3 弹出层插件',
	description: 'Vue3 弹出层插件',
	lang: 'zh-CN',
	// cleanUrls: true,
	srcDir: 'src',
	outDir: 'dist',
	metaChunk: true,
	appearance: 'dark',
	locales: {
		root: {
			label: '中文',
			link: '/cn/',
			themeConfig: {
				logo: '/logo.svg',
				siteTitle: 'Vue Popup Plus',
				i18nRouting: true,
				nav: [
					{ text: '首页', link: '/' },
					{ text: '指南', link: '/guide/core/introduction' },
					{ text: '示例', link: '/example/core/render' },
					{ text: '教程', link: '/tutorial/core/render' },
					{ text: '插件', link: '/plugin/introduction' },
					{ text: 'API', link: '/api/createPopup' },
				],
				sidebar: [
					{
						text: '基础',
						items: [
							{ text: '介绍', link: '/guide/core/introduction' },
							{ text: '安装', link: '/guide/core/install' },
						],
					},
					{
						text: '预置插件',
						items: [
							{
								text: '介绍',
								link: '/guide/plugin-preset/introduction',
							},
							{
								text: '安装',
								link: '/guide/plugin-preset/install',
							},
						],
					},
				],
				socialLinks: [
					{
						icon: 'github',
						link: 'https://github.com/styzy/vue-popup-plus',
					},
				],
			},
		},
		en: {
			label: 'English',
			lang: 'en-US',
			link: '/en/',
			title: 'Vue Popup Plus | Vue3 Popup Plugin',
			description: 'Vue3 Popup Plugin',
		},
	},
})
