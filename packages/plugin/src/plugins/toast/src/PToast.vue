<template lang="pug">
.p-message(:class="`is-theme-${theme}`")
	.mask
	.mask-background
	.content {{ content }}
</template>
<script lang="ts">
export type ToastTheme =
	| 'default'
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'
</script>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

defineOptions({
	name: 'PToast',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	content: string
	theme: ToastTheme
	duration: number
}

const { content, theme, duration } = defineProps<Props>()

onMounted(() => {
	window.setTimeout(() => {
		popup.destroy(instanceId)
	}, duration)
})
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

createTheme($theme, $color, $color-border)
	&.is-theme-{$theme}
		color $color
		.mask
			border-color $color-border
		.mask-background
			background-color $color

.p-message
	position relative
	padding 15px 20px
	border-radius 4px
	.mask,
	.mask-background
		position absolute
		top 0
		left 0
		right 0
		bottom 0
		z-index -1
		border-radius @border-radius
	.mask
		border-width 1px
		border-style solid
		background-color var(--popup-plugin-preset-color-background-sub)
	.mask-background
		opacity 0.1
	.content
		max-width 300px
		max-height 80vh
		word-break break-all
		font-size var(--popup-plugin-preset-font-size-text-main)
		line-height 1.5
		overflow-x hidden
		overflow-y auto
	&.is-theme-default
		color var(--popup-plugin-preset-color-text-main)
		.mask
			border-color var(--popup-plugin-preset-color-border)
	&
		createTheme('primary', var(--popup-plugin-preset-color-primary), var(--popup-plugin-preset-color-primary-dark))
		createTheme('info', var(--popup-plugin-preset-color-info), var(--popup-plugin-preset-color-info-dark))
		createTheme('success', var(--popup-plugin-preset-color-success), var(--popup-plugin-preset-color-success-dark))
		createTheme('warning', var(--popup-plugin-preset-color-warning), var(--popup-plugin-preset-color-warning-dark))
		createTheme('danger', var(--popup-plugin-preset-color-danger), var(--popup-plugin-preset-color-danger-dark))
</style>
