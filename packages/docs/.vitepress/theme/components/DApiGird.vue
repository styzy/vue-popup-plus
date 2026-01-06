<template lang="pug">
.d-api-grid
	h2(v-if="title") {{ title }}
	.grid(:data-empty-content="`没有匹配到 '${filter.keyword}'`")
		slot
</template>

<script lang="ts">
export const filterInjectKey: InjectionKey<Reactive<Filter>> = Symbol('filter')
</script>
<script setup lang="ts">
import { provide, reactive, type InjectionKey, type Reactive } from 'vue'
import { type Filter } from './DApiFilter.vue'

defineOptions({
	name: 'DApiGrid',
})

type Props = {
	title?: string
	filter?: Filter
}

const {
	title,
	filter = reactive({
		keyword: '',
		showVersion: true,
	}),
} = defineProps<Props>()

provide(filterInjectKey, filter)
</script>

<style lang="scss" scoped>
.d-api-grid {
	display: flex;
	flex-direction: column;
	gap: 20px;
	.grid {
		columns: 2;
		gap: 20px;
		&:empty {
			columns: unset;
			&:after {
				display: flex;
				align-items: center;
				justify-content: center;
				content: attr(data-empty-content);
				color: var(--docs-color-info);
			}
		}
	}
}
@media screen and (min-width: 1440px) {
	.d-api-grid {
		.grid {
			columns: 3;
		}
	}
}
</style>
