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
} from './DButton.vue'

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
import DButton from './DButton.vue'

defineOptions({
	name: 'PButtonGroup',
})

type Slots = {
	default: () => VNode[]
}

const slots = defineSlots<Slots>()

type GroupDirection = 'horizontal' | 'vertical'

type GroupAlign = 'start' | 'center' | 'end'

type Props = {
	/**
	 * 按钮组类型
	 *
	 * - 可统一设置按钮组内按钮的类型
	 * - 优先级低于按钮的类型属性
	 * - 默认值为 `default`
	 */
	type?: ButtonType
	/**
	 * 按钮组主题
	 *
	 * - 可统一设置按钮组内按钮的主题
	 * - 优先级低于按钮的主题属性
	 * - 默认值为 `default`
	 */
	theme?: ButtonTheme
	/**
	 * 按钮组大小
	 *
	 * - 可统一设置按钮组内按钮的大小
	 * - 优先级低于按钮的大小属性
	 * - 默认值为 `default`
	 */
	size?: ButtonSize
	/**
	 * 按钮组方向
	 *
	 * - 默认值为 `horizontal`
	 */
	direction?: GroupDirection
	/**
	 * 按钮组对齐方式
	 *
	 * - 默认值为 `start`
	 */
	align?: GroupAlign
	/**
	 * 是否紧凑模式
	 *
	 * - 默认值为 `false`
	 */
	tight?: boolean
	/**
	 * 是否显示分割线
	 *
	 * - 默认值为 `false`
	 */
	cutline?: boolean
}

const {
	theme = 'default',
	type = 'default',
	size = 'default',
	direction = 'horizontal',
	align = 'start',
	tight = false,
	cutline = false,
} = defineProps<Props>()

const hasCutline = computed(() => cutline && !tight)
const classObject = computed(() => ({
	[`is-align-${align}`]: true,
	[`is-direction-${direction}`]: true,
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
	const defaultSlots = slots.default?.() || []
	if (
		defaultSlots.some((vNode) => {
			vNode.type !== DButton
		})
	) {
		console.warn('DButtonGroup 只能包含 DButton 组件')
	}
}
</script>

<style lang="scss" scoped>
.p-button-group {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 20px;
	&.has-cutline {
		gap: 10px 0;
	}
	&.is-direction {
		&-horizontal {
			flex-direction: row;
		}
		&-vertical {
			flex-direction: column;
		}
	}
	&.is-align {
		&-start {
			justify-content: flex-start;
		}
		&-center {
			justify-content: center;
		}
		&-end {
			justify-content: flex-end;
		}
	}
	&.is-tight {
		gap: 5px 10px;
		&.has-cutline {
			gap: 5px 0;
		}
	}
	.cutline {
		position: relative;
		width: 21px;
		height: 100%;
		&:after {
			content: '';
			position: absolute;
			top: 15%;
			left: 50%;
			height: 70%;
			width: 1px;
			background-color: var(--docs-color-border);
			z-index: 1;
		}
		&.is-tight {
			width: 11px;
		}
	}
}
</style>
