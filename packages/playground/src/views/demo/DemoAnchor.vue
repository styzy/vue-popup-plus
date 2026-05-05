<template lang="pug">
.demo-anchor(ref="demoAnchorRef")
	.title
		PButton(@click="handleResize()" theme="success") 调整大小
		PButton(@click="handleClose()" theme="warning") 关闭
	.content 这是一段很长的文本，这是一段很长的文本，这是一段很长的文本。
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { usePopup, usePopupInstanceId } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = usePopupInstanceId()
const demoAnchorRef = useTemplateRef('demoAnchorRef')

const width = ref('500px')
const height = ref('auto')

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
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	width: v-bind(width);
	height: v-bind(height);
	background-color: var(--popup-color-danger);
	color: #eeeeee;
	cursor: pointer;
	.title {
		display: flex;
		justify-content: space-between;
		gap: 5px;
		span {
			font-size: 14px;
			&:hover {
				color: #ffffff;
				font-weight: 700;
			}
		}
	}
}
</style>
