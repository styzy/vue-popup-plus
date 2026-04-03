<template lang="pug">
.g-tools(:class="{ 'is-collapse': !isExpand }")
	template(v-if="isExpand")
		GTitle(second) 快捷工具
		PButtonGroup(cross-align="center" direction="vertical" theme="primary")
			PButton(@click="handleDarkMode()") 切换到{{ isDarkMode ? '亮色' : '暗黑' }}模式
			PButton(@click="handlePopupDestorySelf()" theme="warning" v-if="inPopup") 当前处于弹出层内，点击关闭
			PButton(@click="handlePopupSelf()" type="plain") 用弹出层渲染当前页面
			PButton(@click="handlePopupDialogSelf()" type="plain") 用对话渲染当前页面
			PButton(@click="handlePopupDrawerSelf()" type="plain") 用抽屉渲染当前页面
		GTitle(second) 快速跳转
		PButtonGroup(
			cross-align="center"
			direction="vertical"
			style="margin-bottom: 30px"
			theme="primary")
			PButton(@click="handleJumpIndex()" theme="success") 首页
			PButton(@click="handleJumpCore()") 核心 - 基础测试
			PButton(@click="handleJumpAnchor()") 核心 - 锚点测试
			PButton(@click="handleJumpDirective()" theme="warning" type="plain") 核心 - 指令测试
			PButton(@click="handleJumpPlugin()" theme="success") 预置插件 - 基础测试
			PButton(@click="handleJumpButton()" theme="warning" type="plain") 预置插件 - 按钮测试
	PButton(@click="isExpand = !isExpand" theme="success") {{ isExpand ? '折叠工具面板' : '工具' }}
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, type Component } from 'vue'
import { POPUP_ANIMATIONS, usePopup, usePopupInstanceId } from 'vue-popup-plus'
import { useRouter } from 'vue-router'

defineOptions({
	name: 'GTools',
})

type Props = {
	component: Component
}

const popup = usePopup()
const popupInstanceId = usePopupInstanceId()
const router = useRouter()

const { component } = defineProps<Props>()

const isExpand = ref(true)
const isDarkMode = ref(!!localStorage.getItem('dark'))
const inPopup = computed(() => !!popupInstanceId)

onMounted(() => {
	if (isDarkMode.value) {
		document.documentElement.classList.add('dark')
	}
})

function handleDarkMode() {
	isDarkMode.value = !isDarkMode.value

	if (isDarkMode.value) {
		document.documentElement.classList.add('dark')
		localStorage.setItem('dark', '1')
	} else {
		document.documentElement.classList.remove('dark')
		localStorage.removeItem('dark')
	}
}

function handlePopupDestorySelf() {
	popup.destroy(popupInstanceId!)
}

function handlePopupSelf() {
	popup.render({
		component,
		width: '80%',
		height: '80%',
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		maskDestroy: true,
	})
}

function handlePopupDialogSelf() {
	popup.dialog({
		component,
		width: '80%',
		height: '80%',
	})
}

function handlePopupDrawerSelf() {
	popup.drawer({
		component,
		size: '50%',
	})
}

function handleJumpIndex() {
	router.push('/')
}

function handleJumpCore() {
	router.push('/core')
}

function handleJumpAnchor() {
	router.push('/anchor')
}

function handleJumpDirective() {
	router.push('/directive')
}

function handleJumpPlugin() {
	router.push('/plugin')
}

function handleJumpButton() {
	router.push('/button')
}
</script>

<style lang="scss" scoped>
.g-tools {
	position: fixed;
	top: 20px;
	right: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 10px 10px;
	background-color: var(--playground-color-background-sub);
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	z-index: 100;
	&.is-collapse {
		padding: 0;
	}
}
</style>
