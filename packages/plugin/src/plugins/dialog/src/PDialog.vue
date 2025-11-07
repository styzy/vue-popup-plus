<template lang="pug">
.p-dialog(:class="{ 'no-header': !header }")
	PScaffold
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
import {
	computed,
	defineAsyncComponent,
	inject,
	onMounted,
	ref,
	type Component,
} from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'
import PScaffold from '../../../components/PScaffold.vue'
import PHeader from '../../../components/PHeader.vue'
import PHeaderButton from '../../../components/PHeaderButton.vue'
import PBody from '../../../components/PBody.vue'

const popup = usePopup()

defineOptions({
	name: 'PDialog',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	id: string
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

onMounted(() => {
	// HACK STY 修复ELementUI在弹框缩放动画过程中计算组件尺寸异常的bug
	// window.setTimeout(renderComponent, 100)
})

function handleReload() {
	customComponentKeySeed.value++
}

function handleClose() {
	popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>
.p-dialog
	width 100%
	height 100%
</style>
