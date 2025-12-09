<template lang="pug">
.demo
	h1(:style="{ margin: '0' }") 这是一个弹框
	h2(:style="{ margin: '0' }") 测试属性：{{ test }}
	GlobalComponent
	input(placeholder="请输入返回值" type="text" v-model="result")
	button(@click="handleUpdateSize") 更新弹框尺寸
	button(@click="handleClose") 关闭弹框 core
	button(@click="handleCloseDialog()") 关闭弹框 dialog
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { POPUP_COMPONENT_INJECTS, usePopup } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

defineOptions({ name: 'Demo' })

type Props = {
	/**
	 * 测试属性
	 */
	test?: string
}

const { test = '' } = defineProps<Props>()

const result = ref(test)

function handleUpdateSize() {
	popup.update(instanceId, {
		width: 900,
		height: '900px',
	})
}

function handleClose() {
	popup.destroy(instanceId, result.value)
}

function handleCloseDialog() {
	popup.dialog.close(result.value)
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
	// width 900px
	// height 900px
	min-width 300px
	min-height 300px
	color #FFFFFF
</style>
