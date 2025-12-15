<template lang="pug">
.popup-frame(:style="styleObject")
	slot
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Placement } from '../controller'

defineOptions({
	name: 'PopupFrame',
})

type Props = {
	placement: Placement
	zIndex: number
}

const { placement, zIndex } = defineProps<Props>()

const styleObject = computed(() => ({
	alignItems: placement.includes('left')
		? 'flex-start'
		: placement.includes('right')
			? 'flex-end'
			: 'center',
	justifyContent: placement.includes('top')
		? 'flex-start'
		: placement.includes('bottom')
			? 'flex-end'
			: 'center',
	zIndex: zIndex,
}))
</script>

<style lang="stylus" scoped>
.popup-frame
	display flex
	flex-direction column
	position fixed
	top 0
	right 0
	bottom 0
	left 0
	pointer-events none
</style>
