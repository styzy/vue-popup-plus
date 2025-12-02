<template lang="pug">
.d-version(:class="{ 'is-home': mode === 'home' }")
	.item
		.label 核心版本
		.version {{ version }}
	.item
		.label 预置插件版本
		.version {{ presetPluginVersion }}
</template>

<script lang="ts" setup>
import { version } from 'vue-popup-plus'
import { version as presetPluginVersion } from 'vue-popup-plus-plugin-preset'

type Props = {
	mode?: 'sidebar' | 'home'
}

const { mode = 'sidebar' } = defineProps<Props>()
</script>
<style lang="stylus" scoped>
.d-version
	display flex
	flex-direction column
	justify-content center
	align-items stretch
	gap 10px
	padding 20px 0
	border-bottom 1px solid var(--vp-c-divider)
	&.is-home
		border-bottom none
		flex-direction row
		justify-content flex-start
		padding-bottom 0
	.item
		display flex
		flex-direction row
		justify-content space-between
		align-items center
		gap 5px
		padding 2px 20px
		height 40px
		background-color var(--vp-code-bg)
		border-radius 5px
		.label
			color var(--vp-c-text-1)
			font-size var(--doc-font-size-text-sub)
			font-weight 700
		.version
			color var(--vp-c-brand-1)
			font-size var(--doc-font-size-text-main)
			font-weight 700
@media (max-width: 768px)
	.d-version
		&.is-home
			border-bottom none
			flex-direction row
			justify-content center
			gap 20px
			.item
				gap 10px
</style>
