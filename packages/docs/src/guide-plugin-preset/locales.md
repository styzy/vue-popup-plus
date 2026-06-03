# 国际化 <Badge text="1.7.0+" />

> <DVersionSupport package="plugin" version="1.7.0" />

## 介绍

预置插件内的文本使用 **英文（en-US）** 作为默认语言，同时我们也支持切换不同的语言包。

## 语言清单

除了 **`21`** 种 **主流国家际语言** ，我们还针对 **欧盟官方标准** 提供了 **`24`** 种 **欧盟国家官方语言** 的语言包，总计 **`38`** 种（存在部分重复语言）。

### 主流国家语言

- `en-US` 英语（美国）
- `zh-CN` 简体中文
- `zh-TW` 繁体中文
- `ja-JP` 日语
- `ko-KR` 韩语
- `de-DE` 德语
- `fr-FR` 法语
- `es-ES` 西班牙语
- `pt-BR` 葡萄牙语（巴西）
- `pt-PT` 葡萄牙语（葡萄牙）
- `ru-RU` 俄语
- `it-IT` 意大利语
- `nl-NL` 荷兰语
- `pl-PL` 波兰语
- `tr-TR` 土耳其语
- `ar-SA` 阿拉伯语
- `th-TH` 泰语
- `vi-VN` 越南语
- `id-ID` 印尼语
- `ms-MY` 马来语
- `hi-IN` 印地语

### 欧盟国家官方语言

- `bg-BG` 保加利亚语
- `hr-HR` 克罗地亚语
- `cs-CZ` 捷克语
- `da-DK` 丹麦语
- `nl-NL` 荷兰语
- `en-GB` 英语（英国）
- `et-EE` 爱沙尼亚语
- `fi-FI` 芬兰语
- `fr-FR` 法语
- `de-DE` 德语
- `el-GR` 希腊语
- `hu-HU` 匈牙利语
- `ga-IE` 爱尔兰语
- `it-IT` 意大利语
- `lv-LV` 拉脱维亚语
- `lt-LT` 立陶宛语
- `mt-MT` 马耳他语
- `pl-PL` 波兰语
- `pt-PT` 葡萄牙语（葡萄牙）
- `ro-RO` 罗马尼亚语
- `ru-RU` 俄语
- `sk-SK` 斯洛伐克语
- `sl-SI` 斯洛文尼亚语
- `es-ES` 西班牙语
- `sv-SE` 瑞典语

## 引入资源

为了提供最纯净的 **按需加载** 和 **Tree Shaking**，所有语言包资源采用独立构建的方式，与预置插件主包分离。

所有语言包可以使用如下方式进行引入：

```ts
// 俄语
import ruRU from 'vue-popup-plus-plugin-preset/locales/ru-RU'
// 简体中文
import zhCN from 'vue-popup-plus-plugin-preset/locales/zh-CN'
// 繁体中文
import zhTW from 'vue-popup-plus-plugin-preset/locales/zh-TW'
```

## 切换语言

通过 `setLocale()` 方法，可以切换到不同的语言包。例如切换到简体中文：

```ts
import { setLocale } from 'vue-popup-plus-plugin-preset'
import zhCN from 'vue-popup-plus-plugin-preset/locales/zh-CN'

// 切换到简体中文
setLocale(zhCN)
```
