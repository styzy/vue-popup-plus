<template>
	<div class="p-message-group" :class="placement">
		<TransitionGroup
			name="p-message"
			tag="div"
			class="p-message-group-inner">
			<PMessage
				v-for="item in list"
				:key="item.id"
				:id="item.id"
				:skin="skin"
				:content="item.content"
				:theme="item.theme"
				:duration="item.duration"
				:showClose="item.showClose"
				:hoverWait="item.hoverWait"
				:onClose="() => emitClose(item.id)" />
		</TransitionGroup>
	</div>
</template>

<script setup lang="ts">
import type { Placement } from 'vue-popup-plus'
import type { MessageRecord } from '../index'
import PMessage from './PMessage.vue'
import type { Skin } from 'src/skin'

defineProps<{
	placement: Placement
	list: MessageRecord[]
	skin: Skin
}>()

const emit = defineEmits<{
	(e: 'itemClose', id: string): void
}>()

const emitClose = (id: string) => emit('itemClose', id)
</script>

<style scoped>
.p-message-group {
	position: fixed;
	z-index: inherit;
}

.p-message-group-inner {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 12px;
	min-width: 250px;
}

.p-message-group.top {
	top: 16px;
	left: 50%;
	transform: translateX(-50%);
}

.p-message-group.bottom {
	bottom: 16px;
	left: 50%;
	transform: translateX(-50%);
}

.p-message-group.left {
	top: 50%;
	left: 16px;
	transform: translateY(-50%);
}

.p-message-group.right {
	right: 50%;
	right: 16px;
	transform: translateY(-50%);
}

.p-message-group.left-top {
	top: 16px;
	left: 16px;
}

.p-message-group.right-top {
	top: 16px;
	right: 16px;
}

.p-message-group.left-bottom {
	bottom: 16px;
	left: 16px;
}

.p-message-group.right-bottom {
	bottom: 16px;
	right: 16px;
}

.p-message-group.center {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.p-message-enter-active,
.p-message-leave-active {
	transition: all 0.25s ease;
}

.p-message-enter-from {
	opacity: 0;
	transform: translateY(-12px);
}

.p-message-leave-to {
	opacity: 0;
	transform: translateY(-12px);
}

.p-message-group.bottom .p-message-enter-from,
.p-message-group.bottom .p-message-leave-to {
	transform: translateY(12px);
}

.p-message-move {
	transition: transform 0.25s ease;
}
</style>
