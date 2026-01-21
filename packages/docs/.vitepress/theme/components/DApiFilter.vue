<template lang="pug">
.d-api-filter
	.filter
		label(for="keyword") 过滤
		input#keyword(
			placeholder="请输入过滤关键字"
			type="text"
			v-model.trim="filter.keyword")
	.filter
		label(for="showVersion") 显示版本标签
		input#showVersion(type="checkbox" v-model="filter.showVersion")
</template>

<script lang="ts">
export type Filter = {
	keyword: string
	showVersion: boolean
}
</script>

<script lang="ts" setup>
import { type ApiModule } from './DApi.vue'
import { onMounted, ref, watch } from 'vue'

type Apis = Record<string, ApiModule>

const filter = defineModel<Filter>('filter', {
	required: true,
})

const apis = defineModel<Apis>('apis', {
	required: true,
})

const originApis = ref<Apis>({})

onMounted(() => {
	originApis.value = Object.fromEntries(
		Object.entries(apis.value).map(([key, module]) => [
			key,
			{
				...module,
				groups: module.groups.map((group) => ({
					...group,
					items: group.items.map((item) => ({
						...item,
						showVersion: filter.value.showVersion,
					})),
				})),
			},
		])
	)
})

watch(
	() => filter.value.keyword,
	(keyword) => {
		apis.value = Object.fromEntries(
			Object.entries(originApis.value).map(([key, module]) => [
				key,
				{
					...module,
					groups: module.groups.map((group) => ({
						...group,
						items: group.items.filter(
							(item) =>
								item.text.includes(keyword) ||
								item.support?.includes(keyword) ||
								item.deprecated?.includes(keyword)
						),
					})),
				},
			])
		)
	}
)
</script>

<style lang="scss" scoped>
.d-api-filter {
	display: flex;
	flex-direction: row;
	gap: 50px;
	margin-top: 40px;
	.filter {
		display: flex;
		align-items: center;
		justify-content: center;
		label {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-right: 15px;
			font-size: var(--docs-font-size-title-sub);
			font-weight: 700;
			&::after {
				content: ':';
			}
		}
		input[type='text'] {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 10px;
			height: 36px;
			border: 1px solid var(--vp-c-border);
			font-size: 14px;
			border-radius: 4px;
			&:focus {
				border-color: var(--docs-color-primary);
			}
		}
		input[type='checkbox'] {
			width: 18px;
			height: 18px;
		}
	}
}
</style>
