---
pageClass: api-guide
sidebar: false
aside: false
outline: false
prev: false
next: false
---

<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue'

const filter = reactive({
	keyword: '',
	showVersion: false,
})

onMounted(() => {
	filter.showVersion = !!window.localStorage.getItem('apiShowVersion') || false
})

watch(() => filter.showVersion, (newVal) => {
	if(newVal) {
		window.localStorage.setItem('apiShowVersion', '1')
	} else {
		window.localStorage.removeItem('apiShowVersion')
	}
})

</script>

# API 总览

<DApiFilter :filter="filter" />

<DApiGird title="核心 API" :filter="filter">
	<DApiGroup title="核心实例">
		<DApi path="/api/core#create-popup-plus" support="1.6.0">createPopupPlus()</DApi>
		<DApi path="/api/core#create-popup" deprecated="1.6.0">createPopup()</DApi>
		<DApi path="/api/core#popup-plus-use" support="1.6.0">PopupPlus.use()</DApi>
		<DApi path="/api/core#popup-plus-version" support="1.6.0">PopupPlus.version</DApi>
	</DApiGroup>
	<DApiGroup title="控制器实例">
		<DApi path="/api/controller#use-popup">usePopup()</DApi>
		<DApi path="/api/controller#popup-render">popup.render()</DApi>
		<DApi path="/api/controller#popup-update">popup.update()</DApi>
		<DApi path="/api/controller#popup-destroy">popup.destroy()</DApi>
		<DApi path="/api/controller#popup-version">popup.version</DApi>
	</DApiGroup>
	<DApiGroup title="通用">
		<DApi path="/api/common#version">version</DApi>
	</DApiGroup>
	<DApiGroup title="组合式工具">
		<DApi path="/api/controller#use-popup">usePopup()</DApi>
		<DApi path="/api/composition-api#use-popup-instance-id" support="1.6.0">usePopupInstanceId()</DApi>
		<DApi path="/api/composition-api#use-popup-computed-style" support="1.6.0">usePopupComputedStyle()</DApi>
	</DApiGroup>
	<DApiGroup title="选项式工具">
		<DApi path="/api/options#popup">$popup</DApi>
		<DApi path="/api/options#popup-instance-id" support="1.6.0">$popupInstanceId</DApi>
		<DApi path="/api/options#popup-computed-style" support="1.6.0">$popupComputedStyle</DApi>
	</DApiGroup>
	<DApiGroup title="常量">
		<DApi path="/api/constants#popup-animations">POPUP_ANIMATIONS</DApi>
		<DApi path="/api/constants#popup-component-injects">POPUP_COMPONENT_INJECTS</DApi>
	</DApiGroup>
	<DApiGroup title="插件开发">
		<DApi path="/api/plugin#define-plugin">definePlugin()</DApi>
	</DApiGroup>
	<DApiGroup title="日志工具">
		<DApi path="/api/log#print-log" support="1.5.0">printLog()</DApi>
		<DApi path="/api/log#log" support="1.5.0">Log</DApi>
	</DApiGroup>
	<DApiGroup title="TypeScript 工具类型">
		<DApi path="/api/types#extract-component-prop-types" support="1.5.0">{{ 'ExtractComponentPropTypes<T>' }}</DApi>
		<DApi path="/api/types#extract-component-all-prop-types" support="1.5.0">{{ 'ExtractComponentAllPropTypes<T>' }}</DApi>
	</DApiGroup>
</DApiGird>

<DApiGird title="预置插件 API" :filter="filter">
	<DApiGroup title="Toast 轻量提示">
		<DApi path="/api/plugin-preset/toast#popup-toast">popup.toast()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-primary" support="1.6.0">popup.toastPrimary()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-success" support="1.6.0">popup.toastSuccess()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-info" support="1.6.0">popup.toastInfo()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-warning" support="1.6.0">popup.toastWarning()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-danger" support="1.6.0">popup.toastDanger()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-success-1" support="1.5.0" deprecated="1.6.0">popup.toast.success()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-info-1" support="1.5.0" deprecated="1.6.0">popup.toast.info()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-warning-1" support="1.5.0" deprecated="1.6.0">popup.toast.warning()</DApi>
		<DApi path="/api/plugin-preset/toast#popup-toast-danger-1" support="1.5.0" deprecated="1.6.0">popup.toast.danger()</DApi>
	</DApiGroup>
	<DApiGroup title="Message 消息">
		<DApi path="/api/plugin-preset/message#popup-message">popup.message()</DApi>
	</DApiGroup>
	<DApiGroup title="Alert 提示">
		<DApi path="/api/plugin-preset/alert#popup-alert">popup.alert()</DApi>
	</DApiGroup>
	<DApiGroup title="Confirm 确认">
		<DApi path="/api/plugin-preset/confirm#popup-confirm">popup.confirm()</DApi>
	</DApiGroup>
	<DApiGroup title="Prompt 提示输入">
		<DApi path="/api/plugin-preset/prompt#popup-prompt">popup.prompt()</DApi>
	</DApiGroup>
	<DApiGroup title="Dialog 对话">
		<DApi path="/api/plugin-preset/dialog#popup-dialog">popup.dialog()</DApi>
		<DApi path="/api/plugin-preset/dialog#popup-dialog-close" support="1.6.0">popup.dialogClose()</DApi>
		<DApi path="/api/plugin-preset/dialog#popup-dialog-close-1" support="1.5.0" deprecated="1.6.0">popup.dialog.close()</DApi>
	</DApiGroup>
	<DApiGroup title="Loading 加载遮罩">
		<DApi path="/api/plugin-preset/loading#popup-loading">popup.loading()</DApi>
		<DApi path="/api/plugin-preset/loading#popup-loading-close">popup.loadingClose()</DApi>
		<DApi path="/api/plugin-preset/loading#popup-loading-close-1" support="1.5.0" deprecated="1.6.0">popup.loading.close()</DApi>
	</DApiGroup>
	<DApiGroup title="Album 相册">
		<DApi path="/api/plugin-preset/album#popup-album">popup.album()</DApi>
	</DApiGroup>
	<DApiGroup title="通用">
		<DApi path="/api/plugin-preset/common#version">version</DApi>
	</DApiGroup>
</DApiGird>
