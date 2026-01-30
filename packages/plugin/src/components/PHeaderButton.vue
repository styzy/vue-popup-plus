<template lang="pug">
.popup-header-button(:class="classObject" @click.stop="handleClick()")
	i.iconfont-popup-plugin-preset(:class="iconClass")
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
	name: 'PHeaderButton',
})

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

const classObject = computed(() => ({
	[`is-theme-${theme}`]: true,
	'is-disabled': disabled,
	'is-active': actived,
}))

function handleClick() {
	if (disabled) return

	emit('click')
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

@include use-skin('classic') {
	.popup-header-button {
		@include base-style();
		@include base-transition();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		color: use-color('text-sub');
		cursor: pointer;
		i {
			font-size: 12px;
		}
		&.is-disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&.is-active,
		&:not(.is-disabled):hover {
			color: #ffffff;
			&.is-theme-primary {
				background-color: use-color('primary');
			}
			&.is-theme-info {
				background-color: use-color('info');
			}
			&.is-theme-success {
				background-color: use-color('success');
			}
			&.is-theme-warning {
				background-color: use-color('warning');
			}
			&.is-theme-danger {
				background-color: use-color('danger');
			}
		}
	}
}

@include use-skin('modern') {
	.popup-header-button {
		@include base-style();
		@include base-transition();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;
		border-radius: use-var('border-radius');
		color: use-color('text-sub');
		cursor: pointer;
		i {
			display: block;
			font-size: 12px;
		}
		&.is-disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&.is-active,
		&:not(.is-disabled):hover {
			background-color: use-color('background-sub');
			&.is-theme-primary {
				color: use-color('primary');
			}
			&.is-theme-info {
				color: use-color('info');
			}
			&.is-theme-success {
				color: use-color('success');
			}
			&.is-theme-warning {
				color: use-color('warning');
			}
			&.is-theme-danger {
				color: use-color('danger');
			}
		}
	}
}
</style>
