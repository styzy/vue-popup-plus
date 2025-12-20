<template lang="pug">
.p-loading
	PLoadingIcon(:size="iconSize" :theme)
	.title(v-if="title") {{ title }}
	PButtonGroup(align="center" v-if="debugMode")
		PButton(:theme @click="handleClose") 强制关闭遮罩（仅在调试模式下可用）
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import { type Skin, type Theme } from '../../../typings'
import PLoadingIcon from '../../../components/PLoadingIcon.vue'
import PButtonGroup from '../../../components/PButtonGroup.vue'
import PButton from '../../../components/PButton.vue'

const popup = usePopup()

defineOptions({
	name: 'PLoading',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	skin: Skin
	theme: Theme
	title: string
	iconSize: number
	debugMode: boolean
}

const { theme, title, iconSize, debugMode } = defineProps<Props>()

function handleClose() {
	popup.destroy(instanceId)
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

.p-loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	overflow: hidden;
	.title {
		font-size: var(--popup-plugin-preset-font-size-title-sub);
		color: var(--popup-plugin-preset-color-text-main);
	}
}
</style>
