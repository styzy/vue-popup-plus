export type PLocaleLang = ['zh-CN', 'en-US'][number]

export type PLocale = {
	lang: PLocaleLang
	source: PLangSource
}

export interface PLangSource {
	input: {
		placeholder: string
	}
}
