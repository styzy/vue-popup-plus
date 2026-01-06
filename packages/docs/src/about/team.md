---
layout: page
---

<script lang="ts" setup>
import {
	VPTeamPage,
	VPTeamPageTitle,
	VPTeamMembers,
	VPTeamPageSection
} from 'vitepress/theme'

const creator = [
	{
		avatar: 'https://www.github.com/styzy.png',
		name: 'STYZY',
		title: 'Creator & Core Developer',
		org: 'Tao Universe',
		orgLink: 'https://github.com/tao-universe',
		desc: '123',
		links: [
			{ icon: 'github', link: 'https://github.com/styzy' },
			// { icon: 'twitter', link: 'https://twitter.com/styzy' },
		],
	},
]

const coreMembers = [
	{
		avatar: 'https://www.github.com/houli-sys.png',
		name: 'HL',
		title: 'Preset-Plugin Developer',
		links: [{ icon: 'github', link: 'https://github.com/houli-sys' }],
	},
	{
		avatar: 'https://www.github.com/wujie-sketch.png',
		name: 'Sakura',
		title: 'Preset-Plugin Developer',
		links: [{ icon: 'github', link: 'https://github.com/wujie-sketch' }],
	},
]

const partners = []
</script>

<VPTeamPage>
	<VPTeamPageTitle>
		<template #title>我们的团队</template>
		<template #lead><code style="font-weight: 700;">Vue Popup Plus</code> 的开发团队由以下成员组成：</template>
	</VPTeamPageTitle>
	<VPTeamPageSection>
		<template #title>发起人</template>
		<template #lead>主要负责 <strong>核心</strong> 的开发和维护</template>
		<template #members>
			<VPTeamMembers size="medium" :members="creator" />
		</template>
	</VPTeamPageSection>
	<VPTeamPageSection>
		<template #title>核心团队</template>
		<template #lead>核心团队主要负责 <strong>预置插件</strong> 的开发和维护</template>
		<template #members>
			<VPTeamMembers size="medium" :members="coreMembers" />
		</template>
	</VPTeamPageSection>
	<VPTeamPageSection>
		<template #title>合作团队</template>
		<template #lead>期待更多小伙伴加入我们~</template>
		<!-- <template #members>
			<VPTeamMembers size="small" :members="partners" />
		</template> -->
	</VPTeamPageSection>
</VPTeamPage>
