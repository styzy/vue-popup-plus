<template lang="pug">
Badge.in-todo(:text="badgeText" :type="badgeType")
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
	finish?: boolean
}
const {
	version,
	level = 'medium',
	author = 'unassigned',
	finish = false,
} = defineProps<Props>()

const badgeText = computed(
	() => `${version} - ${finish ? 'finish' : level} - ${author}`
)
const badgeType = computed(() =>
	finish
		? 'success'
		: {
				high: 'danger',
				medium: 'warning',
				low: 'tip',
			}[level]
)
</script>

<style lang="scss" scoped>
.in-todo {
	&.success {
		background-color: var(--popup-plugin-preset-color-success);
		color: #ffffff;
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}
}
</style>
