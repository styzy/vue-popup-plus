<template lang="pug">
PSkin(
	:class="[ns.block(), ns.is(`theme-${theme}`)]"
	:skin="skin"
	@mouseenter="handleMouseEnter"
	@mouseleave="handleMouseLeave")
	div(:class="ns.element('background')")
	div(:class="ns.element('background-theme')")
	div(:class="ns.element('background-border')")
	div(:class="ns.element('wrapper')")
		div(:class="ns.element('icon')")
			i.iconfont-popup-plugin-preset(:class="`toast-${theme}`")
		div(:class="ns.element('content')") {{ content }}
		div(
			:class="ns.element('close-btn')"
			@click="handleClose"
			v-if="showClose || !autoClose")
			i.iconfont-popup-plugin-preset.close
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { PSkin } from '@plugin/components/internal'
import { useNamespace } from '@plugin/hooks'
import { type PopupSkin } from '@plugin/skin'
import { type Theme } from '@plugin/typings'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.MESSAGE,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.MESSAGE)

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	skin: PopupSkin
	content: string
	theme: Theme
	duration: number
	showClose: boolean
	hoverWait: boolean
}

const { skin, content, theme, duration, showClose, hoverWait } =
	defineProps<Props>()

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

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@mixin create-theme($color) {
	@include ns-element('background-theme') {
		background-color: $color;
	}
	@include ns-element('background-border') {
		border-color: $color;
	}
	@include ns-element('icon') {
		color: $color;
	}
	@include ns-element('content') {
		color: $color;
	}
	@include ns-element('close-btn') {
		&:hover {
			color: $color;
		}
	}
}

@include ns-block('message') {
	@include base-style();
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 30vw;
	border-radius: use-radius();
	pointer-events: auto;
	@include ns-element('background') {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: use-radius();
		background-color: #ffffff;
		z-index: -3;
		@include use-dark() {
			background-color: use-color(background);
		}
	}
	@include ns-element('background-theme') {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: use-radius();
		opacity: 0.1;
		z-index: -2;
	}
	@include ns-element('background-border') {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: use-radius();
		border-width: 1px;
		border-style: solid;
		opacity: 0.3;
		z-index: -1;
	}
	@include ns-element('wrapper') {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: use-spacing(small);
		padding: 0 15px;
		box-sizing: border-box;
		overflow: hidden;
	}
	@include ns-element('icon') {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 0;
		i {
			font-size: 16px;
		}
	}
	@include ns-element('content') {
		@include base-scroll-bar();
		flex: 1;
		padding: 11px 0;
		max-height: calc(100vh - 40px);
		line-height: 1.6;
		box-sizing: border-box;
		font-size: use-font-size(text);
		word-break: break-all;
		overflow-x: hidden;
		overflow-y: auto;
	}
	@include ns-element('close-btn') {
		@include base-transition();
		display: flex;
		align-items: center;
		justify-content: center;
		color: use-color(info);
		cursor: pointer;
		i {
			font-size: 10px;
		}
	}
	@include ns-is('theme-primary') {
		@include create-theme(use-color(primary));
	}
	@include ns-is('theme-info') {
		@include create-theme(use-color(info));
	}
	@include ns-is('theme-success') {
		@include create-theme(use-color(success));
	}
	@include ns-is('theme-warning') {
		@include create-theme(use-color(warning));
	}
	@include ns-is('theme-danger') {
		@include create-theme(use-color(danger));
	}
	@include use-skin('modern') {
		box-shadow: use-box-shadow();
		@include ns-element('background-theme') {
			display: none;
		}
		@include ns-element('background-border') {
			display: none;
		}
		@include ns-element('icon') {
			i {
				font-size: 18px;
			}
		}
		@include ns-element('close-btn') {
			i {
				font-size: 13px;
			}
		}
	}
}
</style>
