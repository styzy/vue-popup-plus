<template lang="pug">
.demo-anchor(ref="demoAnchorRef")
	span(@click="handleClose()") 关闭
	span(@click="handleResize()") 调整大小
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { usePopup, usePopupInstanceId } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = usePopupInstanceId()
const demoAnchorRef = useTemplateRef('demoAnchorRef')

const width = ref('auto')
const height = ref('40px')

function handleClose() {
	instanceId && popup.destroy(instanceId)
}

function handleResize() {
	const rect = demoAnchorRef.value!.getBoundingClientRect()
	width.value = `${rect.width + 10}px`
	height.value = `${rect.height + 10}px`
}
</script>
<style lang="scss" scoped>
.demo-anchor {
	display: flex;
	gap: 10px;
	padding: 5px 10px;
	width: v-bind(width);
	height: v-bind(height);
	background-color: var(--popup-color-danger);
	span {
		color: #eeeeee;
		font-size: 14px;
		cursor: pointer;
		&:hover {
			color: #ffffff;
			font-weight: 700;
		}
	}
}
</style>
