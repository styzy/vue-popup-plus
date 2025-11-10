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
				text: '预置插件',
				link: '/preset-plugin/usage',
				activeMatch: '/preset-plugin/',
			},
			{
				text: '示例中心',
				link: '/examples/index',
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
			'/preset-plugin/': [
				{
					text: '基础',
					items: [
						{
							text: '介绍',
							link: '/preset-plugin/introduction',
						},
						{
							text: '安装',
							link: '/preset-plugin/install',
						},
						{
							text: '注册',
							link: '/preset-plugin/register',
						},
						{
							text: '使用说明',
							link: '/preset-plugin/usage',
						},
					],
				},
				{
					text: '主要功能',
					items: [
						{
							text: 'Toast 消息',
							link: '/preset-plugin/toast',
						},
						{
							text: 'Alert 提示',
							link: '/preset-plugin/alert',
						},
						{
							text: 'Confirm 确认',
							link: '/preset-plugin/confirm',
						},
						{
							text: 'Prompt 提示输入',
							link: '/preset-plugin/prompt',
						},
						{
							text: 'Dialog 对话',
							link: '/preset-plugin/dialog',
						},
						{
							text: 'Loading 加载遮罩',
							link: '/preset-plugin/loading',
						},
						{
							text: 'Album 媒体相册',
							link: '/preset-plugin/album',
						},
					],
				},
			],
		},
	},
}).themeConfig
