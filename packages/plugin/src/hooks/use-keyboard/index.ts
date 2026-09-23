import type { PopupInstanceId } from 'vue-popup-plus'
import { typeOf } from 'utils'
import type {
	PopupKeyboardConfig,
	PopupKeyboardEvent,
	PopupKeyboardHandler,
	PopupKeyboardShortcut,
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
	const matchedEvents = findMatchedEvents(currentKeyboard.config, event)
	matchedEvents.forEach((item) => {
		currentKeyboard.handlers[item]()
	})
}

function findMatchedEvents(
	config: PopupKeyboardConfig,
	keyboardEvent: KeyboardEvent
): PopupKeyboardEvent[] {
	const events: PopupKeyboardEvent[] = []
	for (const event in config) {
		const shortcut = config[event]
		if (shortcut === false) {
			continue
		} else if (typeOf.isArray(shortcut)) {
			if (
				shortcut.some((item) => isMatchedShortcut(item, keyboardEvent))
			) {
				events.push(event)
			}
		} else {
			if (isMatchedShortcut(shortcut, keyboardEvent)) {
				events.push(event)
			}
		}
	}

	return events
}

function isMatchedShortcut(
	shortcut: PopupKeyboardShortcut,
	event: KeyboardEvent
): boolean {}
