<template>
	<div :class="[ns.block(), ns.modifier(skin)]">
		<slot></slot>
	</div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { useNamespace } from '@plugin/hooks'
import { injectSkin, type PopupSkin } from '@plugin/skin'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.SKIN,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.SKIN)

type Props = {
	skin: PopupSkin
}

const { skin } = defineProps<Props>()

provide(
	injectSkin,
	computed(() => skin)
)
</script>
