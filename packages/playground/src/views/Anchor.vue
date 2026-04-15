<template lang="pug">
GContainer.anchor
	GTools(:component="() => import('./Core.vue')")
	GTitle 核心 - 锚点功能测试
	ElFormItem(label="viewport")
		ElSwitch(
			active-text="viewportRef"
			inactive-text="window"
			v-model="useViewport")
	.viewport
		GTitle.viewport-title(second) viewportRef
		.viewport-wrapper(ref="viewportRef")
			.viewport-content
				GTitle(second) 位置
				PButtonGroup(theme="primary" tight type="plain")
					PButton(@click="handleLeftStart()" ref="leftStart") 左侧起点
					PButton(@click="handleLeft()" ref="left") 左侧
					PButton(@click="handleLeftEnd()" ref="leftEnd") 左侧终点
					PButton(@click="handleTopStart()" ref="topStart") 顶部起点
					PButton(@click="handleTop()" ref="top") 顶部
					PButton(@click="handleTopEnd()" ref="topEnd") 顶部终点
					PButton(@click="handleBottomStart()" ref="bottomStart") 底部起点
					PButton(@click="handleBottom()" ref="bottom") 底部
					PButton(@click="handleBottomEnd()" ref="bottomEnd") 底部终点
					PButton(@click="handleRightStart()" ref="rightStart") 右侧起点
					PButton(@click="handleRight()" ref="right") 右侧
					PButton(@click="handleRightEnd()" ref="rightEnd") 右侧终点
				GTitle(second) 翻转
				PButtonGroup(theme="primary" tight type="plain")
					PButton(@click="handleFlipLeftStart()" ref="flipLeftStart") 左侧起点
					PButton(@click="handleFlipLeft()" ref="flipLeft") 左侧
					PButton(@click="handleFlipLeftEnd()" ref="flipLeftEnd") 左侧终点
					PButton(@click="handleFlipTopStart()" ref="flipTopStart") 顶部起点
					PButton(@click="handleFlipTop()" ref="flipTop") 顶部
					PButton(@click="handleFlipTopEnd()" ref="flipTopEnd") 顶部终点
					PButton(@click="handleFlipBottomStart()" ref="flipBottomStart") 底部起点
					PButton(@click="handleFlipBottom()" ref="flipBottom") 底部
					PButton(@click="handleFlipBottomEnd()" ref="flipBottomEnd") 底部终点
					PButton(@click="handleFlipRightStart()" ref="flipRightStart") 右侧起点
					PButton(@click="handleFlipRight()" ref="flipRight") 右侧
					PButton(@click="handleFlipRightEnd()" ref="flipRightEnd") 右侧终点
				GTitle(second) 主轴平移
				PButtonGroup(theme="primary" tight type="plain")
					PButton(@click="handleShiftMainLeftStart()" ref="shiftMainLeftStart") 左侧起点
					PButton(@click="handleShiftMainLeft()" ref="shiftMainLeft") 左侧
					PButton(@click="handleShiftMainLeftEnd()" ref="shiftMainLeftEnd") 左侧终点
					PButton(@click="handleShiftMainTopStart()" ref="shiftMainTopStart") 顶部起点
					PButton(@click="handleShiftMainTop()" ref="shiftMainTop") 顶部
					PButton(@click="handleShiftMainTopEnd()" ref="shiftMainTopEnd") 顶部终点
					PButton(@click="handleShiftMainBottomStart()" ref="shiftMainBottomStart") 底部起点
					PButton(@click="handleShiftMainBottom()" ref="shiftMainBottom") 底部
					PButton(@click="handleShiftMainBottomEnd()" ref="shiftMainBottomEnd") 底部终点
					PButton(@click="handleShiftMainRightStart()" ref="shiftMainRightStart") 右侧起点
					PButton(@click="handleShiftMainRight()" ref="shiftMainRight") 右侧
					PButton(@click="handleShiftMainRightEnd()" ref="shiftMainRightEnd") 右侧终点
				GTitle(second) 交叉轴平移
				PButtonGroup(theme="primary" tight type="plain")
					PButton(@click="handleShiftCrossLeftStart()" ref="shiftCrossLeftStart") 左侧起点
					PButton(@click="handleShiftCrossLeft()" ref="shiftCrossLeft") 左侧
					PButton(@click="handleShiftCrossLeftEnd()" ref="shiftCrossLeftEnd") 左侧终点
					PButton(@click="handleShiftCrossTopStart()" ref="shiftCrossTopStart") 顶部起点
					PButton(@click="handleShiftCrossTop()" ref="shiftCrossTop") 顶部
					PButton(@click="handleShiftCrossTopEnd()" ref="shiftCrossTopEnd") 顶部终点
					PButton(
						@click="handleShiftCrossBottomStart()"
						ref="shiftCrossBottomStart") 底部起点
					PButton(@click="handleShiftCrossBottom()" ref="shiftCrossBottom") 底部
					PButton(@click="handleShiftCrossBottomEnd()" ref="shiftCrossBottomEnd") 底部终点
					PButton(@click="handleShiftCrossRightStart()" ref="shiftCrossRightStart") 右侧起点
					PButton(@click="handleShiftCrossRight()" ref="shiftCrossRight") 右侧
					PButton(@click="handleShiftCrossRightEnd()" ref="shiftCrossRightEnd") 右侧终点
				GTitle(second) 主轴交叉轴都平移
				PButtonGroup(theme="primary" tight type="plain")
					PButton(@click="handleShiftBothLeftStart()" ref="shiftBothLeftStart") 左侧起点
					PButton(@click="handleShiftBothLeft()" ref="shiftBothLeft") 左侧
					PButton(@click="handleShiftBothLeftEnd()" ref="shiftBothLeftEnd") 左侧终点
					PButton(@click="handleShiftBothTopStart()" ref="shiftBothTopStart") 顶部起点
					PButton(@click="handleShiftBothTop()" ref="shiftBothTop") 顶部
					PButton(@click="handleShiftBothTopEnd()" ref="shiftBothTopEnd") 顶部终点
					PButton(@click="handleShiftBothBottomStart()" ref="shiftBothBottomStart") 底部起点
					PButton(@click="handleShiftBothBottom()" ref="shiftBothBottom") 底部
					PButton(@click="handleShiftBothBottomEnd()" ref="shiftBothBottomEnd") 底部终点
					PButton(@click="handleShiftBothRightStart()" ref="shiftBothRightStart") 右侧起点
					PButton(@click="handleShiftBothRight()" ref="shiftBothRight") 右侧
					PButton(@click="handleShiftBothRightEnd()" ref="shiftBothRightEnd") 右侧终点
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { usePopup, type RenderOption } from 'vue-popup-plus'
import DemoAnchor from './demo/DemoAnchor.vue'

