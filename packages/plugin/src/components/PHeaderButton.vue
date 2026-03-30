<template lang="pug">
div(:class="classObject" @click.stop="handleClick()")
	i.iconfont-popup-plugin-preset(:class="iconClass")
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '../hooks'
import { P_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.HEADER_BUTTON,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.HEADER_BUTTON)

type ButtonTheme = 'primary' | 'info' | 'success' | 'warning' | 'danger'

type Props = {
	iconClass?: string
	theme?: ButtonTheme
	disabled?: boolean
	actived?: boolean
}

const {
	iconClass = '',
	theme = 'primary',
	disabled = false,
	actived = false,
} = defineProps<Props>()

const emit = defineEmits(['click'])

const classObject = computed(() => [
	ns.block(),
	ns.is(`theme-${theme}`),
	{
		[ns.is('disabled')]: disabled,
		[ns.is('actived')]: actived,
	},
])

function handleClick() {
	if (disabled) return

	emit('click')
}
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('header-button') {
	@include use-skin('classic') {
		@include base-style();
		@include base-transition();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		color: use-color(text);
		cursor: pointer;
		i {
			font-size: 12px;
		}
		@include ns-is('disabled') {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&.is-active,
		&:not(.is-disabled):hover {
			color: #ffffff;
			@include ns-is('theme-primary') {
				background-color: use-color(primary);
			}
			@include ns-is('theme-info') {
				background-color: use-color(info);
			}
			@include ns-is('theme-success') {
				background-color: use-color(success);
			}
			@include ns-is('theme-warning') {
				background-color: use-color(warning);
			}
			@include ns-is('theme-danger') {
				background-color: use-color(danger);
			}
		}
	}
	@include use-skin('modern') {
		@include base-style();
		@include base-transition();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;
		border-radius: use-radius();
		color: use-color(info);
		cursor: pointer;
		i {
			display: block;
			font-size: 12px;
		}
		@include ns-is('disabled') {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&.is-active,
		&:not(.is-disabled):hover {
			background-color: rgba(0, 0, 0, 0.05);
			@include ns-is('theme-primary') {
				color: use-color(primary);
			}
			@include ns-is('theme-info') {
				color: use-color(info);
			}
			@include ns-is('theme-success') {
				color: use-color(success);
			}
			@include ns-is('theme-warning') {
				color: use-color(warning);
			}
			@include ns-is('theme-danger') {
				color: use-color(danger);
			}
		}
		@include use-dark() {
			&.is-active,
			&:not(.is-disabled):hover {
				background-color: rgba(255, 255, 255, 0.05);
			}
		}
	}
}
</style>
