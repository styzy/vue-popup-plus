<template lang="pug">
Transition
	.popup-mask(
		:class="classObject"
		:style="styleObject"
		@click="handleClick"
		v-if="isShow && !store.isBeforeUnmount")
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import type { PopupStore } from '@/Popup'
import type { Controller } from '@/Controller'
import { usePopup } from '@'

defineOptions({
	name: 'PopupMask',
})

const popupId: string = inject('popupId', '')
const store: PopupStore = inject('popupStore') as PopupStore

const isShow = ref(false)

const classObject = computed(() => {
	return store.maskAnimations.map((type) => `animation-${type}`)
})

const styleObject = computed(() => {
	return {
		animationDuration: `${store.animationDuration / 1000}s`,
		zIndex: store.zIndex,
	}
})

onMounted(() => {
	isShow.value = true
})

function handleClick() {
	if (store.maskClickCloseEnabled) {
		const controller: Controller = usePopup()

		controller.destroy(popupId)
	}
}
</script>

<style lang="stylus" scoped>
@import './animation.styl'

.popup-mask
	useAnimation()

	position fixed
	top 0
	right 0
	bottom 0
	left 0
	background-color rgba(0, 0, 0, 0.3)
	animation-timing-function linear
</style>
