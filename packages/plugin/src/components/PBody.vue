<template lang="pug">
.popup-body(:class="{ 'has-padding': withPadding, 'is-fit-icon': fitIcon }")
	slot
</template>

<script lang="ts" setup>
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

.popup-body {
	flex: 1;
	background-color: use-color('background-main');
	overflow: auto;
	&.has-padding {
		@include base-container(padding);
	}
}

@include use-skin('modern') {
	.popup-body {
		padding-top: 0;
		padding-bottom: 0;
		&.is-fit-icon {
			padding-left: calc(use-var('spacing') + 40px);
		}
	}
}
</style>
