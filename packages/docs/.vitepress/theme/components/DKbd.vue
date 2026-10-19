<template>
	<kbd class="d-kbd"><slot /></kbd>
</template>

<style lang="scss" scoped>
.d-kbd {
	display: inline-block;
	vertical-align: middle;
	padding: 2px 10px;
	min-width: 24px;
	line-height: 24px;
	text-align: center;
	border-radius: 4px;
	font-size: var(--docs-font-size-text-main);
	background-color: rgba(128, 128, 128, 0.1);
	border: 1px solid rgba(128, 128, 128, 0.15);
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
	&:hover {
		background-color: rgba(128, 128, 128, 0.15);
		border: 1px solid rgba(128, 128, 128, 0.2);
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
	}
}
</style>
