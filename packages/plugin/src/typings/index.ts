export type Theme = 'primary' | 'info' | 'success' | 'warning' | 'danger'

export type Skin = 'classic' | 'modern'

export type GlobalOption = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `modern` 现代皮肤
	 * - 可选值包括：
	 *   - `modern` 现代皮肤
	 *   - `classic` 经典皮肤
	 */
	skin?: Skin
}
