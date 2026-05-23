<template>
	<slot name="default"></slot>
</template>

<script setup lang="ts">
import {
	computed,
	getCurrentInstance,
	onBeforeUnmount,
	onMounted,
	ref,
} from 'vue'
import { isParentNode } from 'utils'
import { usePopup } from '../../..//hooks'
import { POPUP_COMPONENT_NAMES } from '../../../CONSTANTS'
import { type PopupInstanceId } from '../../../instance'
import {
	type PopupAnchorTrigger,
	type PopupAnchorTriggerEmits,
	type PopupAnchorTriggerProps,
	type PopupAnchorTriggerSlots,
} from './types'

defineOptions({
	name: POPUP_COMPONENT_NAMES.ANCHOR_TRIGGER,
})

const popup = usePopup()

const props = withDefaults(defineProps<PopupAnchorTriggerProps>(), {
	trigger: 'hover',
	renderDelay: 0,
	destroyDelay: 200,
	anchorFlip: undefined,
	disableScroll: undefined,
	mask: false,
	maskBlur: undefined,
	maskDestroy: undefined,
	maskTransparent: undefined,
	viewTranslateOverflow: undefined,
})

const triggers = computed(() =>
	typeof props.trigger === 'string' ? [props.trigger] : props.trigger
)

const emit = defineEmits<PopupAnchorTriggerEmits>()

const slots = defineSlots<PopupAnchorTriggerSlots>()

const anchorElement = ref<HTMLElement>()
const viewElement = ref<HTMLElement>()
const isRendered = ref(false)
const currentTrigger = ref<PopupAnchorTrigger>()
const renderDelayTimer = ref<number>()
const destroyDelayTimer = ref<number>()
let popupInstanceId: PopupInstanceId | null = null

onMounted(() => {
	getAnchorElement()
	addAnchorElementListeners()
})

onBeforeUnmount(() => {
	removeAnchorElementListeners()
})

function getAnchorElement() {
	anchorElement.value = getFirstElement(
		getCurrentInstance()?.vnode.el as HTMLElement
	)
}

function getFirstElement(node: Node | null): HTMLElement | undefined {
	if (!node) return undefined

	if (node.nodeType === Node.ELEMENT_NODE) {
		return node as HTMLElement
	}

	if (
		node.nodeType === Node.TEXT_NODE ||
		node.nodeType === Node.COMMENT_NODE
	) {
		return getFirstElement(node.nextSibling)
	}
}

function addAnchorElementListeners() {
	if (!anchorElement.value) return

	if (triggers.value.includes('click')) {
		anchorElement.value.addEventListener('click', handleAnchorElementClick)
	}

	if (triggers.value.includes('hover')) {
		anchorElement.value.addEventListener(
			'mouseenter',
			handleAnchorElementMouseEnter
		)
	}

	if (triggers.value.includes('focus')) {
		anchorElement.value.addEventListener('focus', handleAnchorElementFocus)
	}

	if (triggers.value.includes('contextmenu')) {
		anchorElement.value.addEventListener(
			'contextmenu',
			handleAnchorElementContextMenu
		)
	}
}

function removeAnchorElementListeners() {
	if (!anchorElement.value) return

	if (triggers.value.includes('click')) {
		anchorElement.value.removeEventListener(
			'click',
			handleAnchorElementClick
		)
	}

	if (triggers.value.includes('hover')) {
		anchorElement.value.removeEventListener(
			'mouseenter',
			handleAnchorElementMouseEnter
		)
	}

	if (triggers.value.includes('focus')) {
		anchorElement.value.removeEventListener(
			'focus',
			handleAnchorElementFocus
		)
	}

	if (triggers.value.includes('contextmenu')) {
		anchorElement.value.removeEventListener(
			'contextmenu',
			handleAnchorElementContextMenu
		)
	}
}

function handleAnchorElementClick() {
	handleDelayRender(() => {
		currentTrigger.value = 'click'
		window.addEventListener('click', handleWindowClick)
	})
}

function handleWindowClick(event: MouseEvent) {
	if (!viewElement.value) return

	if (viewElement.value === event.target) return

	if (isParentNode(viewElement.value, event.target as HTMLElement)) return

	handleDelayDestroy(() => {
		window.removeEventListener('click', handleWindowClick)
	})
}

