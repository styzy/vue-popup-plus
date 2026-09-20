import type { PopupViewport } from 'vue-popup-plus'
import { type PopupSkin } from '@plugin/skin'

export type PopupTheme = [
	'primary',
	'info',
	'success',
	'warning',
	'danger',
][number]

export type PopupPluginSharedConfig = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `modern` 现代皮肤
	 * - 可选值包括：
	 *   - `modern` 现代皮肤
	 *   - `classic` 经典皮肤
	 */
	skin?: PopupSkin
}

/**
 * 插件的公共参数
 */
export type PopupPluginSharedOption = {
	/**
	 * 弹出层视区元素
	 *
	 * - 视区将作为触发自动翻转和平移的参考区域
	 * - 如果不指定，将使用浏览器窗口作为视区
	 * - 当指定某个元素时，弹出层将以该元素为视区
	 * - 传入字符串时，会根据字符串选择器查询元素
	 *
	 * @since 1.7.0
	 */
	viewport?: PopupViewport
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 */
	zIndex?: number
}

/**
 * 用于日志打印时生成的合并后类型
 */
export type MergedOption<T> = Required<Omit<T, 'zIndex'>> &
	Partial<Pick<PopupPluginSharedOption, 'zIndex'>>
