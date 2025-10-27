<template></template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

defineOptions({
	name: 'PWindowResize',
})

type Props = {
	debounce?: number
}

const { debounce = 500 } = defineProps<Props>()

type WindowSize = {
	width: number
	height: number
}

const emit = defineEmits<{
	(event: 'resize', size: WindowSize): void
}>()

const timer = ref<number | null>(null)

onBeforeMount(() => {
	addListener()
})

onBeforeUnmount(() => {
	removeListener()
})

function addListener() {
	window.addEventListener('resize', handleResize)
}

function removeListener() {
	window.removeEventListener('resize', handleResize)
}

function handleResize() {
	if (timer.value) window.clearTimeout(timer.value)

	timer.value = window.setTimeout(() => {
		timer.value = null
		emit('resize', getWindowSize())
	}, debounce)
}

function getWindowSize() {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	}
}
</script>
