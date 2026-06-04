<template lang="pug">
PSkin(:class="ns.block()" :skin="skin")
	PLayout
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleCancel()"
				iconClass="prompt")
		PBody(:fitIcon="skin === 'modern'")
			div(:class="ns.element('message')" v-if="isRenderMessage") {{ message }}
			div(:class="[ns.element('input'), ns.is('error', !isValid)]")
				template(v-if="type === 'input'")
					input(
						:maxLength="maxLength"
						:placeholder="placeholder"
						@blur="handleBlur"
						@change="handleChange"
						@input="handleInput"
						type="text"
						v-model="inputValue")
				template(v-if="type === 'textarea'")
					textarea(
						:maxLength="maxLength"
						:placeholder="placeholder"
						@blur="handleBlur"
						@change="handleChange"
						@input="handleInput"
						v-model="inputValue")
			div(:class="ns.element('error-message')" v-if="!isValid") {{ validErrorMessage }}
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(@click="handleCancel()" type="plain") {{ cancelText }}
					PButton(@click="handleConfirm()" theme="primary") {{ confirmText }}
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
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
import {
	type PopupPromptType,
	type PopupPromptValidateTrigger,
	type PopupPromptValidator,
} from './types'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.PROMPT,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.PROMPT)

type Emits = {
	close: [inputValue?: string]
}

const emit = defineEmits<Emits>()

type Props = {
	skin: PopupSkin
	title: string
	headerClose: boolean
	message: string | boolean
	type: PopupPromptType
	defaultValue: string
	maxLength: number | null
	placeholder: string
	validator?: PopupPromptValidator
	validateTrigger: PopupPromptValidateTrigger
	confirmText: string
	cancelText: string
	draggable: boolean
}

const {
	skin,
	title,
	headerClose,
	message,
	type,
	defaultValue,
	maxLength,
	placeholder,
	validator,
	validateTrigger,
	confirmText,
	cancelText,
} = defineProps<Props>()

const inputValue = ref(defaultValue)
const isValid = ref(true)
const isValidPending = ref(false)
const validErrorMessage = ref('')

const isRenderMessage = computed(() => message !== false)

function handleInput() {
	if (validateTrigger !== 'input') return

	handleValidate()
}

function handleChange() {
	if (validateTrigger !== 'change') return

	handleValidate()
}

function handleBlur() {
	if (validateTrigger !== 'blur') return

	handleValidate()
}

async function handleConfirm() {
	if (isValidPending.value) return

	await handleValidate()

	if (!isValid.value) return

	emit('close', inputValue.value)
}

function handleCancel() {
	emit('close')
}

async function handleValidate() {
	if (!validator) return

	isValidPending.value = true
	try {
		await validator(inputValue.value)
		isValid.value = true
	} catch (error: any) {
		isValid.value = false
		validErrorMessage.value = error.message
	}
	isValidPending.value = false
}
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('prompt') {
	@include base-style();
	max-width: 80vw;
	max-height: 80vh;
	width: 440px;
	box-shadow: use-box-shadow(large);
	border-radius: use-radius(large);
	overflow: hidden;
	@include ns-element('message') {
		padding-bottom: use-spacing();
		max-height: calc(100vh - 122px);
		line-height: 24px;
		box-sizing: border-box;
		word-break: break-all;
		overflow-y: auto;
	}
	@include ns-element('input') {
		input,
		textarea {
			@include base-transition();
			display: flex;
			align-items: center;
			justify-content: flex-start;
			box-sizing: border-box;
			width: 100%;
			padding: use-spacing(small);
			border: 1px solid use-color(border);
			border-radius: use-radius();
			color: use-color(text);
			background-color: transparent;
			outline: none;
			&:focus {
				border-color: use-color(primary);
			}
		}
		textarea {
			height: 100px;
			resize: none;
		}
		@include ns-is('error') {
			input,
			textarea {
				border-color: use-color(danger);
			}
		}
	}
	@include ns-element('error-message') {
		color: use-color(danger);
		font-size: use-font-size(mini);
	}
}
</style>
