<template lang="pug">
.hello-world
	.title Hello World
	h1(v-if="test") 接收的参数：
		span.value {{ test }}
	DButton(@click="handleCustomEvent()" theme="primary" type="plain" v-if="test") 触发自定义事件
	DButton(@click="handleClose()" theme="primary") 关闭对话框
	DButton(@click="handleClose('awesome !')" theme="success" type="plain") 携带参数 awesome ! 关闭对话框
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

defineOptions({
	name: 'HelloWorld',
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
	popup.destroy(instanceId!, payload)
}
</script>

<style scoped lang="stylus">
.hello-world
	display flex
	flex-direction column
	align-items center
	gap 20px
	width 400px
	height 300px
	background-color var(--docs-color-background-main)
	.title
		padding 30px 0 10px
		font-size 30px
		font-weight bold
	.value
		color var(--docs-color-primary)
</style>
