<template lang="pug">
.d-api-group
	slot
</template>

<script setup lang="ts">
defineOptions({
	name: 'DApiGroup',
})
</script>

<style lang="scss" scoped>
.d-api-group {
	// display: flex;
	// flex-direction: wrap;
	columns: 2;
	// align-items: flex-start;
	// justify-content: flex-start;
	gap: 20px;
}
@media screen and (min-width: 1440px) {
	.d-api-group {
		columns: 3;
	}
}
</style>
