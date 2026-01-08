<template lang="pug">
.p-alert(:class="`is-skin-${skin}`")
	PScaffold(:skin="skin")
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleConfirm()"
				iconClass="alert")
		PBody(fitIcon)
			.content {{ content }}
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(@click="handleConfirm()" theme="primary") {{ confirmText }}
</template>

<script lang="ts" setup>
import { type Skin } from '../../../typings'
import PScaffold from '../../../components/PScaffold.vue'
import PHeader from '../../../components/PHeader.vue'
import PBody from '../../../components/PBody.vue'
import PFooter from '../../../components/PFooter.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

defineOptions({
	name: 'PAlert',
})

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	skin: Skin
	title: string
	headerClose: boolean
	content: string
	confirmText: string
	draggable: boolean
}

const { title, headerClose, content, confirmText, draggable } =
	defineProps<Props>()

function handleConfirm() {
	emit('close')
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

.p-alert {
	@include base-style();
	max-width: 80vw;
	max-height: 80vh;
	box-shadow: var(--popup-plugin-preset-box-shadow);
	border-radius: var(--popup-plugin-preset-border-radius-large);
	overflow: hidden;
	.content {
		word-break: break-all;
		line-height: 24px;
	}
	&.is-skin-modern {
		width: 400px;
	}
	&.is-skin-classic {
		width: 360px;
	}
}
</style>
