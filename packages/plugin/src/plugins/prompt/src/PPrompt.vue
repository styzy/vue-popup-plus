<template lang="pug">
.p-prompt
	PScaffold
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleCancel()"
				iconClass="prompt")
		PBody
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
				PButtonGroup(align="right" theme="primary")
					PButton(@click="handleCancel()" type="plain") {{ cancelText }}
					PButton(@click="handleConfirm()") {{ confirmText }}
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import { type PromptType } from '../index'
import { type Skin } from '../../../typings'
import PScaffold from '../../../components/PScaffold.vue'
import PHeader from '../../../components/PHeader.vue'
import PBody from '../../../components/PBody.vue'
import PFooter from '../../../components/PFooter.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

const popup = usePopup()

defineOptions({
	name: 'PPrompt',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

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
	popup.destroy(instanceId, inputValue.value)
}

function handleCancel() {
	popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

.p-prompt
	baseStyle()
	max-width 80vw
	max-height 80vh
	width 360px
	.message
		padding-bottom 20px
		max-height calc(100vh - 122px)
		line-height 24px
		box-sizing border-box
		word-break break-all
		overflow-y auto
	.input
		input,
		textarea
			baseTrans()
			display flex
			align-items center
			justify-content flex-start
			box-sizing border-box
			width 100%
			padding 10px
			border 1px solid var(--popup-plugin-preset-color-border)
			border-radius 4px
			color var(--popup-plugin-preset-color-text-main)
			background-color transparent
			outline none
			&:focus
				border-color var(--popup-plugin-preset-color-primary)
		textarea
			height 100px
			resize none
</style>
