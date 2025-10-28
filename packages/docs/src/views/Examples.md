# 演示示例

> `vue-popup-plus` 只提供最基础的 `render` 方法，所有基于此的扩展功能由官方和社区共同维护的扩展插件提供，这里将展示最基础的功能以及官方维护的 [vue-popup-plus-plugin-preset](https://github.com/styzy/vue-popup-plus-plugin-preset) 预置插件所提供的功能。

## 基础功能

### 渲染

> 使用 `vue-popup-plus` 提供的最基础的 `render` 方法渲染弹出层

<DButton @click="handlePopup()" theme="primary">
  基础弹出层
</DButton>

## 插件预置

> `vue-popup-plus-plugin-preset` 预置插件提供了包括 `提示` 、 `确认` 、 `提示输入` 等常用功能。

### 消息 Toast

<DButtonGroup theme="primary" type="plain">
<DButton @click="handlePopupToast()" type="default">消息</DButton>
<DButton @click="handlePopupToastDuration()">自定义持续时间</DButton>
</DButtonGroup>

### 提示框 Alert

<DButtonGroup theme="primary" type="plain">
<DButton @click="handlePopupAlert()" type="default">提示框</DButton>
</DButtonGroup>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'
import Demo from './Demo.vue'

const popup = usePopup()

function handlePopup(){

	popup.render({
		component:Demo
	})

}

function handlePopupToast(){

	popup.toast('这是一条消息')

}

function handlePopupToastDuration(){

	popup.toast('这是一条消息 持续 5 秒',{
		duration:5000
	})

}

function handlePopupAlert(){

	popup.alert('这是一条提示消息')

}

</script>
