<template lang="pug">
.p-body(
	:class="[`is-skin-${skin}`, { 'has-padding': withPadding, 'is-fit-icon': fitIcon }]")
	slot
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { injectSkin } from './PScaffold.vue'

const skin = inject(injectSkin, 'modern')
defineOptions({
	name: 'PBody',
})

type Props = {
	withPadding?: boolean
	fitIcon?: boolean
}

const { withPadding = true } = defineProps<Props>()
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.p-body {
	flex: 1;
	background-color: var(--popup-plugin-preset-color-background-main);
	overflow: auto;
	&.has-padding {
		@include base-container(padding);
		&.is-skin-modern {
			padding-top: 0;
			padding-bottom: 0;
			&.is-fit-icon {
				padding-left: calc(var(--popup-plugin-preset-spacing) + 40px);
			}
		}
	}
}
</style>
