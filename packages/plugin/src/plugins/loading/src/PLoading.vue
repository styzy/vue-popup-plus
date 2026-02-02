<template lang="pug">
.popup-loading(
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
	if (debugMode) {
		emit('close')
	}
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

.popup-loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: use-var('spacing');
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: use-var('spacing');
		padding: use-var('spacing');
		max-width: v-bind('`${iconSize * 4}px`');
		min-width: 120px;
		min-height: 120px;
		border-radius: use-var('border-radius-large');
		box-shadow: use-var('box-shadow-large');
		box-sizing: border-box;
		.title {
			font-size: use-font-size('title-sub');
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

@include use-dark() {
	.popup-loading {
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
