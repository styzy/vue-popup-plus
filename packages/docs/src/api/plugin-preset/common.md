---
pageClass: api
outline: 2
---

# 通用 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## setLocale <Badge text="1.7.0+" /> {#set-locale}

> <DVersionSupport package="plugin" version="1.7.0" />

设置预置插件的国际化语言包。

### 类型

```ts
function setLocale(locale: PopupLocaleMessages): void
```

### 详细信息

预置插件独立构建了多个语言包，只需要按需引入之后通过该方法进行加载即可实现语言切换。

### 示例

```ts
import { setLocale } from 'vue-popup-plus-plugin-preset'
// 引入简体中文语言包
import zhCN from 'vue-popup-plus-plugin-preset/locales/zh-CN'

// 设置为简体中文语言
setLocale(zhCN)
```

### 相关参考

- [预置插件指南 - 国际化](/guide-plugin-preset/locales)

## version

暴露当前所使用的 `预置插件` 版本号。

### 类型

```ts
const version: string
```

### 详细信息

预置插件 版本号，格式为 `x.y.z`，其中 `x` 为主版本号，`y` 为次版本号，`z` 为修订版本号。

主版本号一般不会改变。

次版本号更新意味着包含存在兼容性改动，需要注意升级时的影响。

修订版本号更新意味着只包含 bug 修复和性能优化，不会引入新的功能或兼容性问题。

### 示例

```ts
import { version } from 'vue-popup-plus-plugin-preset'

console.log(version)
```
