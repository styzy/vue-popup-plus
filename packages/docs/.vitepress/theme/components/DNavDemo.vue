<template lang="pug">
.d-nav-demo DEMO
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const isActive = computed(() => {
	return route.path.startsWith('/demo')
})
</script>

<style lang="scss" scoped>
.d-nav-demo {
	display: flex;
	align-items: center;
	padding: 0 12px;
	cursor: pointer;
	&:hover {
		@include base-rainbow-background();
	}
}
</style>
