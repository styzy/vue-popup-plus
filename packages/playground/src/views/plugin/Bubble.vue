<template lang="pug">
GContainer
	GTitle Bubble 气泡
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupBubble()" ref="defaultRef" type="fill") 默认
	GTitle(second) 位置
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupLeftTop()" ref="leftTop") 左上
		PButton(@click="handlePopupLeft()" ref="left") 左侧
		PButton(@click="handlePopupLeftBottom()" ref="leftBottom") 左下
		PButton(@click="handlePopupTopLeft()" ref="topLeft") 顶部左侧
		PButton(@click="handlePopupTop()" ref="top") 顶部
		PButton(@click="handlePopupTopRight()" ref="topRight") 顶部右侧
		PButton(@click="handlePopupBottomLeft()" ref="bottomLeft") 底部左侧
		PButton(@click="handlePopupBottom()" ref="bottom") 底部
		PButton(@click="handlePopupBottomRight()" ref="bottomRight") 底部右侧
		PButton(@click="handlePopupRightTop()" ref="rightTop") 右上
		PButton(@click="handlePopupRight()" ref="right") 右侧
		PButton(@click="handlePopupRightBottom()" ref="rightBottom") 右下
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { usePopup } from 'vue-popup-plus'
import DemoBubble from '../demo/DemoBubble.vue'

const popup = usePopup()

const defaultRef = useTemplateRef('defaultRef')
const leftTopRef = useTemplateRef('leftTop')
const leftRef = useTemplateRef('left')
const leftBottomRef = useTemplateRef('leftBottom')
const topLeftRef = useTemplateRef('topLeft')
const topRef = useTemplateRef('top')
const topRightRef = useTemplateRef('topRight')
const bottomLeftRef = useTemplateRef('bottomLeft')
const bottomRef = useTemplateRef('bottom')
const bottomRightRef = useTemplateRef('bottomRight')
const rightTopRef = useTemplateRef('rightTop')
const rightRef = useTemplateRef('right')
const rightBottomRef = useTemplateRef('rightBottom')

function handlePopupBubble() {
	popup.bubble({
		el: defaultRef.value?.$el,
		component: DemoBubble,
	})
}

function handlePopupLeftTop() {
	popup.bubble({
		el: leftTopRef.value?.$el,
		component: DemoBubble,
		placement: 'left-top',
	})
}

function handlePopupLeft() {
	popup.bubble({
		el: leftRef.value?.$el,
		component: DemoBubble,
		placement: 'left',
	})
}

function handlePopupLeftBottom() {
	popup.bubble({
		el: leftBottomRef.value?.$el,
		component: DemoBubble,
		placement: 'left-bottom',
	})
}

function handlePopupTopLeft() {
	popup.bubble({
		el: topLeftRef.value?.$el,
		component: DemoBubble,
		placement: 'top-left',
	})
}

function handlePopupTop() {
	popup.bubble({
		el: topRef.value?.$el,
		component: DemoBubble,
		placement: 'top',
	})
}

function handlePopupTopRight() {
	popup.bubble({
		el: topRightRef.value?.$el,
		component: DemoBubble,
		placement: 'top-right',
	})
}

function handlePopupBottomLeft() {
	popup.bubble({
		el: bottomLeftRef.value?.$el,
		component: DemoBubble,
		placement: 'bottom-left',
	})
}

function handlePopupBottom() {
	popup.bubble({
		el: bottomRef.value?.$el,
		component: DemoBubble,
		placement: 'bottom',
	})
}

function handlePopupBottomRight() {
	popup.bubble({
		el: bottomRightRef.value?.$el,
		component: DemoBubble,
		placement: 'bottom-right',
	})
}

function handlePopupRightTop() {
	popup.bubble({
		el: rightTopRef.value?.$el,
		component: DemoBubble,
		placement: 'right-top',
	})
}

function handlePopupRight() {
	popup.bubble({
		el: rightRef.value?.$el,
		component: DemoBubble,
		placement: 'right',
	})
}

function handlePopupRightBottom() {
	popup.bubble({
		el: rightBottomRef.value?.$el,
		component: DemoBubble,
		placement: 'right-bottom',
	})
}
</script>
