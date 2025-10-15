<template lang="pug">
.examples-container
	h1 示例演示

	section.example-section
		h2 基础弹窗
		p 点击按钮打开一个简单的弹窗。
		.example-demo
			button.demo-button(@click="showBasicPopup") 打开基础弹窗

	section.example-section
		h2 自定义位置
		p 可以设置弹窗出现的位置。
		.example-demo
			button.demo-button.mr-2(@click="showPositionPopup('top')") 顶部弹窗
			button.demo-button.mr-2(@click="showPositionPopup('bottom')") 底部弹窗
			button.demo-button.mr-2(@click="showPositionPopup('left')") 左侧弹窗
			button.demo-button(@click="showPositionPopup('right')") 右侧弹窗

	section.example-section
		h2 自定义动画
		p 使用不同的动画效果。
		.example-demo
			button.demo-button.mr-2(@click="showAnimationPopup('FADE')") 淡入淡出
			button.demo-button.mr-2(@click="showAnimationPopup('SCALE_ENLARGE')") 放大
			button.demo-button.mr-2(@click="showAnimationPopup('SCALE_SHRINK')") 缩小
			button.demo-button.mr-2(@click="showAnimationPopup('FLY_BOTTOM')") 底部飞入
</template>

<script setup lang="ts">
import {
	usePopup,
	POPUP_ANIMATIONS,
	POPUP_COMPONENT_INJECT_KEYS,
} from 'vue-popup-plus'
import { h, inject, defineComponent } from 'vue'

defineOptions({ name: 'Examples' })

const popup = usePopup()

// 简单的弹窗内容组件
const PopupContent = defineComponent({
	props: {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const instanceId = inject(POPUP_COMPONENT_INJECT_KEYS.INSTANCE_ID)
		const popupInstance = usePopup()

		const handleClose = () => {
			if (instanceId) {
				popupInstance.destroy(instanceId)
			}
		}

		return () =>
			h(
				'div',
				{
					style: {
						padding: '20px',
						background: 'white',
						borderRadius: '8px',
						boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
						maxWidth: '300px',
					},
				},
				[
					h('h3', { style: { marginTop: 0 } }, props.title),
					h('p', {}, props.content),
					h(
						'div',
						{ style: { textAlign: 'right', marginTop: '20px' } },
						[
							h(
								'button',
								{
									onClick: handleClose,
									style: {
										padding: '8px 16px',
										background: '#42b883',
										color: 'white',
										border: 'none',
										borderRadius: '4px',
										cursor: 'pointer',
									},
								},
								'关闭'
							),
						]
					),
				]
			)
	},
})

// 基础弹窗
function showBasicPopup() {
	popup.render({
		component: PopupContent,
		componentProps: {
			title: '基础弹窗',
			content: '这是一个基础的弹窗示例。',
		},
	})
}

// 位置弹窗
function showPositionPopup(position: 'top' | 'bottom' | 'left' | 'right') {
	popup.render({
		component: PopupContent,
		componentProps: {
			title: `${position}弹窗`,
			content: `这个弹窗显示在${position}位置。`,
			position,
		},
	})
}

// 动画弹窗
function showAnimationPopup(animationType: keyof typeof POPUP_ANIMATIONS) {
	popup.render({
		component: PopupContent,
		componentProps: {
			title: '动画弹窗',
			content: `这个弹窗使用${animationType}动画效果。`,
		},
		viewAnimation: POPUP_ANIMATIONS[animationType],
	})
}
</script>

<style scoped>
.examples-container {
	max-width: 900px;
	margin: 0 auto;
}

.example-section {
	margin-bottom: 3rem;
	border-bottom: 1px solid var(--border-color);
	padding-bottom: 2rem;
}

h1 {
	font-size: 2.5rem;
	margin-bottom: 2rem;
	color: var(--primary-color);
}

h2 {
	font-size: 1.8rem;
	margin: 1.5rem 0 1rem;
}

.example-demo {
	margin: 1.5rem 0;
	padding: 1.5rem;
	background-color: var(--code-bg-color);
	border-radius: 8px;
}

.demo-button {
	padding: 0.5rem 1rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 500;
	transition: background-color 0.3s;
}

.demo-button:hover {
	background-color: #3aa776;
}

.mr-2 {
	margin-right: 0.5rem;
}
</style>

