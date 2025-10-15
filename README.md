# Vue Popup Plus 🚀

一个功能强大、灵活易用的 Vue 3 弹窗组件库，让弹窗管理变得简单而优雅。

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](https://github.com/yourusername/vue-popup-plus)

## ✨ 特性

* 🎯 **简单易用** - 简洁的 API，快速集成到您的项目中
* 🔌 **可扩展** - 自定义弹窗内容和样式，满足各种场景需求
* 🎭 **动画支持** - 内置多种动画效果，让弹窗展示更生动
* 📱 **响应式设计** - 完美适配各种屏幕尺寸
* 🧩 **TypeScript 支持** - 完整的类型定义，提供良好的开发体验

## 📦 安装

```bash
# 使用 npm
npm install vue-popup-plus

# 使用 yarn
yarn add vue-popup-plus

# 使用 pnpm
pnpm add vue-popup-plus
```

## 🚀 快速开始

### 全局注册

```js
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
import App from './App.vue'

const app = createApp(App)
const popup = createPopup()

app.use(popup)

app.mount('#app')
```

### 基本使用

```vue
<template>
  <button @click="showPopup">显示弹窗</button>
</template>

<script setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

const showPopup = () => {
    popup.render({
        // 组件
        component: () => import('./components/Demo.vue'),
        // 组件属性
        componentProps: {
            // 根据你的组件属性传入
        },
        width: 400,
        maxHeight: 600,
        mask: false
    })
}
</script>
```

## 📚 文档

查看我们的[在线文档](http://vue-popup-plus.styzy.cn)获取更多详细信息和高级用法。

## 🤝 贡献

欢迎贡献代码、报告问题或提出新功能建议！请查看[贡献指南](CONTRIBUTING.md)了解更多信息。

## 📄 许可证

[MIT](LICENSE) © Your Name
