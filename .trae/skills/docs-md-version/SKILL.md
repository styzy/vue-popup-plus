---
name: docs-md-version
description: 本项目是 monorepo 项目，该技能限制目录为 docs 子包，对 markdown 文件中一些新功能或废弃功能的版本支持信息，使用内置的公共组件进行编写。
---

# docs-md-version

## 描述
本项目是 monorepo 项目，该技能限制目录为 docs 子包，对 markdown 文件中一些新功能或废弃功能的版本支持信息，使用内置的公共组件进行编写。

## 指令

当检测到需要对某个特性功能进行版本支持或废弃信息时，使用 DVersionSupport 组件进行编写，一般是在 markdown 文件的标题处添加版本信息。

DVersionSupport 组件的代码示例如下：

```md
<!-- 新增功能 -->
## 关闭对话框 <Badge text="1.5.0+" />

> <DVersionSupport package="plugin" version="1.5.0" />
```

```md
<!-- 废弃功能 -->
## popup.toast.warning() <Badge type="danger" text="1.6.0-" />

> <DVersionSupport package="plugin" version="1.6.0"  deprecated/>
```

其中 Badge 组件需要渲染为标题徽章，末尾必须包含 `+` 符号，如果是废弃的功能，需要将 type 设置为 `danger`，并在末尾包含 `-` 符号。

同时需要在下方使用 DVersionSupport 组件进行编写，package 属性表示当前特性是核心还是插件提供的，可选值包括 `plugin` 和 `core`，默认为 `core` ，需要根据当前的功能自动分析是核心功能还是插件功能。 version 属性表示当前特性的版本号，必填。 如果是废弃的功能，需要在 DVersionSupport 组件中添加 deprecated 属性。


