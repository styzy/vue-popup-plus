<template lang="pug">
div(:class="classObject" ref="group")
	template(v-if="hasCutline")
		template(:key="index" v-for="(slot, index) in slots.default?.()")
			component(:is="slot")
			.cutline(v-if="index < (slots.default?.() || []).length - 1")
	template(v-else)
		slot
</template>

<script lang="ts" setup>
import { computed, provide, unref, type Ref, type VNode } from 'vue'
import { P_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'
import { useNamespace } from '../hooks'
import { type PButtonProps } from './PButton'
import {
	buttonGroupInjects,
	type PButtonGroupProps,
	type PButtonGroupSlots,
} from './PButtonGroup'

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.BUTTON_GROUP,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.BUTTON_GROUP)

const slots = defineSlots<PButtonGroupSlots>()

const props = withDefaults(defineProps<PButtonGroupProps>(), {
	tight: undefined,
	cutline: undefined,
	disabled: undefined,
})

const direction = computed(() => props.direction ?? 'horizontal')
const align = computed(() => props.align ?? 'start')
const crossAlign = computed(() => props.crossAlign ?? 'start')
const tight = computed(() => props.tight ?? false)
const cutline = computed(() => props.cutline ?? false)
const theme = computed(() => props.theme ?? undefined)
const type = computed(() => props.type ?? undefined)
const size = computed(() => props.size ?? undefined)
const disabled = computed(() => props.disabled ?? undefined)

const classObject = computed(() => [
	ns.block(),
	ns.is(`align-${unref(align)}`),
	ns.is(`cross-align-${unref(crossAlign)}`),
	ns.is(`direction-${unref(direction)}`),
	ns.is('tight', unref(tight)),
	ns.is('has-cutline', unref(hasCutline)),
])

const hasCutline = computed(() => cutline && !tight)

provide(buttonGroupInjects.groupType, type)
provide(buttonGroupInjects.groupTheme, theme)
provide(buttonGroupInjects.groupSize, size)
provide(buttonGroupInjects.groupDisabled, disabled)
</script>

<style lang="scss">
@use '../assets/styles/inject.scss' as *;

@include ns-block('button-group') {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: use-spacing() use-spacing();
	@include ns-is('has-cutline') {
		gap: use-spacing(small) 0;
	}
	@include ns-is('direction-horizontal') {
		flex-direction: row;
		@include ns-element('cutline') {
			width: 20px;
			&:after {
				top: 15%;
				left: 50%;
				height: 70%;
				width: 1px;
			}
		}
	}
	@include ns-is('direction-vertical') {
		flex-direction: column;
		@include ns-element('cutline') {
			height: 20px;
			&:after {
				top: 50%;
				left: 15%;
				height: 1px;
				width: 70%;
			}
		}
	}
	@include ns-is('align-start') {
		justify-content: flex-start;
	}
	@include ns-is('align-center') {
		justify-content: center;
	}
	@include ns-is('align-end') {
		justify-content: flex-end;
	}
	@include ns-is('cross-align-start') {
		align-items: flex-start;
	}
	@include ns-is('cross-align-center') {
		align-items: center;
	}
	@include ns-is('cross-align-end') {
		align-items: flex-end;
	}
	@include ns-is('tight') {
		gap: use-spacing(small) use-spacing(small);
		@include ns-is('has-cutline') {
			gap: 5px 0;
		}
	}
	@include ns-element('cutline') {
		align-self: stretch;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			background-color: use-color(border);
			z-index: 1;
		}
	}
}
</style>
