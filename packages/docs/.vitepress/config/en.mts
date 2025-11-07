import { defineConfig } from 'vitepress'

export const themeConfig = defineConfig({
	themeConfig: {
		nav: [
			// { text: '首页', link: '/' },
			{
				text: '指南',
				link: '/guide/introduction',
				activeMatch: '/guide/',
			},
			{
				text: '预置插件',
				link: '/preset-plugin/introduction',
				activeMatch: '/preset-plugin/',
			},
			{
				text: '示例',
				link: '/examples/render',
				activeMatch: '/examples/',
			},
			{
				text: 'API',
				link: '/api/createPopup',
				activeMatch: '/api/',
			},
			{
				text: '插件',
				link: '/plugin/introduction',
				activeMatch: '/plugin/',
			},
		],
		sidebar: {
			'/guide/': [
				{
					text: '开始',
					items: [
						{ text: '介绍', link: '/guide/introduction' },
						{
							text: '关于预置插件',
							link: '/guide/preset-plugin-about',
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
							text: '更新渲染参数',
							link: '/guide/update',
						},
						{
							text: '过渡动画',
							link: '/guide/animation',
						},
					],
				},
			],
			'/preset-plugin/': [
				{
					text: '预置插件',
					items: [
						{
							text: '使用说明',
							link: '/preset-plugin/usage',
						},
						{
							text: '消息 Toast',
							link: '/preset-plugin/toast',
						},
						{
							text: '提示 Alert',
							link: '/preset-plugin/alert',
						},
						{
							text: '确认 Confirm',
							link: '/preset-plugin/confirm',
						},
						{
							text: '提示输入 Prompt',
							link: '/preset-plugin/prompt',
						},
						{
							text: '对话 Dialog',
							link: '/preset-plugin/dialog',
						},
						{
							text: '加载遮罩 Loading',
							link: '/preset-plugin/loading',
						},
						{
							text: '媒体相册 Album',
							link: '/preset-plugin/album',
						},
					],
				},
			],
		},
	},
}).themeConfig
