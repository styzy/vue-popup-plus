<template lang="pug">
.p-dialog(:class="{ 'no-header': !header }")
	PScaffold(:skin="skin")
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
import { type Skin } from '../../../typings'
import PScaffold from '../../../components/PScaffold.vue'
import PHeader from '../../../components/PHeader.vue'
import PHeaderButton from '../../../components/PHeaderButton.vue'
import PBody from '../../../components/PBody.vue'

defineOptions({
	name: 'PDialog',
})

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

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

.p-dialog {
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: stretch;
	height: 100%;
	box-shadow: var(--popup-plugin-preset-box-shadow);
	border-radius: var(--popup-plugin-preset-border-radius-large);
	overflow: hidden;
}
</style>
