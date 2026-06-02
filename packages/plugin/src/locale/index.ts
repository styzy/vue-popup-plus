import { shallowRef } from 'vue'
import enUs from './langs/en-US'
import type { PLocale, PLocaleMessages } from './types'

export * from './types'

const _messages = shallowRef<PLocaleMessages>(enUs)

export function setLocale(messages: PLocaleMessages) {
	_messages.value = messages
}

export function useLocale(): PLocale {
	return {
		t(key) {
			return key
				.split('.')
				.reduce((acc, cur) => acc[cur], _messages.value as any)
		},
	}
}
