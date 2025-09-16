<template lang="pug">
.home-container
  .hero
    h1.title Vue Popup Plus
    p.description 一个功能强大、灵活的 Vue 3 弹出层组件
    p.version 当前版本: v{{ version }}
    .buttons
      RouterLink.button.primary(to="/guide") 快速开始
      RouterLink.button.secondary(to="/examples") 查看示例
  
  .features
    .feature-card
      h3 简单易用
      p 通过简洁的 API 快速创建各种弹出层，无需复杂配置
    
    .feature-card
      h3 高度可定制
      p 支持自定义组件、动画效果和样式，满足各种交互需求
    
    .feature-card
      h3 类型安全
      p 完整的 TypeScript 支持，提供良好的开发体验和代码提示
</template>

<script setup lang="ts">
import { version } from 'vue-popup-plus'

defineOptions({ name: 'Index' })
</script>

<style scoped>
.home-container {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
}

.title {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.description {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.version {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.primary {
  background-color: var(--primary-color);
  color: white;
}

.primary:hover {
  background-color: #3aa776;
}

.secondary {
  background-color: #f1f1f1;
  color: var(--text-color);
}

.secondary:hover {
  background-color: #e1e1e1;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}
</style>

