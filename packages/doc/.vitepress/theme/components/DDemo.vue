<template lang="pug">
.d-demo
	.tip DEMO
	.demo-body
		slot(name="demo")
	.code-body(ref="codeBody")
		slot(name="code")
	.code-switch(@click="handleExpand()") {{ isExpand ? '收起代码' : '查看代码' }}
</template>

<script lang="ts" setup>
import { onMounted, ref, useSlots, useTemplateRef } from 'vue'
import { getCursorSelectText, setCursorSelectTag, setClipboard } from '../utils'

defineOptions({
	name: 'DDemo',
})

const slots = useSlots()

type Props = {
	description: string
}

const { description } = defineProps<Props>()

const isExpand = ref(false)

const codeBody = useTemplateRef<HTMLDivElement>('codeBody')

onMounted(() => {
	getCodeElements()
})

function getCodeElements() {
	console.log(slots.code)
}

function handleExpand() {
	isExpand.value = !isExpand.value
}

// export default {
// 	mounted() {
// 		this.getCodeElements()
// 	},
// 	methods: {
// 		expandHandler() {
// 			this.isExpand = !this.isExpand
// 		},
// 		copyBtnEnter(codeIndex) {
// 			this.highlightCode(codeIndex, true)
// 		},
// 		copyBtnLeave(codeIndex) {
// 			this.highlightCode(codeIndex, false)
// 		},
// 		copyCode(codeIndex) {
// 			const codeElement = this.codeElements[codeIndex]

// 			setCursorSelectTag(codeElement)
// 			setClipboard(getCursorSelectText(), true)
// 			this.$popup.msg('复制成功')
// 		},
// 		highlightCode(codeIndex, isHighlight) {
// 			const codeElement = this.codeElements[codeIndex]

// 			if (!codeElement) return
// 			if (isHighlight) {
// 				codeElement.setAttribute('selected', '')
// 			} else {
// 				codeElement.removeAttribute('selected')
// 			}
// 		},
// 	},
// }
</script>

<style lang="stylus" scoped>
$color-border = #DDDDDD

.d-md-block-demo
	baseTrans()

	position relative
	margin 40px 0
	border 1px solid $color-border
	border-radius 5px
	background-color #F3F4F5
	&:hover
		box-shadow 0 0 5px 0 rgba(0, 0, 0, 0.1)
	.demo-body
		padding 20px
		border-bottom 1px solid $color-border
	.tip
		position absolute
		top -1px
		right -1px
		padding 0 5px
		border-radius 3px
		background-color $ark-color-theme
		color #FFFFFF
		font-size 12px
		line-height 20px
		opacity 0.25
		user-select none
	.code-body
		padding 0 20px
		border-bottom 1px solid $color-border
		&>/deep/pre
			baseTrans()

			&[selected]
				transform scale(1.015)
	.code-tools
		padding 20px
		border-bottom 1px solid $color-border
	.code-switch
		baseTrans()

		height 40px
		color #AAAAAA
		text-align center
		font-size 14px
		line-height @height
		cursor pointer
		&:hover
			background-color #FFFFFF
			color $ark-color-theme
</style>
