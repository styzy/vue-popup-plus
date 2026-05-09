<template lang="pug">
PSkin(:class="ns.block()" :skin="skin")
	PLayout
		template(#header v-if="header")
			PHeader(
				:draggable="draggable"
				:hasCloseButton="headerClose"
				:title="title"
				@close="handleClose()")
				template(#buttons)
					PHeaderButton(
						@click="handleReload()"
						iconClass="reload"
						theme="success"
						v-if="debugMode")
		PBody(:withPadding="false")
			component(
				:is="resolvedComponent"
				:key="customComponentKey"
				v-bind="customComponentProps")
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, ref, type Component } from 'vue'
import { type Skin } from '../../../skin'
import { useNamespace } from '../../../hooks'
import { POPUP_INSIDE_COMPONENT_NAMES } from '../../../CONSTANTS'
import PSkin from '../../../components/PSkin.vue'
import PLayout from '../../../components/PLayout.vue'
import PHeader from '../../../components/PHeader.vue'
import PHeaderButton from '../../../components/PHeaderButton.vue'
import PBody from '../../../components/PBody.vue'

defineOptions({
	name: POPUP_INSIDE_COMPONENT_NAMES.DRAWER,
})

const ns = useNamespace(POPUP_INSIDE_COMPONENT_NAMES.DRAWER)

type Emits = {
	close: []
}

const emit = defineEmits<Emits>()

type Props = {
	id: string
	skin: Skin
	title: string
	customComponent: Component
	customComponentProps: Record<string, any>
	header: boolean
	headerClose: boolean
	draggable: boolean
	debugMode: boolean
}

const {
	id,
	title,
	customComponent,
	customComponentProps,
	header,
	headerClose,
	debugMode,
} = defineProps<Props>()

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

function handleReload() {
	customComponentKeySeed.value++
}

function handleClose() {
	emit('close')
}
</script>

<style lang="scss">
@use '../../../assets/styles/inject.scss' as *;

@include ns-block('drawer') {
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: stretch;
	height: 100%;
	box-shadow: use-box-shadow(large);
	overflow: hidden;
}
</style>
