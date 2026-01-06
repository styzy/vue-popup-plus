<template lang="pug">
.d-api-group(v-if="hasMatchedApi")
	.title {{ title }}
	.body
		slot(ref="bodySlot")
</template>

<script lang="ts">
export const updateApiMatchedInjectKey: InjectionKey<
	(path: string, isMatched: boolean) => void
> = Symbol('updateApiMatched')
</script>

<script setup lang="ts">
import { computed, inject, provide, ref, type InjectionKey } from 'vue'
import { filterInjectKey } from './DApiGird.vue'

const filter = inject(filterInjectKey)

defineOptions({
	name: 'DApiGroup',
})

type Props = {
	title: string
}

const { title } = defineProps<Props>()

const matchedApis = ref<string[]>([])

const isMatchEnabled = computed(() => !!filter?.keyword)
const hasMatchedApi = computed(
	() =>
		!isMatchEnabled.value ||
		(isMatchEnabled.value && !!matchedApis.value.length)
)

function updateApiMatched(path: string, isMatched: boolean) {
	if (isMatched) {
		if (!matchedApis.value.includes(path)) {
			matchedApis.value.push(path)
		}
	} else {
		matchedApis.value = matchedApis.value.filter((item) => item !== path)
	}
}

provide(updateApiMatchedInjectKey, updateApiMatched)
</script>

<style lang="scss" scoped>
.d-api-group {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 8px;
	box-sizing: border-box;
	background-color: #edf2f7;
	overflow: hidden;
	.title {
		color: var(--docs-color-primary);
		font-size: var(--docs-font-size-title-main);
		font-weight: 700;
	}
	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 5px;
	}
}
.dark {
	.d-api-group {
		background-color: #252527;
		.title {
			color: var(--docs-color-primary-light);
		}
	}
}
</style>
