<template lang="pug">
.p-body(:class="{ 'has-padding': withPadding }")
	slot
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PBody',
})

type Props = {
	withPadding?: boolean
}

const { withPadding = true } = defineProps<Props>()
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-body
	width 100%
	height 100%
	background-color var(--popup-plugin-preset-color-background-main)
	overflow auto
	&.has-padding
		baseDialog(padding)
</style>
