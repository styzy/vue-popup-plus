// 拼接json键名
type DeepDotKey<T, Pre extends string = ''> =
	T extends Record<string, any>
		? {
				[K in keyof T & string]: T[K] extends Record<string, any>
					? DeepDotKey<T[K], `${Pre}${K}.`>
					: `${Pre}${K}`
			}[keyof T & string]
		: never

export interface PLocale {
	t(key: DeepDotKey<PLocaleMessages>): string
}

export interface PLocaleMessages {
	input: {
		placeholder: string
	}
}