const popup = usePopup()

const viewportRef = useTemplateRef('viewportRef')

const leftStart = useTemplateRef('leftStart')
const left = useTemplateRef('left')
const leftEnd = useTemplateRef('leftEnd')
const topStart = useTemplateRef('topStart')
const top = useTemplateRef('top')
const topEnd = useTemplateRef('topEnd')
const bottomStart = useTemplateRef('bottomStart')
const bottom = useTemplateRef('bottom')
const bottomEnd = useTemplateRef('bottomEnd')
const rightStart = useTemplateRef('rightStart')
const right = useTemplateRef('right')
const rightEnd = useTemplateRef('rightEnd')

const flipLeftStart = useTemplateRef('flipLeftStart')
const flipLeft = useTemplateRef('flipLeft')
const flipLeftEnd = useTemplateRef('flipLeftEnd')
const flipTopStart = useTemplateRef('flipTopStart')
const flipTop = useTemplateRef('flipTop')
const flipTopEnd = useTemplateRef('flipTopEnd')
const flipBottomStart = useTemplateRef('flipBottomStart')
const flipBottom = useTemplateRef('flipBottom')
const flipBottomEnd = useTemplateRef('flipBottomEnd')
const flipRightStart = useTemplateRef('flipRightStart')
const flipRight = useTemplateRef('flipRight')
const flipRightEnd = useTemplateRef('flipRightEnd')

