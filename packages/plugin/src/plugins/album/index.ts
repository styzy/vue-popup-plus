import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
	type PopupController,
} from 'vue-popup-plus'
import { PluginLog } from '../../log'
import type {
	GlobalPluginConfig,
	MergedOption,
	SharedOption,
} from '../../typings'
import { requiredCoreVersion } from '../../version'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Album'
}

export type AlbumMediaSource = {
	url: string
	type: 'image' | 'video'
}

type AlbumOption = {
	/**
	 * 数据源
	 *
	 * - 支持主流图片资源和视频资源
	 * - `string` 类型的数据源将被自动识别为图片或视频
	 * - `AlbumMediaSource` 类型的数据源可以手动指定媒体类型
	 */
	sources: Array<string | AlbumMediaSource>
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
	(this: PopupController, options: AlbumOption): Promise<void>
}

type AlbumDefaultOption = Omit<
	AlbumOption,
	'sources' | 'defaultIndex' | 'zIndex'
>

export type AlbumConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.album()` 方法的默认选项
	 */
	defaultOptions?: AlbumDefaultOption
}

export const album = definePlugin({
	name: 'plugin-preset-album',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: AlbumConfig = {}
	) => {
		const album: IAlbum = function ({
			sources,
			defaultIndex = 0,
			disableCounter = defaultOptions.disableCounter ?? false,
			disableName = defaultOptions.disableName ?? false,
			disablePure = defaultOptions.disablePure ?? false,
			disableDownload = defaultOptions.disableDownload ?? false,
			disableScale = defaultOptions.disableScale ?? false,
			disableDrag = defaultOptions.disableDrag ?? false,
			maskBlur = defaultOptions.maskBlur ?? false,
			disableLoop = defaultOptions.disableLoop ?? false,
			disableRotate = defaultOptions.disableRotate ?? false,
			zIndex,
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
						disableLoop,
						disableRotate,
					},
					width: '100%',
					height: '100%',
					maskBlur,
					disableScroll: true,
					zIndex,
					onMounted: () => {
						const mergedOptions: MergedOption<AlbumOption> = {
							sources,
							defaultIndex,
							disableCounter,
							disableName,
							disablePure,
							disableDownload,
							disableScale,
							disableDrag,
							maskBlur,
							disableLoop,
							disableRotate,
							zIndex,
						}

						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: {
									name: 'popup.album()',
									type: 'Function',
									value: album,
								},
								message: `打开媒体相册成功`,
								group: [
									{
										type: PopupLogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'PopupController',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '调用参数',
										dataName: 'options',
										dataValue: arguments[0],
										dataType: 'AlbumOption',
									},
									{
										type: PopupLogGroupItemType.Data,
										title: '合并参数',
										dataName: 'mergedOptions',
										dataValue: mergedOptions,
										dataType: 'Required<AlbumOption>',
									},
								],
							})
						)
					},
					onUnmounted: () => {
						printLog(
							new PopupLog({
								type: PopupLogType.Info,
								caller: 'popup.destroy()',
								message: `关闭媒体相册成功`,
								group: [
									{
										type: PopupLogGroupItemType.Data,
										title: '控制器',
										dataName: this.id,
										dataValue: this,
										dataType: 'PopupController',
									},
								],
							})
						)

						resolve()
					},
				})
			})
		}

		config.customProperties.album = album
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		album: IAlbum
	}
}
