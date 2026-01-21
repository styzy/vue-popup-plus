<template lang="pug">
.d-api-item(:class="{ 'is-deprecated': isDeprecated }")
	a(:href="link" :title="isDeprecated ? `已废弃${deprecated}` : text")
		slot {{ text }}
	.version(:class="{ 'keep-show': showVersion }")
		Badge(:text="`${support}+`" v-if="support")
		Badge(:text="`${deprecated}-`" type="danger" v-if="deprecated")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Version } from 'vue-popup-plus'

defineOptions({
	name: 'DApiItem',
})

type Props = {
	link: string
	text?: string
	support?: Version
	deprecated?: Version
	showVersion?: boolean
}

const { link, text, support, deprecated, showVersion } = defineProps<Props>()

const isDeprecated = computed(() => !!deprecated)
</script>

<style lang="scss" scoped>
.d-api-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 10px;
	a {
		@include base-transition(0);
		color: rgb(66, 81, 95);
		font-size: 15px;
		font-weight: 500;
		text-decoration: none;
		&:hover {
			color: var(--docs-color-primary);
		}
	}
	.version {
		display: none;
		flex-direction: row;
		gap: 5px;
		&.keep-show {
			display: flex;
		}
		:deep(.VPBadge) {
			transform: none;
		}
	}
	&:hover {
		.version {
			display: flex;
		}
	}
	&.is-deprecated {
		opacity: 0.35;
		&:hover {
			opacity: 1;
		}
	}
}
.dark {
	.d-api-item {
		a {
			color: rgb(207, 228, 250);
			&:hover {
				color: var(--docs-color-primary-light);
			}
		}
	}
}
</style>
