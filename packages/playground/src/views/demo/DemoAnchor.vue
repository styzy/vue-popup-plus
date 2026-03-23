<template lang="pug">
.demo-anchor(@click="handleClose()") 点击关闭点击关闭点击关闭
</template>

<script lang="ts" setup>
import { usePopup, usePopupInstanceId } from 'vue-popup-plus'

const popup = usePopup()

const instanceId = usePopupInstanceId()

function handleClose() {
	instanceId && popup.destroy(instanceId)
}
</script>
<style lang="scss" scoped>
.demo-anchor {
	background-color: var(--popup-color-danger);
	color: #ffffff;
	padding: 5px 10px;
	font-size: 14px;
	cursor: pointer;
	&:hover {
		background-color: var(--popup-color-danger-light);
	}
}
</style>
