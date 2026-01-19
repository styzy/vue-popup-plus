<template lang="pug">
.d-nav-demo(:class="{ 'is-active': isActive }" @click="handleNavigate()") DEMO
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()

const isActive = computed(() => {
	return route.path.startsWith('/demo')
})

function handleNavigate() {
	router.go('/demo/core')
}
</script>

<style lang="scss" scoped>
.d-nav-demo {
	@include base-style();
	display: flex;
	align-items: center;
	padding: 0 12px;
	font-weight: 500;
	cursor: pointer;
	&:not(.is-active) {
		&:hover {
			color: var(--docs-color-primary-light);
		}
	}
	&.is-active {
		position: relative;
		color: #ffffff;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
		z-index: 0;
		&:before {
			@include base-rainbow-background();
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -2;
		}
		&:after {
			@include base-transition();
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.05);
			z-index: -1;
		}
		&:hover {
			&::after {
				background-color: rgba(0, 0, 0, 0);
			}
		}
	}
}
</style>