function handleAnchorElementMouseEnter() {
	handleDelayRender(
		() => {
			currentTrigger.value = 'hover'
			anchorElement.value?.addEventListener(
				'mouseleave',
				handleMouseLeave
			)
		},
		() => {
			viewElement.value?.addEventListener(
				'mouseenter',
				handleViewElementMouseEnter
			)
			viewElement.value?.addEventListener('mouseleave', handleMouseLeave)
		}
	)
}

function handleMouseLeave() {
	handleDelayDestroy(() => {
		anchorElement.value?.removeEventListener('mouseleave', handleMouseLeave)
		viewElement.value?.removeEventListener(
			'mouseenter',
			handleViewElementMouseEnter
		)
		viewElement.value?.removeEventListener('mouseleave', handleMouseLeave)
	})
}

function handleViewElementMouseEnter() {
	if (isRendered.value) {
		if (destroyDelayTimer.value) {
			window.clearTimeout(destroyDelayTimer.value)
			destroyDelayTimer.value = undefined
		}
	}
}

function handleAnchorElementFocus() {
	handleDelayRender(() => {
		currentTrigger.value = 'focus'
		anchorElement.value?.addEventListener('blur', handleAnchorElementBlur)
	})
}

function handleAnchorElementBlur() {
	handleDelayDestroy(() => {
		anchorElement.value?.removeEventListener(
			'blur',
			handleAnchorElementBlur
		)
	})
}

function handleAnchorElementContextMenu(event: MouseEvent) {
	handleDelayRender(() => {
		currentTrigger.value = 'contextmenu'
		window.addEventListener('click', handleWindowClick)
	})
	event.preventDefault()
}

function handleDelayRender(beforeMount?: () => void, mounted?: () => void) {
	if (isRendered.value) {
		if (destroyDelayTimer.value) {
			window.clearTimeout(destroyDelayTimer.value)
			destroyDelayTimer.value = undefined
		}
	} else {
		if (renderDelayTimer.value) {
			window.clearTimeout(renderDelayTimer.value)
			renderDelayTimer.value = undefined
		}
		renderDelayTimer.value = window.setTimeout(async () => {
			emit('render')
			beforeMount?.()
			renderPopup(mounted)
			renderDelayTimer.value = undefined
		}, props.renderDelay)
	}
}

function handleDelayDestroy(callback?: () => void) {
	if (!isRendered.value) {
		if (renderDelayTimer.value) {
			window.clearTimeout(renderDelayTimer.value)
			renderDelayTimer.value = undefined
		}
	} else {
		if (destroyDelayTimer.value) {
			window.clearTimeout(destroyDelayTimer.value)
			destroyDelayTimer.value = undefined
		}
		destroyDelayTimer.value = window.setTimeout(() => {
			destroyPopup()
			callback?.()
		}, props.destroyDelay)
	}
}

function renderPopup(callback?: () => void) {
	if (popupInstanceId) {
		destroyPopup()
	}

	popupInstanceId = popup.render({
		component: {
			setup() {
				function getRootElement() {
					return getFirstElement(getCurrentInstance()?.proxy?.$el)
				}

				onMounted(() => {
					viewElement.value = getRootElement()
					callback?.()
				})

				onBeforeUnmount(() => {
					viewElement.value = undefined
				})

				return () => {
					return slots.popup({
						destroy: destroyPopup,
					})
				}
			},
		},
		anchor: anchorElement.value,
		...props,
		onMounted() {
			isRendered.value = true
		},
		onUnmounted() {
			handlePopupDestroy()
		},
	})
}

function destroyPopup() {
	popupInstanceId && popup.destroy(popupInstanceId)
}

function handlePopupDestroy() {
	if (currentTrigger.value === 'click') {
		window.removeEventListener('click', handleWindowClick)
	} else if (currentTrigger.value === 'hover') {
		anchorElement.value?.removeEventListener('mouseleave', handleMouseLeave)
		viewElement.value?.removeEventListener(
			'mouseenter',
			handleViewElementMouseEnter
		)
		viewElement.value?.removeEventListener('mouseleave', handleMouseLeave)
	} else if (currentTrigger.value === 'focus') {
		anchorElement.value?.removeEventListener(
			'blur',
			handleAnchorElementBlur
		)
	} else if (currentTrigger.value === 'contextmenu') {
		window.removeEventListener('click', handleWindowClick)
	}

	popupInstanceId = null
	isRendered.value = false
	emit('destroy')
}
</script>
