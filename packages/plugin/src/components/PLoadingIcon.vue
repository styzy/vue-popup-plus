<template lang="pug">
.popup-loading-icon(:class="`is-theme-${theme}`")
	svg(viewBox="25 25 50 50")
		circle(cx="50" cy="50" fill="none" r="20")
</template>

<script lang="ts" setup>
import type { Theme } from '../typings'

defineOptions({
	name: 'PLoadingIcon',
})

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

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.popup-loading-icon {
	display: inline-block;
	width: v-bind('`${size}px`');
	height: v-bind('`${size}px`');
	svg {
		width: 100%;
		height: 100%;
		animation: rotate 2s linear infinite;
		circle {
			animation: dash 1.5s ease-in-out infinite;
			stroke-dasharray: 90, 150;
			stroke-dashoffset: 0;
			stroke-width: 3;
			stroke-linecap: round;
		}
	}
	&.is-theme-primary {
		stroke: use-color('primary');
	}
	&.is-theme-info {
		stroke: use-color('info');
	}
	&.is-theme-success {
		stroke: use-color('success');
	}
	&.is-theme-warning {
		stroke: use-color('warning');
	}
	&.is-theme-danger {
		stroke: use-color('danger');
	}
}
@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}
@keyframes dash {
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
</style>
