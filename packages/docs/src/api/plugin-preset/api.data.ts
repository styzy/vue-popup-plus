import type { ApiModule } from '../../../.vitepress/theme/components/DApi.vue'

const api: ApiModule = {
	text: '预置插件 API',
	groups: [
		{
			text: '插件实例',
			items: [
				{
					text: 'createPresetPlugin()',
					link: '/api/plugin-preset/plugin#create-preset-plugin',
					support: '1.6.0',
				},
			],
		},
		{
			text: 'Toast 轻量提示',
			items: [
				{
					text: 'popup.toast()',
					link: '/api/plugin-preset/toast#popup-toast',
				},
				{
					text: 'popup.toastPrimary()',
					link: '/api/plugin-preset/toast#popup-toast-primary',
					support: '1.6.0',
				},
				{
					text: 'popup.toastSuccess()',
					link: '/api/plugin-preset/toast#popup-toast-success',
					support: '1.6.0',
				},
				{
					text: 'popup.toastInfo()',
					link: '/api/plugin-preset/toast#popup-toast-info',
					support: '1.6.0',
				},
				{
					text: 'popup.toastWarning()',
					link: '/api/plugin-preset/toast#popup-toast-warning',
					support: '1.6.0',
				},
				{
					text: 'popup.toastDanger()',
					link: '/api/plugin-preset/toast#popup-toast-danger',
					support: '1.6.0',
				},
				{
					text: 'popup.toast.success()',
					link: '/api/plugin-preset/toast#popup-toast-success-1',
					support: '1.5.0',
					deprecated: '1.6.0',
				},
				{
					text: 'popup.toast.info()',
					link: '/api/plugin-preset/toast#popup-toast-info-1',
					support: '1.5.0',
					deprecated: '1.6.0',
				},
				{
					text: 'popup.toast.warning()',
					link: '/api/plugin-preset/toast#popup-toast-warning-1',
					support: '1.5.0',
					deprecated: '1.6.0',
				},
				{
					text: 'popup.toast.danger()',
					link: '/api/plugin-preset/toast#popup-toast-danger-1',
					support: '1.5.0',
					deprecated: '1.6.0',
				},
			],
		},
		{
			text: 'Message 消息',
			items: [
				{
					text: 'popup.message()',
					link: '/api/plugin-preset/message#popup-message',
					support: '1.7.0',
				},
				{
					text: 'popup.messagePrimary()',
					link: '/api/plugin-preset/message#popup-message-primary',
					support: '1.7.0',
				},
				{
					text: 'popup.messageSuccess()',
					link: '/api/plugin-preset/message#popup-message-success',
					support: '1.7.0',
				},
				{
					text: 'popup.messageInfo()',
					link: '/api/plugin-preset/message#popup-message-info',
					support: '1.7.0',
				},
				{
					text: 'popup.messageWarning()',
					link: '/api/plugin-preset/message#popup-message-warning',
					support: '1.7.0',
				},
				{
					text: 'popup.messageDanger()',
					link: '/api/plugin-preset/message#popup-message-danger',
					support: '1.7.0',
				},
			],
		},
		{
			text: 'Alert 提示',
			items: [
				{
					text: 'popup.alert()',
					link: '/api/plugin-preset/alert#popup-alert',
				},
			],
		},
		{
			text: 'Confirm 确认',
			items: [
				{
					text: 'popup.confirm()',
					link: '/api/plugin-preset/confirm#popup-confirm',
				},
			],
		},
		{
			text: 'Prompt 提示输入',
			items: [
				{
					text: 'popup.prompt()',
					link: '/api/plugin-preset/prompt#popup-prompt',
				},
			],
		},
		{
			text: 'Dialog 对话',
			items: [
				{
					text: 'popup.dialog()',
					link: '/api/plugin-preset/dialog#popup-dialog',
				},
				{
					text: 'popup.dialogClose()',
					link: '/api/plugin-preset/dialog#popup-dialog-close',
					support: '1.6.0',
				},
				{
					text: 'popup.dialog.close()',
					link: '/api/plugin-preset/dialog#popup-dialog-close-1',
					support: '1.5.0',
					deprecated: '1.6.0',
				},
			],
		},
		{
			text: 'Drawer 抽屉',
			items: [
				{
					text: 'popup.drawer()',
					link: '/api/plugin-preset/drawer#popup-drawer',
					support: '1.6.0',
				},
				{
					text: 'popup.drawerClose()',
					link: '/api/plugin-preset/drawer#popup-drawer-close',
					support: '1.6.0',
				},
			],
		},
		{
			text: 'Loading 加载遮罩',
			items: [
				{
					text: 'popup.loading()',
					link: '/api/plugin-preset/loading#popup-loading',
				},
				{
					text: 'popup.loadingClose()',
					link: '/api/plugin-preset/loading#popup-loading-close',
					support: '1.6.0',
				},
				{
					text: 'popup.loading.close()',
					link: '/api/plugin-preset/loading#popup-loading-close-1',
					support: '1.5.0',
					deprecated: '1.6.0',
				},
			],
		},
		{
			text: 'Album 相册',
			items: [
				{
					text: 'popup.album()',
					link: '/api/plugin-preset/album#popup-album',
				},
			],
		},
		{
			text: '通用',
			items: [
				{
					text: 'version',
					link: '/api/plugin-preset/common#version',
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
