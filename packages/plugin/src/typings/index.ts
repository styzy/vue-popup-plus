export type Theme =
	| 'default'
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'

export type Skin = 'classic' | 'modern'

export type GlobalOption = {
	/**
	 * 插件弹出层皮肤
	 * - 默认为 `classic` 经典皮肤
	 * - 可选值包括：
	 *   - `classic` 经典皮肤
	 *   - `modern` 现代皮肤（实验性）
	 */
	skin?: Skin
}
