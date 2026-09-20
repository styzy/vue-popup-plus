<template lang="pug">
.g-tools(:class="{ 'is-collapse': !isExpand }")
	template(v-if="isExpand")
		GTitle(second) 快捷工具
		PButtonGroup(cross-align="center" direction="vertical" theme="primary" tight)
			PButton(@click="handleDarkMode()" type="fill") 切换到{{ isDarkMode ? '亮色' : '暗黑' }}模式
			PButton(
				@click="handlePopupDestorySelf()"
				theme="warning"
				type="fill"
				v-if="inPopup") 当前处于弹出层内，点击关闭
			PButton(@click="handlePopupSelf()") 用弹出层渲染当前页面
			PButton(@click="handlePopupDialogSelf()") 用对话渲染当前页面
			PButton(@click="handlePopupDrawerSelf()") 用抽屉渲染当前页面
		GTitle(second) 快速跳转
		PButtonGroup(
			cross-align="center"
			direction="vertical"
			style="margin-bottom: 30px"
			theme="primary"
			tight)
			PButton(@click="handleJumpIndex()" theme="success" type="fill") 首页
			PButton(@click="handleJumpCore()" type="fill") 核心 - 基础测试
			PButton(@click="handleJumpViewport()") 核心 - 视区测试
			PButton(@click="handleJumpAnchor()") 核心 - 锚点测试
			PButton(@click="handleJumpAnchorTrigger()") 核心 - 锚点触发器测试
			PButton(@click="handleJumpDirective()" theme="warning") 核心 - 指令测试
			PButton(@click="handleJumpPlugin()" theme="success" type="fill") 预置插件 - 基础测试
			PButton(@click="handleJumpButton()" theme="warning") 预置插件 - 按钮测试
	PButton(
		:theme="isExpand ? 'danger' : 'success'"
		@click="isExpand = !isExpand"
		type="fill") {{ isExpand ? '折叠工具面板' : '工具' }}
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, type Component } from 'vue'
import { POPUP_ANIMATIONS, usePopup, usePopupInstanceId } from 'vue-popup-plus'
import { useRouter } from 'vue-router'
import { useTools } from '@/composables'

defineOptions({
	name: 'GTools',
})

const { isExpand } = useTools()

type Props = {
	component: Component
}

const popup = usePopup()
const popupInstanceId = usePopupInstanceId()
const router = useRouter()

const { component } = defineProps<Props>()

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

function handleJumpViewport() {
	router.push('/viewport')
}

function handleJumpAnchor() {
	router.push('/anchor')
}

function handleJumpAnchorTrigger() {
	router.push('/anchor-trigger')
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
	box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	z-index: 100;
	&.is-collapse {
		padding: 0;
	}
}
</style>
