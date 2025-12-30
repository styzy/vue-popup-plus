<template lang="pug">
.d-api(v-if="!!links.length")
	.title {{ title }}
	.body
		a(:href="item.url" :key="item.url" v-for="item in links") {{ item.label }}
</template>

<script setup lang="ts">
defineOptions({
	name: 'DApi',
})

type Link = {
	label: string
	url: string
}

type Props = {
	title?: string
	links?: Link[]
}

const { title = '', links = [] } = defineProps<Props>()
</script>

<style lang="scss" scoped>
.d-api {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	margin-bottom: 20px;
	// width: 50%;
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
		gap: 5px;
		a {
			display: block;
			color: var(--vp-c-text-2);
			font-size: 15px;
			font-weight: 500;
			text-decoration: none;
			&:hover {
				color: var(--doc-color-primary-light);
			}
		}
	}
}
.dark {
	.d-api {
		background-color: #252527;
		.title {
			color: var(--doc-color-primary-light);
		}
		.body {
			a {
				color: rgb(207, 228, 250);
				&:hover {
					color: var(--doc-color-primary-light);
				}
			}
		}
	}
}
</style>
