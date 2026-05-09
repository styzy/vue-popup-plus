<template lang="pug">
.g-viewport
	GTitle.viewport-title(second) viewportRef
	.viewport-wrapper
		.viewport-content
			slot
</template>

<style lang="scss" scoped>
.g-viewport {
	position: relative;
	width: 50vw;
	height: 70vh;
	padding: 40px;
	margin: auto auto 10vh;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
	background: #f0f0f0;
	overflow: hidden;
	.viewport-title {
		position: absolute;
		left: 0;
		top: 0;
		padding: 10px;
		z-index: 1;
	}
	.viewport-wrapper {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.viewport-content {
		width: 100vw;
		height: 100vh;
		padding: 800px;
	}
}
</style>
