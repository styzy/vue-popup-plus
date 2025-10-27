import { definePlugin } from 'vue-popup-plus'

type AlbumOption = {
	/**
	 * 数据源
	 * - 支持主流图片资源和视频资源
	 */
	sources: Array<string>
	/**
	 * 默认选中的媒体索引
	 * - 默认值为 `0`
	 */
	defaultIndex?: number
	/**
	 * 是否禁用当前索引和总索引
	 * - 默认值为 `false`
	 */
	countDisabled?: boolean
	/**
	 * 是否禁用媒体名称
	 * - 默认值为 `false`
	 */
	nameDisabled?: boolean
	/**
	 * 是否禁用纯模式
	 * - 默认值为 `false`
	 */
	pureDisabled?: boolean
	/**
	 * 是否禁用下载功能
	 * - 默认值为 `false`
	 * - 注意：下载功能仅在资源地址支持跨域时生效
	 */
	downloadDisabled?: boolean
	/**
	 * 是否禁用缩放功能
	 * - 默认值为 `false`
	 */
	scaleDisabled?: boolean
	/**
	 * 是否禁用拖动功能
	 * - 默认值为 `false`
	 */
	dragDisabled?: boolean
}

export interface IAlbum {
	/**
	 * 显示媒体相册
	 * - 如果需要等待用户关闭媒体相册，需要通过 `await` 调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
	 * ```ts
	 * // 显示媒体相册，默认选中第二张媒体，即使用户不关闭媒体相册，也不会阻塞后续代码执行
	 * popup.album({
	 * 	sources: [
	 * 		'https://example.com/image1.jpg',
	 * 		'https://example.com/video1.mp4',
	 * 	],
	 * 	defaultIndex: 1
	 * })
	 *
	 * // 只有用户关闭了媒体相册，才会继续执行后续代码
	 * await popup.album({
	 * 	sources: [
	 * 		'https://example.com/image1.jpg',
	 * 		'https://example.com/image1.jpg',
	 * 	],
	 * })
	 * ```
	 */
	(options: AlbumOption): Promise<void>
}

export const album = definePlugin({
	name: 'Album',
	install: (controller) => {
		controller.customProperties.album = function ({
			sources,
			defaultIndex = 0,
			countDisabled = false,
			nameDisabled = false,
			pureDisabled = false,
			downloadDisabled = false,
			scaleDisabled = false,
			dragDisabled = false,
		}: AlbumOption) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PAlbum.vue'),
					componentProps: {
						sources,
						defaultIndex,
						countDisabled,
						nameDisabled,
						pureDisabled,
						downloadDisabled,
						scaleDisabled,
						dragDisabled,
					},
					width: '100%',
					height: '100%',
					mask: false,
					onUnmounted: () => {
						resolve()
					},
				})
			})
		}
	},
})
