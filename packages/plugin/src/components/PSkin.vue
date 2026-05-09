<template>
	<div :class="[ns.block(), ns.modifier(skin)]">
		<slot></slot>
	</div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '../hooks'
import { injectSkin, type Skin } from '../skin'
import { POPUP_INSIDE_COMPONENT_NAMES } from '../CONSTANTS'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.SKIN,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.SKIN)

type Props = {
	skin: Skin
}

const { skin } = defineProps<Props>()

provide(
	injectSkin,
	computed(() => skin)
)
</script>
