<template lang="pug">
div(:class="[ns.block(), ns.is(`theme-${theme}`)]")
	svg(viewBox="25 25 50 50")
		circle(cx="50" cy="50" fill="none" r="20")
</template>

<script lang="ts" setup>
import { useNamespace } from '../hooks'
import { P_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'
import type { Theme } from '../typings'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.LOADING_ICON,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.LOADING_ICON)

type Props = {
	/**
	 * 加载遮罩的主题
	 * - 默认值为 `'primary'`
	 */
	theme?: Theme
	/**
	 * 加载遮罩的大小
	 * - 默认值为 `60`
	 */
	size?: number
}

const { theme = 'primary', size = 60 } = defineProps<Props>()
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('loading-icon') {
	display: inline-block;
	width: v-bind('`${size}px`');
	height: v-bind('`${size}px`');
	svg {
		width: 100%;
		height: 100%;
		animation: popup-loading-icon__rotate 2s linear infinite;
		circle {
			animation: popup-loading-icon__dash 1.5s ease-in-out infinite;
			stroke-dasharray: 90, 150;
			stroke-dashoffset: 0;
			stroke-width: 3;
			stroke-linecap: round;
		}
	}
	@include ns-is('theme-primary') {
		stroke: use-color(primary);
	}
	@include ns-is('theme-info') {
		stroke: use-color(info);
	}
	@include ns-is('theme-success') {
		stroke: use-color(success);
	}
	@include ns-is('theme-warning') {
		stroke: use-color(warning);
	}
	@include ns-is('theme-danger') {
		stroke: use-color(danger);
	}
	@keyframes popup-loading-icon__rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes popup-loading-icon__dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -40px;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -120px;
		}
	}
}
</style>