const shiftMainLeftStart = useTemplateRef('shiftMainLeftStart')
const shiftMainLeft = useTemplateRef('shiftMainLeft')
const shiftMainLeftEnd = useTemplateRef('shiftMainLeftEnd')
const shiftMainTopStart = useTemplateRef('shiftMainTopStart')
const shiftMainTop = useTemplateRef('shiftMainTop')
const shiftMainTopEnd = useTemplateRef('shiftMainTopEnd')
const shiftMainBottomStart = useTemplateRef('shiftMainBottomStart')
const shiftMainBottom = useTemplateRef('shiftMainBottom')
const shiftMainBottomEnd = useTemplateRef('shiftMainBottomEnd')
const shiftMainRightStart = useTemplateRef('shiftMainRightStart')
const shiftMainRight = useTemplateRef('shiftMainRight')
const shiftMainRightEnd = useTemplateRef('shiftMainRightEnd')

const shiftCrossLeftStart = useTemplateRef('shiftCrossLeftStart')
const shiftCrossLeft = useTemplateRef('shiftCrossLeft')
const shiftCrossLeftEnd = useTemplateRef('shiftCrossLeftEnd')
const shiftCrossTopStart = useTemplateRef('shiftCrossTopStart')
const shiftCrossTop = useTemplateRef('shiftCrossTop')
const shiftCrossTopEnd = useTemplateRef('shiftCrossTopEnd')
const shiftCrossBottomStart = useTemplateRef('shiftCrossBottomStart')
const shiftCrossBottom = useTemplateRef('shiftCrossBottom')
const shiftCrossBottomEnd = useTemplateRef('shiftCrossBottomEnd')
const shiftCrossRightStart = useTemplateRef('shiftCrossRightStart')
const shiftCrossRight = useTemplateRef('shiftCrossRight')
const shiftCrossRightEnd = useTemplateRef('shiftCrossRightEnd')

const shiftBothLeftStart = useTemplateRef('shiftBothLeftStart')
const shiftBothLeft = useTemplateRef('shiftBothLeft')
const shiftBothLeftEnd = useTemplateRef('shiftBothLeftEnd')
const shiftBothTopStart = useTemplateRef('shiftBothTopStart')
const shiftBothTop = useTemplateRef('shiftBothTop')
const shiftBothTopEnd = useTemplateRef('shiftBothTopEnd')
const shiftBothBottomStart = useTemplateRef('shiftBothBottomStart')
const shiftBothBottom = useTemplateRef('shiftBothBottom')
const shiftBothBottomEnd = useTemplateRef('shiftBothBottomEnd')
const shiftBothRightStart = useTemplateRef('shiftBothRightStart')
const shiftBothRight = useTemplateRef('shiftBothRight')
const shiftBothRightEnd = useTemplateRef('shiftBothRightEnd')

const useViewport = ref(true)
const sharedOptions = computed<RenderOption>(() => ({
	component: DemoAnchor,
	viewport: useViewport.value ? viewportRef.value : undefined,
	disableScroll: false,
	mask: false,
	anchorFlipAdvance: 10,
}))

function handleLeftStart() {
	popup.render({
		anchor: leftStart.value?.$el,
		anchorPlacement: 'left-start',
		...sharedOptions.value,
	})
}

function handleLeft() {
	popup.render({
		anchor: left.value?.$el,
		anchorPlacement: 'left',
		mask: false,
		disableScroll: false,
		component: DemoAnchor,
	})
}

function handleLeftEnd() {
	popup.render({
		anchor: leftEnd.value?.$el,
		anchorPlacement: 'left-end',
		...sharedOptions.value,
	})
}

function handleTopStart() {
	popup.render({
		anchor: topStart.value?.$el,
		anchorPlacement: 'top-start',
		mask: false,
		disableScroll: false,
		component: DemoAnchor,
	})
}

function handleTop() {
	popup.render({
		anchor: top.value?.$el,
		anchorPlacement: 'top',
		mask: false,
		disableScroll: false,
		component: DemoAnchor,
	})
}

function handleTopEnd() {
	popup.render({
		anchor: topEnd.value?.$el,
		anchorPlacement: 'top-end',
		...sharedOptions.value,
	})
}

function handleBottomStart() {
	popup.render({
		anchor: bottomStart.value?.$el,
		anchorPlacement: 'bottom-start',
		...sharedOptions.value,
	})
}

