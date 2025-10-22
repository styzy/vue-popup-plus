<template lang="pug">
.p-confirm
	PScaffold
		template(#header)
			PHeader(:closeEnabled="false" :title="title" iconClass="popup-confirm")
		PBody
			.content {{ content }}
		template(#footer)
			PFooter
				VButtonGroup(align="right")
					VButton(@click="handleConfirm(false)" plain) {{ cancelText }}
					VButton(@click="handleConfirm(true)") {{ confirmText }}
</template>

<script>
export default {
	name: 'PConfirm',
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
		},
		cancelText: {
			type: String,
			required: true
		}
	},
	methods: {
		handleConfirm(result) {
			this.$emit('close', result)
		}
	}
}
</script>

<style lang="stylus" scoped>
.p-confirm
	overflow hidden
	max-width 80vw
	max-height 80vh
	width 360px
	.content
		color $ark-color-text-main
		word-break break-all
		line-height 24px
</style>
