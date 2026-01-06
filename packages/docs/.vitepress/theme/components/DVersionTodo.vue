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
}
const { version, level = 'medium' } = defineProps<Props>()
const badgeText = computed(() => `${version} - ${level}`)
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
