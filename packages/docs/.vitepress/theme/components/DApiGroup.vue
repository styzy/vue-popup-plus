<template lang="pug">
.d-api-group
	.title {{ title }}
	.body
		slot
</template>

<script setup lang="ts">
defineOptions({
	name: 'DApiGroup',
})

type Props = {
	title: string
}

const { title } = defineProps<Props>()
</script>

<style lang="scss" scoped>
.d-api-group {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 8px;
	box-sizing: border-box;
	background-color: #edf2f7;
	overflow: hidden;
	.title {
		color: var(--doc-color-primary);
		font-size: var(--doc-font-size-title-main);
		font-weight: 700;
	}
	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 5px;
	}
}
.dark {
	.d-api-group {
		background-color: #252527;
		.title {
			color: var(--doc-color-primary-light);
		}
	}
}
</style>
