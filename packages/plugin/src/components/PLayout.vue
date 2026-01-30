<template lang="pug">
.popup-layout
	slot(name="header")
	.body
		slot
	slot(name="footer")
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PLayout',
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.popup-layout {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	box-sizing: border-box;
	overflow: hidden;
	.body {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		align-items: stretch;
		min-width: 0;
		min-height: 0;
		transform: translate(0);
	}
}
</style>
