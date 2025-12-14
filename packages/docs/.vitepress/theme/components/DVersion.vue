<template lang="pug">
.d-version(@click="handleJump()")
	.wrapper
		.package {{ pkg === 'core' ? '核心' : '预置插件' }}
		.version {{ version }} {{ plus ? '+' : '' }}
</template>

<script lang="ts">
export type Package = 'core' | 'plugin'
</script>

<script lang="ts" setup>
import { type Version } from 'vue-popup-plus'
import { useRouter } from 'vitepress'

const router = useRouter()

type Props = {
	version: Version
	package?: Package
	plus?: boolean
}

const { version, package: pkg = 'core', plus = false } = defineProps<Props>()

function handleJump() {
	const hash = `_${version.split('.').join('-')}`
	const path = `/changelog/${pkg === 'core' ? 'core' : 'plugin-preset'}.html#${hash}`
	router.go(path)
}
</script>

<style scoped lang="stylus">
.d-version
	display inline-block
	.wrapper
		baseTrans()
		position relative
		display flex
		align-items center
		justify-content flex-start
		gap 5px
		padding 0px 6px
		border-radius 4px
		background-color var(--doc-color-primary)
		color #FFFFFF
		font-size var(--doc-font-size-text-sub)
		cursor pointer
		.version
			font-weight 700
		&:hover
			background-color var(--doc-color-primary-light)
			&:after
				content '[点击查看更新日志]'
</style>
