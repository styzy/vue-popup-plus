import {
	definePlugin,
	Log as CoreLog,
	LogType,
	LogGroupItemType,
	printLog,
	version as coreVersion,
} from 'vue-popup-plus'
import type { GlobalOption } from '../../typings'

class Log extends CoreLog {
	namespace = 'VuePopupPlusPluginPreset Album'
}

type AlbumOption = {
	/**
	 * 数据源
	 *
	 * - 支持主流图片资源和视频资源
	 */
	sources: Array<string>
	/**
	 * 默认选中的媒体索引
	 *
	 * - 默认值为 `0`
	 */
	defaultIndex?: number
	/**
	 * 是否禁用计数器
	 *
	 * - 默认值为 `false`
	 */
	disableCounter?: boolean
	/**
	 * 是否禁用媒体名称
	 *
	 * - 默认值为 `false`
	 */
	disableName?: boolean
	/**
	 * 是否禁用纯净预览
	 *
	 * - 默认值为 `false`
	 */
	disablePure?: boolean
	/**
	 * 是否禁用下载功能
	 *
	 * - 默认值为 `false`
	 * - 注意：下载功能仅在资源地址支持跨域时生效
	 */
	disableDownload?: boolean
	/**
	 * 是否禁用缩放功能
	 *
	 * - 默认值为 `false`
	 */
	disableScale?: boolean
	/**
	 * 是否禁用拖动功能
	 *
	 * - 默认值为 `false`
	 */
	disableDrag?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`true`
	 */
	maskBlur?: boolean
}

export interface IAlbum {
	/**
	 * 显示媒体相册
	 *
	 * - 如果需要等待用户关闭媒体相册，需要通过 `await` 调用，等待执行结束后继续执行后续代码
	 * - 使用示例：
	 *
	 * ```ts
	 * // 显示媒体相册，默认选中第二张媒体，即使用户不关闭媒体相册，也不会阻塞后续代码执行
	 * popup.album({
	 * 	sources: [
	 * 		'https://example.com/image1.jpg',
	 * 		'https://example.com/video1.mp4',
	 * 	],
	 * 	defaultIndex: 1,
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

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		album: IAlbum
	}
}

export const album = definePlugin({
	name: 'plugin-preset-album',
	author: 'STYZY',
	requiredCoreVersion: {
		min: coreVersion,
		max: coreVersion,
	},
	install: (controller, config, { skin = 'classic' }: GlobalOption = {}) => {
		controller.customProperties.album = function ({
			sources,
			defaultIndex = 0,
			disableCounter = false,
			disableName = false,
			disablePure = false,
			disableDownload = false,
			disableScale = false,
			disableDrag = false,
			maskBlur = true,
		}: AlbumOption) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./src/PAlbum.vue'),
					componentProps: {
						skin,
						sources,
						defaultIndex,
						disableCounter,
						disableName,
						disablePure,
						disableDownload,
						disableScale,
						disableDrag,
					},
					width: '100%',
					height: '100%',
					maskBlur,
					onUnmounted: () => {
						resolve()
						printLog(
							new Log({
								type: LogType.Info,
								caller: 'popup.destroy()',
								message: `关闭媒体相册成功`,
							})
						)
					},
				})

				const mergedOptions: Required<AlbumOption> = {
					sources,
					defaultIndex,
					disableCounter,
					disableName,
					disablePure,
					disableDownload,
					disableScale,
					disableDrag,
					maskBlur,
				}

				printLog(
					new Log({
						type: LogType.Info,
						caller: 'popup.album()',
						message: `打开媒体相册成功`,
						group: [
							{
								type: LogGroupItemType.Data,
								dataName: 'original options',
								dataValue: arguments[0],
								dataType: 'AlbumOption',
							},
							{
								type: LogGroupItemType.Data,
								dataName: 'merged options',
								dataValue: mergedOptions,
								dataType: 'Required<AlbumOption>',
							},
						],
					})
				)
			})
		}
	},
})
