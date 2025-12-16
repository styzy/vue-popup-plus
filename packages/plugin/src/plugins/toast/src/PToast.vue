<template lang="pug">
.p-message(
	:class="`is-theme-${theme}`"
	@mouseenter="handleMouseEnter"
	@mouseleave="handleMouseLeave")
	.background
	.background-theme
	.background-border
	.wrapper
		.icon
			i.iconfont-popup-plugin-preset(:class="`toast-${theme}`")
		.content {{ content }}
		.close-btn(@click="handleClose" v-if="showClose || !autoClose")
			i.iconfont-popup-plugin-preset.close
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
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
	showClose: boolean
	hoverWait: boolean
}

const { content, theme, duration, showClose, hoverWait } = defineProps<Props>()

const autoClose = computed(() => duration > 0)

const destroyTimer = ref<number>()

onMounted(() => {
	startDestroyTimer()
})

onBeforeUnmount(() => {
	stopDestroyTimer()
})

function startDestroyTimer() {
	if (!autoClose.value) return

	destroyTimer.value = window.setTimeout(() => {
		popup.destroy(instanceId)
	}, duration)
}

function stopDestroyTimer() {
	if (destroyTimer.value) {
		window.clearTimeout(destroyTimer.value)
	}
}

function handleMouseEnter() {
	if (!hoverWait || !autoClose.value) return

	stopDestroyTimer()
}

function handleMouseLeave() {
	if (!hoverWait || !autoClose.value) return

	startDestroyTimer()
}

function handleClose() {
	popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

createTheme($theme, $color)
	&.is-theme-{$theme}
		.background-theme
			background-color $color
		.background-border
			border-color $color
		.wrapper
			.icon,
			.content
				color $color
			.close-btn:hover
				color $color


.p-message
	position relative
	display flex
	flex-direction column
	align-items center
	justify-content center
	margin 20px
	max-width 30vw
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
	.wrapper
		flex 1
		display flex
		flex-direction row
		align-items center
		justify-content center
		gap 11px
		padding 0 15px
		box-sizing border-box
		overflow hidden
		.icon
			display flex
			align-items center
			justify-content center
			min-height 0
			font-size var(--popup-plugin-preset-font-size-title-sub)
		.content
			baseScroll()
			flex 1
			padding 11px 0
			max-height calc(100vh - 40px)
			line-height 1.6
			box-sizing border-box
			font-size var(--popup-plugin-preset-font-size-text-main)
			word-break break-all
			overflow-x hidden
			overflow-y auto
		.close-btn
			baseTrans()
			display flex
			align-items center
			justify-content center
			font-size var(--popup-plugin-preset-font-size-title-sub)
			color var(--popup-plugin-preset-color-info)
			cursor pointer
	&
		createTheme('primary', var(--popup-plugin-preset-color-primary))
		createTheme('info', var(--popup-plugin-preset-color-info))
		createTheme('success', var(--popup-plugin-preset-color-success))
		createTheme('warning', var(--popup-plugin-preset-color-warning))
		createTheme('danger', var(--popup-plugin-preset-color-danger))
</style>
