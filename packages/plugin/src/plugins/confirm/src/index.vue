<template lang="pug">
PSkin(:class="ns.block()" :skin="skin")
	PLayout
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleCancel()"
				iconClass="confirm"
				iconTheme="warning")
		PBody(:fitIcon="skin === 'modern'")
			div(:class="ns.element('content')") {{ content }}
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(@click="handleCancel()" type="plain") {{ cancelText }}
					PButton(@click="handleConfirm()" theme="primary") {{ confirmText }}
</template>

<script lang="ts" setup>
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import {
	PBody,
	PButton,
	PButtonGroup,
	PFooter,
	PHeader,
	PLayout,
	PSkin,
} from '@plugin/components/internal'
import { useNamespace } from '@plugin/hooks'
import { type PopupSkin } from '@plugin/skin'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.CONFIRM,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.CONFIRM)

type Emits = {
	close: [isConfirm: boolean]
}

const emit = defineEmits<Emits>()

type Props = {
	skin: PopupSkin
	title: string
	headerClose: boolean
	content: string
	confirmText: string
	cancelText: string
	draggable: boolean
}

const {
	skin,
	title,
	headerClose,
	content,
	confirmText,
	cancelText,
	draggable,
} = defineProps<Props>()

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
