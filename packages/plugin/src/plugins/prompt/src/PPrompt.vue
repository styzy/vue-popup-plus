<template lang="pug">
PSkin.popup-prompt(:skin="skin")
	PLayout
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleCancel()"
				iconClass="prompt")
		PBody(fitIcon)
			.message(v-if="isRenderMessage") {{ message }}
			.input
				template(v-if="type === 'input'")
					input(
						:maxLength="maxLength"
						:placeholder="placeholder"
						type="text"
						v-model="inputValue")
				template(v-if="type === 'textarea'")
					textarea(
						:maxLength="maxLength"
						:placeholder="placeholder"
						v-model="inputValue")
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(@click="handleCancel()" type="plain") {{ cancelText }}
					PButton(@click="handleConfirm()" theme="primary") {{ confirmText }}
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { type PromptType } from '../index'
import { type Skin } from '../../../skin'
import PSkin from '../../../components/PSkin.vue'
import PLayout from '../../../components/PLayout.vue'
import PHeader from '../../../components/PHeader.vue'
import PBody from '../../../components/PBody.vue'
import PFooter from '../../../components/PFooter.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

defineOptions({
	name: 'PPrompt',
})

type Emits = {
	close: [inputValue?: string]
}

const emit = defineEmits<Emits>()

type Props = {
	skin: Skin
	title: string
	headerClose: boolean
	message: string | boolean
	type: PromptType
	defaultValue: string
	placeholder: string
	maxLength: number | null
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
	placeholder,
	maxLength,
	confirmText,
	cancelText,
} = defineProps<Props>()

const inputValue = ref(defaultValue)

const isRenderMessage = computed(() => message !== false)

function handleConfirm() {
	emit('close', inputValue.value)
}

function handleCancel() {
	emit('close')
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

.popup-prompt {
	@include base-style();
	max-width: 80vw;
	max-height: 80vh;
	width: 440px;
	box-shadow: use-var('box-shadow-large');
	border-radius: use-var('border-radius-large');
	overflow: hidden;
	.message {
		padding-bottom: use-var('spacing');
		max-height: calc(100vh - 122px);
		line-height: 24px;
		box-sizing: border-box;
		word-break: break-all;
		overflow-y: auto;
	}
	.input {
		input,
		textarea {
			@include base-transition();
			display: flex;
			align-items: center;
			justify-content: flex-start;
			box-sizing: border-box;
			width: 100%;
			padding: use-var('spacing-small');
			border: 1px solid use-color('border');
			border-radius: use-var('border-radius');
			color: use-color('text-main');
			background-color: transparent;
			outline: none;
			&:focus {
				border-color: use-color('primary');
			}
		}
		textarea {
			height: 100px;
			resize: none;
		}
	}
}
</style>
