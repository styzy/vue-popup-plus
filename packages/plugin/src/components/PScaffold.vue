<template lang="pug">
.p-scaffold(:class="`is-skin-${skin}`")
	slot(name="header")
	.body
		slot
	slot(name="footer")
</template>

<script lang="ts">
export const injectSkin = Symbol('skin') as InjectionKey<Skin>
</script>

<script lang="ts" setup>
import { provide, type InjectionKey } from 'vue'
import type { Skin } from '../typings'

defineOptions({
	name: 'PScaffold',
})

type Props = {
	skin: Skin
}

const { skin } = defineProps<Props>()

provide(injectSkin, skin)
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.p-scaffold {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	overflow: hidden;
	width: inherit;
	height: inherit;
	max-width: inherit;
	max-height: inherit;
	min-width: inherit;
	min-height: inherit;
	box-sizing: border-box;
	box-shadow: var(--popup-plugin-preset-box-shadow);
	border-radius: var(--popup-plugin-preset-border-radius-large);
	.body {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		align-items: stretch;
		min-width: 0;
		min-height: 0;
	}
}
</style>
