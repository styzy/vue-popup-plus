---
pageClass: api
outline: 2
---

# 全局 API：通用

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
