<template lang="pug">
.app
	.header
		DHeader
	.main(:class="{ 'is-home': isHome }")
		RouterView
	.footer
		DFooter
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

defineComponent({ name: 'App' })

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<style lang="stylus" scoped>
.app
	padding-top 80px
	.header
		position fixed
		height 80px
		top 0
		left 0
		right 0
		z-index 1
	.main
		flex: 1;
		display flex
		flex-direction column
		align-items stretch
		margin: 0 auto;
		max-width: 800px;
		min-height calc(100vh - 150px)
		&.is-home
			max-width: 1200px;
</style>
<style lang="stylus">
body
	padding: 0
	margin: 0
	font-family:
		'Inter',
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		'Open Sans',
		'Helvetica Neue',
		sans-serif;
</style>
