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
import type { InstanceStore } from '@/Instance'
import { INSIDE_COMPONENT_INJECT_KEYS } from '@/CONSTANTS'

defineOptions({
	name: 'PopupAnimation',
})

const { type, duration } = defineProps<{
	type: symbol
	duration: number
}>()

const store = inject(
	INSIDE_COMPONENT_INJECT_KEYS.INSTANCE_STORE
) as InstanceStore

const isShow = ref(false)

const enterActiveClass = computed(
	() =>
		`vue-popup-plus-animation vue-popup-plus-animation-enter-${type.description}`
)

const leaveActiveClass = computed(
	() =>
		`vue-popup-plus-animation vue-popup-plus-animation-leave-${type.description}`
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
