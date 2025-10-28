# 使用指南

## 安装

### npm

```bash
npm install vue-popup-plus
```

### yarn

```bash
yarn add vue-popup-plus
```

## 基本使用

### 注册插件

在你的 `main.ts` 文件中:

```js
import { createApp } from 'vue'
import { createPopup } from 'vue-popup-plus'
import PopupPluginPreset from 'vue-popup-plus-plugin-preset'
import App from './App.vue'

const app = createApp(App)

// 创建弹出层插件实例
const popup = createPopup({
    // 弹出层的初始 z-index，每次调用 render 方法时会自增
    zIndex: 1000,
    // 弹出层插件挂载Vue的原型方法名，默认是 $popup
    // 插件内部提供了类型定义，因此在选项式组件的 `this.$popup` 上会有自动补全
    // 如果需要自定义方法名，需要在 Vue 提供的 ComponentCustomProperties 接口中手动添加
    prototypeName: '$popup',
})

popup.use(PopupPluginPreset)

app.use(popup)
```

### 组合式 API

在你的组件中，你可以全局 `$popup` 方法来创建弹出层。

```js
import { onMounted } from 'vue'
import Test from '../components/Test.vue'

export default {
    setup() {
        onMounted(() => {
            this.$popup.render({
                component: Test
            })
        })
    },
}
```

### 选项式 API

通过 usePopup 组合式函数来创建弹出层。

```js
import { onMounted } from 'vue'
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

onMounted(() => {
    popup.render({
        component: () => import('../components/Test.vue'),
    })
})
```

## 示例

更多示例可以在 <RouterLink to="/examples">示例</RouterLink> 中查看。
