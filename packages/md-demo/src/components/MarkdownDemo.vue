<template lang="pug">
.markdown-demo
	.logo(@click="handleJump()" title="click to jump to npm package")
	.demo-body(:class="{ 'is-expand': isExpand }")
		slot(name="demo")
	.code-body(ref="codeBody")
		slot(name="code")
	.code-switch(@click="handleExpand()") {{ isExpand ? '收起代码' : '查看代码' }}
</template>

<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue'

defineOptions({
	name: 'MarkdownDemo',
})

type Props = {
	description: string
}

const { description } = defineProps<Props>()

const isExpand = ref(false)
const currentHeight = ref(0)
const maxHeight = ref(0)

const codeBody = useTemplateRef<HTMLDivElement>('codeBody')

onMounted(() => {
	maxHeight.value = codeBody.value!.scrollHeight
})

watch(isExpand, () => {
	scrollCode()
})

function handleExpand() {
	isExpand.value = !isExpand.value
}

function scrollCode() {
	const intervalTime = 20
	const intervalDuration = 200
	const offset = maxHeight.value / (intervalDuration / intervalTime)

	if (isExpand.value) {
		const interval = setInterval(() => {
			currentHeight.value = Math.min(
				maxHeight.value,
				currentHeight.value + offset
			)
			if (currentHeight.value === maxHeight.value) {
				clearInterval(interval)
			}
		}, intervalTime)
	} else {
		const interval = setInterval(() => {
			currentHeight.value = Math.max(0, currentHeight.value - offset)
			if (currentHeight.value === 0) {
				clearInterval(interval)
			}
		}, intervalTime)
	}
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
		opacity 0.25
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
				text-decoration underline
				font-weight 700
	.demo-body
		padding 20px
		&.is-expand
			border-bottom 1px solid var(--md-demo-color-border)
	.code-body
		padding 0 20px
		height v-bind('`${currentHeight}px`')
		overflow hidden
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
