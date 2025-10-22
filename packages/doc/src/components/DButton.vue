<template lang="pug">
.d-button(:class="`is-theme-${theme}`" @click="handleClick")
	slot
</template>

<script setup lang="ts">
import { defineComponent, defineProps } from 'vue'

defineComponent({
	name: 'DButton',
})

type ButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger'

const { theme = 'default' } = defineProps<{
	theme?: ButtonTheme
}>()

const emit = defineEmits(['click'])

function handleClick() {
	emit('click')
}
</script>

<style lang="stylus" scoped>
.d-button
	baseTrans()
	padding: 12px 24px
	border-radius: 4px
	font-weight: 600
	text-decoration: none
	cursor pointer
	&.is-theme-default
		background-color: #f1f1f1
		color: $color-text-main
		&:hover
			background-color: #e1e1e1
	&.is-theme-primary
		background-color: $color-primary
		color: #FFFFFF;
		&:hover
			background-color: darken($color-primary, 10%);
	&.is-theme-success
		background-color: $color-success
		color: #FFFFFF;
		&:hover
			background-color: darken($color-success, 10%);
	&.is-theme-warning
		background-color: $color-warning
		color: #FFFFFF;
		&:hover
			background-color: darken($color-warning, 10%);
	&.is-theme-danger
		background-color: $color-danger
		color: #FFFFFF;
		&:hover
			background-color: darken($color-danger, 10%);
</style>
