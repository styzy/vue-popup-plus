<template lang="pug">
.d-api-grid
	slot
</template>

<script setup lang="ts">
defineOptions({
	name: 'DApiGrid',
})
</script>

<style lang="scss" scoped>
.d-api-grid {
	columns: 2;
	gap: 20px;
}
@media screen and (min-width: 1440px) {
	.d-api-grid {
		columns: 3;
	}
}
</style>
