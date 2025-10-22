<template lang="pug">
.p-alert
	PScaffold
		template(#header)
			PHeader(:title="title" @close="handleConfirm()" iconClass="popup-alert")
		PBody
			.content {{ content }}
		template(#footer)
			PFooter
				VButtonGroup(align="right")
					VButton(@click="handleConfirm()") {{ confirmText }}
</template>

<script>
export default {
	name: 'PAlert',
	props: {
		title: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		confirmText: {
			type: String,
			required: true
		}
	},
	methods: {
		handleConfirm() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="stylus" scoped>
$header-height = 40px

.p-alert
	overflow hidden
	max-width 80vw
	max-height 80vh
	width 360px
	.content
		color $ark-color-text-main
		word-break break-all
		line-height 24px
</style>
