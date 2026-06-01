<template lang="pug">
div(:class="ns.block()")
	slot
</template>

<script lang="ts" setup>
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { useNamespace } from '@plugin/hooks'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.FOOTER,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.FOOTER)
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('footer') {
	@include base-container(padding);

	background-color: #ffffff;
	@include use-dark() {
		background-color: use-color(background);
	}
}
</style>
