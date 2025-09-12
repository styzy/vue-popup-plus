<template lang="pug">
.demo
	h1 这是一个弹框
	br
	button(@click="handlerResize") 修改大小
	br
	button(@click="handleClose") 关闭弹框
</template>

<script lang="ts" setup>
import { usePopup } from '@'
import type { PopupStore } from '@/Popup'
import { inject, ref } from 'vue'

defineOptions({ name: 'Demo' })

const popupId: string = inject('popupId', '')
const store: PopupStore = inject('popupStore') as PopupStore

const width = ref('300px')

function handlerResize() {
	// height.value = '500px'
	store.width = '100%'
	store.height = '100%'
}

function handleClose() {
	const popup = usePopup()
	popup.destroy(popupId)
}
</script>

<style lang="stylus" scoped>
.demo
	display flex
	flex-direction column
	align-items center
	overflow hidden
	background-color #0183da
	min-width 300px
	min-height 300px
	height 100%
	width 100%
	color #FFFFFF
</style>
