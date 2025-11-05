<template lang="pug">
.d-demo
	.logo DEMO
	.demo-body
		slot(name="demo")
	.code-body(:class="{ 'is-expand': isExpand }" ref="codeBody")
		slot(name="code")
	.code-switch(@click="handleExpand()") {{ isExpand ? '收起代码' : '查看代码' }}
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'

defineOptions({
	name: 'DDemo',
})

type Props = {
	description: string
}

const { description } = defineProps<Props>()

const isExpand = ref(false)

const codeBody = useTemplateRef<HTMLDivElement>('codeBody')

function handleExpand() {
	isExpand.value = !isExpand.value
}
</script>

<style lang="stylus" scoped>
.d-demo
	baseTrans()

	position relative
	margin 20px 0
	border 1px solid var(--doc-color-border)
	border-radius 5px
	background-color var(--doc-color-background-main)
	&:hover
		box-shadow 1px 1px 15px var(--doc-color-shadow)
	.demo-body
		padding 20px
	.logo
		position absolute
		top 2px
		right 2px
		padding 0 5px
		border-radius 3px
		background-color var(--doc-color-theme)
		color #FFFFFF
		font-size 12px
		line-height 20px
		opacity 0.25
		user-select none
	.code-body
		padding 0 20px
		max-height 0px
		overflow hidden
		&.is-expand
			border-top 1px solid var(--doc-color-border)
			max-height 2000px
	.code-switch
		baseTrans()

		height 40px
		color var(--doc-color-text-sub)
		text-align center
		font-size 14px
		line-height @height
		cursor pointer
		border-top 1px solid var(--doc-color-border)
		&:hover
			background-color var(--doc-color-background-sub)
			color var(--doc-color-text-main)
</style>
