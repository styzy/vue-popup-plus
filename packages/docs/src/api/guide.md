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

<DApiGroup>
	<DApi title="核心实例" :links="PopupPlusApis" />
    <DApi title="控制器实例" :links="ControllerApis" />
	<DApi title="组合式工具" :links="useApis" />
    <DApi title="通用" :links="CommonApis" />
    <DApi title="常量" :links="ConstantsApis" />
	<DApi title="插件开发" :links="PluginApis" />
	<DApi title="日志工具" :links="LogApis" />
	<DApi title="TypeScript 工具类型" :links="TypeScriptApis" />
</DApiGroup>

<script lang="ts" setup>
const PopupPlusApis = [
	{
		label: 'createPopupPlus()',
		url: '/api/core#create-popup-plus',
	},{
		label: 'PopupPlus.use()',
		url: '/api/core#popup-plus-use',
	},{
		label: 'PopupPlus.version',
		url: '/api/core#popup-plus-version',
	}
]

const ControllerApis = [
	{
		label: 'usePopup()',
		url: '/api/controller#use-popup',
	},{
		label: 'popup.render()',
		url: '/api/controller#popup-render',
	},{
		label: 'popup.update()',
		url: '/api/controller#popup-update',
	},{
		label: 'popup.destroy()',
		url: '/api/controller#popup-destroy',
	},{
		label: 'popup.version',
		url: '/api/controller#popup-version',
	}
]

const useApis = [
	{
		label: 'usePopup()',
		url: '/api/controller#use-popup',
	},{
		label: 'usePopupInstanceId()',
		url: '/api/use-api#use-popup-instance-id',
	},{
		label: 'usePopupComputedStyle()',
		url: '/api/use-api#use-popup-computed-style',
	}
]

const CommonApis = [
	{
		label: 'version',
		url: '/api/common#version',
	}
]

const ConstantsApis = [
	{
		label: 'POPUP_ANIMATIONS',
		url: '/api/constants#popup-animations',
	},{
		label: 'POPUP_COMPONENT_INJECTS',
		url: '/api/constants#popup-component-injects',
	}
]

const PluginApis = [
	{
		label: 'definePlugin()',
		url: '/api/plugin#define-plugin',
	}
]

const LogApis = [
	{
		label: 'printLog()',
		url: '/api/log#print-log',
	},
	{
		label: 'Log',
		url: '/api/log#log',
	}
]

const TypeScriptApis = [
	{
		label: 'ExtractComponentPropTypes<T>',
		url: '/api/types#extract-component-prop-types',
	},{
		label: 'ExtractComponentAllPropTypes<T>',
		url: '/api/types#extract-component-all-prop-types',
	}
]


</script>
