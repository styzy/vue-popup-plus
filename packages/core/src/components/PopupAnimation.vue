<template lang="pug">
Transition(
	:enter-active-class="enterActiveClass"
	:leave-active-class="leaveActiveClass")
	slot(
		:style="{ animationDuration: `${duration}ms` }"
		v-if="isShow && !isBeforeUnmount")
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { Animation } from '../animation'
import { POPUP_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'

const ANIMATION_NAMESPACE = 'popup-animation'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.ANIMATION,
})

type Props = {
	type: Animation
	duration: number
	isBeforeUnmount: boolean
}

const { type, duration, isBeforeUnmount } = defineProps<Props>()

const isShow = ref(false)

const enterActiveClass = computed(
	() => `${ANIMATION_NAMESPACE} ${ANIMATION_NAMESPACE}-enter-${type}`
)

const leaveActiveClass = computed(
	() => `${ANIMATION_NAMESPACE} ${ANIMATION_NAMESPACE}-leave-${type}`
)

const animationDuration = computed(() => `${duration}ms`)

onMounted(() => {
	isShow.value = true
})
</script>

<style lang="scss">
@use '../assets/styles/namespace.scss' as namespace;

.#{namespace.$animation} {
	animation-timing-function: linear;
	animation-duration: v-bind(animationDuration);
}
</style>
