<template lang="pug">
.p-loading-mask
	.mask
	PLoading(:size="iconSize")
	PButtonGroup(align="center" v-if="debugMode")
		PButton(@click="handleClose" theme="primary") 强制关闭遮罩（仅在调试模式下可用）
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import PLoading from '../../../components/PLoading.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

const popup = usePopup()

defineOptions({
	name: 'PLoading',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	debugMode: boolean
	iconSize: number
}

const { debugMode, iconSize = 60 } = defineProps<Props>()

function handleClose() {
	popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>

.p-loading-mask
	display flex
	flex-direction column
	align-items center
	justify-content center
	gap 20px
	position relative
	height 100%
	.mask
		position absolute
		top 0
		left 0
		right 0
		bottom 0
		z-index -1
		background-color var(--popup-plugin-preset-color-background-main)
		opacity 0.5
</style>
