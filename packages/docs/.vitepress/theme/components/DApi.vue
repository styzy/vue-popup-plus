<template lang="pug">
.d-api
	h2 {{ api.text }}
	.grid(v-if="hasFilteredApiGroup()")
		template(:key="group.text" v-for="group in api.groups")
			DApiGroup(:title="group.text" v-if="!!group.items.length")
				DApiItem(
					v-bind="{ ...api, showVersion: filter.showVersion }"
					v-for="api in group.items")
	.empty(v-else) 没有匹配到 '{{ filter.keyword }}'
</template>

<script lang="ts">
type Api = {
	text: string
	link: string
	support?: Version
	deprecated?: Version
	showVersion?: boolean
	items?: never
}
type ApiGroup = {
	text: string
	items: Api[]
}
export type ApiModule = {
	text: string
	groups: ApiGroup[]
}
</script>

<script lang="ts" setup>
import { type Version } from 'vue-popup-plus'
import { type Filter } from './DApiFilter.vue'
import DApiGroup from './DApiGroup.vue'
import DApiItem from './DApiItem.vue'

defineOptions({
	name: 'DApi',
})

type Props = {
	api: ApiModule
	filter: Filter
}

const { api, filter } = defineProps<Props>()

function hasFilteredApiGroup(): boolean {
	return api.groups.some((group) => !!group.items.length)
}
</script>

<style lang="scss" scoped>
.d-api {
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
	.d-api {
		.grid {
			columns: 3;
		}
	}
}
</style>
