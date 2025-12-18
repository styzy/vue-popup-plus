<template lang="pug">
.p-header(
	:class="{ 'is-draggable': draggable, [`is-skin-${skin}`]: true }"
	@mousedown="handleDragStart($event)")
	.icon(v-if="hasIcon")
		i.iconfont-popup-plugin-preset(:class="iconClass")
	.title {{ title }}
	.btn-ctn
		slot(name="buttons")
		PHeaderButton(
			@click="handleClose()"
			iconClass="close"
			theme="danger"
			v-if="hasCloseButton")
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'
import { type Skin } from '../typings'
import { injectSkin } from './PScaffold.vue'
import PHeaderButton from './PHeaderButton.vue'

const popup = usePopup()

defineOptions({
	name: 'PHeader',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!
const computedViewStyle = inject(POPUP_COMPONENT_INJECTS.COMPUTED_VIEW_STYLE)!
const skin = inject(injectSkin, 'modern')

type Props = {
	title?: string
	height?: number
	iconClass?: string
	hasCloseButton?: boolean
	draggable?: boolean
}

const {
	title = '',
	iconClass = '',
	height = 40,
	hasCloseButton = true,
	draggable = false,
} = defineProps<Props>()

const emit = defineEmits(['close'])

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
	dragOriginOffsetX.value = computedViewStyle.value.translateX
	dragOriginOffsetY.value = computedViewStyle.value.translateY
	isDragging.value = true
	event.preventDefault()
	window.addEventListener('mousemove', handleDragMove)
	window.addEventListener('mouseup', handleDragEnd)
}

function handleDragMove(event: MouseEvent) {
	if (!isDragging.value) return

	const deltaX = event.clientX - dragOriginMouseX.value
	const deltaY = event.clientY - dragOriginMouseY.value
	dragOffsetX.value = dragOriginOffsetX.value + deltaX
	dragOffsetY.value = dragOriginOffsetY.value + deltaY
}

function handleDragEnd(event: MouseEvent) {
	isDragging.value = false
	window.removeEventListener('mousemove', handleDragMove)
	window.removeEventListener('mouseup', handleDragEnd)
}

function handleOffsetChange() {
	popup.update(instanceId, {
		viewTranslateX: dragOffsetX.value,
		viewTranslateY: dragOffsetY.value,
	})
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.p-header {
	@include base-style();

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	padding-left: 20px;
	height: v-bind('`${height}px`');
	border-bottom: 1px solid var(--popup-plugin-preset-color-border-dark-lite);
	background-color: var(--popup-plugin-preset-color-background-sub);
	&.is-draggable {
		cursor: move;
		user-select: none;
	}
	.icon {
		color: var(--popup-plugin-preset-color-primary);
		height: 24px;
		i {
			font-size: 24px;
		}
	}
	.title {
		@include base-ellipsis();

		flex: 1;
		font-size: var(--popup-plugin-preset-font-size-title-sub);
	}
	.btn-ctn {
		display: flex;
		align-items: center;
		height: 100%;
	}
}
</style>
