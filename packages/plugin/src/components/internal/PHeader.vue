<template lang="pug">
div(
	:class="[ns.block(), { [ns.is('draggable')]: draggable }]"
	@mousedown="handleDragStart($event)")
	div(
		:class="[ns.element('icon'), ns.is(`theme-${iconTheme}`)]"
		v-if="hasIcon")
		i.iconfont-popup-plugin-preset(:class="iconClass")
	div(:class="ns.element('title')") {{ title }}
	div(:class="ns.element('btn-ctn')")
		slot(name="buttons")
		PHeaderButton(
			@click="handleClose()"
			iconClass="close"
			theme="danger"
			v-if="hasCloseButton")
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import {
	usePopup,
	usePopupComputedStyle,
	usePopupInstanceId,
	type PopupController,
} from 'vue-popup-plus'
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { PHeaderButton } from '@plugin/components/internal'
import { useNamespace } from '@plugin/hooks'
import { type Theme } from '@plugin/typings'

let popup: PopupController | undefined

const instanceId = usePopupInstanceId()!
const viewComputedStyle = usePopupComputedStyle()!

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.HEADER,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.HEADER)

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	title?: string
	iconClass?: string
	iconTheme?: Theme
	hasCloseButton?: boolean
	draggable?: boolean
}

const {
	title = '',
	iconClass = '',
	iconTheme = 'primary',
	hasCloseButton = true,
	draggable = false,
} = defineProps<Props>()

if (draggable) {
	popup = usePopup()
}

const dragOriginMouseX = ref(0)
const dragOriginMouseY = ref(0)
const dragOriginOffsetX = ref(0)
const dragOriginOffsetY = ref(0)
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)
const isDragging = ref(false)

const hasIcon = computed(() => !!iconClass)

watch([dragOffsetX, dragOffsetY], handleOffsetChange)

function handleClose() {
	if (hasCloseButton) {
		emit('close')
	}
}

function handleDragStart(event: MouseEvent) {
	if (!draggable) return
	dragOriginMouseX.value = event.clientX
	dragOriginMouseY.value = event.clientY
	dragOriginOffsetX.value = viewComputedStyle.value.translateX
	dragOriginOffsetY.value = viewComputedStyle.value.translateY
	isDragging.value = true
	event.preventDefault()
	window.addEventListener('mousemove', handleDragMove)
	window.addEventListener('mouseup', handleDragEnd)
}

function handleDragMove(event: MouseEvent) {
	if (!isDragging.value) return

	const deltaX = Math.ceil(event.clientX - dragOriginMouseX.value)
	const deltaY = Math.ceil(event.clientY - dragOriginMouseY.value)
	dragOffsetX.value = dragOriginOffsetX.value + deltaX
	dragOffsetY.value = dragOriginOffsetY.value + deltaY
}

function handleDragEnd(event: MouseEvent) {
	isDragging.value = false
	window.removeEventListener('mousemove', handleDragMove)
	window.removeEventListener('mouseup', handleDragEnd)
}

function handleOffsetChange() {
	popup!.update(instanceId, {
		viewTranslateX: dragOffsetX.value,
		viewTranslateY: dragOffsetY.value,
	})
}
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('header') {
	@include ns-is('draggable') {
		cursor: move;
		user-select: none;
	}
	@include ns-element('icon') {
		@include ns-is('theme-primary') {
			color: use-color(primary);
		}
		@include ns-is('theme-info') {
			color: use-color(info);
		}
		@include ns-is('theme-success') {
			color: use-color(success);
		}
		@include ns-is('theme-warning') {
			color: use-color(warning);
		}
		@include ns-is('theme-danger') {
			color: use-color(danger);
		}
	}
	@include use-skin('classic') {
		@include base-style();

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
		padding-left: 20px;
		height: 40px;
		border-bottom: 1px solid use-color(border);
		background-color: use-color(background);

		@include ns-element('icon') {
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				font-size: 20px;
			}
		}
		@include ns-element('title') {
			@include base-ellipsis();

			flex: 1;
			font-size: use-font-size(title, small);
		}
		@include ns-element('btn-ctn') {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		@include use-dark() {
			background-color: use-color(background);
		}
	}
	@include use-skin('modern') {
		@include base-style();

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background-color: #ffffff;
		@include ns-element('icon') {
			width: 40px;
			height: 24px;
			i {
				font-size: 24px;
			}
		}
		@include ns-element('title') {
			@include base-ellipsis();

			flex: 1;
			font-size: use-font-size(title, small);
			font-weight: 600;
		}
		@include ns-element('btn-ctn') {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 5px;
		}
		@include use-dark() {
			background-color: use-color(background);
		}
	}
}
</style>
