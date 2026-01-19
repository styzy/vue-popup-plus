<template lang="pug">
.hello-dialog
	.title Hello Dialog
	h1(v-if="test") 接收的参数：
		span.value {{ test }}
	DButton(@click="handleCustomEvent()" theme="success" v-if="test") 触发自定义事件
	DButton(@click="handleClose()" theme="primary") 关闭对话框
	DButton(@click="handleClose('awesome !')" theme="success" type="plain") 携带参数 awesome ! 关闭对话框
</template>

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

defineOptions({
	name: 'HelloDialog',
	inheritAttrs: false,
})

type Props = {
	test?: string
}

const { test = '' } = defineProps<Props>()

const emit = defineEmits<{
	customEvent: [params: string]
}>()

function handleCustomEvent() {
	emit('customEvent', 'customEvent params')
}

function handleClose(payload?: any) {
	popup.dialogClose(payload)
}
</script>

<style scoped lang="stylus">
.hello-dialog
	display flex
	flex-direction column
	align-items center
	gap 20px
	min-width 500px
	min-height 360px
	width 100%
	height 100%
	background-color var(--docs-color-background-main)
	.title
		padding 30px 0 10px
		font-size 30px
		font-weight bold
	.value
		color var(--docs-color-primary)
</style>
