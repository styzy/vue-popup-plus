<template lang="pug">
Badge(:text="badgeText" :type="badgeType")
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { type Version } from 'vue-popup-plus'

defineOptions({
	name: 'DVersionTodo',
})

type Level = 'high' | 'medium' | 'low'

type Props = {
	version: Version
	level?: Level
	author?: string
}
const {
	version,
	level = 'medium',
	author = 'unassigned',
} = defineProps<Props>()

const badgeText = computed(() => `${version} - ${level} - ${author}`)
const badgeType = computed(
	() =>
		({
			high: 'danger',
			medium: 'warning',
			low: 'tip',
		})[level]
)
</script>

<!-- <style lang="scss" scoped></style> -->
