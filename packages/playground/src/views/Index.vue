<template lang="pug">
.index
	.fixed
		PButtonGroup(cross-align="end" direction="vertical")
			PButton(@click="handleDarkMode()" size="large" theme="primary") 切换到{{ isDarkMode ? '亮色' : '暗黑' }}模式
			PButton(
				@click="handleCloseSelf()"
				size="large"
				theme="warning"
				v-if="inPopup") 当前处于弹出层内，点击关闭
	.title @styzy/vue-popup-plus 版本：{{ version }}
	.links
		.label Github:
		PButton(
			@click="handleJump('https://github.com/styzy/vue-popup-plus', true)"
			theme="primary"
			type="text") https://github.com/styzy/vue-popup-plus
		.label 文档:
		PButton(
			@click="handleJump('http://vue-popup-plus.styzy.cn', true)"
			theme="primary"
			type="text") http://vue-popup-plus.styzy.cn
	.row
		.row-item
			.title 核心功能单元测试
			.title.second 修改当前环境
			PButtonGroup(theme="primary" tight)
				PButton(@click="handlePopupWithSelf()" size="large") 用弹出层渲染当前组件
			.title.second 基础功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopup()" type="default") 默认
				PButton(@click="handlePopupWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupWithMaskBlur()") 启用遮罩层高斯模糊
				PButton(@click="handlePopupWithMaskTransparent()") 启用遮罩层透明效果
				PButton(@click="handlePopupWithMaskDestroy()") 启用遮罩层点击销毁
				PButton(@click="handlePopupWithMaskDestroyHandler()") 遮罩层点击销毁处理器
			.title.second 组件功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupWithProps()") 传入参数
				PButton(@click="handlePopupWithPayload()") 携带销毁参数
				PButton(@click="handleOptionPopupWithProps()") 传入参数(选项式)
				PButton(@click="handleOptionPopupWithPayload()") 携带销毁参数(选项式)
			.title.second 样式功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupFullScreen()") 全屏
				PButton(@click="handlePopupMaxSize()") 最大尺寸
				PButton(@click="handlePopupMinSize()") 最小尺寸
				PButton(@click="handlePopupOffset()") 位移
				PButton(@click="handlePopupOffsetLarge()") 大位移(默认安全)
				PButton(@click="handlePopupOffsetLargeOverflow()") 大位移(超出屏幕)
			.title.second 定位功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupLeftTop()") 左上
				PButton(@click="handlePopupLeft()") 左侧
				PButton(@click="handlePopupLeftBottom()") 左下
				PButton(@click="handlePopupTop()") 顶部
				PButton(@click="handlePopupCenter()") 居中
				PButton(@click="handlePopupBottom()") 底部
				PButton(@click="handlePopupRightTop()") 右上
				PButton(@click="handlePopupRight()") 右侧
				PButton(@click="handlePopupRightBottom()") 右下
				PButton(@click="handlePopupLeftTopWithOffset()") 左上+位移(默认安全)
				PButton(@click="handlePopupLeftTopWithOffsetOverflow()") 左上+位移(超出屏幕)
				PButton(@click="handlePopupRightBottomWithOffset()") 右下+位移(默认安全)
				PButton(@click="handlePopupRightBottomWithOffsetOverflow()") 右下+位移(超出屏幕)
			.title.second 动画功能
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAnimationScale()") 缩放
				PButton(@click="handlePopupAnimationFade()") 淡入淡出
				PButton(@click="handlePopupAnimationFly()") 飞入
				PButton(@click="handlePopupAnimationDuration()") 动画持续10s
				PButton(@click="handlePopupAnimationDurationZero()" theme="danger") 动画持续0s
				PButton(@click="handlePopupAnimationCustom()" theme="success") 自定义动画
			.title.second 三方组件库适配
			ASelect
			ElSelect
			PButtonGroup(theme="primary" tight)
				PButton(@click="handlePopupElementUI()") Element UI
				PButton(@click="handlePopupAntd()") Ant Design Vue
	.row
		.row-item
			.title 插件功能单元测试
			PButtonGroup(theme="primary")
				PButton(@click="handleSkinChange()" size="large" theme="success")
					| 切换皮肤，当前为
					strong {{ skin }}
			.title.second 消息
			.title.third 基础
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupToast()" type="default") 默认
				PButton(@click="handlePopupToastThemePrimary()" theme="primary") 主要主题
				PButton(@click="handlePopupToastThemeSuccess()" theme="success") 成功主题
				PButton(@click="handlePopupToastThemeInfo()" theme="info") 信息主题
				PButton(@click="handlePopupToastThemeWarning()" theme="warning") 警告主题
				PButton(@click="handlePopupToastThemeDanger()" theme="danger") 危险主题
				PButton(@click="handlePopupToastLong()") 长消息
				PButton(@click="handlePopupToastTenSecond()") 10秒消息
				PButton(@click="handlePopupToastZeroSecond()") 0秒消息
				PButton(@click="handlePopupToastShowClose()") 显示关闭按钮
				PButton(@click="handlePopupToastHoverWait()") 禁用悬停等待
			.title.third 位置
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupToastPlacementLeftTop()") 左上
				PButton(@click="handlePopupToastPlacementLeft()") 左侧
				PButton(@click="handlePopupToastPlacementLeftBottom()") 左下
				PButton(@click="handlePopupToastPlacementTop()") 顶部
				PButton(@click="handlePopupToastPlacementCenter()") 居中
				PButton(@click="handlePopupToastPlacementBottom()") 底部
				PButton(@click="handlePopupToastPlacementRightTop()") 右上
				PButton(@click="handlePopupToastPlacementRight()") 右侧
				PButton(@click="handlePopupToastPlacementRightBottom()") 右下
			.title.third 主题方法
			PButtonGroup(theme="primary" tight)
				PButton(@click="handlePopupToastPrimary()" theme="primary") 主要主题
				PButton(@click="handlePopupToastSuccess()" theme="success") 成功主题
				PButton(@click="handlePopupToastInfo()" theme="info") 信息主题
				PButton(@click="handlePopupToastWarning()" theme="warning") 警告主题
				PButton(@click="handlePopupToastDanger()" theme="danger") 危险主题
			.title.second 提示
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAlert()" type="default") 默认
				PButton(@click="handlePopupAlertCustomTitle()") 自定义标题
				PButton(@click="handlePopupAlertHeaderClose()") 禁用标题栏关闭
				PButton(@click="handlePopupAlertCustomConfirmButtonText()") 自定义确认按钮
				PButton(@click="handlePopupAlertDraggable()") 可拖拽
				PButton(@click="handlePopupAlertDraggableOverflow()") 可拖拽溢出屏幕
				PButton(@click="handlePopupAlertWithMaskBlur()") 启用遮罩模糊
			.title.second 确认
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupConfirm()" type="default") 默认
				PButton(@click="handlePopupConfirmCustomTitle()") 自定义标题
				PButton(@click="handlePopupConfirmHeaderClose()") 启用标题栏关闭
				PButton(
					@click="handlePopupConfirmCustomConfirmButtonText()"
					theme="primary"
					type="plain") 自定义确认按钮文本
				PButton(
					@click="handlePopupConfirmCustomCancelButtonText()"
					theme="primary"
					type="plain") 自定义取消按钮文本
				PButton(@click="handlePopupConfirmDraggable()") 可拖拽
				PButton(@click="handlePopupConfirmDraggableOverflow()") 可拖拽溢出屏幕
				PButton(@click="handlePopupConfirmWithMaskBlur()") 启用遮罩模糊
			.title.second 提示输入
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupPrompt()" type="default") 默认
				PButton(@click="handlePopupPromptDefaultValue()") 默认值
				PButton(@click="handlePopupPromptCustomType()") 自定义类型
				PButton(@click="handlePopupPromptCustomTitle()") 自定义标题
				PButton(@click="handlePopupPromptHeaderClose()") 禁用标题栏关闭
				PButton(@click="handlePopupPromptCustomMaxLength()") 自定义最大长度
				PButton(@click="handlePopupPromptCustomPlaceholder()") 自定义占位符
				PButton(@click="handlePopupPromptCustomConfirmButtonText()") 自定义确认按钮文本
				PButton(@click="handlePopupPromptCustomCancelButtonText()") 自定义取消按钮文本
				PButton(@click="handlePopupPromptDraggable()") 可拖拽
				PButton(@click="handlePopupPromptDraggableOverflow()") 可拖拽溢出屏幕
				PButton(@click="handlePopupPromptWithMaskBlur()") 启用遮罩模糊
			.title.second 加载遮罩
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupLoading()" theme="primary" type="default") 默认
				PButton(@click="handlePopupLoadingPrimary()" theme="primary") 主要主题
				PButton(@click="handlePopupLoadingSuccess()" theme="success") 成功主题
				PButton(@click="handlePopupLoadingInfo()" theme="info") 信息主题
				PButton(@click="handlePopupLoadingWarning()" theme="warning") 警告主题
				PButton(@click="handlePopupLoadingDanger()" theme="danger") 危险主题
				PButton(@click="handlePopupLoadingCustomTitle()") 自定义标题
				PButton(@click="handlePopupLoadingCustomTitleLong()") 自定义长标题
				PButton(@click="handlePopupLoadingCustomIconSize()") 自定义图标尺寸
				PButton(@click="handlePopupLoadingForever()") 持续显示
				PButton(@click="handlePopupLoadingWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupLoadingWithMaskBlur()") 启用遮罩模糊
				PButton(@click="handlePopupLoadingWithMaskTransparent()") 启用遮罩透明
			.title.second Dialog 对话框
			.title.third 基础
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDialog()" type="default") 默认
				PButton(@click="handlePopupDialogCustomComponentProps()") 自定义组件参数
				PButton(@click="handlePopupDialogCustomMaxSize()") 最大尺寸
				PButton(@click="handlePopupDialogCustomMinSize()") 最小尺寸
				PButton(@click="handlePopupDialogCustomTitle()") 自定义标题
				PButton(@click="handlePopupDialogHideHeader()") 隐藏标题栏
				PButton(@click="handlePopupDialogHeaderClose()") 禁用标题栏关闭
				PButton(@click="handlePopupDialogDraggable()") 可拖拽
				PButton(@click="handlePopupDialogDraggableOverflow()") 可拖拽溢出屏幕
				PButton(@click="handlePopupDialogWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupDialogWithMaskBlur()") 启用遮罩模糊
				PButton(@click="handlePopupDialogWithMaskTransparent()") 启用遮罩透明
				PButton(@click="handlePopupDialogWithMaskClose()") 启用遮罩层点击关闭
				PButton(@click="handlePopupDialogWithMaskCloseHandler()") 遮罩层点击关闭处理器
			.title.third 位置
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDialogPlacementLeftTop()") 左上
				PButton(@click="handlePopupDialogPlacementLeft()") 左侧
				PButton(@click="handlePopupDialogPlacementLeftBottom()") 左下
				PButton(@click="handlePopupDialogPlacementTop()") 顶部
				PButton(@click="handlePopupDialogPlacementCenter()") 居中
				PButton(@click="handlePopupDialogPlacementBottom()") 底部
				PButton(@click="handlePopupDialogPlacementRightTop()") 右上
				PButton(@click="handlePopupDialogPlacementRight()") 右侧
				PButton(@click="handlePopupDialogPlacementRightBottom()") 右下
			.title.third 嵌套
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDialogSelf()" type="default") 弹出当前页
			.title.second Drawer 抽屉
			.title.third 基础
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDrawer()" type="default") 默认
				PButton(@click="handlePopupDrawerCustomComponentProps()") 自定义组件参数
				PButton(@click="handlePopupDrawerTopSizeHalf()") 顶部50%尺寸
				PButton(@click="handlePopupDrawerTopCustomMaxSize()") 顶部最大尺寸
				PButton(@click="handlePopupDrawerTopCustomMinSize()") 顶部最小尺寸
				PButton(@click="handlePopupDrawerLeftSizeHalf()") 左侧50%尺寸
				PButton(@click="handlePopupDrawerLeftCustomMaxSize()") 左侧最大尺寸
				PButton(@click="handlePopupDrawerLeftCustomMinSize()") 左侧最小尺寸
				PButton(@click="handlePopupDrawerCustomTitle()") 自定义标题
				PButton(@click="handlePopupDrawerHideHeader()") 隐藏标题栏
				PButton(@click="handlePopupDrawerHeaderClose()") 禁用标题栏关闭
				PButton(@click="handlePopupDrawerWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupDrawerWithMaskBlur()") 启用遮罩模糊
				PButton(@click="handlePopupDrawerWithMaskTransparent()") 启用遮罩透明
				PButton(@click="handlePopupDrawerWithoutMaskClose()") 禁用遮罩层点击关闭
				PButton(@click="handlePopupDrawerWithMaskCloseHandler()") 遮罩层点击关闭处理器
			.title.third 位置
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDrawerPlacementTop()") 顶部
				PButton(@click="handlePopupDrawerPlacementBottom()") 底部
				PButton(@click="handlePopupDrawerPlacementLeft()") 左侧
				PButton(@click="handlePopupDrawerPlacementRight()") 右侧
			.title.third 嵌套
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupDrawerSelf()" type="default") 弹出当前页
			.title.second 媒体相册
			PButtonGroup(theme="primary" tight type="plain")
				PButton(@click="handlePopupAlbum()" type="default") 默认
				PButton(@click="handlePopupAlbumDefaultIndex()") 默认下标
				PButton(@click="handlePopupAlbumDisableCount()") 禁用计数器
				PButton(@click="handlePopupAlbumDisableName()") 禁用文件名
				PButton(@click="handlePopupAlbumDisablePureMode()") 禁用纯净模式
				PButton(@click="handlePopupAlbumDisableDownload()") 禁用下载
				PButton(@click="handlePopupAlbumDisableScale()") 禁用缩放
				PButton(@click="handlePopupAlbumDisableDrag()") 禁用拖动
				//- PButton(@click="handlePopupAlbumWithoutMask()") 禁用遮罩层
				PButton(@click="handlePopupAlbumWithMaskBlur()") 启用遮罩模糊
	.row
		.row-item
			.title 按钮单元测试
			.title.second 默认
			PButtonGroup
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 默认 禁用
			PButtonGroup(align="end" direction="vertical")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
			.title.second 镂空
			PButtonGroup(type="plain")
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 镂空 禁用
			PButtonGroup(type="plain")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
			.title.second 文本
			PButtonGroup(type="text")
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 文本 禁用
			PButtonGroup(type="text")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
			.title.second 链接
			PButtonGroup(cutline type="link")
				PButton Button
				PButton(theme="primary") Button
				PButton(theme="info") Button
				PButton(theme="success") Button
				PButton(theme="warning") Button
				PButton(theme="danger") Button
			.title.second 链接 禁用
			PButtonGroup(cutline type="link")
				PButton(disabled) Button
				PButton(disabled theme="primary") Button
				PButton(disabled theme="info") Button
				PButton(disabled theme="success") Button
				PButton(disabled theme="warning") Button
				PButton(disabled theme="danger") Button
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import {
	POPUP_ANIMATIONS,
	usePopup,
	usePopupInstanceId,
	version,
} from 'vue-popup-plus'
import { type Skin } from 'vue-popup-plus-plugin-preset'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'
import Demo from '@/views/Demo.vue'

