<template lang="pug">
PContainer(:class="ns.block()" :skin="skin")
	PLayout
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:iconTheme="theme"
				:title="title"
				@close="handleClose()"
				iconClass="confirm")
		PBody(:fitIcon="skin === 'modern'")
			div(:class="ns.element('content')") {{ content }}
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(:theme="theme" @click="handleCancel()" type="plain") {{ cancelText }}
					PButton(:theme="theme" @click="handleConfirm()" type="fill") {{ confirmText }}
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { usePopupInstanceId } from 'vue-popup-plus'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import {
	PBody,
	PButton,
	PButtonGroup,
	PFooter,
	PHeader,
	PLayout,
	PContainer,
} from '@plugin/components/internal'
import { useKeyboard, useNamespace } from '@plugin/hooks'
import { type PopupSkin } from '@plugin/skin'
import type { PopupTheme } from '@plugin/typings'
import type { PopupConfirmKeyboard } from './types'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.CONFIRM,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.CONFIRM)
const instanceId = usePopupInstanceId()!
const { addKeyboardHandlers, removeKeyboardHandlers } = useKeyboard()

type Emits = {
	close: [isConfirm: boolean]
}

const emit = defineEmits<Emits>()

type Props = {
	skin: PopupSkin
	theme: PopupTheme
	title: string
	headerClose: boolean
	content: string
	confirmText: string
	cancelText: string
	draggable: boolean
	keyboard: PopupConfirmKeyboard
}

const {
	skin,
	theme,
	title,
	headerClose,
	content,
	confirmText,
	cancelText,
	draggable,
	keyboard,
} = defineProps<Props>()

onMounted(() => {
	addKeyboardHandlers(instanceId, {
		keyboard,
		defaultKeyboard: {
			confirm: 'Enter',
			close: 'Escape',
		},
		handlers: {
			confirm: () => handleConfirm(),
			close: () => handleCancel(),
		},
	})
})

onBeforeUnmount(() => {
	removeKeyboardHandlers(instanceId)
})

function handleClose() {
	if (!headerClose) return

	emit('close', false)
}

function handleConfirm() {
	emit('close', true)
}

function handleCancel() {
	emit('close', false)
}
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('confirm') {
	@include base-style();
	max-width: 80vw;
	max-height: 80vh;
	width: 400px;
	box-shadow: use-box-shadow(large);
	border-radius: use-radius(large);
	overflow: hidden;
	@include ns-element('content') {
		word-break: break-all;
		line-height: 24px;
	}
}
</style>
