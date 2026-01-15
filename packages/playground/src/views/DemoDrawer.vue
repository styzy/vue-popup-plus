<template lang="pug">
.demo
	.header
		h1(:style="{ margin: '0' }") 这是一个抽屉组件
	.body
		//- GlobalComponent
	.footer
		input(placeholder="请输入返回值" type="text" v-model="result")
		PButtonGroup(direction="vertical")
			PButton(@click="handleCloseDrawer()" theme="primary" type="plain") 关闭抽屉 Drawer
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'
import PButtonGroup from '../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../plugin/src/components/PButton.vue'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

defineOptions({ name: 'Demo' })

type Emits = {
	/**
	 * 测试事件
	 */
	inputChange: [value: string]
}

const emit = defineEmits<Emits>()

type Props = {
	/**
	 * 测试属性
	 */
	test?: string
}

const { test = '' } = defineProps<Props>()

const result = ref(test)

watch(result, (newValue) => {
	emit('inputChange', newValue)
})

function handleCloseDrawer() {
	popup.drawerClose(result.value)
}
</script>

<style lang="stylus" scoped>
.demo
	overflow hidden
	// width 900px
	// height 900px
	min-width 300px
	min-height 300px
	background-color #EEEEEE
	.header,
	.body,
	.footer
		display flex
		flex-direction column
		align-items center
		gap 20px
		padding 20px 0
	.header
		background-color #0183da
		color #FFFFFF
	.body
		padding 0
	.footer
		padding 20px
		input
			display block
			padding 0 20px
			width 100%
			height 40px
			border-radius 4px
			border 1px solid #0183da
			outline none
			box-sizing border-box
</style>
