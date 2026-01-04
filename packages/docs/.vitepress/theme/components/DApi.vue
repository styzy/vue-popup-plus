<template lang="pug">
a.d-api(:href="path")
	slot {{ label }}
</template>

<script setup lang="ts">
defineOptions({
	name: 'DApi',
})

type Props = {
	path: string
	label?: string
}

const { path, label = '' } = defineProps<Props>()
</script>

<style lang="scss" scoped>
.d-api {
	display: block;
	color: rgb(66, 81, 95);
	font-size: 15px;
	font-weight: 500;
	text-decoration: none;
	&:hover {
		color: var(--doc-color-primary);
	}
}
.dark {
	.d-api {
		color: rgb(207, 228, 250);
		&:hover {
			color: var(--doc-color-primary-light);
		}
	}
}
</style>
