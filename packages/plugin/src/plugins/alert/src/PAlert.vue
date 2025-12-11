<template lang="pug">
.p-alert
	PScaffold
		template(#header)
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleConfirm()"
				iconClass="alert")
		PBody
			.content {{ content }}
		template(#footer)
			PFooter
				PButtonGroup(align="end")
					PButton(@click="handleConfirm()" theme="primary") {{ confirmText }}
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import { type Skin } from '../../../typings'
import PScaffold from '../../../components/PScaffold.vue'
import PHeader from '../../../components/PHeader.vue'
import PBody from '../../../components/PBody.vue'
import PFooter from '../../../components/PFooter.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

const popup = usePopup()

defineOptions({
	name: 'PAlert',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

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
	popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

.p-alert
	baseStyle()
	max-width 80vw
	max-height 80vh
	width 360px
	.content
		word-break break-all
		line-height 24px
</style>
