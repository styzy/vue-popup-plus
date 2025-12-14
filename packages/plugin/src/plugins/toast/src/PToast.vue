<template lang="pug">
.p-message(:class="`is-theme-${theme}`")
	.background
	.background-theme
	.background-border
	.content
		i.iconfont-popup-plugin-preset(:class="`toast-${theme}`")
		| {{ content }}
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import { type Skin, type Theme } from '../../../typings'

const popup = usePopup()

defineOptions({
	name: 'PToast',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	skin: Skin
	content: string
	theme: Theme
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

createTheme($theme, $color)
	&.is-theme-{$theme}
		color $color
		.background-theme
			background-color $color
		.background-border
			border-color $color

.p-message
	position relative
	padding 11px 15px
	border-radius 4px
	.background,
	.background-theme,
	.background-border
		position absolute
		top 0
		left 0
		right 0
		bottom 0
		border-radius @border-radius
	.background
		background-color var(--popup-plugin-preset-color-background-sub)
		z-index -3
	.background-theme
		opacity 0.1
		z-index -2
	.background-border
		border-width 1px
		border-style solid
		opacity 0.3
		z-index -1
	.content
		max-width 300px
		max-height 80vh
		word-break break-all
		font-size var(--popup-plugin-preset-font-size-text-main)
		line-height 1.5
		overflow-x hidden
		overflow-y auto
		i.iconfont-popup-plugin-preset
			font-size var(--popup-plugin-preset-font-size-title-sub)
			margin-right 10px
	&
		createTheme('primary', var(--popup-plugin-preset-color-primary))
		createTheme('info', var(--popup-plugin-preset-color-info))
		createTheme('success', var(--popup-plugin-preset-color-success))
		createTheme('warning', var(--popup-plugin-preset-color-warning))
		createTheme('danger', var(--popup-plugin-preset-color-danger))
</style>
