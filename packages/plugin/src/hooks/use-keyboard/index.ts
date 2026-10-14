import type { PopupInstanceId } from 'vue-popup-plus'
import { typeOf } from 'utils'
import type {
	ExtractPopupKeyboardSchema,
	PopupKeyboard,
	PopupKeyboardHandler,
	PopupKeyboardSchema,
	PopupKeyboardShortcut,
	PopupKeyboardShortcutObject,
} from './types'

export * from './types'

const _: {
	keyboardHistory: Array<{
		instanceId: PopupInstanceId
		keyboard: Partial<PopupKeyboardSchema>
		handlers: PopupKeyboardHandler<PopupKeyboardSchema>
	}>
	isListening: boolean
} = {
	keyboardHistory: [],
	isListening: false,
}

export function useKeyboard() {
	return {
		addKeyboardHandlers,
		removeKeyboardHandlers,
	}
}

function addKeyboardHandlers<TSchema extends PopupKeyboardSchema>(
	instanceId: PopupInstanceId,
	{
		keyboard,
		defaultKeyboard,
		handlers,
	}: {
		keyboard: PopupKeyboard<TSchema>
		defaultKeyboard: Partial<TSchema>
		handlers: PopupKeyboardHandler<TSchema>
	}
) {
	if (keyboard === false) return

	let mergedKeyboard: Partial<TSchema>

	if (keyboard === true) {
		mergedKeyboard = defaultKeyboard
	} else {
		mergedKeyboard = {
			...defaultKeyboard,
			...keyboard,
		}
	}

	_.keyboardHistory.push({
		instanceId,
		keyboard: mergedKeyboard,
		handlers,
	})

	if (!_.isListening) {
		document.addEventListener('keydown', handleKeyDown)
		_.isListening = true
	}
}

function removeKeyboardHandlers(instanceId: PopupInstanceId) {
	const index = _.keyboardHistory.findIndex(
		(item) => item.instanceId === instanceId
	)

	if (index === -1) return

	_.keyboardHistory.splice(index, 1)

	if (_.keyboardHistory.length === 0) {
		document.removeEventListener('keydown', handleKeyDown)
		_.isListening = false
	}
}

function handleKeyDown(event: KeyboardEvent) {
	if (!_.keyboardHistory.length) return

	const { keyboard, handlers } =
		_.keyboardHistory[_.keyboardHistory.length - 1]
	const matchedKeyboard = findMatchedKeyboard(keyboard, event)
	const matchedShortcuts = Object.values(matchedKeyboard).flat()
	const preventDefault = matchedShortcuts.some((item) => item.preventDefault)
	const stopPropagation = matchedShortcuts.some(
		(item) => item.stopPropagation
	)

	Object.keys(matchedKeyboard).forEach((event) => {
		handlers[event]()
	})

	if (preventDefault) {
		event.preventDefault()
	}
	if (stopPropagation) {
		event.stopPropagation()
	}
}

function findMatchedKeyboard(
	keyboard: Partial<PopupKeyboardSchema>,
	keyboardEvent: KeyboardEvent
): {
	[key: string]: PopupKeyboardShortcutObject[]
} {
	const matchedKeyboard: {
		[key: string]: PopupKeyboardShortcutObject[]
	} = {}
	for (const event in keyboard) {
		const shortcut = keyboard[event] ?? false
		if (shortcut === false) {
			continue
		} else if (typeOf.isArray(shortcut)) {
			const matchedShortcut = shortcut
				.map(normalizeShortcut)
				.filter((item) => isMatchedShortcut(item, keyboardEvent))

			if (matchedShortcut.length) {
				matchedKeyboard[event] = matchedShortcut
			}
		} else {
			const normalizedShortcut = normalizeShortcut(shortcut)

			if (isMatchedShortcut(normalizedShortcut, keyboardEvent)) {
				matchedKeyboard[event] = [normalizedShortcut]
			}
		}
	}

	return matchedKeyboard
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
): boolean {
	const { key, ctrl, shift, alt, meta } = shortcut

	if (key !== event.key) {
		return false
	}

	if (ctrl !== undefined && ctrl !== event.ctrlKey) {
		return false
	}

	if (shift !== undefined && shift !== event.shiftKey) {
		return false
	}

	if (alt !== undefined && alt !== event.altKey) {
		return false
	}

	if (meta !== undefined && meta !== event.metaKey) {
		return false
	}

	return true
}
