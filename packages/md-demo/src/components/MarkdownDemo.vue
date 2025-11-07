<template lang="pug">
.markdown-demo
	.logo(@click="handleJump()" title="click to jump to npm package")
	.demo-body
		slot(name="demo")
	.code-body(:class="{ 'is-expand': isExpand }" ref="codeBody")
		slot(name="code")
	.code-switch(@click="handleExpand()") {{ isExpand ? '收起代码' : '查看代码' }}
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'

defineOptions({
	name: 'MarkdownDemo',
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

function handleJump() {
	window.open(
		'https://www.npmjs.com/package/vitepress-plugin-markdown-container-demo',
		'_blank'
	)
}
</script>

<style lang="stylus" scoped>
@import '../style/function.styl'

.markdown-demo
	baseTrans()

	position relative
	margin 20px 0
	border 1px solid var(--md-demo-color-border)
	border-radius 5px
	background-color var(--md-demo-color-background-main)
	&:hover
		box-shadow 1px 1px 15px var(--md-demo-color-shadow)
	.demo-body
		padding 20px
	.logo
		position absolute
		top -1px
		right -1px
		padding 0 5px
		border-radius 0 3px 0 3px
		background-color var(--md-demo-color-primary)
		color #FFFFFF
		font-size 12px
		line-height 20px
		opacity 0.5
		user-select none
		&:before
			display inline
			content 'DEMO'
		&:hover
			baseTrans()
			opacity 1
			cursor pointer
			&:before
				content 'Powered by '
			&:after
				display inline
				content 'Vitepress Plugin Markdown Container Demo'
				font-weight 700
	.code-body
		padding 0 20px
		max-height 0px
		overflow hidden
		&.is-expand
			border-top 1px solid var(--md-demo-color-border)
			max-height 2000px
	.code-switch
		baseTrans()

		height 40px
		color var(--md-demo-color-text-sub)
		text-align center
		font-size 14px
		line-height @height
		cursor pointer
		border-top 1px solid var(--md-demo-color-border)
		&:hover
			background-color var(--md-demo-color-background-sub)
			color var(--md-demo-color-text-main)
</style>
