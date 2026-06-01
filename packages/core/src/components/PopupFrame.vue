<template lang="pug">
div(:class="[ns.block()]" :style="styleObject")
	slot
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import {
	POPUP_INSIDE_COMPONENT_NAMES,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '@core/CONSTANTS'
import { type PopupPlacement } from '@core/controller'
import { useNamespace } from '@core/hooks'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.FRAME,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.FRAME)
const viewportBoundary = inject(
	POPUP_INSIDE_COMPONENT_INJECTS.VIEWPORT_BOUNDARY
)!

type Props = {
	placement: PopupPlacement
	zIndex: number
}

const { placement, zIndex } = defineProps<Props>()

const styleObject = computed(() => {
	const style: Record<string, string | number> = {
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
	}

	if (viewportBoundary.value.fixed) {
		style.position = 'fixed'
		style.top = 0
		style.left = 0
		style.right = 0
		style.bottom = 0
	} else {
		style.position = 'absolute'
		style.top = `${viewportBoundary.value.top}px`
		style.left = `${viewportBoundary.value.left}px`
		style.width = `${viewportBoundary.value.width}px`
		style.height = `${viewportBoundary.value.height}px`
	}

	return style
})
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('frame') {
	display: flex;
	flex-direction: column;
	pointer-events: none;
}
</style>
