<template lang="pug">
.p-header(:class="{ 'has-icon': hasIcon }")
	.icon(v-if="hasIcon")
		i.iconfont-ark(:class="iconClass")
	.title {{ title }}
	.btn-ctn
		slot(name="buttons")
		PHeaderButton(
			@click="handleClose()"
			iconClass="close"
			theme="danger"
			v-if="closeEnabled"
		)
</template>

<script>
export default {
	name: 'PHeader',
	components: {
		PHeaderButton: () => import('./PHeaderButton')
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		iconClass: {
			type: String,
			default: ''
		},
		closeEnabled: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		hasIcon() {
			return !!this.iconClass
		}
	},
	methods: {
		handleClose() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="stylus" scoped>
$header-height = 40px

.p-header
	baseStyle()

	position relative
	display flex
	flex-direction row
	justify-content space-between
	align-items center
	height $header-height
	border-bottom 1px solid $ark-color-border
	background-color $ark-color-background-sub
	line-height @height
	.icon
		width $header-height
		height $header-height
		color $ark-color-theme
		text-align center
		line-height @height
		i
			font-size 24px
	.title
		baseEllipsis()

		flex 1
		padding 0 20px
		font-size $ark-font-size-title-sub
	.btn-ctn
		display flex
		align-items center
		height 100%
	&.has-icon
		.title
			padding-left 0
</style>
