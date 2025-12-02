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
		sidebarMenuLabel: '菜单',
		docFooter: {
			prev: '上一页',
			next: '下一页',
		},
		lastUpdated: {
			text: '最后更新于',
		},
		search: {
			options: {
				translations: {
					button: {
						buttonText: '搜索文档',
						buttonAriaLabel: '搜索文档',
					},
					modal: {
						backButtonTitle: '返回搜索',
						noResultsText: '无法找到相关结果',
						resetButtonTitle: '重置搜索',
						footer: {
							selectText: '选择',
							closeText: '关闭搜索',
							navigateText: '切换',
							backToSearchText: '返回搜索',
						},
					},
				},
			},
		},
		nav: [
			// {
			// 	component: 'DVersion',
			// },
			// { text: '首页', link: '/' },
			{
				text: '指南',
				items: [
					{
						text: '核心指南',
						link: '/guide/introduction',
						activeMatch: '/guide/',
					},
					{
						text: '预置插件指南',
						link: '/plugin-preset/introduction',
						activeMatch: '/plugin-preset/',
					},
				],
			},
			{
				text: '示例',
				link: '/demo/core',
				activeMatch: '/demo/',
			},
			{
				text: '插件',
				link: '/plugin/introduction',
				activeMatch: '/plugin/',
			},
			{
				text: 'API',
				link: '/api/controller',
				activeMatch: '/api/',
			},
			{
				text: '更新日志',
				link: '/changelog',
				activeMatch: '/changelog',
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
			'/demo/': [
				{
					text: '示例',
					items: [
						{
							text: '核心示例',
							link: '/demo/core',
						},
						{
							text: '预置插件示例',
							link: '/demo/plugin-preset',
						},
					],
				},
			],
			'/plugin/': [
				{
					text: '基础',
					items: [
						{
							text: '介绍',
							link: '/plugin/introduction',
						},
						{
							text: '定义插件',
							link: '/plugin/define',
						},
						{
							text: '注册插件',
							link: '/plugin/register',
						},
					],
				},
				{
					text: '进阶',
					items: [
						{
							text: '功能扩展',
							link: '/plugin/function-extend',
						},
						{
							text: '动画扩展',
							link: '/plugin/animation-extend',
						},
					],
				},
			],
			'/api/': [
				{
					text: '全局 API',
					items: [
						{
							text: '控制器实例',
							link: '/api/controller',
						},
						{
							text: '动画类型',
							link: '/api/animation',
						},
						{
							text: '定义插件',
							link: '/api/define-plugin',
						},
						{
							text: '通用',
							link: '/api/common',
						},
					],
				},
				{
					text: '进阶 API',
					items: [
						{
							text: 'TypeScript 工具类型',
							link: '/api/types',
						},
					],
				},
				{
					text: '预置插件 API',
					items: [
						{
							text: '控制器实例',
							link: '/api/plugin-preset-controller',
						},
						{
							text: '通用',
							link: '/api/plugin-preset-common',
						},
					],
				},
			],
		},
	},
}).themeConfig

