<template>
	<div
		:class="[
			ns.block(),
			ns.modifier(skin),
			{
				[ns.modifier('mobile')]: isMobile,
			},
		]">
		<slot></slot>
	</div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { useDevice, useNamespace } from '@plugin/hooks'
import { injectSkin, type PopupSkin } from '@plugin/skin'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.CONTAINER,
})

const { isMobile } = useDevice()
const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.CONTAINER)

type Props = {
	skin: PopupSkin
}

const { skin } = defineProps<Props>()

provide(
	injectSkin,
	computed(() => skin)
)
</script>
