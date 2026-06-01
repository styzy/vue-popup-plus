import type { PopupController } from 'vue-popup-plus'
import type { GlobalPluginConfig, SharedOption, Theme } from '@plugin/typings'

export type PopupLoadingOption = {
	/**
	 * 加载遮罩主题
	 *
	 * - 默认值：'primary'
	 * - 具体的可选主题请参考 {@link Theme }
	 */
	theme?: Theme
	/**
	 * 加载遮罩标题文本
	 *
	 * - 默认值：''
	 *
	 * @since 1.3.3
	 */
	title?: string
	/**
	 * 加载遮罩图标大小
	 *
	 * - 默认值：60
	 */
	iconSize?: number
	/**
	 * 是否显示遮罩层
	 *
	 * - 默认值：`true`
	 *
	 * @since 1.5.0
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.3
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 是否禁用滚动
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.6.0
	 */
	disableScroll?: boolean
} & SharedOption

export interface PopupLoading {
	/**
	 * 显示加载遮罩
	 *
	 * - 全局只会显示一个加载遮罩，每次调用时会先进行判断是否有已存在的加载遮罩
	 * 如果有，则会先关闭已存在的加载遮罩，再显示新的加载遮罩
	 *
	 * - 使用示例：
	 *
	 * ```ts
	 * // 显示加载遮罩
	 * popup.loading()
	 * // 关闭加载遮罩
	 * popup.loadingClose()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await popup.loadingClose()
	 * ```
	 */
	(this: PopupController, option?: PopupLoadingOption): void
}

export interface PopupLoadingClose {
	/**
	 * 关闭加载遮罩
	 *
	 * - 使用示例：
	 *
	 * ```ts
	 * // 关闭加载遮罩
	 * popup.loadingClose()
	 *
	 * // 如果需要等待关闭动画结束，可通过 await 调用
	 * await popup.loadingClose()
	 * ```
	 */
	(this: PopupController): Promise<void>
}

type PopupLoadingDefaultOption = PopupLoadingOption

export type PopupLoadingConfig = GlobalPluginConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.loading()` 方法的默认选项
	 */
	defaultOptions?: PopupLoadingDefaultOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		loading: PopupLoading
		loadingClose: PopupLoadingClose
	}
}
