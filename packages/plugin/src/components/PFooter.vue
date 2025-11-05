<template lang="pug">
.p-footer
	slot
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PFooter',
})
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-footer
	baseDialog(padding)

	box-sizing border-box
	background-color var(--popup-plugin-preset-color-background-main)
</style>
