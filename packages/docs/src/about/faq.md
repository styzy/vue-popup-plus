# 常见问题

## 与组件库的层级冲突问题

对于目前主流的 **Vue3** 开源组件库，例如 `ElementPlus` 、 `Ant Design Vue` 等，这些组件库内部在实现部分组件以及弹出层时，自己维护了一套层级 zIndex 体系。

如果出现和 **vue-popup-plus** 弹出层 `zIndex` 冲突的情况，可以通过 `createPopupPlus()` 的 `zIndex` 选项来降低 **vue-popup-plus** 的全局 `zIndex` 基准值。

```ts
import { createPopupPlus } from 'vue-popup-plus'

const PopupPlus = createPopupPlus({
	// 默认 2000，这里降低为 1000 来提供更好的兼容性
	zIndex: 1000,
})
```

## 预置插件版本问题

预置插件对核心版本具有较强的依赖关系，因此最佳实践是使用与核心版本相同的预置插件版本。
