<template lang="pug">
.p-footer(:style="styleObject")
	slot
</template>

<script>
export default {
	name: 'PFooter',
	props: {
		height: {
			type: String,
			default: '60px'
		}
	},
	computed: {
		styleObject() {
			return {}
		}
	}
}
</script>

<style lang="stylus" scoped>
.p-footer
	baseDialog(padding)

	box-sizing border-box
	background-color #FFFFFF
</style>
