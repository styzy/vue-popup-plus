import { shallowRef } from 'vue'
import type { PopupLocale, PopupLocaleMessages } from './types'

export * from './types'

const _messages = shallowRef<PopupLocaleMessages>()

export function setLocale(messages: PopupLocaleMessages) {
	_messages.value = messages
}

export function useLocale(): PopupLocale {
	return {
		t(key) {
			if (!_messages.value) return key

			const keys = key.split('.')
			return keys.reduce(
				(item, _key, index) =>
					item[_key] ?? (index === keys.length - 1 ? key : {}),
				_messages.value as any
			)
		},
	}
}
