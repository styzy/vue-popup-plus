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

const coreMembers = [
	{
		avatar: 'https://www.github.com/styzy.png',
		name: 'STYZY',
		title: 'Creator & Core Developer',
		links: [
			{ icon: 'github', link: 'https://github.com/styzy' },
			// { icon: 'twitter', link: 'https://twitter.com/styzy' },
		],
	},
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
		<template #title>核心团队</template>
		<template #lead>核心团队主要负责 vue-popup-plus(核心) 和<br/>vue-popup-plus-plugin-preset(预置插件) 的开发和维护</template>
		<template #members>
			<VPTeamMembers size="medium" :members="coreMembers" />
		</template>
	</VPTeamPageSection>
	<VPTeamPageSection>
		<template #title>合作团队</template>
		<template #lead>合作团队主要负责插件生态的开发和维护</template>
		<template #members>
			<VPTeamMembers size="small" :members="partners" />
		</template>
	</VPTeamPageSection>
</VPTeamPage>
