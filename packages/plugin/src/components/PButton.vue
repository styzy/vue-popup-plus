<template lang="pug">
button.popup-button(
	:class="classObject"
	:disabled="disabled"
	@click="handleClick($event)"
	ref="button")
	.background
	slot
</template>

<script lang="ts">
import { buttonGroupInjects } from './PButtonGroup.vue'

export type ButtonTheme =
	| 'default'
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'

export type ButtonType = 'default' | 'plain' | 'link' | 'text'

export type ButtonSize = 'default' | 'small' | 'large'
</script>

<script lang="ts" setup>
import { computed, inject, useTemplateRef } from 'vue'

defineOptions({
	name: 'PButton',
})

const inButtonGroup = inject(buttonGroupInjects.inButtonGroup, false)
const groupType = inject(buttonGroupInjects.groupType, 'default')
const groupTheme = inject(buttonGroupInjects.groupTheme, 'default')
const groupSize = inject(buttonGroupInjects.groupSize, 'default')

const buttonRef = useTemplateRef<HTMLButtonElement>('button')

type Props = {
	/**
	 * 按钮类型
	 * - 默认值为 `default`
	 */
	type?: ButtonType
	/**
	 * 按钮主题
	 * - 默认值为 `default`
	 */
	theme?: ButtonTheme
	/**
	 * 按钮大小
	 * - 默认值为 `default`
	 */
	size?: ButtonSize
	/**
	 * 是否禁用按钮
	 * - 默认值为 `false`
	 */
	disabled?: boolean
}

const { type, theme, size, disabled = false } = defineProps<Props>()

const emit = defineEmits<{
	(name: 'click', event: PointerEvent): void
}>()

const isMobile = computed(() => window.innerWidth <= 600)

const classObject = computed(() => ({
	[`is-type-${type || groupType}`]: true,
	[`is-theme-${theme || groupTheme}`]: true,
	[`is-size-${size || groupSize}`]: true,
	'is-mobile': isMobile.value,
}))

function handleClick(event: PointerEvent) {
	emit('click', event)
	buttonRef.value?.blur()
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

// 创建主题
@mixin create-theme($theme, $color, $color-dark, $color-light) {
	&.is-theme-#{$theme} {
		&.is-type-default,
		&.is-type-default:disabled:hover,
		&.is-type-default:disabled:active {
			border-color: $color;
			background-color: $color;
			color: #ffffff;
		}
		&.is-type-default:not(:disabled):hover:not(.is-mobile) {
			border-color: $color-light;
			background-color: $color-light;
			color: #ffffff;
		}
		&.is-type-default:not(:disabled):active {
			border-color: $color-dark !important;
			background-color: $color-dark !important;
			color: #ffffff;
		}
		&.is-type-plain,
		&.is-type-plain:disabled:hover,
		&.is-type-plain:disabled:active {
			border-color: $color;
			background-color: transparent;
			color: $color;
		}
		&.is-type-plain:not(:disabled):hover:not(.is-mobile) {
			border-color: $color;
			background-color: $color;
			color: #ffffff;
		}
		&.is-type-plain:not(:disabled):active {
			border-color: $color-dark !important;
			background-color: $color-dark !important;
			color: #ffffff;
		}
		&.is-type-text {
			border-color: transparent;
			background-color: transparent;
			color: $color;
			.background {
				background-color: $color;
			}
		}
		&.is-type-text:not(:disabled):hover:not(.is-mobile) {
			border-color: transparent;
			color: $color;
			.background {
				opacity: 0.1;
			}
		}
		&.is-type-text:not(:disabled):active {
			border-color: transparent;
			color: $color !important;
			.background {
				opacity: 0.2 !important;
			}
		}
		&.is-type-link,
		&.is-type-link:disabled:hover,
		&.is-type-link:disabled:active {
			border-color: transparent;
			background-color: transparent;
			color: $color;
		}
		&.is-type-link:not(:disabled):hover:not(.is-mobile) {
			border-color: transparent;
			background-color: transparent;
			color: $color-light;
		}
		&.is-type-link:not(:disabled):active {
			border-color: transparent;
			background-color: transparent;
			color: $color-dark !important;
		}
	}
}

