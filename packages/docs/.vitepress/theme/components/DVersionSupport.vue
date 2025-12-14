<template lang="pug">
.d-version-support(:class="{ 'is-deprecated': deprecated }")
	div 从
	DVersion(:package="pkg" :plus="!deprecated" :version)
	div 版本开始
	.type {{ deprecated ? '废弃' : '提供支持' }}
</template>

<script lang="ts" setup>
import { type Version } from 'vue-popup-plus'
import { type Package } from './DVersion.vue'

type Props = {
	version: Version
	package?: Package
	deprecated?: boolean
}

const {
	version,
	package: pkg = 'core',
	deprecated = false,
} = defineProps<Props>()
</script>

<style lang="stylus" scoped>
.d-version-support
	display flex
	align-items center
	justify-content flex-start
	gap 5px
	color var(--vp-c-text-1)
	font-size var(--doc-font-size-text-sub)
	overflow hidden
	.type
		color var(--doc-color-success)
		font-weight 700
	&.is-deprecated
		.type
			color var(--doc-color-danger)
</style>
