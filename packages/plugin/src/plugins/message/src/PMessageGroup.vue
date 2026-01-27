<template>
	<div class="p-message-group">
		<TransitionGroup
			name="p-message"
			tag="div"
			class="p-message-group-inner">
			<PMessage
				v-for="item in messages"
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
import type { Skin } from '../../../skin'

defineProps<{
	skin: Skin
	placement: Placement
	messages: MessageRecord[]
}>()

const emit = defineEmits<{
	(e: 'itemClose', id: string): void
}>()

const emitClose = (id: string) => emit('itemClose', id)
</script>

<style scoped lang="scss">
.p-message-group {
	padding: 20px;
	z-index: inherit;

	.p-message-group-inner {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 12px;
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

	.p-message-move {
		transition: transform 0.25s ease;
	}
}
</style>
