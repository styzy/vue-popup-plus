---
name: plugin-scss-inject
description: 本项目是 monorepo 项目，该技能限制目录为 plugin 子包，使用公共的 scss 函数或混入为样式提供统一的样式，如颜色、字体、间距等，同时当组件需要针对 skin 皮肤进行样式定制时，也可以使用混入。
---

# plugin-scss-inject

## 描述
本项目是 monorepo 项目，该技能限制目录为 plugin 子包，使用公共的 scss 函数或混入为样式提供统一的样式，如颜色、字体、间距等，同时当组件需要针对 skin 皮肤进行样式定制时，也可以使用混入。

## 指令

### 检索可用的注入
锁定代码范围在 plugin 子包的目录下。首先在 assets/styles 目录下，找到 inject.scss 文件，该文件包含了相关的混入与函数，例如统一样式变量，定义皮肤，使用公共混入样式指定基本样式、统一动画持续时间等。css-vars.scss 文件包含了相关的变量文件，如 colors.scss、font-size.scss、skin.scss、common.scss 等。

### 分析使用场景
根据不同的场景，例如皮肤，则使用皮肤相关的混入，再例如使用公共变量，则使用颜色，字体尺寸，统一变量等函数

### 生成代码
根据分析的使用场景，生成对应的 scss 代码。可以参考实例代码。
