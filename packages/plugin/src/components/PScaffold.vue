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
	skin?: Skin
}

const { skin = 'modern' } = defineProps<Props>()

provide(injectSkin, skin)
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-scaffold
	flex 1
	display flex
	flex-direction column
	justify-content flex-start
	align-items stretch
	overflow hidden
	width inherit
	height inherit
	max-width inherit
	max-height inherit
	min-width inherit
	min-height inherit
	border-radius 4px
	border 1px solid var(--popup-plugin-preset-color-border-dark-lite)
	box-shadow 5px 5px 30px var(--popup-plugin-preset-color-shadow)
	box-sizing border-box
	.body
		flex 1
		display flex
		flex-direction column
		justify-content stretch
		align-items stretch
		min-width 0
		min-height 0
	&.is-skin-modern
		border none
		box-shadow 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)
</style>
