<template lang="pug">
.d-version-panel(:class="{ 'is-home': mode === 'home' }")
	.item(@click="handleNavigate('/changelog/core')")
		.label 核心版本
		.version {{ version }}
		.link
			span 查看
			span.module 核心
			span 更新日志
	.item(@click="handleNavigate('/changelog/plugin-preset')")
		.label 预置插件版本
		.version {{ presetPluginVersion }}
		.link
			span 查看
			span.module 预置插件
			span 更新日志
</template>

<script lang="ts" setup>
import { version } from 'vue-popup-plus'
import { version as presetPluginVersion } from 'vue-popup-plus-plugin-preset'
import { useRoute, useRouter } from 'vitepress'

const router = useRouter()

defineOptions({
	name: 'DVersionPanel',
})

type Props = {
	mode?: 'sidebar' | 'home'
}

const { mode = 'sidebar' } = defineProps<Props>()

function handleNavigate(path: string) {
	router.go(path)
}
</script>

<style lang="scss" scoped>
.d-version-panel {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	gap: 10px;
	padding: 20px 0;
	border-bottom: 1px solid var(--vp-c-divider);
	&.is-home {
		border-bottom: none;
		flex-direction: row;
		justify-content: flex-start;
		padding-bottom: 0;
	}
	&:not(.is-home) {
		position: sticky;
		top: 0px;
		background-color: var(--vp-sidebar-bg-color);
		z-index: 100;
	}
	.item {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
		padding: 2px 20px;
		height: 40px;
		background-color: var(--vp-code-bg);
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
		.label {
			color: var(--vp-c-text-1);
			font-size: var(--docs-font-size-text-main);
			font-weight: 700;
			opacity: 1;
		}
		.version {
			color: var(--vp-c-brand-1);
			font-size: var(--docs-font-size-text-main);
			font-weight: 700;
			opacity: 1;
		}
		.link {
			@include base-transition;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			background-color: var(--vp-c-brand-1);
			font-size: var(--docs-font-size-text-sub);
			// font-weight: 700;
			opacity: 0;
			z-index: 1;
			.module {
				margin-left: 5px;
			}
		}
		&:hover {
			.link {
				opacity: 1;
			}
		}
	}
}

.dark {
	.d-version-panel {
		.item {
			border: 1px solid #000;
			.link {
				background-color: var(--vp-c-bg);
				color: var(--vp-c-brand-1);
			}
		}
	}
}

@media (max-width: 768px) {
	.d-version-panel {
		&.is-home {
			border-bottom: none;
			flex-direction: row;
			justify-content: center;
			gap: 20px;
		}
		.item {
			gap: 10px;
		}
	}
}
</style>
