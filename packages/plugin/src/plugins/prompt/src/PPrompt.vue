<template lang="pug">
.p-prompt(:class="`is-skin-${skin}`")
	PScaffold(:skin="skin")
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
import { type Skin } from '../../../typings'
import PScaffold from '../../../components/PScaffold.vue'
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

.p-prompt {
	@include base-style();
	max-width: 80vw;
	max-height: 80vh;
	box-shadow: var(--popup-plugin-preset-box-shadow);
	border-radius: var(--popup-plugin-preset-border-radius-large);
	overflow: hidden;
	.message {
		padding-bottom: 20px;
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
			padding: 10px;
			border: 1px solid var(--popup-plugin-preset-color-border);
			border-radius: var(--popup-plugin-preset-border-radius);
			color: var(--popup-plugin-preset-color-text-main);
			background-color: transparent;
			outline: none;
			&:focus {
				border-color: var(--popup-plugin-preset-color-primary);
			}
		}
		textarea {
			height: 100px;
			resize: none;
		}
	}
	&.is-skin-modern {
		width: 400px;
	}
	&.is-skin-classic {
		width: 360px;
	}
}
</style>
