<template lang="pug">
.guide-container
  h1 使用指南
  
  section.guide-section
    h2 安装
    pre.code-block
      code npm install vue-popup-plus
    
    p 或者使用 yarn:
    pre.code-block
      code yarn add vue-popup-plus
  
  section.guide-section
    h2 基本使用
    
    h3 1. 注册插件
    p 在你的 main.ts 文件中:
    pre.code-block
      code.
        import { createApp } from 'vue'
        import { createPopup } from 'vue-popup-plus'
        import App from './App.vue'
        
        const app = createApp(App)
        app.use(createPopup())
        app.mount('#app')
    
    h3 2. 在组件中使用
    p 方法 1: 通过 usePopup 组合式函数:
    pre.code-block
      code.
        // script setup
        import { usePopup } from 'vue-popup-plus'
        
        const popup = usePopup()
        
        function showPopup() {
          popup.render({
            component: YourComponent,
            props: {
              // 传递给组件的属性
            }
          })
        }
    
    p 方法 2: 通过全局 $popup 属性:
    pre.code-block
      code.
        // script setup
        function showPopup() {
          this.$popup.render({
            component: YourComponent,
            props: {
              // 传递给组件的属性
            }
          })
        }
  
  section.guide-section
    h2 高级配置
    p Vue Popup Plus 提供了丰富的配置选项，可以满足各种弹出层需求:
    
    h3 动画效果
    p 你可以使用内置的动画效果或自定义动画:
    pre.code-block
      code.
        import { POPUP_ANIMATIONS } from 'vue-popup-plus'
        
        popup.render({
          component: YourComponent,
          animation: POPUP_ANIMATIONS.FADE_IN_OUT,
          // 或者自定义动画
          animation: {
            enter: 'custom-enter',
            leave: 'custom-leave'
          }
        })
    
    h3 定位和样式
    p 控制弹出层的位置和样式:
    pre.code-block
      code.
        popup.render({
          component: YourComponent,
          position: 'center', // 'top', 'bottom', 'left', 'right', 'center'
          style: {
            width: '80%',
            maxWidth: '500px',
            background: '#fff',
            borderRadius: '8px'
          }
        })
</template>

<script setup lang="ts">
defineOptions({ name: 'Guide' })
</script>

<style scoped>
.guide-container {
  max-width: 800px;
  margin: 0 auto;
}

.guide-section {
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
}

h2 {
  font-size: 1.8rem;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

h3 {
  font-size: 1.3rem;
  margin: 1.5rem 0 0.5rem;
  color: var(--text-color);
}

p {
  margin-bottom: 1rem;
}

.code-block {
  background-color: var(--code-bg-color);
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
}
</style>