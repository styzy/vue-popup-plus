<template lang="pug">
.p-message(
	:class="`is-theme-${theme}`"
	@mouseenter="handleMouseEnter"
	@mouseleave="handleMouseLeave")
	.background
	.background-theme
	.background-border
	.wrapper
		.icon
			i.iconfont-popup-plugin-preset(:class="`toast-${theme}`")
		.content {{ content }}
		.close-btn(@click="handleClose" v-if="showClose || !autoClose")
			i.iconfont-popup-plugin-preset.close
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { type Skin } from '../../../skin'
import { type Theme } from '../../../typings'

defineOptions({
	name: 'PMessage',
})

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	skin: Skin
	content: string
	theme: Theme
	duration: number
	showClose: boolean
	hoverWait: boolean
}

const { content, theme, duration, showClose, hoverWait } = defineProps<Props>()

const destroyTimer = ref<number>()

const autoClose = computed(() => duration > 0)

onMounted(() => {
	startDestroyTimer()
})

onBeforeUnmount(() => {
	stopDestroyTimer()
})

function startDestroyTimer() {
	if (!autoClose.value) return

	destroyTimer.value = window.setTimeout(handleClose, duration)
}

function stopDestroyTimer() {
	if (destroyTimer.value) {
		window.clearTimeout(destroyTimer.value)
	}
}

function handleMouseEnter() {
	if (!hoverWait || !autoClose.value) return

	stopDestroyTimer()
}

function handleMouseLeave() {
	if (!hoverWait || !autoClose.value) return

	startDestroyTimer()
}

function handleClose() {
	emit('close')
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

@mixin create-theme($theme, $color) {
	&.is-theme-#{$theme} {
		.background-theme {
			background-color: $color;
		}
		.background-border {
			border-color: $color;
		}
		.wrapper {
			.icon,
			.content {
				color: $color;
			}
			.close-btn:hover {
				color: $color;
			}
		}
	}
}

$border-radius: 4px;

.p-message {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 30vw;
	border-radius: $border-radius;
	.background,
	.background-theme,
	.background-border {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: $border-radius;
	}
	.background {
		background-color: var(--popup-plugin-preset-color-background-sub);
		z-index: -3;
	}
	.background-theme {
		opacity: 0.1;
		z-index: -2;
	}
	.background-border {
		border-width: 1px;
		border-style: solid;
		opacity: 0.3;
		z-index: -1;
	}
	.wrapper {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 11px;
		padding: 0 15px;
		box-sizing: border-box;
		overflow: hidden;
		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 0;
			i {
				font-size: var(--popup-plugin-preset-font-size-title-sub);
			}
		}
		.content {
			@include base-scroll-bar();
			flex: 1;
			padding: 11px 0;
			max-height: calc(100vh - 40px);
			line-height: 1.6;
			box-sizing: border-box;
			font-size: var(--popup-plugin-preset-font-size-text-main);
			word-break: break-all;
			overflow-x: hidden;
			overflow-y: auto;
		}
		.close-btn {
			@include base-transition();
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--popup-plugin-preset-color-info);
			cursor: pointer;
			i {
				font-size: var(--popup-plugin-preset-font-size-text-sub);
			}
		}
	}
	& {
		@include create-theme(
			'primary',
			var(--popup-plugin-preset-color-primary)
		);
		@include create-theme('info', var(--popup-plugin-preset-color-info));
		@include create-theme(
			'success',
			var(--popup-plugin-preset-color-success)
		);
		@include create-theme(
			'warning',
			var(--popup-plugin-preset-color-warning)
		);
		@include create-theme(
			'danger',
			var(--popup-plugin-preset-color-danger)
		);
	}
}
</style>
