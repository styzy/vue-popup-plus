<template>
	<div :class="ns.block()">
		<TransitionGroup
			:name="ns.block()"
			tag="div"
			:class="[
				ns.element('inner'),
				ns.elementModifier('inner', placement),
			]">
			<template v-if="isMounted">
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
					:onClose="() => emitClose(item.id)"
			/></template>
		</TransitionGroup>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type PopupPlacement } from 'vue-popup-plus'
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
	placement: PopupPlacement
	animationDuration: number
}

const { skin, messages, placement, animationDuration } = defineProps<Props>()

const isMounted = ref(false)

onMounted(() => {
	isMounted.value = true
})

type Emits = {
	messageClose: [id: string]
}

const emit = defineEmits<Emits>()

const emitClose = (id: string) => emit('messageClose', id)
</script>

<style lang="scss">
@use '@plugin/assets/styles/inject.scss' as *;

@include ns-block('message-group') {
	z-index: inherit;
	pointer-events: none;
	width: 100%;
	height: 100%;

	@include ns-element('inner') {
		width: 100%;
		height: 100%;
		padding: 20px;
		display: flex;
		gap: use-spacing(small);
		box-sizing: border-box;
		.popup-message-group-enter-active,
		.popup-message-group-leave-active {
			transition: v-bind('`all ${animationDuration}ms ease`');
		}
		.popup-message-group-move {
			transition: v-bind('`all ${animationDuration}ms ease`');
		}
		.popup-message-group-enter-from {
			opacity: 0;
		}

		.popup-message-group-leave-to {
			opacity: 0;
		}
		@include ns-modifier('left-top') {
			align-items: flex-start;
			flex-direction: column;
			.popup-message-group-enter-from {
				transform: translateX(-20px);
			}

			.popup-message-group-leave-to {
				transform: translateX(-20px);
			}
		}
		@include ns-modifier('left') {
			align-items: flex-start;
			flex-direction: column;
			justify-content: center;
			.popup-message-group-enter-from {
				transform: translateX(-20px);
			}

			.popup-message-group-leave-to {
				transform: translateX(-20px);
			}
		}
		@include ns-modifier('left-bottom') {
			align-items: flex-start;
			flex-direction: column-reverse;
			justify-content: flex-start;
			.popup-message-group-enter-from {
				transform: translateX(-20px);
			}

			.popup-message-group-leave-to {
				transform: translateX(-20px);
			}
		}
		@include ns-modifier('top') {
			align-items: center;
			flex-direction: column;
			.popup-message-group-enter-from {
				transform: translateY(-20px);
			}

			.popup-message-group-leave-to {
				transform: translateY(-20px);
			}
		}
		@include ns-modifier('center') {
			align-items: center;
			flex-direction: column;
			justify-content: center;
		}
		@include ns-modifier('bottom') {
			align-items: center;
			flex-direction: column-reverse;
			.popup-message-group-enter-from {
				transform: translateY(20px);
			}

			.popup-message-group-leave-to {
				transform: translateY(20px);
			}
		}
		@include ns-modifier('right-top') {
			align-items: flex-end;
			flex-direction: column;
			.popup-message-group-enter-from {
				transform: translateX(20px);
			}

			.popup-message-group-leave-to {
				transform: translateX(20px);
			}
		}
		@include ns-modifier('right') {
			align-items: flex-end;
			flex-direction: column;
			justify-content: center;
			.popup-message-group-enter-from {
				transform: translateX(20px);
			}

			.popup-message-group-leave-to {
				transform: translateX(20px);
			}
		}
		@include ns-modifier('right-bottom') {
			align-items: flex-end;
			justify-content: flex-start;
			flex-direction: column-reverse;
			.popup-message-group-enter-from {
				transform: translateX(20px);
			}

			.popup-message-group-leave-to {
				transform: translateX(20px);
			}
		}
	}
}
</style>
