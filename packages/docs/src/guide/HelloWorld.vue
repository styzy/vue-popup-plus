<template lang="pug">
.hello-world
	h1 Hello World
</template>

<script setup lang="ts">
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()
</script>

<style scoped lang="stylus">
.hello-world
	display flex
	flex-direction column
	align-items center
	justify-content center
	gap 20px
</style>
