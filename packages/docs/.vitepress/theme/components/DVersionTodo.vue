<template lang="pug">
Badge.in-todo(:text="badgeText" :type="badgeType")
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { type PopupVersion } from 'vue-popup-plus'

defineOptions({
	name: 'DVersionTodo',
})

type Level = 'high' | 'medium' | 'low'

type Props = {
	version: PopupVersion
	level?: Level
	author?: string
	done?: boolean
}
const {
	version,
	level = 'medium',
	author = 'unassigned',
	done = false,
} = defineProps<Props>()

const badgeText = computed(
	() => `${version} - ${done ? 'finish' : level} - ${author}`
)
const badgeType = computed(() =>
	done
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
		background-color: var(--docs-color-success);
		color: #ffffff;
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}
}
</style>
