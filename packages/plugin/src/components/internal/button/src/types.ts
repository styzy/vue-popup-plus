export type PButtonTheme = [
	'default',
	'primary',
	'info',
	'success',
	'warning',
	'danger',
][number]

export type PButtonType = ['fill', 'plain', 'link', 'text'][number]

export type PButtonSize = ['default', 'small', 'large'][number]

export type PButtonProps = {
	/**
	 * 按钮类型
	 * - 默认值为 `fill`
	 */
	type?: PButtonType
	/**
	 * 按钮主题
	 * - 默认值为 `default`
	 */
	theme?: PButtonTheme
	/**
	 * 按钮大小
	 * - 默认值为 `default`
	 */
	size?: PButtonSize
	/**
	 * 是否禁用按钮
	 * - 默认值为 `false`
	 */
	disabled?: boolean
}
