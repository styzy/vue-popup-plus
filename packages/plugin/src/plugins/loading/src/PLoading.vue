<template lang="pug">
.p-loading(
	:class="[`is-skin-${skin}`, { 'has-mask': mask && !maskTransparent }]")
	.wrapper(@click="handleCloseOnDebugMode()")
		PLoadingIcon(:size="iconSize" :theme)
		.title(v-if="title") {{ title }}
</template>

<script lang="ts" setup>
import { type Skin } from '../../../skin'
import { type Theme } from '../../../typings'
import PLoadingIcon from '../../../components/PLoadingIcon.vue'

defineOptions({
	name: 'PLoading',
})
type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	skin: Skin
	theme: Theme
	title: string
	iconSize: number
	mask: boolean
	maskTransparent: boolean
	debugMode: boolean
}

const { theme, title, iconSize, mask, maskTransparent, debugMode } =
	defineProps<Props>()

function handleCloseOnDebugMode() {
	emit('close')
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
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 20px;
		max-width: v-bind('`${iconSize * 4}px`');
		min-width: 120px;
		min-height: 120px;
		border-radius: var(--popup-plugin-preset-border-radius-large);
		box-shadow: var(--popup-plugin-preset-box-shadow);
		box-sizing: border-box;
		.title {
			font-size: var(--popup-plugin-preset-font-size-title-sub);
			color: #ffffff;
		}
	}
	&.has-mask {
		.wrapper {
			background-color: rgba(0, 0, 0, 0.75);
		}
	}
	&:not(.has-mask) {
		.wrapper {
			background-color: rgba(0, 0, 0, 0.8);
		}
	}
}
.dark {
	.p-loading {
		&.has-mask {
			.wrapper {
				background-color: rgba(40, 40, 40, 0.85);
			}
		}
		&:not(.has-mask) {
			.wrapper {
				background-color: rgba(40, 40, 40, 0.9);
			}
		}
	}
}
</style>
