<template lang="pug">
button.d-button(
	:class="classObject"
	:disabled="disabled"
	@click="handleClick($event)"
	ref="button")
	slot
</template>

<script lang="ts">
import { buttonGroupInjects } from './DButtonGroup.vue'

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
	name: 'DButton',
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

<style lang="stylus" scoped>

// 生成主题
createTheme($theme, $color, $color-dark, $color-light, $color-light-most)
	&.is-theme-{$theme}
		&.is-type-default,
		&.is-type-default:disabled:hover,
		&.is-type-default:disabled:active
			border-color $color
			background-color $color
			color #FFFFFF
		&.is-type-default:not(:disabled):hover:not(.is-mobile)
			border-color $color-light
			background-color $color-light
			color #FFFFFF
		&.is-type-default:not(:disabled):active
			border-color $color-dark !important
			background-color $color-dark !important
			color #FFFFFF
		&.is-type-plain,
		&.is-type-plain:disabled:hover,
		&.is-type-plain:disabled:active
			border-color $color
			background-color transparent
			color $color
		&.is-type-plain:not(:disabled):hover:not(.is-mobile)
			border-color $color
			background-color $color
			color #FFFFFF
		&.is-type-plain:not(:disabled):active
			border-color $color-dark !important
			background-color $color-dark !important
			color #FFFFFF
		&.is-type-text
			border-color transparent
			background-color transparent
			color $color
		&.is-type-text:not(:disabled):hover:not(.is-mobile)
			border-color transparent
			background-color $color-light-most
			color $color-dark
		&.is-type-text:not(:disabled):active
			border-color transparent
			background-color $color-light !important
			color $color-dark !important
		&.is-type-link,
		&.is-type-link:disabled:hover,
		&.is-type-link:disabled:active
			border-color transparent
			background-color transparent
			color $color
		&.is-type-link:not(:disabled):hover:not(.is-mobile)
			border-color transparent
			background-color transparent
			color $color-light
		&.is-type-link:not(:disabled):active
			border-color transparent
			background-color transparent
			color $color-dark !important
createDefaultTheme()
	&.is-theme-default
		&.is-type-default,
		&.is-type-default:disabled:hover,
		&.is-type-default:disabled:active
			border-color var(--doc-color-background-sub)
			background-color var(--doc-color-background-sub)
			color var(--doc-color-text-main)
		&.is-type-default:not(:disabled):hover:not(.is-mobile)
			border-color var(--doc-color-background-sub-dark-lite)
			background-color var(--doc-color-background-sub-dark-lite)
			color var(--doc-color-text-main)
		&.is-type-default:not(:disabled):active
			border-color var(--doc-color-background-sub-dark) !important
			background-color var(--doc-color-background-sub-dark) !important
			color var(--doc-color-text-main)
		&.is-type-plain,
		&.is-type-plain:disabled:hover,
		&.is-type-plain:disabled:active
			border-color var(--doc-color-border)
			background-color transparent
			color var(--doc-color-text-main)
		&.is-type-plain:not(:disabled):hover:not(.is-mobile)
			border-color var(--doc-color-background-sub-dark-lite)
			background-color var(--doc-color-background-sub-dark-lite)
			color var(--doc-color-text-main)
		&.is-type-plain:not(:disabled):active
			border-color var(--doc-color-background-sub-dark) !important
			background-color var(--doc-color-background-sub-dark) !important
			color var(--doc-color-text-main)
		&.is-type-text
			border-color transparent
			background-color transparent
			color var(--doc-color-text-main)
		&.is-type-text:not(:disabled):hover:not(.is-mobile)
			border-color transparent
			background-color var(--doc-color-background-sub-dark-lite)
			color var(--doc-color-text-main)
		&.is-type-text:not(:disabled):active
			border-color var(--doc-color-background-sub-dark) !important
			background-color var(--doc-color-background-sub-dark) !important
			color var(--doc-color-text-main)
		&.is-type-link,
		&.is-type-link:disabled:hover,
		&.is-type-link:disabled:active
			border-color transparent
			background-color transparent
			color var(--doc-color-text-main)
		&.is-type-link:not(:disabled):hover:not(.is-mobile)
			border-color transparent
			background-color transparent
			color var(--doc-color-text-main-light)
		&.is-type-link:not(:disabled):active
			border-color transparent
			background-color transparent
			color var(--doc-color-text-main-dark) !important
.d-button
	baseTrans()

	display flex
	flex-direction row
	justify-content flex-start
	align-items center
	line-height 1
	outline none
	border-width 1px
	border-style solid
	border-radius 4px
	cursor pointer
	&.is-size-small
		gap 5px
		padding 8px 15px
		font-size var(--doc-font-size-text-mini)
	&.is-size-default
		gap 10px
		padding 12px 24px
		font-size var(--doc-font-size-text-main)
	&.is-size-large
		gap 15px
		padding 15px 30px
		font-size var(--doc-font-size-title-sub)
	&.is-type-link
		&.is-size-small
			padding 5px 0
		&.is-size-default
			padding 8px 0
		&.is-size-large
			padding 12px 0
	&:disabled
		opacity 0.6
		cursor not-allowed
	&.is-mobile
		user-select none
		-webkit-tap-highlight-color var(--doc-color-background-main)
	&
		createDefaultTheme()
		createTheme('primary', var(--doc-color-primary), var(--doc-color-primary-dark), var(--doc-color-primary-light),var(--doc-color-primary-light-most))
		createTheme('info', var(--doc-color-info), var(--doc-color-info-dark), var(--doc-color-info-light),var(--doc-color-info-light-most))
		createTheme('success', var(--doc-color-success), var(--doc-color-success-dark), var(--doc-color-success-light),var(--doc-color-success-light-most))
		createTheme('warning', var(--doc-color-warning), var(--doc-color-warning-dark), var(--doc-color-warning-light),var(--doc-color-warning-light-most))
		createTheme('danger', var(--doc-color-danger), var(--doc-color-danger-dark), var(--doc-color-danger-light),var(--doc-color-danger-light-most))
</style>
