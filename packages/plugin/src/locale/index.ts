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
			const keys = key.split('.')
			return keys.reduce(
				(item, _key, index) =>
					item[_key] ?? (index === keys.length - 1 ? key : {}),
				_messages.value as any
			)
		},
	}
}
