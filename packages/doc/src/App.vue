<template lang="pug">
.doc-container
  header.doc-header
    .logo Vue Popup Plus
    nav.nav-links
      RouterLink(to="/") 首页
      RouterLink(to="/guide") 指南
      RouterLink(to="/api") API
      RouterLink(to="/examples") 示例
  main.doc-content
    RouterView
  footer.doc-footer
    p Copyright © {{ new Date().getFullYear() }} Vue Popup Plus
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style>
:root {
  --primary-color: #42b883;
  --text-color: #2c3e50;
  --border-color: #eaecef;
  --bg-color: #ffffff;
  --code-bg-color: #f8f8f8;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}

.doc-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.doc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary-color);
}

.doc-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.doc-footer {
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  color: #666;
  font-size: 0.9rem;
}
</style>
