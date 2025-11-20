<template lang="pug">
.d-version
	.item
		.label Vue Popup Plus
		.version {{ version }}
	.item
		.label 预置插件
		.version {{ presetPluginVersion }}
</template>

<script lang="ts" setup>
import { version } from 'vue-popup-plus'
import { version as presetPluginVersion } from 'vue-popup-plus-plugin-preset'
</script>
<style lang="stylus" scoped>
.d-version
	display flex
	flex-direction row
	justify-content center
	align-items center
	gap 20px
	.item
		display flex
		flex-direction row
		justify-content center
		align-items center
		gap 5px
		padding 2px 10px
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
		.item
			flex 1
			flex-direction column
			gap 0
			height auto
</style>
