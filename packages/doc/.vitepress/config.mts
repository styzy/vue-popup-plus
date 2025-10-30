import { defineConfig } from 'vitepress'
import {
	groupIconMdPlugin,
	groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'

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
			link: '/',
			themeConfig: {
				logo: '/logo.svg',
				siteTitle: 'Vue Popup Plus',
				i18nRouting: true,
				nav: [
					{ text: '首页', link: '/' },
					{ text: '指南', link: '/guide/introduction' },
					{ text: '示例', link: '/examples/render' },
					{ text: '插件', link: '/plugin/introduction' },
					{ text: 'API', link: '/api/createPopup' },
				],
				sidebar: [
					{
						text: '开始',
						items: [
							{ text: '介绍', link: '/guide/introduction' },
							{
								text: '关于预置插件',
								link: '/guide/about-preset-plugin',
							},
							{ text: '安装', link: '/guide/install' },
							{
								text: '初始化',
								link: '/guide/initialization',
							},
							{
								text: '注册预置插件',
								link: '/guide/preset-plugin-initialization',
							},
						],
					},
					{
						text: '基础',
						items: [
							{
								text: '渲染弹出层',
								link: '/guide/render',
							},
							{
								text: '销毁弹出层',
								link: '/guide/destroy',
							},
						],
					},
					{
						text: '进阶',
						items: [
							{
								text: '获取实例id',
								link: '/guide/get-instance-id',
							},
							{
								text: '更新渲染选项',
								link: '/guide/update',
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
	markdown: {
		theme: {
			dark: 'one-dark-pro',
			light: 'github-light',
		},
		config: (md) => {
			md.use(groupIconMdPlugin)
		},
	},
	vite: {
		plugins: [groupIconVitePlugin()],
	},
})
