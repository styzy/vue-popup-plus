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

const ANIMATION_NAMESPACE = 'popup-animation'

defineOptions({
	name: 'PopupAnimation',
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

<style lang="scss" scoped>
@use '../assets/styles/config.scss' as config;

.#{config.$animation-namespace} {
	animation-timing-function: linear;
	animation-duration: v-bind(animationDuration);
}
</style>
