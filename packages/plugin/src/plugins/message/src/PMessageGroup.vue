<template>
	<div class="popup-message-group">
		<TransitionGroup
			name="popup-message"
			tag="div"
			class="popup-message-group-inner">
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
import type { MessageRecord } from '../index'
import PMessage from './PMessage.vue'
import type { Skin } from '../../../skin'

type Props = {
	skin: Skin
	messages: MessageRecord[]
}

const { skin, messages } = defineProps<Props>()

const emit = defineEmits<{
	(e: 'messageClose', id: string): void
}>()

const emitClose = (id: string) => emit('messageClose', id)
</script>

<style scoped lang="scss">
@use '../../../assets/styles/inject.scss' as *;

.popup-message-group {
	padding: 20px;
	z-index: inherit;
	pointer-events: none;

	.popup-message-group-inner {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: use-var('spacing-small');
		width: 30vw;
	}

	.popup-message-enter-active,
	.popup-message-leave-active {
		transition: all 0.25s ease;
	}

	.popup-message-enter-from {
		opacity: 0;
		transform: translateY(-12px);
	}

	.popup-message-leave-to {
		opacity: 0;
		transform: translateY(-12px);
	}

	.popup-message-move {
		transition: transform 0.25s ease;
	}
}
</style>
