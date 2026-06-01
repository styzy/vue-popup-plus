import type { PopupController } from 'vue-popup-plus'
import type { GlobalPluginConfig, SharedOption } from '@plugin/typings'

export type PopupAlbumSource = {
	url: string
	type: 'image' | 'video'
}

export type PopupAlbumOption = {
	/**
	 * 数据源
	 *
	 * - 支持主流图片资源和视频资源
	 * - `string` 类型的数据源将被自动识别为图片或视频
	 * - `AlbumMediaSource` 类型的数据源可以手动指定媒体类型
	 */
	sources: Array<string | PopupAlbumSource>
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
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 禁用循环
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.7.0
	 */
	disableLoop?: boolean
	/**
	 * 禁用旋转
	 *
	 * - 默认值：`false`
	 * - 注意：旋转功能仅对图片启用
	 * @since 1.7.0
	 */
	disableRotate?: boolean
} & SharedOption

export interface PopupAlbum {
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
	(this: PopupController, options: PopupAlbumOption): Promise<void>
}

type PopupAlbumDefaultOption = Omit<
	PopupAlbumOption,
	'sources' | 'defaultIndex' | 'zIndex'
>

export type PopupAlbumConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.album()` 方法的默认选项
	 */
	defaultOptions?: PopupAlbumDefaultOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		album: PopupAlbum
	}
}
