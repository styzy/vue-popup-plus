<template lang="pug">
.global-component
	div 全局组件
	button(@click="handleClick") 全局组件按钮
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

defineOptions({
	name: 'GlobalComponent',
})

function handleClick() {
	popup.toast('hello world')
}
</script>

<style lang="stylus" scoped>
.global-component
	display flex
	flex-direction column
	align-items center
	gap 20px
	width 100%
	padding 20px 0
	background-color green
	color #FFFFFF
</style>
