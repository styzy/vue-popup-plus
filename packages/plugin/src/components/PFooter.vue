<template lang="pug">
.popup-footer
	slot
</template>

<script lang="ts" setup>
defineOptions({
	name: 'PFooter',
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/inject.scss' as *;

.popup-footer {
	@include base-container(padding);

	box-sizing: border-box;
	background-color: use-color('background-main');
}
</style>
