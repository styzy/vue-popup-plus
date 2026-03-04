<template lang="pug">
.demo-anchor(@click="handleClose()")
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
	width: 60px;
	height: 20px;
	background-color: var(--popup-color-danger);
	color: #ffffff;
	cursor: pointer;
	&:hover {
		background-color: var(--popup-color-danger-light);
	}
}
</style>
