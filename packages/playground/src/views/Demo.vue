<template lang="pug">
.demo
	h1(:style="{ margin: '0' }") 这是一个弹框
	h2(:style="{ margin: '0' }") 测试属性：{{ test }}
	GlobalComponent
	input(placeholder="请输入返回值" type="text" v-model="result")
	button(@click="handleUpdateSize") 更新弹框尺寸
	button(@click="handleClose") 关闭弹框
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'

defineOptions({ name: 'Demo' })

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)

type Props = {
	test?: string
}

const { test = '' } = defineProps<Props>()

const result = ref(test)

function handleUpdateSize() {
	const popup = usePopup()
	instanceId &&
		popup.update(instanceId, {
			width: 900,
			height: '900px',
		})
}

function handleClose() {
	const popup = usePopup()
	instanceId && popup.destroy(instanceId, result.value)
}
</script>

<style lang="stylus" scoped>
.demo
	display flex
	flex-direction column
	align-items center
	gap 20px
	overflow hidden
	background-color #0183da
	padding 20px 0
	// height 100%
	// width 100%
	min-width 300px
	min-height 300px
	color #FFFFFF
</style>

