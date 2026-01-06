<template lang="pug">
.d-api(:class="{ 'is-deprecated': isDeprecated }" v-if="isMatchedKeyword")
	a(:href="path" :title="isDeprecated ? `已废弃${deprecated}` : label")
		slot {{ label }}
	.version(:class="{ 'keep-show': showVersion }")
		Badge(:text="`${support}+`" v-if="support")
		Badge(:text="`${deprecated}-`" type="danger" v-if="deprecated")
</template>

<script setup lang="ts">
import { computed, inject, useSlots, watch } from 'vue'
import { type Version } from 'vue-popup-plus'
import { filterInjectKey } from './DApiGird.vue'
import { updateApiMatchedInjectKey } from './DApiGroup.vue'

defineOptions({
	name: 'DApi',
})

const slots = useSlots()

const filter = inject(filterInjectKey)
const updateApiMatched = inject(updateApiMatchedInjectKey)

type Props = {
	path: string
	label?: string
	support?: Version
	deprecated?: Version
}

const { path, label, support, deprecated } = defineProps<Props>()

const isDeprecated = computed(() => !!deprecated)
const showVersion = computed(() => filter?.showVersion ?? true)
const isMatchedKeyword = computed(() => {
	if (!filter || !filter.keyword) return true

	if (label) {
		return label.includes(filter.keyword)
	} else {
		return (
			(slots.default?.()?.[0].children as string | undefined)?.includes(
				filter.keyword
			) ?? true
		)
	}
})

watch(
	isMatchedKeyword,
	(isMatched) => {
		updateApiMatched?.(path, isMatched)
	},
	{
		immediate: true,
	}
)
</script>

<style lang="scss" scoped>
.d-api {
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
	.d-api {
		a {
			color: rgb(207, 228, 250);
			&:hover {
				color: var(--docs-color-primary-light);
			}
		}
	}
}
</style>
