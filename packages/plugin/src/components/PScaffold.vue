<template lang="pug">
.p-scaffold
	slot(name="header")
	.body
		slot
	slot(name="footer")
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PScaffold',
})
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-scaffold
	display flex
	flex-direction column
	justify-content flex-start
	align-items stretch
	overflow hidden
	max-height inherit
	height inherit
	border-radius 4px
	box-shadow 1px 1px 20px var(--popup-plugin-preset-color-shadow)
	.body
		flex 1
		overflow-y auto
</style>
