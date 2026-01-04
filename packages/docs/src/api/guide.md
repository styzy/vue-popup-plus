---
pageClass: api-guide
sidebar: false
aside: false
outline: false
prev: false
next: false
---

# API 总览

## 核心 API

<DApiGird>
	<DApiGroup title="核心实例">
		<DApi path="/api/core#create-popup-plus">createPopupPlus()</DApi>
		<DApi path="/api/core#popup-plus-use">PopupPlus.use()</DApi>
		<DApi path="/api/core#popup-plus-version">PopupPlus.version</DApi>
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
		<DApi path="/api/composition-api#use-popup-instance-id">usePopupInstanceId()</DApi>
		<DApi path="/api/composition-api#use-popup-computed-style">usePopupComputedStyle()</DApi>
	</DApiGroup>
	<DApiGroup title="选项式工具">
		<DApi path="/api/options#popup">$popup</DApi>
		<DApi path="/api/options#popup-instance-id">$popupInstanceId</DApi>
		<DApi path="/api/options#popup-computed-style">$popupComputedStyle</DApi>
	</DApiGroup>
	<DApiGroup title="常量">
		<DApi path="/api/constants#popup-animations">POPUP_ANIMATIONS</DApi>
		<DApi path="/api/constants#popup-component-injects">POPUP_COMPONENT_INJECTS</DApi>
	</DApiGroup>
	<DApiGroup title="插件开发">
		<DApi path="/api/plugin#define-plugin">definePlugin()</DApi>
	</DApiGroup>
	<DApiGroup title="日志工具">
		<DApi path="/api/log#print-log">printLog()</DApi>
		<DApi path="/api/log#log">Log</DApi>
	</DApiGroup>
	<DApiGroup title="TypeScript 工具类型">
		<DApi path="/api/types#extract-component-prop-types">{{ 'ExtractComponentPropTypes<T>' }}</DApi>
		<DApi path="/api/types#extract-component-all-prop-types">{{ 'ExtractComponentAllPropTypes<T>' }}</DApi>
	</DApiGroup>
</DApiGird>

## 预置插件 API

<DApiGird>
	<DApiGroup title="Toast 消息">
		<DApi path="/api-plugin-preset/toast#toast">popup.toast()</DApi>
		<DApi path="/api-plugin-preset/toast#toast-primary">popup.toastPrimary()</DApi>
		<DApi path="/api-plugin-preset/toast#toast-success">popup.toastSuccess()</DApi>
		<DApi path="/api-plugin-preset/toast#toast-info">popup.toastInfo()</DApi>
		<DApi path="/api-plugin-preset/toast#toast-warning">popup.toastWarning()</DApi>
		<DApi path="/api-plugin-preset/toast#toast-danger">popup.toastDanger()</DApi>
	</DApiGroup>
	<DApiGroup title="Message 消息">
		<DApi path="/api-plugin-preset/message#message">popup.message()</DApi>
	</DApiGroup>
	<DApiGroup title="Alert 提示">
		<DApi path="/api-plugin-preset/alert#alert">popup.alert()</DApi>
	</DApiGroup>
	<DApiGroup title="Confirm 确认">
		<DApi path="/api-plugin-preset/confirm#confirm">popup.confirm()</DApi>
	</DApiGroup>
	<DApiGroup title="Prompt 提示输入">
		<DApi path="/api-plugin-preset/prompt#prompt">popup.prompt()</DApi>
	</DApiGroup>
	<DApiGroup title="Dialog 对话">
		<DApi path="/api-plugin-preset/dialog#dialog">popup.dialog()</DApi>
		<DApi path="/api-plugin-preset/dialog#dialog-close">popup.dialogClose()</DApi>
	</DApiGroup>
	<DApiGroup title="Loading 加载遮罩">
		<DApi path="/api-plugin-preset/loading#loading">popup.loading()</DApi>
		<DApi path="/api-plugin-preset/loading#loading-close">popup.loadingClose()</DApi>
	</DApiGroup>
	<DApiGroup title="Album 相册">
		<DApi path="/api-plugin-preset/album#album">popup.album()</DApi>
	</DApiGroup>
	<DApiGroup title="通用">
		<DApi path="/api-plugin-preset/common#version">version</DApi>
	</DApiGroup>
</DApiGird>
