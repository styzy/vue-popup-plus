---
pageClass: api
outline: 2
---

# Album 媒体相册 API

::: tip
以下 API 由 预置插件 `vue-popup-plus-plugin-preset` 提供。
:::

## popup.album()

创建一个媒体相册弹出层。

### 类型

```ts
function album(options: AlbumOption):: Promise<void>
```

### 参数类型

```ts
type AlbumOption = {
	/**
	 * 数据源
	 *
	 * - 支持主流图片资源和视频资源
	 */
	sources: Array<string>
	/**
	 * 默认选中的媒体索引
	 *
	 * - 默认值为 `0`
	 */
	defaultIndex?: number
	/**
	 * 是否禁用计数器
	 *
	 * - 默认值为 `false`
	 */
	disableCounter?: boolean
	/**
	 * 是否禁用媒体名称
	 *
	 * - 默认值为 `false`
	 */
	disableName?: boolean
	/**
	 * 是否禁用纯净预览
	 *
	 * - 默认值为 `false`
	 */
	disablePure?: boolean
	/**
	 * 是否禁用下载功能
	 *
	 * - 默认值为 `false`
	 * - 注意：下载功能仅在资源地址支持跨域时生效
	 */
	disableDownload?: boolean
	/**
	 * 是否禁用缩放功能
	 *
	 * - 默认值为 `false`
	 */
	disableScale?: boolean
	/**
	 * 是否禁用拖动功能
	 *
	 * - 默认值为 `false`
	 */
	disableDrag?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
}
```

### 详细信息

第一个参数为媒体相册选项，必填。

函数返回一个 `Promise` 对象，用于等待弹出层关闭后继续执行后续代码。

### 示例

```ts
// 显示媒体相册，默认选中第二张媒体，即使用户不关闭媒体相册，也不会阻塞后续代码执行
popup.album({
	sources: [
		'https://example.com/image1.jpg',
		'https://example.com/video1.mp4',
	],
	defaultIndex: 1,
})

// 异步等待
await popup.album({
	sources: [
		'https://example.com/image1.jpg',
		'https://example.com/image1.jpg',
	],
})
console.log('媒体相册关闭后，继续执行后续代码')
```

### 相关参考

- [预置插件指南 - Album 媒体相册](/guide-plugin-preset/album)
