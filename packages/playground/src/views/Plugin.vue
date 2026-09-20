<template lang="pug">
GContainer.plugin(root)
	GContainer.header(root)
		GTools(:component="() => import('./Plugin.vue')")
		GTitle 预置插件 - 基础功能测试
		ElForm(inline)
			ElFormItem(label="皮肤")
				ElSelect(
					:model-value="skin"
					@change="handleSkinChange"
					style="width: 200px")
					ElOption(label="现代（modern）- 默认" value="modern")
					ElOption(label="经典（classic）" value="classic")
			ElFormItem(label="国际化")
				ElSelect(style="width: 200px" v-model="locale")
					ElOption(label="简体中文" value="zh-CN")
					ElOption(label="繁体中文" value="zh-TW")
					ElOption(label="英语（美国）" value="en-US")
					ElOption(label="英语（英国）" value="en-GB")
					ElOption(label="俄语" value="ru-RU")
					ElOption(label="日语" value="ja-JP")
					ElOption(label="韩语" value="ko-KR")
					ElOption(label="德语" value="de-DE")
					ElOption(label="法语" value="fr-FR")
					ElOption(label="泰语" value="th-TH")
					ElOption(label="越南语" value="vi-VN")
					ElOption(label="印尼语" value="id-ID")
					ElOption(label="马来语" value="ms-MY")
					ElOption(label="印地语" value="hi-IN")
					ElOption(label="希腊语" value="el-GR")
					ElOption(label="意大利语" value="it-IT")
					ElOption(label="斯洛伐克语" value="sk-SSK")
					ElOption(label="斯洛文尼亚语" value="sl-SI")
					ElOption(label="西班牙语" value="es-ES")
					ElOption(label="瑞典语" value="sv-SE")
					ElOption(label="波兰语" value="pl-PL")
					ElOption(label="芬兰语" value="fi-FFI")
					ElOption(label="匈牙利语" value="hu-HHU")
					ElOption(label="爱尔兰语" value="ga-IE")
					ElOption(label="拉脱维亚语" value="lv-LLV")
					ElOption(label="立陶宛语" value="lt-LLT")
					ElOption(label="马耳他语" value="mt-MT")
					ElOption(label="土耳其语" value="tr-TR")
					ElOption(label="葡萄牙语（巴西）" value="pt-BR")
					ElOption(label="葡萄牙语（葡萄牙）" value="pt-PT")
					ElOption(label="阿拉伯语" value="ar-SA")
					ElOption(label="罗马语" value="ro-RO")
					ElOption(label="保加利亚语" value="bg-BBG")
					ElOption(label="克罗地亚语" value="hr-HR")
					ElOption(label="捷克语" value="cs-CZ")
					ElOption(label="丹麦语" value="da-DK")
					ElOption(label="荷兰语" value="nl-NL")
					ElOption(label="爱沙尼亚语" value="et-EE")
					ElOption(label="罗马尼亚语" value="ro-RO")
			ElFormItem(label="启用视区")
				ElSwitch(v-model="useViewport")
		ElTabs(
			:model-value="currentTab"
			@tab-click="handleCurrentTabChange"
			tab-position="top")
			ElTabPane(
				:key="tab.name"
				:label="tab.label"
				:name="tab.name"
				v-for="tab in tabs")
	.main
		RouterView
	GContainer.viewport-ctn(root v-if="useViewport")
		.viewport(ref="viewportRef")
</template>

<script lang="ts" setup>
import { computed, provide, ref, useTemplateRef, watch } from 'vue'
import { usePopup } from 'vue-popup-plus'
import { setLocale, type PopupSkin } from 'vue-popup-plus-plugin-preset'
import { useRoute, useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'

const tabs = [
	{
		label: 'Toast',
		name: '/plugin/toast',
	},
	{
		label: 'Message',
		name: '/plugin/message',
	},
	{
		label: 'Alert',
		name: '/plugin/alert',
	},
	{
		label: 'Confirm',
		name: '/plugin/confirm',
	},
	{
		label: 'Prompt',
		name: '/plugin/prompt',
	},
	{
		label: 'Dialog',
		name: '/plugin/dialog',
	},
	{
		label: 'Drawer',
		name: '/plugin/drawer',
	},
	{
		label: 'Loading',
		name: '/plugin/loading',
	},
	{
		label: 'Album',
		name: '/plugin/album',
	},
]

const router = useRouter()
const route = useRoute()
const popup = usePopup()

const skin = (localStorage.getItem('skin') || 'modern') as PopupSkin
const locale = ref('zh-CN')
const useViewport = ref<boolean>(false)
const viewportRef = useTemplateRef('viewportRef')

const currentTab = computed(() => route.path)
const viewport = computed(() => (useViewport.value ? viewportRef.value : null))

watch(locale, async () => {
	try {
		await loadLocale()
		popup.toastSuccess(`语言 ${locale.value} 切换成功`)
	} catch (error) {
		popup.toastDanger(`语言 ${locale.value} 不存在`)
	}
})

loadLocale()

function handleSkinChange(targetSkin: PopupSkin) {
	if (targetSkin === skin) return

	localStorage.setItem('skin', skin === 'modern' ? 'classic' : 'modern')
	window.location.reload()
}

async function loadLocale() {
	const message = await import(
		`vue-popup-plus-plugin-preset/locales/${locale.value}.ts`
	)

	if (!message) throw new Error(`语言 ${locale.value} 不存在`)

	setLocale(message.default)
}

function handleCurrentTabChange(tabContext: TabsPaneContext) {
	if (!tabContext.paneName) return

	router.replace(tabContext.paneName as string)
}

provide('viewport', viewport)
</script>

<style lang="scss" scoped>
$top-height: 190px;
.plugin {
	padding: 0;
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding-bottom: 0;
		height: $top-height;
		z-index: 1;
	}
	.main {
		padding-top: $top-height;
	}
	.viewport-ctn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: $top-height;
		background-color: transparent;
		pointer-events: none;
		z-index: 1;
		.viewport {
			width: 100%;
			height: 100%;
			border: 2px dashed rgb(0, 140, 255);
			box-sizing: border-box;
		}
	}
}
</style>
