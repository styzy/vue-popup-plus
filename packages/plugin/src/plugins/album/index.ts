import type { FileSource } from '@/class'
import { File } from '@/class'
import VuePopup from '@styzy/vue-popup'

type AlbumOption = {
	/**
	 * 媒体列表
	 * - 支持的类型包括 `File` 类型和 `FileSource` 类型，具体类型请参考 {@link File} 和 {@link FileSource}
	 */
	mediaList: File[] | FileSource[]
	/**
	 * 默认选中的媒体索引
	 * - 默认值为 `0`
	 */
	defaultIndex: number
	/**
	 * 是否开启下载功能
	 * - 默认值为 `false`
	 */
	downloadEnable: boolean
	/**
	 * 是否开启滚轮缩放功能
	 * - 默认值为 `true`
	 */
	mouseWheelScaleEnable: boolean
	/**
	 * 是否开启鼠标拖动功能
	 * - 默认值为 `true`
	 */
	mouseDragEnable: boolean
}

export interface IPopupPluginAlbum {
	/**
	 * 显示媒体相册
	 * - 和图片相册不同，媒体相册的媒体列表支持更多的媒体类型，包括图片和视频，用户可以在相册中查看和操作这些媒体。
	 * - 如果需要等待用户关闭媒体相册，需要通过 `await` 调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
	 * ```ts
	 * // 显示媒体相册，默认选中第二张媒体，即使用户不关闭媒体相册，也不会阻塞后续代码执行
	 * popup.mediaAlbum({
	 * 	mediaList: [
	 * 		// string 类型
	 * 		'https://example.com/image1.jpg',
	 * 		// File 类型
	 * 		new File({
	 * 			url: 'https://example.com/video1.mp4'
	 * 		}),
	 * 		// FileSource 类型
	 * 		{
	 * 			mediaFormat: 2,
	 * 			url: 'https://example.com/image2.jpg',
	 * 			poster: 'https://example.com/image2-poster.jpg',
	 * 		}
	 * 	],
	 * 	defaultIndex: 1
	 * })
	 *
	 * // 只有用户关闭了媒体相册，才会继续执行后续代码
	 * await popup.mediaAlbum({
	 * 	mediaList: [
	 * 		'https://example.com/image1.jpg',
	 * 		'https://example.com/image1.jpg',
	 * 	],
	 * })
	 * ```
	 */
	(options: AlbumOption): Promise<void>
}

declare module '@styzy/vue-popup' {
	interface PopupCustomProperties {
		album: IPopupPluginAlbum
	}
}

export const album = VuePopup.definePlugin({
	name: 'Album',
	install: (Popup) => {
		Popup.prototype.album = function ({
			mediaList,
			defaultIndex = 0,
			downloadEnable = false,
			mouseWheelScaleEnable = true,
			mouseDragEnable = true,
		}: AlbumOption) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PAlbum.vue'),
					componentProps: {
						mediaList,
						defaultIndex,
						downloadEnable,
						mouseWheelScaleEnable,
						mouseDragEnable,
					},
					width: '100%',
					height: '100%',
					mask: false,
					viewAnimations: [VuePopup.ANIMATION_TYPES.FADE],
					destroyed: () => {
						resolve()
					},
				})
			})
		}
	},
})
