<template lang="pug">
.hello-world
	.title Hello World
	h1 接收的参数：{{ test }}
	DButton(@click="handleClose()" theme="primary" type="plain") 关闭对话框
	DButton(@click="handleClose('awesome !')" theme="success" type="plain") 携带参数 awesome ! 关闭对话框
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)

type Props = {
	test: string
}

const { test } = defineProps<Props>()

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
	.title
		padding 30px 0 10px
		font-size 30px
		font-weight bold
</style>
