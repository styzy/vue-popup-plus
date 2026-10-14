import type { PopupInstanceId } from 'vue-popup-plus'
import { typeOf } from 'utils'
import type {
	PopupKeyboardConfig,
	PopupKeyboardHandler,
	PopupKeyboardMatchedConfig,
	PopupKeyboardShortcut,
	PopupKeyboardShortcutObject,
} from './types'

export * from './types'

const _: {
	keyboardHistory: Array<{
		instanceId: PopupInstanceId
		config: PopupKeyboardConfig
		handlers: PopupKeyboardHandler<PopupKeyboardConfig>
	}>
	isListening: boolean
} = {
	keyboardHistory: [],
	isListening: false,
}

export function addKeyboardHandlers<T extends PopupKeyboardConfig>(
	instanceId: PopupInstanceId,
	config: T,
	handlers: PopupKeyboardHandler<T>
) {
	_.keyboardHistory.push({
		instanceId,
		config,
		handlers,
	})

	if (!_.isListening) {
		document.addEventListener('keydown', handleKeyDown)
		_.isListening = true
	}
}

export function removeKeyboardHandlers(instanceId: PopupInstanceId) {
	_.keyboardHistory.splice(
		_.keyboardHistory.findIndex((item) => item.instanceId === instanceId),
		1
	)

	if (_.keyboardHistory.length === 0) {
		document.removeEventListener('keydown', handleKeyDown)
		_.isListening = false
	}
}

function handleKeyDown(event: KeyboardEvent) {
	if (!_.keyboardHistory.length) return

	const currentKeyboard = _.keyboardHistory[_.keyboardHistory.length - 1]
	const matchedConfig = findMatchedConfig(currentKeyboard.config, event)
	const matchedShortcuts = Object.values(matchedConfig).flat()
	const preventDefault = matchedShortcuts.some((item) => item.preventDefault)
	const stopPropagation = matchedShortcuts.some(
		(item) => item.stopPropagation
	)

	Object.keys(matchedConfig).forEach((event) => {
		currentKeyboard.handlers[event]()
	})

	if (preventDefault) {
		event.preventDefault()
	}
	if (stopPropagation) {
		event.stopPropagation()
	}
}

function findMatchedConfig(
	config: PopupKeyboardConfig,
	keyboardEvent: KeyboardEvent
): PopupKeyboardMatchedConfig {
	const matchedConfig: PopupKeyboardMatchedConfig = {}
	for (const event in config) {
		const shortcut = config[event]
		if (shortcut === false) {
			continue
		} else if (typeOf.isArray(shortcut)) {
			const matchedShortcut = shortcut
				.map(normalizeShortcut)
				.filter((item) => isMatchedShortcut(item, keyboardEvent))

			if (matchedShortcut.length) {
				matchedConfig[event] = matchedShortcut
			}
		} else {
			const normalizedShortcut = normalizeShortcut(shortcut)

			if (isMatchedShortcut(normalizedShortcut, keyboardEvent)) {
				matchedConfig[event] = [normalizedShortcut]
			}
		}
	}

	return matchedConfig
}

function normalizeShortcut(
	shortcut: PopupKeyboardShortcut
): PopupKeyboardShortcutObject {
	if (typeOf.isString(shortcut)) {
		return {
			key: shortcut,
		}
	}
	return shortcut
}

function isMatchedShortcut(
	shortcut: PopupKeyboardShortcutObject,
	event: KeyboardEvent
): boolean {}
