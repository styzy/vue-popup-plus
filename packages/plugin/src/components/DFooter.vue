<template lang="pug">
.footer Copyright © {{ new Date().getFullYear() }} Vue Popup Plus
</template>

<style lang="stylus" scoped>
.footer
	display flex
	justify-content center
	align-items center
	padding: 24px 0
	height 70px
	box-sizing border-box
	border-top: 1px solid $color-border
	color: $color-text-sub
	text-align center
	font-size: 14px
</style>
