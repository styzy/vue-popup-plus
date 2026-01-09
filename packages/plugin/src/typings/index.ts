import { type Skin } from '../skin'

export type Theme = 'primary' | 'info' | 'success' | 'warning' | 'danger'

export type GlobalPluginConfig = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `modern` 现代皮肤
	 * - 可选值包括：
	 *   - `modern` 现代皮肤
	 *   - `classic` 经典皮肤
	 */
	skin?: Skin
}

/**
 * 插件的公共参数
 */
export type SharedOption = {
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
}

/**
 * 用于日志打印时生成的合并后类型
 */
export type MergedOption<T> = Required<Omit<T, keyof SharedOption>> &
	Partial<SharedOption>
