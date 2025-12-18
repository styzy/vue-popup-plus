<template lang="pug">
.p-footer
	slot
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PFooter',
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.p-footer {
	@include base-container(padding);

	box-sizing: border-box;
	background-color: var(--popup-plugin-preset-color-background-main);
}
</style>
