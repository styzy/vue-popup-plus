# 渲染指令 <Badge text="1.7.0+" />

> <DVersionSupport version="1.7.0" />

## 写在前面

友情提示：**内容较长，请谨慎阅读**

<DButton @click="isShowPreface = true" theme="primary" type="plain">点击继续阅读</DButton>

<div v-if="isShowPreface">

渲染指令已于 <DVersion version="1.7.0" /> 正式登场。

其实早在 <DVersion version="1.4.0" /> ，渲染指令就已经初具雏形。

这项功能的落地，历经数次的推倒与重构，究其根源，和 `Vue` 生态内多数框架面临的困境一致：自定义指令始终难以平衡 **使用成本** 与 **场景泛化** 的矛盾。

众所周知，`Vue` 指令体系素来以 **轻量高效** 见长。`v-if` 、`v-for` 、`v-model` 等官方内置指令各司其职，皆是 `Vue` 体系里亮眼的核心能力。

它们的光芒过于夺目，也渐渐掩盖了其他衍生能力的发展空间。

放眼整个 `Vue` 社区，虽有少量自定义指令类插件持续维护，但对比 `VueUse` 这类成熟的组合式工具生态，整体发展近乎空白。

归根结底，自定义指令的定位本身就十分尴尬。

官方 **内置指令能力完备**，基本覆盖绝大多数前端开发场景。而自定义指令本职聚焦 **底层 DOM 复用** ，既无法像组合式函数、业务组件那样 **实现场景高度聚合** ，也难以给到开发者 **顺滑的使用体验** 。

这就导致只有具备独立专属场景，同时对 `DOM` 操作、逻辑复用有较高要求的业务，才能凸显出自定义指令的价值。

**VuePopupPlus** 恰好契合这类应用条件。

一方面，弹出层是前端项目 **通用基础能力** ，具备 **稳定** 且 **广泛** 的业务需求，不存在场景流失问题。

另一方面，弹出层底层实现逻辑，和 `Vue` 模板化渲染结构 **截然相悖** 。 `Vue` 组件遵循 **树形 DOM 嵌套** 结构，而弹出层普遍脱离原有 DOM 层级，采用 **扁平化挂载** 形式。 `Vue` 内置组件 `<Teleport>` 的出现，也正是官方为适配弹出层渲染场景推出的解决方案。

在前端技术迎来颠覆性革新前，弹出层对 **DOM 操作** 的依赖始终无法脱离。

这也是我发起 **VuePopupPlus** 项目的初衷之一。

经过反复思考与实践打磨，最终确定设计方向：

在 **极简调用** 的前提下， **完整保留** 弹出层渲染能力，做到渲染水准不输 `render()` 函数，同时内置 **响应迅速** 的 **事件触发机制** 。

前端本身是 **多语言** 、**多设计范式** 融合的技术领域，即便 `Vue` 这般成熟强大的框架，也无法做到面面俱到。

我始终期许，未来能有更多开发者，发掘冷门技术的实用价值，让渐渐淡出视野的技术形态，再度焕发独有的**<span class="rainbow">光彩</span>**。

</div>

## 介绍

使用 `popup.render()` 函数渲染弹出层并不是我们在 **极简化** 道路上的最终目标，而 **指令** 作为 `Vue` 最轻量化的功能，自然也可以被用于渲染弹出层，由此便诞生了 `v-popup` 指令。

和 `render()` 函数相比，除了使用方式上的不同，`v-popup` 指令拥有和 `render()` 函数完全一样的能力，并且在此基础上还提供了内置的 **事件快速触发机制** 。

难以想象，只需要在模板内添加一个指令，便可以轻易地 **脱离 JS/TS** 渲染任意弹出层。

## 基础使用

只需要使用 `v-popup` 这一指令，便可以轻易地在模板中渲染弹出层。

:::demo !expand

```html
<DButton v-popup="HelloPopup" theme="primary">点击渲染弹出层</DButton>
```

```ts
import HelloPopup from '../HelloPopup.vue'
```

:::

当然如果你觉得先引入视图组件比较麻烦，你也可以直接在指令中使用 `import()` 动态导入，在 **不增加代码行数** 的情况下实现渲染弹出层。

:::demo !expand

```html
<DButton v-popup="()=>import('../HelloPopup.vue')" theme="primary"
	>点击渲染弹出层</DButton
>
```

:::

## 触发方式

默认情况下，弹出层由点击事件触发渲染。

通过 `v-popup` 指令的修饰符，你可以自定义触发弹出层的事件。

触发事件修饰符有：

- `hover` 悬停触发
- `click` 点击触发
- `contextmenu` 右键触发

:::demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton v-popup.hover="HelloPopup">悬停渲染弹出层</DButton>
	<DButton v-popup.click="HelloPopup">点击渲染弹出层</DButton>
	<DButton v-popup.contextmenu="HelloPopup">右键渲染弹出层</DButton>
</DButtonGroup>
```

:::

## 事件修饰符

你可能已经注意到了，在通过右键触发弹出层时，同时还触发了原生的右键事件。

因此，你可以通过事件修饰符来阻止默认事件或冒泡。

- `prevent` 阻止默认事件
- `stop` 阻止冒泡

:::demo

```html
<DButtonGroup theme="primary" type="plain">
	<DButton v-popup.contextmenu.prevent="HelloPopup"
		>右键渲染弹出层(阻止默认事件)</DButton
	>
	<DButton @click="handleOuterClick"
		>点击触发外部点击事件
		<DButton v-popup.click.stop="HelloPopup" theme="success" type="default"
			>点击渲染弹出层(阻止冒泡)</DButton
		>
		<DButton v-popup.click="HelloPopup" theme="danger" type="default"
			>点击渲染弹出层</DButton
		></DButton
	>
</DButtonGroup>
```

```ts
function handleOuterClick() {
	alert('外部点击事件')
}
```

:::

## 其他参数

和 `popup.render()` 函数一样，`v-popup` 指令也可以传入一个完整的弹出层选项对象。

:::demo

```html
<DButton
	v-popup="{
		component: HelloPopup,
		componentProps: {
			test: '来自 v-popup 指令触发的测试参数'
		},
		maskBlur: true,
	}"
	theme="primary"
	>点击渲染弹出层</DButton
>
```

:::

具体可以参考 [核心 API - 控制器实例 popup.render()](/api/controller#popup-render)。

<script setup lang="ts">
import { ref } from 'vue'
import HelloPopup from '../HelloPopup.vue'

const isShowPreface = ref(false)

function handleOuterClick() {
	alert('外部点击事件')
}
</script>

<style scoped lang="scss">
.rainbow {
	@include base-text-rainbow(0.5);
}
</style>