// 创建默认主题
@mixin create-default-theme($color, $color-dark, $color-light) {
	&.is-theme-default {
		&.is-type-default,
		&.is-type-default:disabled:hover,
		&.is-type-default:disabled:active {
			border-color: $color;
			background-color: $color;
			color: use-color('text-main');
		}
		&.is-type-default:not(:disabled):hover:not(.is-mobile) {
			border-color: $color-light;
			background-color: $color-light;
			color: use-color('text-main');
		}
		&.is-type-default:not(:disabled):active {
			border-color: $color-dark !important;
			background-color: $color-dark !important;
			color: use-color('text-main');
		}
		&.is-type-plain,
		&.is-type-plain:disabled:hover,
		&.is-type-plain:disabled:active {
			border-color: use-color('border');
			background-color: transparent;
			color: use-color('text-main');
		}
		&.is-type-plain:not(:disabled):hover:not(.is-mobile) {
			border-color: use-color('primary');
			color: use-color('primary');
		}
		&.is-type-plain:not(:disabled):active {
			border-color: use-color('primary-dark') !important;
			color: use-color('primary-dark') !important;
		}
		&.is-type-text {
			border-color: transparent;
			background-color: transparent;
			color: use-color('text-main');
		}
		&.is-type-text:not(:disabled):hover:not(.is-mobile) {
			border-color: transparent;
			background-color: $color;
			color: use-color('text-main');
		}
		&.is-type-text:not(:disabled):active {
			border-color: $color-dark !important;
			background-color: $color-dark !important;
			color: use-color('text-main');
		}
		&.is-type-link,
		&.is-type-link:disabled:hover,
		&.is-type-link:disabled:active {
			border-color: transparent;
			background-color: transparent;
			color: use-color('text-main');
		}
		&.is-type-link:not(:disabled):hover:not(.is-mobile) {
			border-color: transparent;
			background-color: transparent;
			color: use-color('text-main-light');
		}
		&.is-type-link:not(:disabled):active {
			border-color: transparent;
			background-color: transparent;
			color: use-color('text-main-dark') !important;
		}
	}
}

.popup-button {
	@include base-transition();
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	line-height: 1;
	outline: none;
	border-width: 1px;
	border-style: solid;
	border-radius: use-var('border-radius');
	cursor: pointer;
	.background {
		@include base-transition();
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: use-var('border-radius');
		opacity: 0;
		pointer-events: none;
		z-index: 0;
	}
	&.is-size-small {
		gap: 5px;
		padding: 5px 10px;
		font-size: use-font-size('text-mini');
	}
	&.is-size-default {
		gap: 10px;
		padding: 8px 15px;
		font-size: use-font-size('text-main');
	}
	&.is-size-large {
		gap: 15px;
		padding: 12px 19px;
		font-size: use-font-size('title-sub');
	}
	&.is-type-link {
		&.is-size-small {
			padding: 5px 0;
		}
		&.is-size-default {
			padding: 8px 0;
		}
		&.is-size-large {
			padding: 12px 0;
		}
	}
	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	&.is-mobile {
		user-select: none;
		-webkit-tap-highlight-color: use-color('background-main');
	}
	& {
		@include create-theme(
			'primary',
			use-color('primary'),
			use-color('primary-dark'),
			use-color('primary-light')
		);
		@include create-theme(
			'info',
			use-color('info'),
			use-color('info-dark'),
			use-color('info-light')
		);
		@include create-theme(
			'success',
			use-color('success'),
			use-color('success-dark'),
			use-color('success-light')
		);
		@include create-theme(
			'warning',
			use-color('warning'),
			use-color('warning-dark'),
			use-color('warning-light')
		);
		@include create-theme(
			'danger',
			use-color('danger'),
			use-color('danger-dark'),
			use-color('danger-light')
		);
		@include create-default-theme(
			use-color('background-sub-dark-lite'),
			use-color('background-sub-dark'),
			use-color('background-sub')
		);
	}
}
.dark {
	.popup-button {
		@include create-default-theme(
			use-color('background-sub-light-lite'),
			use-color('background-sub'),
			use-color('background-sub-light')
		);
	}
}
</style>
