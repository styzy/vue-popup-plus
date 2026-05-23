<template lang="pug">
.g-container
	slot
</template>

<style lang="scss" scoped>
.g-container {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px;
	padding: 20px;
	box-sizing: border-box;
	background-color: var(--playground-color-background-main);
}
</style>
