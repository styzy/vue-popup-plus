<template lang="pug">
RouterView
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { POPUP_ANIMATIONS } from 'vue-popup-plus'

export default defineComponent({
	name: 'App',
	created() {
		// this.$popup.render({
		// 	component: () => import('@/views/Demo.vue'),
		// 	maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		// })
		// this.$popup.test('hello world')
	},
})
</script>
