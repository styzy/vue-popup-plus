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
		sidebar: [
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
				text: '预置插件',
				items: [
					{
						text: '使用说明',
						link: '/guide/preset-plugin-usage',
					},
					{
						text: '消息 Toast',
						link: '/guide/toast',
					},
					{
						text: '提示 Alert',
						link: '/guide/alert',
					},
					{
						text: '确认 Confirm',
						link: '/guide/confirm',
					},
					{
						text: '提示输入 Prompt',
						link: '/guide/prompt',
					},
					{
						text: '对话 Dialog',
						link: '/guide/dialog',
					},
					{
						text: '加载遮罩 Loading',
						link: '/guide/loading',
					},
					{
						text: '媒体相册 Album',
						link: '/guide/album',
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
	},
}).themeConfig
