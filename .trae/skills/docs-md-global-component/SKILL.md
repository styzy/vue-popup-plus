---
name: docs-md-global-component
description: 本项目是 monorepo 项目，该技能限制目录为 docs 子包，为 markdown 文档的编写提供全局组件的AI支持。

---

# docs-md-global-component

## 描述
本项目是 monorepo 项目，该技能限制目录为 docs 子包，为 markdown 文档的编写提供全局组件的AI支持。

## 使用场景
在 markdown 文档中，当需要使用全局组件时，能够自动提示并插入组件的代码，全局组件统一使用 D 字母开头，当输入 D 字母开头的组件名后，能够自动根据上下文提示并插入组件的代码。

## 指令

当检测到 D 字母开头的组件名时，访问 docs 子包目录下的 .vitepress/theme/components/index.ts 文件，因为该目录下并不是所有的组件都全局注册，只有在 index.ts 文件中导出的组件才是全局注册的，所以需要根据组件名在 index.ts 文件中查找对应的组件代码。

根据上下文以及当前的需求场景，决定使用哪个公共组件。



