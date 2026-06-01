import {
	definePlugin,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
} from 'vue-popup-plus'
import { PluginLog } from '@plugin/log'
import type { MergedOption } from '@plugin/typings'
import { requiredCoreVersion } from '@plugin/version'
import type { PopupAlbumConfig, PopupAlbumOption, PopupAlbum } from './types.ts'

class PopupLog extends PluginLog {
	namespace = 'VuePopupPlusPluginPreset Album'
}

export const album = definePlugin({
	name: 'plugin-preset-album',
	author: 'STYZY',
	requiredCoreVersion,
	install: (
		config,
		{ skin = 'modern', defaultOptions = {} }: PopupAlbumConfig = {}
	) => {
		const album: PopupAlbum = function ({
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
		}: PopupAlbumOption) {
			return new Promise<void>((resolve) => {
				this.render({
					component: () => import('./index.vue'),
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
						const mergedOptions: MergedOption<PopupAlbumOption> = {
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
