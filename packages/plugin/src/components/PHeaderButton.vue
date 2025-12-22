<template lang="pug">
.p-header-button(:class="classObject" @click.stop="handleClick()")
	i.iconfont-popup-plugin-preset(:class="iconClass")
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { injectSkin } from './PScaffold.vue'

defineOptions({
	name: 'PHeaderButton',
})

const skin = inject(injectSkin, 'modern')

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
	[`is-skin-${skin}`]: true,
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

.p-header-button {
	&.is-skin-classic {
		@include base-style();
		@include base-transition();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		color: var(--popup-plugin-preset-color-text-sub);
		cursor: pointer;
		i {
			font-size: 16px;
		}
		&.is-disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&.is-active,
		&:not(.is-disabled):hover {
			color: #ffffff;
			&.is-theme-primary {
				background-color: var(--popup-plugin-preset-color-primary);
			}
			&.is-theme-info {
				background-color: var(--popup-plugin-preset-color-info);
			}
			&.is-theme-success {
				background-color: var(--popup-plugin-preset-color-success);
			}
			&.is-theme-warning {
				background-color: var(--popup-plugin-preset-color-warning);
			}
			&.is-theme-danger {
				background-color: var(--popup-plugin-preset-color-danger);
			}
		}
	}
	&.is-skin-modern {
		@include base-style();
		@include base-transition();

		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;
		border-radius: var(--popup-plugin-preset-border-radius);
		color: var(--popup-plugin-preset-color-text-sub);
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
			background-color: var(--popup-plugin-preset-color-background-sub);
			&.is-theme-primary {
				color: var(--popup-plugin-preset-color-primary);
			}
			&.is-theme-info {
				color: var(--popup-plugin-preset-color-info);
			}
			&.is-theme-success {
				color: var(--popup-plugin-preset-color-success);
			}
			&.is-theme-warning {
				color: var(--popup-plugin-preset-color-warning);
			}
			&.is-theme-danger {
				color: var(--popup-plugin-preset-color-danger);
			}
		}
	}
}
</style>
