export type PopupKeyboardEvent = string

export type PopupKeyboardShortcutString = string

export type PopupKeyboardShortcutObject = {
	/**
	 * 键名
	 */
	key: string
	/**
	 * 是否按住 Ctrl 键
	 */
	ctrl?: boolean
	/**
	 * 是否按住 Shift 键
	 */
	shift?: boolean
	/**
	 * 是否按住 Alt 键
	 */
	alt?: boolean
	/**
	 * 是否按住 Meta 键
	 */
	meta?: boolean
	/**
	 * 是否阻止默认事件
	 */
	preventDefault?: boolean
	/**
	 * 是否阻止事件冒泡
	 */
	stopPropagation?: boolean
}

export type PopupKeyboardShortcut = [
	PopupKeyboardShortcutString,
	PopupKeyboardShortcutObject,
][number]

export type PopupKeyboardConfig =
	| false
	| PopupKeyboardShortcut
	| PopupKeyboardShortcut[]

export type PopupKeyboardSchema = Record<
	PopupKeyboardEvent,
	PopupKeyboardConfig
>

// export type ExtractPopupKeyboardSchema<T extends PopupKeyboard> = Exclude<
// 	T,
// 	boolean
// >

export type ExtractPopupKeyboardSchema<T extends PopupKeyboard> =
	T extends PopupKeyboard<infer S> ? S : never

export type PopupKeyboard<T extends PopupKeyboardSchema = PopupKeyboardSchema> =
	Partial<T> | boolean

export type PopupKeyboardHandler<T extends PopupKeyboardSchema> = {
	[key in keyof T]: () => void
}
