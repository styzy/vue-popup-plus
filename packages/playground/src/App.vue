<template lang="pug">
AConfigProvider(:locale="zhCN")
	ElConfigProvider(:locale="elZhCn")
		RouterView
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import elZhCn from 'element-plus/es/locale/lang/zh-cn'
import { PopupRoot } from 'vue-popup-plus'
</script>
