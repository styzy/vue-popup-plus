<template lang="pug">
.p-loading
	.icon
		VLoading(:size="60")
	.stop(v-if="$isDev")
		VButton(@click="handleClose") 强制关闭遮罩（仅在开发模式下可用）
</template>

<script>
export default {
	name: 'PLoading',
	props: {
		stopLoading: {
			type: Function,
			default: () => {}
		}
	},
	methods: {
		handleClose() {
			this.stopLoading()
		}
	}
}
</script>

<style lang="stylus" scoped>
$icon-size = 60px

.p-loading
	position relative
	width 100%
	height 100%
	background-color rgba(255, 255, 255, 0.5)
	.icon
		position absolute
		top 0
		right 0
		bottom 0
		left 0
		z-index 1
		margin auto
		width $icon-size
		height $icon-size
	.stop
		position absolute
		top 'calc(50% + %s )' % ($icon-size / 2 + 20px)
		right 0
		left 0
		z-index 1
		margin auto
		text-align center
</style>