defineOptions({ name: 'Index' })

const popup = usePopup()
// const popup = {} as any
const popupInstanceId = usePopupInstanceId()

const inPopup = computed(() => !!popupInstanceId)

const isDarkMode = ref(!!localStorage.getItem('dark'))
const skin = (localStorage.getItem('skin') || 'modern') as Skin

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
function handleSkinChange() {
	localStorage.setItem('skin', skin === 'modern' ? 'classic' : 'modern')
	window.location.reload()
}

function handleCloseSelf() {
	popup.destroy(popupInstanceId!)
}

function handleJump(url: string, blank = false) {
	window.open(url, blank ? '_blank' : '_self')
}

function handlePopup() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupWithProps() {
	popup.render({
		// component: Demo,
		component: defineAsyncComponent(() => import('@/views/Demo.vue')),
		// component: () => import('@/views/Demo.vue'),
		componentProps: {
			test: 'test',
			onInputChange(value) {
				popup.toast(`触发事件：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
}

function handlePopupWithPayload() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		onUnmounted(payload) {
			popup.toast(`关闭弹框时携带的参数：${payload}`, {
				theme: 'success',
			})
		},
	})
}

function handleOptionPopupWithProps() {
	popup.render({
		component: () => import('@/views/DemoOption.vue'),
		componentProps: {
			test: 'test',
			onInputChange(value) {
				popup.toast(`触发事件：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
}

function handleOptionPopupWithPayload() {
	popup.render({
		component: () => import('@/views/DemoOption.vue'),
		onUnmounted(payload) {
			popup.toast(`关闭弹框时携带的参数：${payload}`, {
				theme: 'success',
			})
		},
	})
}

function handlePopupWithoutMask() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		mask: false,
	})
}

function handlePopupWithMaskBlur() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		maskBlur: true,
	})
}

