---
pageClass: api
outline: 2
---

# TypeScript 工具类型

::: tip
此页面仅列出了一些 `常用的` 工具类型。
:::

## ExtractComponentPropTypes\<T\> <Badge text="1.5.0+" /> {#extract-component-prop-types}

> <DVersionSupport version="1.5.0" />

用于从组件中提取组件的 props 类型。

对于异步组件，因为内部做了动态处理，因此支持直接使用 `() => import()` 的导入方式。

### 示例

```ts [HelloWorld.vue]
// 组合式 + TypeScript 类型定义
type Props = {
	foo: string
	bar?: number
	baz?: boolean
}

const { foo, bar = 0, baz = false } = defineProps<Props>()

// 选项式 类型定义
export default {
	props: {
		foo: {
			type: String,
			required: true,
		},
		bar: {
			type: Number,
			default: 0,
		},
		baz: {
			type: Boolean,
			default: false,
		},
	},
}
```

```ts
import { defineAsyncComponent } from 'vue'
import { type ExtractComponentPropTypes } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

// 同步组件
type HelloWorldProps = ExtractComponentPropTypes<typeof HelloWorld>

// 异步组件 不使用 defineAsyncComponent 导入
const asyncComponent = () => import('./HelloWorld.vue')
type HelloWorldProps = ExtractComponentPropTypes<typeof asyncComponent>

// 异步组件 使用 defineAsyncComponent 导入
const asyncComponent = defineAsyncComponent(() => import('./HelloWorld.vue'))
type HelloWorldProps = ExtractComponentPropTypes<typeof asyncComponent>

// 三种组件引用方式均可以提取如下类型
// {
// 	foo: string
// 	bar?: number
// 	baz?: boolean
// } & ComponentCustomProps
```

## ExtractComponentAllPropTypes\<T\> <Badge text="1.5.0+" /> {#extract-component-all-prop-types}

> <DVersionSupport version="1.5.0" />

用于从组件中提取组件所有被允许传入的 props 类型，相较于 `ExtractComponentPropTypes` 工具类型，还增加了对底层 `VNodeProps` 和 `AllowedComponentProps` 类型属性的支持。

### 示例

```ts
import { type ExtractComponentAllPropTypes } from 'vue-popup-plus'
import HelloWorld from './HelloWorld.vue'

type HelloWorldAllProps = ExtractComponentAllPropTypes<typeof HelloWorld>

// {
// 	foo: string
// 	bar?: number
// 	baz?: boolean
// } & ComponentCustomProps & VNodeProps & AllowedComponentProps
```
