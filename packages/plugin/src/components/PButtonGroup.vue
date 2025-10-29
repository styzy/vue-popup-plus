<template lang="pug">
.p-button-group(:class="classObject" ref="group")
	template(v-if="hasCutline")
		template(:key="index" v-for="(slot, index) in slots.default?.()")
			component(:is="slot")
			.cutline(v-if="index < (slots.default?.() || []).length - 1")
	template(v-else)
		slot
</template>

<script lang="ts">
import { type InjectionKey } from 'vue'
import {
	type ButtonType,
	type ButtonTheme,
	type ButtonSize,
} from './PButton.vue'

type ButtonGroupInjects = {
	inButtonGroup: InjectionKey<boolean>
	groupType: InjectionKey<ButtonType>
	groupTheme: InjectionKey<ButtonTheme>
	groupSize: InjectionKey<ButtonSize>
}

export const buttonGroupInjects: ButtonGroupInjects = {
	inButtonGroup: Symbol('inButtonGroup'),
	groupType: Symbol('groupType'),
	groupTheme: Symbol('groupTheme'),
	groupSize: Symbol('groupSize'),
}
</script>

<script lang="ts" setup>
import { computed, onMounted, provide, type VNode } from 'vue'
import PButton from './PButton.vue'

defineOptions({
	name: 'PButtonGroup',
})

type Slots = {
	default: () => VNode[]
}

const slots = defineSlots<Slots>()

type GroupAlign = 'left' | 'center' | 'right'

type Props = {
	/**
	 * 按钮组类型
	 * - 可统一设置按钮组内按钮的类型
	 * - 优先级低于按钮的类型属性
	 * - 默认值为 `default`
	 */
	type?: ButtonType
	/**
	 * 按钮组主题
	 * - 可统一设置按钮组内按钮的主题
	 * - 优先级低于按钮的主题属性
	 * - 默认值为 `default`
	 */
	theme?: ButtonTheme
	/**
	 * 按钮组大小
	 * - 可统一设置按钮组内按钮的大小
	 * - 优先级低于按钮的大小属性
	 * - 默认值为 `default`
	 */
	size?: ButtonSize
	/**
	 * 按钮组对齐方式
	 * - 默认值为 `left`
	 */
	align?: GroupAlign
	/**
	 * 是否紧凑模式
	 * - 默认值为 `false`
	 */
	tight?: boolean
	/**
	 * 是否显示分割线
	 * - 默认值为 `false`
	 */
	cutline?: boolean
}

const {
	theme = 'default',
	type = 'default',
	size = 'default',
	align = 'left',
	tight = false,
	cutline = false,
} = defineProps<Props>()

const hasCutline = computed(() => cutline && !tight)
const classObject = computed(() => ({
	[`align-${align}`]: true,
	'is-tight': tight,
	'has-cutline': hasCutline.value,
}))

provide(buttonGroupInjects.inButtonGroup, true)
provide(buttonGroupInjects.groupType, type)
provide(buttonGroupInjects.groupTheme, theme)
provide(buttonGroupInjects.groupSize, size)

onMounted(() => {
	checkSlots()
})

function checkSlots() {
	const defaultSlots = slots.default()
	if (
		defaultSlots.some((vNode) => {
			vNode.type !== PButton
		})
	) {
		console.warn('PButtonGroup 只能包含 PButton 组件')
	}
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/inject.styl'

.p-button-group
	display flex
	flex-direction row
	flex-wrap wrap
	gap 10px 20px
	&.has-cutline
		gap 10px 0
	&.align
		&-left
			justify-content flex-start
		&-center
			justify-content center
		&-right
			justify-content flex-end
	&.is-tight
		gap 5px 10px
		&.has-cutline
			gap 5px 0
	.cutline
		position relative
		width 21px
		&:after
			content ''
			position absolute
			top 15%
			left 50%
			height 70%
			width 1px
			background-color $color-border
			z-index 1
		&.is-tight
			width 11px
</style>
