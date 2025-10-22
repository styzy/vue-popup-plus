<template lang="pug">
.p-body(:class="{ 'has-padding': withPadding }")
	slot
</template>

<script>
export default {
	name: 'PBody',
	props: {
		withPadding: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style lang="stylus" scoped>
.p-body
	overflow hidden
	width 100%
	height 100%
	background-color #FFFFFF
	&.has-padding
		baseDialog(padding)
</style>