function handleBottom() {
	popup.render({
		anchor: bottom.value?.$el,
		anchorPlacement: 'bottom',
		...sharedOptions.value,
	})
}

function handleBottomEnd() {
	popup.render({
		anchor: bottomEnd.value?.$el,
		anchorPlacement: 'bottom-end',
		...sharedOptions.value,
	})
}

function handleRightStart() {
	popup.render({
		anchor: rightStart.value?.$el,
		anchorPlacement: 'right-start',
		mask: false,
		disableScroll: false,
		component: DemoAnchor,
	})
}

function handleRight() {
	popup.render({
		anchor: right.value?.$el,
		anchorPlacement: 'right',
		mask: false,
		disableScroll: false,
		component: DemoAnchor,
	})
}

function handleRightEnd() {
	popup.render({
		anchor: rightEnd.value?.$el,
		anchorPlacement: 'right-end',
		...sharedOptions.value,
	})
}

function handleFlipLeftStart() {
	popup.render({
		anchor: flipLeftStart.value?.$el,
		anchorPlacement: 'left-start',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipLeft() {
	popup.render({
		anchor: flipLeft.value?.$el,
		anchorPlacement: 'left',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipLeftEnd() {
	popup.render({
		anchor: flipLeftEnd.value?.$el,
		anchorPlacement: 'left-end',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipTopStart() {
	popup.render({
		anchor: flipTopStart.value?.$el,
		anchorPlacement: 'top-start',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipTop() {
	popup.render({
		anchor: flipTop.value?.$el,
		anchorPlacement: 'top',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipTopEnd() {
	popup.render({
		anchor: flipTopEnd.value?.$el,
		anchorPlacement: 'top-end',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipBottomStart() {
	popup.render({
		anchor: flipBottomStart.value?.$el,
		anchorPlacement: 'bottom-start',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipBottom() {
	popup.render({
		anchor: flipBottom.value?.$el,
		anchorPlacement: 'bottom',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipBottomEnd() {
	popup.render({
		anchor: flipBottomEnd.value?.$el,
		anchorPlacement: 'bottom-end',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipRightStart() {
	popup.render({
		anchor: flipRightStart.value?.$el,
		anchorPlacement: 'right-start',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipRight() {
	popup.render({
		anchor: flipRight.value?.$el,
		anchorPlacement: 'right',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleFlipRightEnd() {
	popup.render({
		anchor: flipRightEnd.value?.$el,
		anchorPlacement: 'right-end',
		anchorFlip: true,
		...sharedOptions.value,
	})
}

function handleShiftMainLeftStart() {
	popup.render({
		anchor: shiftMainLeftStart.value?.$el,
		anchorPlacement: 'left-start',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainLeft() {
	popup.render({
		anchor: shiftMainLeft.value?.$el,
		anchorPlacement: 'left',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainLeftEnd() {
	popup.render({
		anchor: shiftMainLeftEnd.value?.$el,
		anchorPlacement: 'left-end',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainTopStart() {
	popup.render({
		anchor: shiftMainTopStart.value?.$el,
		anchorPlacement: 'top-start',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainTop() {
	popup.render({
		anchor: shiftMainTop.value?.$el,
		anchorPlacement: 'top',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainTopEnd() {
	popup.render({
		anchor: shiftMainTopEnd.value?.$el,
		anchorPlacement: 'top-end',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainBottomStart() {
	popup.render({
		anchor: shiftMainBottomStart.value?.$el,
		anchorPlacement: 'bottom-start',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainBottom() {
	popup.render({
		anchor: shiftMainBottom.value?.$el,
		anchorPlacement: 'bottom',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainBottomEnd() {
	popup.render({
		anchor: shiftMainBottomEnd.value?.$el,
		anchorPlacement: 'bottom-end',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainRightStart() {
	popup.render({
		anchor: shiftMainRightStart.value?.$el,
		anchorPlacement: 'right-start',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainRight() {
	popup.render({
		anchor: shiftMainRight.value?.$el,
		anchorPlacement: 'right',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftMainRightEnd() {
	popup.render({
		anchor: shiftMainRightEnd.value?.$el,
		anchorPlacement: 'right-end',
		anchorShift: 'mainAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossLeftStart() {
	popup.render({
		anchor: shiftCrossLeftStart.value?.$el,
		anchorPlacement: 'left-start',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossLeft() {
	popup.render({
		anchor: shiftCrossLeft.value?.$el,
		anchorPlacement: 'left',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossLeftEnd() {
	popup.render({
		anchor: shiftCrossLeftEnd.value?.$el,
		anchorPlacement: 'left-end',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossTopStart() {
	popup.render({
		anchor: shiftCrossTopStart.value?.$el,
		anchorPlacement: 'top-start',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossTop() {
	popup.render({
		anchor: shiftCrossTop.value?.$el,
		anchorPlacement: 'top',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossTopEnd() {
	popup.render({
		anchor: shiftCrossTopEnd.value?.$el,
		anchorPlacement: 'top-end',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossBottomStart() {
	popup.render({
		anchor: shiftCrossBottomStart.value?.$el,
		anchorPlacement: 'bottom-start',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossBottom() {
	popup.render({
		anchor: shiftCrossBottom.value?.$el,
		anchorPlacement: 'bottom',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossBottomEnd() {
	popup.render({
		anchor: shiftCrossBottomEnd.value?.$el,
		anchorPlacement: 'bottom-end',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossRightStart() {
	popup.render({
		anchor: shiftCrossRightStart.value?.$el,
		anchorPlacement: 'right-start',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossRight() {
	popup.render({
		anchor: shiftCrossRight.value?.$el,
		anchorPlacement: 'right',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftCrossRightEnd() {
	popup.render({
		anchor: shiftCrossRightEnd.value?.$el,
		anchorPlacement: 'right-end',
		anchorShift: 'crossAxis',
		...sharedOptions.value,
	})
}

function handleShiftBothLeftStart() {
	popup.render({
		anchor: shiftBothLeftStart.value?.$el,
		anchorPlacement: 'left-start',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothLeft() {
	popup.render({
		anchor: shiftBothLeft.value?.$el,
		anchorPlacement: 'left',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothLeftEnd() {
	popup.render({
		anchor: shiftBothLeftEnd.value?.$el,
		anchorPlacement: 'left-end',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothTopStart() {
	popup.render({
		anchor: shiftBothTopStart.value?.$el,
		anchorPlacement: 'top-start',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothTop() {
	popup.render({
		anchor: shiftBothTop.value?.$el,
		anchorPlacement: 'top',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothTopEnd() {
	popup.render({
		anchor: shiftBothTopEnd.value?.$el,
		anchorPlacement: 'top-end',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothBottomStart() {
	popup.render({
		anchor: shiftBothBottomStart.value?.$el,
		anchorPlacement: 'bottom-start',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothBottom() {
	popup.render({
		anchor: shiftBothBottom.value?.$el,
		anchorPlacement: 'bottom',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothBottomEnd() {
	popup.render({
		anchor: shiftBothBottomEnd.value?.$el,
		anchorPlacement: 'bottom-end',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothRightStart() {
	popup.render({
		anchor: shiftBothRightStart.value?.$el,
		anchorPlacement: 'right-start',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothRight() {
	popup.render({
		anchor: shiftBothRight.value?.$el,
		anchorPlacement: 'right',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}

function handleShiftBothRightEnd() {
	popup.render({
		anchor: shiftBothRightEnd.value?.$el,
		anchorPlacement: 'right-end',
		anchorShift: 'both',
		...sharedOptions.value,
	})
}
</script>

<style lang="scss" scoped>
.anchor {
	height: 100vh;
	.viewport {
		position: relative;
		width: 50vw;
		height: 70vh;
		margin: auto auto 10vh;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
		background: #f0f0f0;
		overflow: hidden;
		.viewport-title {
			position: absolute;
			left: 0;
			top: 0;
			padding: 10px;
			z-index: 1;
		}
		.viewport-wrapper {
			width: 100%;
			height: 100%;
			overflow: auto;
		}
		.viewport-content {
			width: 100vw;
			height: 100vh;
			padding: 800px;
		}
	}
}
</style>
