<template lang="pug">
.p-header-button(:class="classObject" @click="handleClick()")
	i.iconfont-ark(:class="iconClass")
</template>

<script>
export default {
	name: 'PHeaderButton',
	props: {
		iconClass: {
			type: String,
			default: ''
		},
		theme: {
			type: String,
			default: 'default',
			validator: theme =>
				['default', 'success', 'warning', 'danger'].includes(theme)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		active: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		classObject() {
			return {
				[`is-theme-${this.theme}`]: true,
				'is-disabled': this.disabled,
				'is-active': this.active
			}
		}
	},
	methods: {
		handleClick() {
			if (this.disabled) return

			this.$emit('click')
		}
	}
}
</script>

<style lang="stylus" scoped>
$size = 40px

.p-header-button
	baseStyle()
	baseTrans()

	display flex
	justify-content center
	align-items center
	width $size
	height @width
	color $ark-color-text-sub
	text-align center
	line-height @height
	cursor pointer
	i
		font-size 16px
	&.is-disabled
		opacity 0.5
		cursor not-allowed
	&.is-active,
	&:not(.is-disabled):hover
		color #FFFFFF
		&.is-theme-default
			background-color $ark-color-theme
		&.is-theme-success
			background-color $ark-color-success
		&.is-theme-warning
			background-color $ark-color-warning
		&.is-theme-danger
			background-color $ark-color-danger
</style>
