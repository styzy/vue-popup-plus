<template lang="pug">
button(
	:class="classObject"
	:disabled="disabled"
	@click="handleClick($event)"
	ref="button")
	div(:class="ns.element('background')")
	slot
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { computed, inject, unref, useTemplateRef } from 'vue'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import {
	buttonGroupInjects,
	type PButtonProps,
} from '@plugin/components/internal'
import { useNamespace } from '@plugin/hooks'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.BUTTON,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.BUTTON)

const groupType = inject(buttonGroupInjects.groupType, undefined)
const groupTheme = inject(buttonGroupInjects.groupTheme, undefined)
const groupSize = inject(buttonGroupInjects.groupSize, undefined)
const groupDisabled = inject(buttonGroupInjects.groupDisabled, undefined)

const buttonRef = useTemplateRef<HTMLButtonElement>('button')

const props = withDefaults(defineProps<PButtonProps>(), {
	disabled: undefined,
})

const emit = defineEmits<{
	(name: 'click', event: PointerEvent): void
}>()

const theme = computed(() => props.theme ?? unref(groupTheme) ?? 'default')
const type = computed(() => props.type ?? unref(groupType) ?? 'fill')
const size = computed(() => props.size ?? unref(groupSize) ?? 'default')
const disabled = computed(() => props.disabled ?? unref(groupDisabled) ?? false)
const classObject = computed(() => [
	ns.block(),
	ns.is('disabled', unref(disabled)),
	ns.is(`type-${unref(type)}`),
	ns.is(`theme-${unref(theme)}`),
	ns.is(`size-${unref(size)}`),
])

function handleClick(event: PointerEvent) {
	emit('click', event)
	buttonRef.value?.blur()
}
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

// 创建主题
@mixin create-theme($color, $color-dark, $color-light) {
	@include ns-is('type-fill') {
		&,
		&:disabled:hover,
		&:disabled:active {
			border-color: $color;
			background-color: $color;
			color: #ffffff;
		}
		&:not(:disabled):hover {
			border-color: $color-light;
			background-color: $color-light;
			color: #ffffff;
		}
		&:not(:disabled):active {
			border-color: $color-dark !important;
			background-color: $color-dark !important;
			color: #ffffff;
		}
	}
	@include ns-is('type-plain') {
		&,
		&:disabled:hover,
		&:disabled:active {
			border-color: $color;
			background-color: transparent;
			color: $color;
		}
		&:not(:disabled):hover {
			border-color: $color;
			background-color: $color;
			color: #ffffff;
		}
		&:not(:disabled):active {
			border-color: $color-dark !important;
			background-color: $color-dark !important;
			color: #ffffff;
		}
	}
	@include ns-is('type-text') {
		border-color: transparent;
		background-color: transparent;
		color: $color;
		&:not(:disabled):hover {
			border-color: transparent;
			color: $color;
			@include ns-element('background') {
				opacity: 0.1;
			}
		}
		&:not(:disabled):active {
			border-color: transparent;
			color: $color;
			@include ns-element('background') {
				opacity: 0.2;
			}
		}
		@include ns-element('background') {
			background-color: $color;
		}
	}
	@include ns-is('type-link') {
		&,
		&:disabled:hover,
		&:disabled:active {
			border-color: transparent;
			background-color: transparent;
			color: $color;
		}
		&:not(:disabled):hover {
			border-color: transparent;
			background-color: transparent;
			color: $color-light;
		}
		&:not(:disabled):active {
			border-color: transparent;
			background-color: transparent;
			color: $color-dark;
		}
		&:not(:disabled):hover {
			border-color: transparent;
			background-color: transparent;
			color: $color-light;
		}
		&:not(:disabled):active {
			border-color: transparent;
			background-color: transparent;
			color: $color-dark;
		}
	}
}

// 创建默认主题
@mixin create-default-theme() {
	@include ns-is('type-fill') {
		&,
		&:disabled:hover,
		&:disabled:active {
			color: use-color(text);
			border-color: use-color(border);
			background-color: use-color(border);
		}
		&:not(:disabled):hover {
			color: use-color(text);
			border-color: use-color(border, light);
			background-color: use-color(border, light);
		}
		&:not(:disabled):active {
			color: use-color(text);
			border-color: use-color(border, dark);
			background-color: use-color(border, dark);
		}
	}
	@include ns-is('type-plain') {
		&,
		&:disabled:hover,
		&:disabled:active {
			color: use-color(text);
			border-color: use-color(border);
			background-color: transparent;
		}
		&:not(:disabled):hover {
			color: use-color(primary);
			border-color: use-color(primary);
			background-color: transparent;
		}
		&:not(:disabled):active {
			color: use-color(primary, dark);
			border-color: use-color(primary, dark);
			background-color: transparent;
		}
	}
	@include ns-is('type-text') {
		color: use-color(text);
		border-color: transparent;
		background-color: transparent;
		&:not(:disabled):hover {
			color: use-color(text);
			border-color: transparent;
			background-color: use-color(border);
		}
		&:not(:disabled):active {
			color: use-color(text);
			border-color: transparent;
			background-color: use-color(border, dark);
		}
	}
	@include ns-is('type-link') {
		&,
		&:disabled:hover,
		&:disabled:active {
			border-color: transparent;
			background-color: transparent;
			color: use-color(text);
		}
		&:not(:disabled):hover {
			border-color: transparent;
			background-color: transparent;
			color: use-color(text, light);
		}
		&:not(:disabled):active {
			border-color: transparent;
			background-color: transparent;
			color: use-color(text, dark);
		}
	}
}

@include ns-block('button') {
	@include base-transition();
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	line-height: 1;
	outline: none;
	border-width: 1px;
	border-style: solid;
	border-radius: use-radius();
	cursor: pointer;
	@include ns-is('size-small') {
		gap: 5px;
		padding: 5px 10px;
		height: 24px;
		font-size: use-font-size(text, small);
	}
	@include ns-is('size-default') {
		gap: 10px;
		padding: 8px 15px;
		height: 32px;
		font-size: use-font-size(text);
	}
	@include ns-is('size-large') {
		gap: 15px;
		padding: 12px 20px;
		height: 40px;
		font-size: use-font-size(title);
	}
	@include ns-is('type-link') {
		padding: 0;
		height: auto;
	}
	@include ns-is('disabled') {
		opacity: 0.6;
		cursor: not-allowed;
	}
	@include ns-is('theme-default') {
		@include create-default-theme();
	}
	@include ns-is('theme-primary') {
		@include create-theme(
			use-color(primary),
			use-color(primary, dark),
			use-color(primary, light)
		);
	}
	@include ns-is('theme-info') {
		@include create-theme(
			use-color(info),
			use-color(info, dark),
			use-color(info, light)
		);
	}
	@include ns-is('theme-success') {
		@include create-theme(
			use-color(success),
			use-color(success, dark),
			use-color(success, light)
		);
	}
	@include ns-is('theme-warning') {
		@include create-theme(
			use-color(warning),
			use-color(warning, dark),
			use-color(warning, light)
		);
	}
	@include ns-is('theme-danger') {
		@include create-theme(
			use-color(danger),
			use-color(danger, dark),
			use-color(danger, light)
		);
	}
	@include ns-element('background') {
		@include base-transition();
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: use-radius();
		opacity: 0;
		pointer-events: none;
		z-index: 0;
	}
}
</style>
