<template lang="pug">
PSkin(:class="classObject" :skin="skin")
	div(:class="ns.element('wrapper')" @click="handleCloseOnDebugMode()")
		PLoadingIcon(:size="iconSize" :theme)
		div(:class="ns.element('title')" v-if="title") {{ title }}
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { PLoadingIcon, PSkin } from '@plugin/components/internal'
import { useNamespace } from '@plugin/hooks'
import { type PopupSkin } from '@plugin/skin'
import { type Theme } from '@plugin/typings'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.LOADING,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.LOADING)

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	skin: PopupSkin
	theme: Theme
	title: string
	iconSize: number
	mask: boolean
	maskTransparent: boolean
	debugMode: boolean
}

const { theme, title, iconSize, mask, maskTransparent, debugMode } =
	defineProps<Props>()

const classObject = computed(() => [
	ns.block(),
	ns.is('has-mask', mask && !maskTransparent),
])

function handleCloseOnDebugMode() {
	if (debugMode) {
		emit('close')
	}
}
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('loading') {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: use-spacing();
	@include ns-element('wrapper') {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: use-spacing();
		padding: use-spacing();
		max-width: v-bind('`${iconSize * 4}px`');
		min-width: 120px;
		min-height: 120px;
		border-radius: use-radius(large);
		box-shadow: use-box-shadow(large);
		box-sizing: border-box;
	}
	@include ns-element('title') {
		font-size: use-font-size(title, small);
		color: #ffffff;
	}
	@include ns-is('has-mask') {
		@include ns-element('wrapper') {
			background-color: rgba(0, 0, 0, 0.75);
			@include use-dark() {
				background-color: rgba(31, 31, 31, 0.85);
			}
		}
	}
	@include ns-not('has-mask') {
		@include ns-element('wrapper') {
			background-color: rgba(0, 0, 0, 0.8);
			@include use-dark() {
				background-color: rgba(31, 31, 31, 0.9);
			}
		}
	}
}
</style>
