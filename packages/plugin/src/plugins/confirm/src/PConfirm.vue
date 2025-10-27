<template lang="pug">
.p-confirm
	PScaffold
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="false"
				:title="title"
				iconClass="confirm")
		PBody
			.content {{ content }}
		template(#footer)
			PFooter
				PButtonGroup(align="right" theme="primary")
					PButton(@click="handleConfirm(false)" type="plain") {{ cancelText }}
					PButton(@click="handleConfirm(true)") {{ confirmText }}
</template>

<script lang="ts" setup>
import { defineProps, inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import PScaffold from '../../../components/PScaffold.vue'
import PHeader from '../../../components/PHeader.vue'
import PBody from '../../../components/PBody.vue'
import PFooter from '../../../components/PFooter.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

const popup = usePopup()

defineOptions({
	name: 'PConfirm',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	title: string
	content: string
	confirmText: string
	cancelText: string
	draggable: boolean
}

const { title, content, confirmText, cancelText, draggable } =
	defineProps<Props>()

function handleConfirm(isConfirm: boolean) {
	popup.destroy(instanceId, isConfirm)
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

.p-confirm
	baseStyle()
	overflow hidden
	max-width 80vw
	max-height 80vh
	width 360px
	.content
		word-break break-all
		line-height 24px
</style>
