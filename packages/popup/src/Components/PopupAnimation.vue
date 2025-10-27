<template lang="pug">
Transition(
	:enter-active-class="enterActiveClass"
	:leave-active-class="leaveActiveClass")
	slot(
		:style="{ animationDuration: `${duration}ms` }"
		v-if="isShow && !store.isBeforeUnmount")
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import type { Animation } from '../animation'
import { POPUP_INSIDE_COMPONENT_INJECTS } from '../CONSTANTS'

defineOptions({
	name: 'PopupAnimation',
})

const { type, duration } = defineProps<{
	type: Animation
	duration: number
}>()

const store = inject(POPUP_INSIDE_COMPONENT_INJECTS.INSTANCE_STORE)!

const isShow = ref(false)

const enterActiveClass = computed(
	() => `vue-popup-plus-animation vue-popup-plus-animation-enter-${type}`
)

const leaveActiveClass = computed(
	() => `vue-popup-plus-animation vue-popup-plus-animation-leave-${type}`
)

const animationDuration = computed(() => `${duration}ms`)

onMounted(() => {
	isShow.value = true
})
</script>

<style lang="stylus">
.vue-popup-plus-animation
	animation-timing-function linear
	animation-duration v-bind(animationDuration)
</style>

