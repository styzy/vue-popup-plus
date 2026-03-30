<template lang="pug">
div(:class="ns.block()")
	slot
</template>

<script lang="ts" setup>
import { useNamespace } from '../hooks'
import { P_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.FOOTER,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.FOOTER)
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('footer') {
	@include base-container(padding);

	background-color: #ffffff;
	@include use-dark() {
		background-color: use-color(background);
	}
}
</style>
