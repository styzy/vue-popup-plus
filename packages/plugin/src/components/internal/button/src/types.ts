export type PButtonTheme = [
	'primary',
	'info',
	'success',
	'warning',
	'danger',
][number]

export type PButtonType = ['default', 'fill', 'plain', 'link', 'text'][number]

export type PButtonSize = ['default', 'small', 'large'][number]

export type PButtonProps = {
	/**
	 * 按钮类型
	 * - 默认值为 `default`
	 */
	type?: PButtonType
	/**
	 * 按钮主题
	 * - 默认值为 `primary`
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
