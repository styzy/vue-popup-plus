<template lang="pug">
PSkin.popup-confirm(:skin="skin")
	PLayout
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleCancel()"
				iconClass="confirm"
				iconTheme="warning")
		PBody(fitIcon)
			.content {{ content }}
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(@click="handleCancel()" type="plain") {{ cancelText }}
					PButton(@click="handleConfirm()" theme="primary") {{ confirmText }}
</template>

<script lang="ts" setup>
import { type Skin } from '../../../skin'
import PSkin from '../../../components/PSkin.vue'
import PLayout from '../../../components/PLayout.vue'
import PHeader from '../../../components/PHeader.vue'
import PBody from '../../../components/PBody.vue'
import PFooter from '../../../components/PFooter.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

defineOptions({
	name: 'PConfirm',
})

type Emits = {
	close: [isConfirm: boolean]
}

const emit = defineEmits<Emits>()

type Props = {
	skin: Skin
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

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

.popup-confirm {
	@include base-style();
	max-width: 80vw;
	max-height: 80vh;
	width: 400px;
	box-shadow: use-var('box-shadow-large');
	border-radius: use-var('border-radius-large');
	overflow: hidden;
	.content {
		word-break: break-all;
		line-height: 24px;
	}
}
</style>
