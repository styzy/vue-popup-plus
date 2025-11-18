import { defineConfig } from 'vitepress'

export const themeConfig = defineConfig({
	themeConfig: {
		darkModeSwitchLabel: '外观',
		darkModeSwitchTitle: '切换到深色模式',
		lightModeSwitchTitle: '切换到浅色模式',
		outline: {
			level: 'deep',
			label: '页面导航',
		},
		nav: [
			// { text: '首页', link: '/' },
			{
				text: '指南',
				link: '/guide/introduction',
				activeMatch: '/guide/',
			},
			{
				text: '预置插件指南',
				link: '/plugin-preset/introduction',
				activeMatch: '/plugin-preset/',
			},
			{
				text: '示例中心',
				link: '/examples/core',
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
						{ text: '安装', link: '/guide/install' },
						{
							text: '初始化',
							link: '/guide/initialization',
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
			'/plugin-preset/': [
				{
					text: '开始',
					items: [
						{
							text: '介绍',
							link: '/plugin-preset/introduction',
						},
						{
							text: '安装',
							link: '/plugin-preset/install',
						},
						{
							text: '注册',
							link: '/plugin-preset/register',
						},
					],
				},
				{
					text: '基础',
					items: [
						{
							text: '使用说明',
							link: '/plugin-preset/usage',
						},
						{
							text: 'Toast 消息',
							link: '/plugin-preset/toast',
						},
						{
							text: 'Alert 提示',
							link: '/plugin-preset/alert',
						},
						{
							text: 'Confirm 确认',
							link: '/plugin-preset/confirm',
						},
						{
							text: 'Prompt 提示输入',
							link: '/plugin-preset/prompt',
						},
						{
							text: 'Dialog 对话',
							link: '/plugin-preset/dialog',
						},
						{
							text: 'Loading 加载遮罩',
							link: '/plugin-preset/loading',
						},
						{
							text: 'Album 媒体相册',
							link: '/plugin-preset/album',
						},
					],
				},
			],
			'/examples/': [
				{
					text: '基础示例',
					link: '/examples/core',
				},
				{
					text: '预置插件示例',
					link: '/examples/plugin-preset',
				},
			],
		},
	},
}).themeConfig
