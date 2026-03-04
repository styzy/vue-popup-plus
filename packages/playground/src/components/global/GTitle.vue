<template lang="pug">
.g-title(:class="{ 'is-large': large, 'is-second': second, 'is-third': third }")
	slot
</template>

<script lang="ts" setup>
type Props = {
	large?: boolean
	second?: boolean
	third?: boolean
}

const { large, second, third } = defineProps<Props>()
</script>

<style lang="scss" scoped>
.g-title {
	color: var(--playground-color-text-main);
	font-weight: 700;
	font-size: 28px;
	&.is-large {
		padding: 10px 0;
		font-size: 36px;
		color: var(--popup-color-primary);
	}
	&.is-second {
		padding: 10px 0;
		font-size: 20px;
	}
	&.is-third {
		font-size: 16px;
	}
}
</style>
