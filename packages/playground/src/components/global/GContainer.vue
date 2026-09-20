<template lang="pug">
.g-container(:class="{ 'is-tools-expand': isToolsExpand }")
	slot
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTools } from '@/composables'

const { isExpand } = useTools()

type Props = {
	/**
	 * 是否为根容器
	 */
	root?: boolean
}

const { root } = defineProps<Props>()

const isToolsExpand = computed(() => isExpand.value && root)
</script>

<style lang="scss" scoped>
.g-container {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	box-sizing: border-box;
	background-color: var(--playground-color-background-main);
	&.is-tools-expand {
		padding-right: 230px;
	}
}
</style>
