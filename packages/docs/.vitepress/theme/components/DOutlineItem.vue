<script setup lang="ts">
import { computed } from 'vue'
import { type DefaultTheme, VPBadge, VPLink } from 'vitepress/theme'

const { headers, root } = defineProps<{
	headers: DefaultTheme.OutlineItem[]
	root?: boolean
}>()

const resolvedHeaders = computed(() => {
	return headers.map((item) => ({
		...item,
		badges: getBadges(item.element),
	}))
})

function getBadges(
	element: HTMLElement
): { text: string; type: 'info' | 'tip' | 'warning' | 'danger' }[] {
	const el_badges = element.querySelectorAll('span.VPBadge')
	return [...el_badges].map((el) => ({
		text: el.textContent || '',
		type: el.className.includes('danger')
			? 'danger'
			: el.className.includes('warning')
				? 'warning'
				: el.className.includes('tip')
					? 'tip'
					: 'info',
	}))
}

function onClick({ target: el }: Event) {
	const id = (el as HTMLAnchorElement).href!.split('#')[1]
	const heading = document.getElementById(decodeURIComponent(id))
	heading?.focus({ preventScroll: true })
}
</script>

<template>
	<ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
		<li v-for="{ children, link, title, badges } in resolvedHeaders">
			<VPLink class="outline-link" :href="link" @click="onClick" :title>
				<div class="content">{{ title }}</div>
				<div class="badges" v-if="badges.length">
					<template v-for="badge in badges">
						<VPBadge
							class="badge"
							:text="badge.text"
							:type="badge.type" />
					</template>
				</div>
			</VPLink>
			<template v-if="children?.length">
				<DOutlineItem :headers="children" />
			</template>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
.root {
	position: relative;
	z-index: 1;
}

.nested {
	padding-right: 16px;
	padding-left: 16px;
}

.outline-link {
	display: flex;
	line-height: 32px;
	font-size: 14px;
	font-weight: 400;
	color: var(--vp-c-text-2);
	transition: color 0.5s;
	white-space: nowrap;
	&.nested {
		padding-left: 13px;
	}
	&:hover,
	&.active {
		.content {
			color: var(--vp-c-brand-1);
		}
		transition: color 0.25s;
	}

	.content {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.badges {
		display: inline-block;
		.badge {
			margin-left: 5px;
			padding: 0 4px;
			line-height: 18px;
			transform: none;
		}
	}
}
</style>
