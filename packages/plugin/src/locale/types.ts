// 拼接json键名
type DeepDotKey<T, Pre extends string = ''> =
	T extends Record<string, any>
		? {
				[K in keyof T & string]: T[K] extends Record<string, any>
					? DeepDotKey<T[K], `${Pre}${K}.`>
					: `${Pre}${K}`
			}[keyof T & string]
		: never

export interface PopupLocale {
	t(key: DeepDotKey<PopupLocaleMessages>): string
}

export interface PopupLocaleMessages {
	album: {
		copySuccess: string
		pureModeEnter: string
		pureModeExit: string
	}
	alert: {
		title: string
		confirmText: string
	}
	confirm: {
		title: string
		confirmText: string
		cancelText: string
	}
	dialog: {
		title: string
	}
	drawer: {
		title: string
	}
	prompt: {
		title: string
		placeholder: string
		confirmText: string
		cancelText: string
	}
}
