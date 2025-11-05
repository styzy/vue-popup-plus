<template lang="pug">
.p-header-button(:class="classObject" @click.stop="handleClick()")
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
	size?: number
	disabled?: boolean
	actived?: boolean
}

const {
	iconClass = '',
	theme = 'primary',
	size = 40,
	disabled = false,
	actived = false,
} = defineProps<Props>()

const emit = defineEmits(['click'])

const classObject = computed(() => ({
	[`is-theme-${theme}`]: true,
	'is-disabled': disabled,
	'is-active': actived,
}))
const iconSize = computed(() => size * 0.4)

function handleClick() {
	if (disabled) return

	emit('click')
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-header-button
	baseStyle()
	baseTrans()

	display flex
	justify-content center
	align-items center
	width v-bind('`${size}px`')
	height v-bind('`${size}px`')
	color var(--popup-plugin-preset-color-text-sub)
	cursor pointer
	i
		font-size v-bind('`${iconSize}px`')
	&.is-disabled
		opacity 0.5
		cursor not-allowed
	&.is-active,
	&:not(.is-disabled):hover
		color #FFFFFF
		&.is-theme-primary
			background-color var(--popup-plugin-preset-color-primary)
		&.is-theme-info
			background-color var(--popup-plugin-preset-color-info)
		&.is-theme-success
			background-color var(--popup-plugin-preset-color-success)
		&.is-theme-warning
			background-color var(--popup-plugin-preset-color-warning)
		&.is-theme-danger
			background-color var(--popup-plugin-preset-color-danger)
</style>
