<template lang="pug">
div(:class="classObject")
	slot
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { useNamespace } from '@plugin/hooks'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.BODY,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.BODY)

type Props = {
	withPadding?: boolean
	fitIcon?: boolean
}

const { withPadding = true, fitIcon = false } = defineProps<Props>()

const classObject = computed(() => [
	ns.block(),
	ns.is('fit-icon', fitIcon),
	ns.is('has-padding', withPadding),
])
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('body') {
	flex: 1;
	background-color: #ffffff;
	overflow: auto;
	@include ns-is('has-padding') {
		@include base-container(padding);
	}
	@include use-dark() {
		background-color: use-color(background);
	}
	@include use-skin('modern') {
		padding-top: 0;
		padding-bottom: 0;
		@include ns-is('fit-icon') {
			padding-left: calc(use-spacing() + 40px);
		}
	}
	@include use-skin('classic') {
		@include ns-is('fit-icon') {
			padding-left: calc(use-spacing() + 40px);
		}
	}
}
</style>
