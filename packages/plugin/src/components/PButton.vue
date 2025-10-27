<template lang="pug">
button.p-button(
	:class="classObject"
	:disabled="disabled"
	@click="handleClick($event)"
	ref="button")
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

const buttonRef = useTemplateRef('button')

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
@import '../assets/stylus/inject.styl'

.p-button
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
		padding 5px 10px
		font-size $font-size-text-mini
	&.is-size-default
		gap 10px
		padding 8px 15px
		font-size $font-size-text-main
	&.is-size-large
		gap 15px
		padding 12px 19px
		font-size $font-size-title-sub
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
		-webkit-tap-highlight-color $color-background-main
	// &.is-theme-default
	// &.is-theme-default:disabled:hover,
	// &.is-theme-default:disabled:active
	// 	border-color $color-border
	// 	background-color $color-background-main
	// 	color $color-text-sub
	// &.is-theme-default:not(:disabled):hover:not(.is-mobile)
	// 	border-color $color-border-dark
	// 	background-color $color-background-sub
	// 	color $color-text-main
	// &.is-theme-default:not(:disabled):active
	// 	border-color $color-dark !important
	// 	background-color $color-dark !important
	// 	color $color-background-main

createTheme($theme, $color, $color-dark,$color-light, $color-light-most)
	.p-button.is-theme-{$theme}
		&.is-type-default,
		&.is-type-default:disabled:hover,
		&.is-type-default:disabled:active
			border-color $color
			background-color $color
			color $color-background-main
		&.is-type-default:not(:disabled):hover:not(.is-mobile)
			border-color $color-light
			background-color $color-light
			color $color-background-main
		&.is-type-default:not(:disabled):active
			border-color $color-dark !important
			background-color $color-dark !important
			color $color-background-main
		&.is-type-plain,
		&.is-type-plain:disabled:hover,
		&.is-type-plain:disabled:active
			border-color $color
			background-color $color-background-main
			color $color
		&.is-type-plain:not(:disabled):hover:not(.is-mobile)
			border-color $color
			background-color $color
			color $color-background-main
		&.is-type-plain:not(:disabled):active
			border-color $color-dark !important
			background-color $color-dark !important
			color $color-background-main
		&.is-type-text
			border-color transparent
			background-color transparent
			color $color
		&.is-type-text:not(:disabled):hover:not(.is-mobile)
			border-color $color-light-most
			background-color $color-light-most
			color $color-dark
		&.is-type-text:not(:disabled):active
			border-color $color-light-most
			background-color $color-light-most
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
			color $color-light !important
// 生产主题
createTheme(default, $color-text-sub,$color-text-main, $color-text-light,$color-background-sub)
createTheme(primary, $color-primary, $color-primary-dark, $color-primary-light,$color-primary-light-most)
createTheme(info, $color-info, $color-info-dark, $color-info-light,$color-info-light-most)
createTheme(success, $color-success, $color-success-dark, $color-success-light,$color-success-light-most)
createTheme(warning, $color-warning, $color-warning-dark, $color-warning-light,$color-warning-light-most)
createTheme(danger, $color-danger, $color-danger-dark, $color-danger-light,$color-danger-light-most)
</style>
