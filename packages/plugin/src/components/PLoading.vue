<template lang="pug">
.p-loading
	svg(viewBox="25 25 50 50")
		circle(cx="50" cy="50" fill="none" r="20")
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PLoading',
})

type Props = {
	/**
	 * 加载遮罩的大小
	 * - 默认值为 `60`
	 */
	size?: number
}

const { size = 60 } = defineProps<Props>()
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-loading
	display inline-block
	width v-bind('`${size}px`')
	height v-bind('`${size}px`')
	svg
		width 100%
		height 100%
		animation rotate 2s linear infinite
		circle
			animation dash 1.5s ease-in-out infinite
			stroke-dasharray 90, 150
			stroke-dashoffset 0
			stroke-width 2
			stroke-linecap round
			stroke var(--popup-plugin-preset-color-primary)
@keyframes rotate
	100%
		transform rotate(360deg)
@keyframes dash
	0%
		stroke-dasharray 1, 200
		stroke-dashoffset 0
	50%
		stroke-dasharray 90, 150
		stroke-dashoffset -40px
	100%
		stroke-dasharray 90, 150
		stroke-dashoffset -120px
</style>
