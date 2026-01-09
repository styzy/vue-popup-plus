# Vue Popup Plus 🚀

一个基于 Vue 3 的弹出层插件，为 Vue3 提供 编程式的 弹出层解决方案

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.6.0-orange.svg)](https://github.com/yourusername/vue-popup-plus)

## 📚 文档

查看我们的[在线文档](http://vue-popup-plus.styzy.cn)获取详细信息。

## ✨ 特性

- 🚀 **函数式渲染**

直接调用函数即可渲染弹出层，无须依赖父组件的模板挂载和手动维护渲染状态，最大程度降低代码侵入性，使弹出层和调用组件完全解耦。

- 📦 **高度可定制**

提供丰富的配置选项，支持自定义组件、动画效果和样式，强大的插件扩展能力提供高度可定制化的功能，便于独立维护。

- 🛡️ **类型安全**

完整的 TypeScript 支持，提供良好的开发体验和代码提示，确保类型安全和代码质量，全面降低开发和维护成本。

- 🎭 **动画支持**

内置多种动画效果，让弹窗展示更生动

- 🧩 **支持插件扩展**

提供了强大的 `插件扩展` 能力，轻松自定义各种插件，充分满足各种扩展场景。

## 📦 安装

### npm

```bash
npm install vue-popup-plus vue-popup-plus-plugin-preset
```

### yarn

```bash
yarn add vue-popup-plus vue-popup-plus-plugin-preset
```

### pnpm

```bash
pnpm add vue-popup-plus vue-popup-plus-plugin-preset
```

## 🚀 快速开始

### 全局注册

```js
import { createApp } from 'vue'
import { createPopupPlus } from 'vue-popup-plus'
import { createPresetPlugin } from 'vue-popup-plus-plugin-preset'
import App from './App.vue'

const app = createApp(App)
const PopupPlus = createPopupPlus()
const PresetPlugin  = createPresetPlugin()

PopupPlus.use(PresetPlugin)

app.use(PopupPlus)

app.mount('#app')
```

### 基本使用

```vue
<template>
	<button @click="handlePopup">显示弹出层</button>
	<button @click="handleToast">显示轻量提示</button>
	<button @click="handleAlert">显示提示</button>
	<button @click="handleConfirm">显示确认</button>
	<button @click="handlePrompt">显示提示输入</button>
	<button @click="handleDialog">显示对话</button>
	<button @click="handleLoading">显示加载遮罩</button>
	<button @click="handleAlbum">显示相册</button>
</template>

<script setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

function handlePopup() {
	popup.render({
		// 组件
		component: () => import('./HelloWorld.vue'),
		// 组件属性
		componentProps: {
			// 根据你的组件属性传入
		},
		mask: false,
	})
}

function handleToast() {
	popup.toast('这是一个轻量提示')
}

function handleAlert() {
	popup.alert('这是一个提示')
}

async function handleConfirm() {
	if (await popup.confirm('这是一个确认提示')) {
		console.log('用户点击了确认')
	} else {
		console.log('用户点击了取消')
	}
}

async function handlePrompt() {
	const value = await popup.prompt('请输入姓名')
	if (value) {
		console.log('用户输入了姓名:', value)
	} else {
		console.log('用户取消了输入')
	}
}

function handleDialog() {
	popup.dialog({
		// 组件
		component: () => import('./HelloWorld.vue'),
		// 组件属性
		componentProps: {
			// 根据你的组件属性传入
		},
		mask: false,
	})
}

function handleLoading() {
	popup.loading({
		title: '加载中...',
	})

	setTimeout(() => {
		popup.loadingClose()
	}, 10000)
}

function handleAlbum() {
	popup.album({
		sources: [
			'https://example.com/image1.jpg',
			'https://example.com/image2.jpg',
		],
		defaultIndex: 1,
	})
}
</script>
```

## 🤝 贡献

欢迎贡献代码、报告问题或提出新功能建议！

<!-- 请查看[贡献指南](CONTRIBUTING.md)了解更多信息。 -->

<a href="https://github.com/styzy/vue-popup-plus/graphs/contributors"><img src="https://contrib.rocks/image?repo=styzy/vue-popup-plus" /></a>

## 📄 许可证

[MIT](LICENSE)

Copyright (c) 2025-present, STYZY
