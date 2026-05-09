<template lang="pug">
div(:class="ns.block()")
	slot(name="header")
	div(:class="ns.element('body')")
		slot
	slot(name="footer")
</template>

<script lang="ts" setup>
import { useNamespace } from '../hooks'
import { POPUP_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.LAYOUT,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.LAYOUT)
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('layout') {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	box-sizing: border-box;
	overflow: hidden;
	@include ns-element('body') {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		align-items: stretch;
		min-width: 0;
		min-height: 0;
		transform: translate(0);
	}
}
</style>
