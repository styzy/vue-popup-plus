<template>
	<div :class="ns.block()">
		<TransitionGroup
			name="popup-message"
			tag="div"
			:class="ns.element('inner')">
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
import { POPUP_INSIDE_COMPONENT_NAMES } from '@plugin/CONSTANTS'
import { useNamespace } from '@plugin/hooks'
import type { PopupSkin } from '@plugin/skin'
import type { PopupMessageRecord } from './types'

import PMessage from './message.vue'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.MESSAGE_GROUP,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.MESSAGE_GROUP)

type Props = {
	skin: PopupSkin
	messages: PopupMessageRecord[]
}

const { skin, messages } = defineProps<Props>()

type Emits = {
	messageClose: [id: string]
}

const emit = defineEmits<Emits>()

const emitClose = (id: string) => emit('messageClose', id)
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('message-group') {
	padding: 20px;
	z-index: inherit;
	pointer-events: none;

	@include ns-element('inner') {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: use-spacing(small);
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
