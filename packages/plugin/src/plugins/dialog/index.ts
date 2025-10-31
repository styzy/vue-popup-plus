import { definePlugin } from 'vue-popup-plus'
import type { Component } from 'vue'

type PopupDialogOption = {
	/**
	 * 对话框标题
	 * - 默认值为 `''`
	 */
	title?: string
	/**
	 * 对话框内容组件
	 */
	component: Component
	/**
	 * 对话框内容组件props
	 */
	props?: Record<string, any>
	/**
	 * 是否显示对话框标题栏
	 * - 默认值为 `true`
	 */
	header?: boolean
	/**
	 * 是否显示对话框标题栏关闭按钮
	 * - 默认值为 `true`
	 */
	headerCloseButton?: boolean
	/**
	 * 对话框宽度
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	width?: string | number
	/**
	 * 对话框最大宽度
	 * - 默认值为 `100%`
	 * - 支持 `string` 或 `number` 类型
	 */
	maxWidth?: string | number
	/**
	 * 对话框最小宽度
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	minWidth?: string | number
	/**
	 * 对话框高度
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	height?: string | number
	/**
	 * 对话框最大高度
	 * - 默认值为 `100%`
	 * - 支持 `string` 或 `number` 类型
	 */
	maxHeight?: string | number
	/**
	 * 对话框最小高度
	 * - 默认值为 `auto`
	 * - 支持 `string` 或 `number` 类型
	 */
	minHeight?: string | number
	/**
	 * 是否显示对话框遮罩层
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 是否点击遮罩层关闭对话框
	 * - 默认值为 `false`
	 */
	maskClickClose?: boolean
	/**
	 * 是否可拖拽
	 * - 默认值为 `false`
	 */
	draggable?: boolean
	/**
	 * 是否可拖拽溢出屏幕
	 * - 默认值为 `false`
	 */
	dragOverflow?: boolean
	/**
	 * 对话框渲染完成时调用的回调函数
	 */
	onMounted?: () => void
}

export interface IDialog {
	/**
	 * 显示对话框
	 * - 对话框内部组件可通过调用 `this.$emit('close', payload)` 关闭对话框，payload 为关闭时传递的参数
	 * - 如需获取对话框关闭时传递的参数，可在调用 `dialog` 方法时使用 `await` 关键字等待 Promise resolve 后获取
	 * - 对话框关闭时，无论是否传递了参数，Promise 都将 resolve，因此需要在调用时判断是否有返回参数
	 */
	<T extends any = any>(options: PopupDialogOption): Promise<T | undefined>
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		dialog: IDialog
	}
}

let seed = 1

const createId = () => `dialog-${seed++}`

export const dialog = definePlugin({
	name: 'Dialog',
	install: (controller, config) => {
		controller.customProperties.dialog = function ({
			title = '',
			component,
			props = {},
			header = true,
			headerCloseButton = true,
			width = 'auto',
			maxWidth = '100%',
			minWidth = 'auto',
			height = 'auto',
			maxHeight = '100%',
			minHeight = 'auto',
			mask = true,
			maskClickClose = false,
			draggable = false,
			dragOverflow = false,
			onMounted = () => {},
		}: PopupDialogOption) {
			const componentProps = {
				id: createId(),
				title,
				customComponent: component,
				customComponentProps: props,
				header,
				headerCloseButton,
				draggable,
				debugMode: config.debugMode,
			}

			return new Promise((resolve) => {
				this.render({
					component: () => import('./src/PDialog.vue'),
					componentProps,
					width,
					maxWidth,
					minWidth,
					height,
					maxHeight,
					minHeight,
					mask,
					maskClickClose,
					viewTranslateOverflow: dragOverflow,
					onMounted,
					onUnmounted: (payload?: any) => {
						resolve(payload)
					},
				})
			})
		}
	},
})
