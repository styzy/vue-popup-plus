<template lang="pug">
PopupMask(v-if="store.mask")
PopupView
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import type { PopupStore } from '@/Popup'
import PopupMask from './PopupMask.vue'
import PopupView from './PopupView.vue'

const store: PopupStore = inject('popupStore') as PopupStore

defineOptions({
	name: 'Popup',
})
</script>
