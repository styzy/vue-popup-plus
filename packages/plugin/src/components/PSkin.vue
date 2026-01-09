<template>
	<div class="p-skin" :class="`is-skin-${skin}`">
		<slot></slot>
	</div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { provide } from 'vue'
import { injectSkin, type Skin } from '../skin'
defineOptions({
	name: 'PSkin',
})

type Props = {
	skin: Skin
}

const { skin } = defineProps<Props>()

provide(injectSkin, skin)
</script>

<style lang="scss" scoped></style>
