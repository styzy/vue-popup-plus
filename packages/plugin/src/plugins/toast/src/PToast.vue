<template lang="pug">
.p-message
	.content {{ content }}
</template>
<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

defineOptions({
	name: 'PToast',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	content: string
	duration: number
}

const { content, duration } = defineProps<Props>()

onMounted(() => {
	window.setTimeout(() => {
		popup.destroy(instanceId)
	}, duration)
})
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

.p-message
	padding 15px 20px
	border-radius 4px
	background-color rgba(0, 0, 0, 0.75)
	color #FFFFFF
	.content
		overflow hidden
		max-width 300px
		max-height 80vh
		word-break break-all
		font-size $font-size-text-main
		line-height 1.5
</style>
