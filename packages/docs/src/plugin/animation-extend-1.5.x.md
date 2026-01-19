# 动画扩展 <Badge text="1.5.x" />

## 介绍

Vue Popup Plus 内置了基础动画类型，通过 `POPUP_ANIMATIONS` 常量的形式提供给开发者使用，因为是常量，所以插件开发者不应该直接修改它的值，而应该通过扩展动画插件的形式来添加新的动画类型。

下面将演示如何添加一个自定义动画类型 `CUSTOM`。

## 编写动画样式

首先创建一个 CSS 文件，用于定义自定义动画的样式。

需要注意样式的选择器的类名必须要遵循 `vue-popup-plus-animation-行为-动画类型名称` 的格式，其中 `行为` 可以是 `enter` 或 `leave`，`动画类型名称` 则是自定义的动画类型名称。

```css [custom_animation.css]
/* 这里需要遵循的格式为： vue-popup-plus-animation-行为-动画类型名称 */
.vue-popup-plus-animation-enter-custom {
	animation-name: custom-enter;
}

.vue-popup-plus-animation-leave-custom {
	animation-name: custom-leave;
}

@keyframes custom-enter {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes custom-leave {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
```

## 定义动画插件

定义好动画样式后，首先在插件中引入该样式文件，例如这里的 `custom_animation.css`。

为了对 `POPUP_ANIMATIONS` 常量进行扩展， `definePligin` 方法的 `install` 函数所提供的 `popup` 对象，即支持扩展的控制器实例，提供了一个 `customAnimations` 属性，用于添加新的动画。

我们需要对 `customAnimations` 对象新增一个 `CUSTOM` 属性，并将其值设置为 `custom`。

::: tip
需要注意以下几点：

- 自定义动画类型的名称必须是大写字母，因为使用方式将会是：`POPUP_ANIMATIONS.CUSTOM`。
- 自定义动画类型的值必须是小写字母，且必须与动画样式类名中的 `动画类型名称` 保持一致，例如这里的 `custom`。

:::

```ts [animation_plugin.ts]
import { definePlugin } from 'vue-popup-plus'
// 引入自定义动画样式文件
import './custom_animation.css' // [!code highlight]

const animationPlugin = definePlugin({
	name: 'animation-plugin',
	install(popup) {
		// 添加自定义动画类型
		popup.customAnimations.CUSTOM = 'custom' // [!code highlight]
	},
})
```

这样一个自定义动画插件就完成了，所有该插件的使用者，都可以通过 `POPUP_ANIMATIONS.CUSTOM` 来使用这个自定义动画。

::: code-group

```ts [组合式 API ~vscode-icons:file-type-vue~]
import { onMounted } from 'vue'
import { usePopup, POPUP_ANIMATIONS } from 'vue-popup-plus'

const popup = usePopup()

onMounted(() => {
	popup.render({
		component: () => import('./HelloPopup.vue'),
		// 使用自定义动画
		animation: POPUP_ANIMATIONS.CUSTOM, // [!code highlight]
	})
})
```

```ts [选项式 API ~vscode-icons:file-type-vue~]
import { POPUP_ANIMATIONS } from 'vue-popup-plus'

export default {
	mounted() {
		this.$popup.render({
			component: () => import('./HelloPopup.vue'),
			// 使用自定义动画
			animation: POPUP_ANIMATIONS.CUSTOM, // [!code highlight]
		})
	},
}
```

:::

## TypeScript 类型支持

和功能扩展一样，动画扩展也需要向插件使用者提供类型定义，以确保类型安全。

为此，我们为所有插件开发者提供了一个用于扩展动画类型的接口，即 `PopupCustomAnimations` 接口。

插件开发者只需要在插件定义代码中，为 `PopupCustomAnimations` 接口添加自定义的动画类型声明即可。

```ts [animation_plugin.ts]
import { definePlugin } from 'vue-popup-plus'
import './custom_animation.css'

const animationPlugin = definePlugin({
	name: 'animation-plugin',
	install(popup) {
		popup.customAnimations.CUSTOM = 'custom'
	},
})

declare module 'vue-popup-plus' {
	interface PopupCustomAnimations {
		// 提供自定义动画类型 CUSTOM 的类型声明
		CUSTOM: 'custom' // [!code highlight]
	}
}
```