function handlePopupWithMaskTransparent() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		maskTransparent: true,
	})
}

function handlePopupWithMaskDestroy() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		maskDestroy: true,
	})
}

function handlePopupWithMaskDestroyHandler() {
	popup.render({
		component: () => import('@/views/Demo.vue'),
		onUnmounted(payload) {
			console.log('payload: ', payload)
		},
		maskDestroy: async (destroy) => {
			await destroy('自定义销毁参数')
			console.log('已等待 destroy() 方法异步执行结束')
		},
	})
}

function handlePopupWithSelf() {
	popup.render({
		component: () => import('@/views/Index.vue'),
		mask: false,
		maxHeight: '100%',
		viewAnimation: POPUP_ANIMATIONS.FLY_LEFT,
		animationDuration: 200,
	})
}

function handlePopupFullScreen() {
	popup.render({
		width: '100%',
		height: '100%',
		component: () => import('@/views/DemoFullScreen.vue'),
	})
}

function handlePopupMaxSize() {
	popup.render({
		maxWidth: '200px',
		maxHeight: 200,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupMinSize() {
	popup.render({
		minWidth: 800,
		minHeight: '800px',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupOffset() {
	popup.render({
		viewTranslateX: 100,
		viewTranslateY: -100,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupOffsetLarge() {
	popup.render({
		viewTranslateX: 380,
		viewTranslateY: -380,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupOffsetLargeOverflow() {
	popup.render({
		viewTranslateX: 380,
		viewTranslateY: -380,
		viewTranslateOverflow: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftTop() {
	popup.render({
		placement: 'left-top',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeft() {
	popup.render({
		placement: 'left',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftBottom() {
	popup.render({
		placement: 'left-bottom',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupTop() {
	popup.render({
		placement: 'top',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupCenter() {
	popup.render({
		placement: 'center',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupBottom() {
	popup.render({
		placement: 'bottom',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRightTop() {
	popup.render({
		placement: 'right-top',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRight() {
	popup.render({
		placement: 'right',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRightBottom() {
	popup.render({
		placement: 'right-bottom',
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftTopWithOffset() {
	popup.render({
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupLeftTopWithOffsetOverflow() {
	popup.render({
		placement: 'left-top',
		viewTranslateX: -100,
		viewTranslateY: -50,
		viewTranslateOverflow: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupRightBottomWithOffset() {
	popup.render({
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		component: () => import('@/views/Demo.vue'),
	})
}
function handlePopupRightBottomWithOffsetOverflow() {
	popup.render({
		placement: 'right-bottom',
		viewTranslateX: 100,
		viewTranslateY: 50,
		viewTranslateOverflow: true,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationScale() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		viewAnimation: POPUP_ANIMATIONS.SCALE_REDUCE,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationFade() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FADE,
		viewAnimation: POPUP_ANIMATIONS.FADE,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationFly() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.FLY_TOP,
		viewAnimation: POPUP_ANIMATIONS.FLY_BOTTOM,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationDuration() {
	popup.render({
		animationDuration: 10000,
		placement: 'left',
		viewAnimation: POPUP_ANIMATIONS.SCALE_ENLARGE,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationDurationZero() {
	popup.render({
		animationDuration: 0,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupAnimationCustom() {
	popup.render({
		maskAnimation: POPUP_ANIMATIONS.CUSTOM,
		viewAnimation: POPUP_ANIMATIONS.CUSTOM,
		component: () => import('@/views/Demo.vue'),
	})
}

function handlePopupElementUI() {
	popup.render({
		component: () => import('@/views/DemoElementUI.vue'),
	})
}

function handlePopupAntd() {
	popup.render({
		component: () => import('@/views/DemoAntd.vue'),
	})
}

function handlePopupToast() {
	popup.toast('这是一条toast消息')
}

function handlePopupToastThemePrimary() {
	popup.toast('这是一条主要toast消息', { theme: 'primary' })
}

function handlePopupToastThemeInfo() {
	popup.toast('这是一条信息toast消息', { theme: 'info' })
}

function handlePopupToastThemeSuccess() {
	popup.toast('这是一条成功toast消息', { theme: 'success' })
}

function handlePopupToastThemeWarning() {
	popup.toast('这是一条警告toast消息', { theme: 'warning' })
}

function handlePopupToastThemeDanger() {
	popup.toast('这是一条危险toast消息', { theme: 'danger' })
}

function handlePopupToastLong() {
	popup.toast(
		'这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。这是一条toast消息，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果，包含了更多的内容，用于测试toast的长消息显示效果。'
	)
}

function handlePopupToastTenSecond() {
	popup.toast('这是一条10秒的toast消息', { duration: 10000 })
}

function handlePopupToastZeroSecond() {
	popup.toast('这是一条0秒的toast消息', { duration: 0 })
}

function handlePopupToastShowClose() {
	popup.toast('这是一条显示关闭按钮的toast消息', { showClose: true })
}

function handlePopupToastHoverWait() {
	popup.toast('这是一条禁用悬停等待的toast消息', { hoverWait: false })
}

function handlePopupToastPlacementLeftTop() {
	popup.toast('这是一条左上toast消息', { placement: 'left-top' })
}

function handlePopupToastPlacementLeft() {
	popup.toast('这是一条左侧toast消息', { placement: 'left' })
}

function handlePopupToastPlacementLeftBottom() {
	popup.toast('这是一条左下toast消息', { placement: 'left-bottom' })
}

function handlePopupToastPlacementTop() {
	popup.toast('这是一条顶部toast消息', { placement: 'top' })
}

function handlePopupToastPlacementCenter() {
	popup.toast('这是一条居中toast消息', { placement: 'center' })
}

function handlePopupToastPlacementBottom() {
	popup.toast('这是一条底部toast消息', { placement: 'bottom' })
}

function handlePopupToastPlacementRightTop() {
	popup.toast('这是一条右上toast消息', { placement: 'right-top' })
}

function handlePopupToastPlacementRight() {
	popup.toast('这是一条右侧toast消息', { placement: 'right' })
}

function handlePopupToastPlacementRightBottom() {
	popup.toast('这是一条右下toast消息', { placement: 'right-bottom' })
}

function handlePopupToastPrimary() {
	popup.toastPrimary('这是一条主要toast消息')
}

function handlePopupToastSuccess() {
	popup.toastSuccess('这是一条成功toast消息')
}

function handlePopupToastInfo() {
	popup.toastInfo('这是一条信息toast消息')
}

function handlePopupToastWarning() {
	popup.toastWarning('这是一条警告toast消息')
}

function handlePopupToastDanger() {
	popup.toastDanger('这是一条危险toast消息')
}

function handlePopupAlert() {
	popup.alert('这是一条确认框消息')
}

function handlePopupAlertCustomTitle() {
	popup.alert('这是一条确认框消息', { title: '自定义标题' })
}

function handlePopupAlertHeaderClose() {
	popup.alert('这是一条确认框消息', { headerClose: false })
}

function handlePopupAlertCustomConfirmButtonText() {
	popup.alert('这是一条确认框消息', {
		confirmText: '自定义确认按钮文本',
	})
}

function handlePopupAlertDraggable() {
	popup.alert('这是一条确认框消息', { draggable: true })
}

function handlePopupAlertDraggableOverflow() {
	popup.alert('这是一条确认框消息', { draggable: true, dragOverflow: true })
}

function handlePopupAlertWithMaskBlur() {
	popup.alert('这是一条确认框消息', { maskBlur: true })
}

async function handlePopupConfirm() {
	const isConfirm = await popup.confirm('这是一条确认框消息')
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomTitle() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		title: '自定义标题',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmHeaderClose() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		headerClose: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomConfirmButtonText() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		confirmText: '自定义确认按钮文本',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmCustomCancelButtonText() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		cancelText: '自定义取消按钮文本',
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmDraggable() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		draggable: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmDraggableOverflow() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		draggable: true,
		dragOverflow: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupConfirmWithMaskBlur() {
	const isConfirm = await popup.confirm('这是一条确认框消息', {
		maskBlur: true,
	})
	if (isConfirm) {
		popup.toast('选择了确认')
	} else {
		popup.toast('选择了取消')
	}
}

async function handlePopupPrompt() {
	const result = await popup.prompt('这是一条提示输入框消息')
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDefaultValue() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		defaultValue: '123',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomType() {
	const result = await popup.prompt('这是一条提示输入框消息，类型为文本域', {
		type: 'textarea',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomTitle() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		title: '自定义标题',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptHeaderClose() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		headerClose: false,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomPlaceholder() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		placeholder: '自定义占位符',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomMaxLength() {
	const result = await popup.prompt(
		'这是一条提示输入框消息，最大长度为10个字符',
		{
			maxLength: 10,
		}
	)
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomConfirmButtonText() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		confirmText: '自定义确认按钮文本',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomCancelButtonText() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		cancelText: '自定义取消按钮文本',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDraggable() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		draggable: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDraggableOverflow() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		draggable: true,
		dragOverflow: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptWithMaskBlur() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		maskBlur: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

function handlePopupLoading() {
	popup.loading()
	window.setTimeout(() => popup.loadingClose(), 3000)
}

function handlePopupLoadingPrimary() {
	popup.loading({ theme: 'primary' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingInfo() {
	popup.loading({ theme: 'info' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingSuccess() {
	popup.loading({ theme: 'success' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingWarning() {
	popup.loading({ theme: 'warning' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingDanger() {
	popup.loading({ theme: 'danger' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingCustomTitle() {
	popup.loading({ title: '自定义标题' })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingCustomTitleLong() {
	popup.loading({
		title: '自定义长标题，自定义长标题，自定义长标题，自定义长标题，自定义长标题，自定义长标题.',
	})
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingCustomIconSize() {
	popup.loading({ iconSize: 100 })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingForever() {
	popup.loading({ title: '持续显示' })
}

function handlePopupLoadingWithoutMask() {
	popup.loading({ mask: false })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingWithMaskBlur() {
	popup.loading({ maskBlur: true })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

function handlePopupLoadingWithMaskTransparent() {
	popup.loading({ maskTransparent: true })
	window.setTimeout(() => popup.loadingClose(), 2000)
}

async function handlePopupDialog() {
	const result: string | void = await popup.dialog({
		title: '对话框标题',
		component: () => import('./Demo.vue'),
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomComponentProps() {
	const result = await popup.dialog({
		title: '自定义组件参数',
		component: () => import('./Demo.vue'),
		componentProps: {
			test: '123',
			onInputChange: (value) => {
				popup.toast(`输入框内容改变为：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomMaxSize() {
	const result = await popup.dialog({
		title: '最大尺寸为： 200 * 200',
		component: () => import('./Demo.vue'),
		maxWidth: 200,
		maxHeight: '200px',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomMinSize() {
	const result = await popup.dialog({
		title: '最小尺寸为： 800 * 800',
		component: () => import('./Demo.vue'),
		minWidth: 800,
		minHeight: '800px',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogCustomTitle() {
	const result = await popup.dialog({
		title: '自定义标题',
		component: () => import('./Demo.vue'),
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogHideHeader() {
	const result = await popup.dialog({
		title: '隐藏标题栏',
		component: () => import('./Demo.vue'),
		header: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogHeaderClose() {
	const result = await popup.dialog({
		title: '禁用标题栏关闭',
		component: () => import('./Demo.vue'),
		headerClose: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithoutMask() {
	const result = await popup.dialog({
		title: '禁用遮罩层',
		component: () => import('./Demo.vue'),
		mask: false,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogDraggable() {
	const result = await popup.dialog({
		title: '可拖拽',
		component: () => import('./Demo.vue'),
		draggable: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogDraggableOverflow() {
	const result = await popup.dialog({
		title: '可拖拽溢出屏幕',
		component: () => import('./Demo.vue'),
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskBlur() {
	const result = await popup.dialog({
		title: '启用遮罩模糊',
		component: () => import('./Demo.vue'),
		maskBlur: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskTransparent() {
	const result = await popup.dialog({
		title: '启用遮罩透明',
		component: () => import('./Demo.vue'),
		maskTransparent: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskClose() {
	const result = await popup.dialog({
		title: '启用遮罩层点击关闭',
		component: () => import('./Demo.vue'),
		maskClose: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogWithMaskCloseHandler() {
	const result = await popup.dialog({
		title: '遮罩层点击关闭处理器',
		component: () => import('./Demo.vue'),
		maskClose: async (destroy) => {
			await destroy('自定义销毁参数')
			console.log('已等待 destroy() 方法异步执行结束')
		},
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeftTop() {
	const result = await popup.dialog({
		title: '左上',
		component: () => import('./Demo.vue'),
		placement: 'left-top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeft() {
	const result = await popup.dialog({
		title: '左侧',
		component: () => import('./Demo.vue'),
		placement: 'left',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementLeftBottom() {
	const result = await popup.dialog({
		title: '左下',
		component: () => import('./Demo.vue'),
		placement: 'left-bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementTop() {
	const result = await popup.dialog({
		title: '顶部',
		component: () => import('./Demo.vue'),
		placement: 'top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementCenter() {
	const result = await popup.dialog({
		title: '居中',
		component: () => import('./Demo.vue'),
		placement: 'center',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementBottom() {
	const result = await popup.dialog({
		title: '底部',
		component: () => import('./Demo.vue'),
		placement: 'bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRightTop() {
	const result = await popup.dialog({
		title: '右上',
		component: () => import('./Demo.vue'),
		placement: 'right-top',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRight() {
	const result = await popup.dialog({
		title: '右侧',
		component: () => import('./Demo.vue'),
		placement: 'right',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogPlacementRightBottom() {
	const result = await popup.dialog({
		title: '右下',
		component: () => import('./Demo.vue'),
		placement: 'right-bottom',
		draggable: true,
		dragOverflow: true,
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDialogSelf() {
	const result = await popup.dialog({
		title: '嵌套',
		component: () => import('./Index.vue'),
		width: '80%',
		height: '80%',
	})
	popup.toast(`对话框关闭时传递的参数是：${result}`)
}

async function handlePopupDrawer() {
	const result = await popup.drawer({
		component: () => import('./DemoDrawer.vue'),
	})
	popup.toast(`抽屉关闭时传递的参数是：${result}`)
}

async function handlePopupDrawerCustomComponentProps() {
	const result = await popup.drawer({
		title: '自定义组件参数',
		component: () => import('./DemoDrawer.vue'),
		componentProps: {
			test: '123',
			onInputChange: (value) => {
				popup.toast(`输入框内容改变为：${value}`, {
					theme: 'primary',
				})
			},
		},
	})
	popup.toast(`抽屉关闭时传递的参数是：${result}`)
}

function handlePopupDrawerTopSizeHalf() {
	popup.drawer({
		title: '顶部50%尺寸',
		component: () => import('./DemoDrawer.vue'),
		placement: 'top',
		size: '50%',
	})
}

function handlePopupDrawerTopCustomMaxSize() {
	popup.drawer({
		title: '最大200',
		component: () => import('./DemoDrawer.vue'),
		placement: 'top',
		maxSize: '200px',
	})
}

function handlePopupDrawerTopCustomMinSize() {
	popup.drawer({
		title: '最小800',
		component: () => import('./DemoDrawer.vue'),
		placement: 'top',
		minSize: '800px',
	})
}

function handlePopupDrawerLeftSizeHalf() {
	popup.drawer({
		title: '左侧50%尺寸',
		component: () => import('./DemoDrawer.vue'),
		placement: 'left',
		size: '50%',
	})
}

function handlePopupDrawerLeftCustomMaxSize() {
	popup.drawer({
		title: '最大200',
		component: () => import('./DemoDrawer.vue'),
		placement: 'left',
		maxSize: '200px',
	})
}

function handlePopupDrawerLeftCustomMinSize() {
	popup.drawer({
		title: '最小800',
		component: () => import('./DemoDrawer.vue'),
		placement: 'left',
		minSize: '800px',
	})
}

function handlePopupDrawerCustomTitle() {
	popup.drawer({
		title: '自定义标题',
		component: () => import('./DemoDrawer.vue'),
	})
}

function handlePopupDrawerHideHeader() {
	popup.drawer({
		title: '隐藏标题',
		component: () => import('./DemoDrawer.vue'),
		header: false,
	})
}

function handlePopupDrawerHeaderClose() {
	popup.drawer({
		title: '禁用标题栏关闭',
		component: () => import('./DemoDrawer.vue'),
		headerClose: false,
	})
}

function handlePopupDrawerWithoutMask() {
	popup.drawer({
		title: '无遮罩层',
		component: () => import('./DemoDrawer.vue'),
		mask: false,
	})
}

function handlePopupDrawerWithMaskBlur() {
	popup.drawer({
		title: '遮罩层模糊',
		component: () => import('./DemoDrawer.vue'),
		maskBlur: true,
	})
}

function handlePopupDrawerWithMaskTransparent() {
	popup.drawer({
		title: '遮罩层透明',
		component: () => import('./DemoDrawer.vue'),
		maskTransparent: true,
	})
}

function handlePopupDrawerWithoutMaskClose() {
	popup.drawer({
		title: '禁用遮罩层点击关闭',
		component: () => import('./DemoDrawer.vue'),
		maskClose: false,
	})
}

function handlePopupDrawerWithMaskCloseHandler() {
	popup.drawer({
		title: '遮罩层点击关闭处理器',
		component: () => import('./DemoDrawer.vue'),
		maskClose: async (destroy) => {
			await destroy('自定义销毁参数')
			console.log('已等待 destroy() 方法异步执行结束')
		},
	})
}

function handlePopupDrawerPlacementTop() {
	popup.drawer({
		title: '顶部',
		component: () => import('./DemoDrawer.vue'),
		placement: 'top',
	})
}

function handlePopupDrawerPlacementBottom() {
	popup.drawer({
		title: '底部',
		component: () => import('./DemoDrawer.vue'),
		placement: 'bottom',
	})
}

function handlePopupDrawerPlacementLeft() {
	popup.drawer({
		title: '左侧',
		component: () => import('./DemoDrawer.vue'),
		placement: 'left',
	})
}

function handlePopupDrawerPlacementRight() {
	popup.drawer({
		title: '右侧',
		component: () => import('./DemoDrawer.vue'),
		placement: 'right',
	})
}

function handlePopupDrawerSelf() {
	popup.drawer({
		title: '嵌套',
		size: '80%',
		component: () => import('./Index.vue'),
	})
}

const sources = [
	'http://static.styzy.cn/stranger/articleImage/17/15521393430565497.png',
	'http://static.styzy.cn/stranger/articleImage/14/15160252620376011.jpg',
	'https://images.yansikeji.cn/20220804013034736_WeChat_20220804105915.mp4',
]

function handlePopupAlbum() {
	popup.album({
		sources,
	})
}

function handlePopupAlbumDefaultIndex() {
	popup.album({
		sources,
		defaultIndex: 2,
	})
}

function handlePopupAlbumDisableCount() {
	popup.album({
		sources,
		disableCounter: true,
	})
}

function handlePopupAlbumDisableName() {
	popup.album({
		sources,
		disableName: true,
	})
}

function handlePopupAlbumDisablePureMode() {
	popup.album({
		sources,
		disablePure: true,
	})
}

function handlePopupAlbumDisableDownload() {
	popup.album({
		sources,
		disableDownload: true,
	})
}

function handlePopupAlbumDisableScale() {
	popup.album({
		sources,
		disableScale: true,
	})
}

function handlePopupAlbumDisableDrag() {
	popup.album({
		sources,
		disableDrag: true,
	})
}

// function handlePopupAlbumWithoutMask() {
// 	popup.album({
// 		sources,
// 		mask: false,
// 	})
// }

function handlePopupAlbumWithMaskBlur() {
	popup.album({
		sources,
		maskBlur: true,
	})
}
</script>

<style lang="stylus" scoped>
.index
	display flex
	flex-direction column
	align-items flex-start
	gap 20px
	padding 20px
	max-height 100%
	box-sizing border-box
	background-color var(--playground-color-background-main)
	overflow-y auto
	.fixed
		position fixed
		top 20px
		right 20px
		z-index 1
	.row
		display flex
		flex-direction row
		justify-content space-between
		gap 20px
		width 100%
		.row-item
			flex 1
			display flex
			flex-direction column
			gap 10px
	.title
		color var(--playground-color-text-main)
		font-weight 700
		font-size 28px
		&.large
			padding 20px 0
			font-size 36px
		&.second
			padding 10px 0
			font-size 20px
		&.third
			font-size 16px
	.links
		display flex
		flex-direction row
		align-items center
		gap 5px
		.label
			font-weight 700
			font-size 16px
	.info
		font-weight 700
		font-size 16px
</style>
