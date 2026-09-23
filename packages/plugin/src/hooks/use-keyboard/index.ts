import type { PopupInstanceId } from 'vue-popup-plus'
import type { PopupKeyboardConfig, PopupKeyboardHandler } from './types'

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
	const currentKeyboard = _.keyboardHistory[_.keyboardHistory.length - 1]
}

function findMatchedEvent(
	config: PopupKeyboardConfig,
	keyboardEvent: KeyboardEvent
) {
	for (const event in config) {
	}
}
