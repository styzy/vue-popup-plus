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
	box-sizing: border-box;
	overflow: hidden;
	.body {
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
