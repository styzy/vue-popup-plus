import type { ApiModule } from '../../.vitepress/theme/components/DApi.vue'

const api: ApiModule = {
	text: '核心 API',
	groups: [
		{
			text: '核心实例',
			items: [
				{
					text: 'createPopupPlus()',
					link: '/api/core#create-popup-plus',
					support: '1.6.0',
				},
				{
					text: 'createPopup()',
					link: '/api/core#create-popup',
					deprecated: '1.6.0',
				},
				{
					text: 'PopupPlus.use()',
					link: '/api/core#popup-plus-use',
					support: '1.6.0',
				},
				{
					text: 'PopupPlus.version',
					link: '/api/core#popup-plus-version',
					support: '1.6.0',
				},
			],
		},
		{
			text: '控制器实例',
			items: [
				{
					text: 'usePopup()',
					link: '/api/controller#use-popup',
				},
				{
					text: 'popup.render()',
					link: '/api/controller#popup-render',
				},
				{
					text: 'popup.update()',
					link: '/api/controller#popup-update',
				},
				{
					text: 'popup.destroy()',
					link: '/api/controller#popup-destroy',
				},
				{
					text: 'popup.getComputedStyle()',
					link: '/api/controller#popup-get-computed-style',
					support: '1.6.0',
				},
				{
					text: 'popup.version',
					link: '/api/controller#popup-version',
				},
			],
		},
		{
			text: '组合式工具',
			items: [
				{
					text: 'usePopup()',
					link: '/api/controller#use-popup',
				},
				{
					text: 'usePopupInstanceId()',
					link: '/api/composition-api#use-popup-instance-id',
					support: '1.6.0',
				},
				{
					text: 'usePopupComputedStyle()',
					link: '/api/composition-api#use-popup-computed-style',
					support: '1.6.0',
				},
			],
		},
		{
			text: '选项式工具',
			items: [
				{
					text: '$popup',
					link: '/api/options#popup',
				},
				{
					text: '$popupInstanceId',
					link: '/api/options#popup-instance-id',
					support: '1.6.0',
				},
				{
					text: '$popupComputedStyle',
					link: '/api/options#popup-computed-style',
					support: '1.6.0',
				},
			],
		},
		{
			text: '内置组件',
			items: [
				{
					text: '<PopupRoot>',
					link: '/api/components#popup-root',
					support: '1.5.0',
				},
			],
		},
		{
			text: '通用',
			items: [
				{
					text: 'version',
					link: '/api/common#version',
				},
			],
		},
		{
			text: '常量',
			items: [
				{
					text: 'POPUP_ANIMATIONS',
					link: '/api/constants#popup-animations',
				},
				{
					text: 'POPUP_COMPONENT_INJECTS',
					link: '/api/constants#popup-component-injects',
				},
			],
		},
		{
			text: '插件开发',
			items: [
				{
					text: 'definePlugin()',
					link: '/api/plugin#define-plugin',
				},
			],
		},
		{
			text: '日志工具',
			items: [
				{
					text: 'printLog()',
					link: '/api/log#print-log',
					support: '1.5.0',
				},
				{
					text: 'Log',
					link: '/api/log#log',
					support: '1.5.0',
				},
			],
		},
		{
			text: 'TypeScript 工具类型',
			items: [
				{
					text: 'ExtractComponentPropTypes<T>',
					link: '/api/types#extract-component-prop-types',
					support: '1.5.0',
				},
				{
					text: 'ExtractComponentAllPropTypes<T>',
					link: '/api/types#extract-component-all-prop-types',
					support: '1.5.0',
				},
			],
		},
	],
}

export default {
	load() {
		return api
	},
}
