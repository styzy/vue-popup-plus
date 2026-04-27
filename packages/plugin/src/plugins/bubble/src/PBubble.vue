<template lang="pug">
PSkin(:class="[ns.block()]" :skin="skin")
	PLayout
		PBody(:withPadding="false")
			component(
				:is="resolvedComponent"
				:key="customComponentKey"
				v-bind="customComponentProps")
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, ref, type Component } from 'vue'
import type { PopupAnchorPlacement } from 'vue-popup-plus'
import { type Skin } from '../../../skin'
import { useNamespace } from '../../../hooks'
import { P_COMPONENT_NAMES } from '../../../CONSTANTS'
import PSkin from '../../../components/PSkin.vue'
import PLayout from '../../../components/PLayout.vue'
import PHeader from '../../../components/PHeader.vue'
import PHeaderButton from '../../../components/PHeaderButton.vue'
import PBody from '../../../components/PBody.vue'

defineOptions({
	name: P_COMPONENT_NAMES.BUBBLE,
})

const ns = useNamespace(P_COMPONENT_NAMES.BUBBLE)

type Props = {
	skin: Skin
	id: string
	customComponent: Component
	customComponentProps: Record<string, any>
	placement: PopupAnchorPlacement
	arrow: boolean
	debugMode: boolean
}

const { skin, id, customComponent, customComponentProps, arrow } =
	defineProps<Props>()

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

const customComponentKeySeed = ref(1)

const customComponentKey = computed(
	() => `${id}-${customComponentKeySeed.value}`
)
const resolvedComponent = computed(() => {
	if (typeof customComponent === 'function') {
		return defineAsyncComponent(customComponent as () => Promise<Component>)
	}
	return customComponent
})
</script>

<style lang="scss">
@use '../../../assets/styles/inject.scss' as *;

$arrow-size: 20px;

.popup-bubble {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: stretch;
	height: 100%;
	box-shadow: use-box-shadow();
	border-radius: use-radius();
	overflow: hidden;
	&.is-top,
	&.is-top-left,
	&.is-top-right {
		padding-bottom: $arrow-size;
	}
	&.is-bottom,
	&.is-bottom-left,
	&.is-bottom-right {
		padding-top: $arrow-size;
	}
	&.is-left,
	&.is-left-top,
	&.is-left-bottom {
		padding-right: $arrow-size;
	}
	&.is-right,
	&.is-right-top,
	&.is-right-bottom {
		padding-left: $arrow-size;
	}
}
</style>
