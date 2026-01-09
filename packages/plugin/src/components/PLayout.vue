<template lang="pug">
.p-layout(:class="`is-skin-${skin}`")
	slot(name="header")
	.body
		slot
	slot(name="footer")
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { injectSkin } from '../skin'

defineOptions({
	name: 'PLayout',
})

const skin = inject(injectSkin, 'modern')
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.p-layout {
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
