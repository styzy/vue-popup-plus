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
function album(options: PopupAlbumOption):: Promise<void>
```

### 参数类型

```ts
export type PopupAlbumSource = {
	url: string
	type: 'image' | 'video'
}

export type PopupAlbumOption = {
	/**
	 * 数据源
	 *
	 * - 支持主流图片资源和视频资源
	 * - `string` 类型的数据源将被自动识别为图片或视频
	 * - `AlbumMediaSource` 类型的数据源可以手动指定媒体类型
	 */
	sources: Array<string | PopupAlbumSource>
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
	 * 禁用旋转
	 *
	 * - 默认值：`false`
	 * - 注意：旋转功能仅对图片启用
	 * @since 1.7.0
	 */
	disableRotate?: boolean
	/**
	 * 是否禁用拖动功能
	 *
	 * - 默认值为 `false`
	 */
	disableDrag?: boolean
	/**
	 * 禁用循环
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.7.0
	 */
	disableLoop?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 自定义键盘快捷键
	 *
	 * - 默认值：`true` ，表示启用所有内置键盘快捷键
	 * - 当设置为 `false` 时，将禁用所有键盘快捷键
	 *
	 * @since 1.7.0
	 */
	keyboard?: PopupAlbumKeyboard
	/**
	 * 弹出层视区元素
	 *
	 * - 视区将作为触发自动翻转和平移的参考区域
	 * - 如果不指定，将使用浏览器窗口作为视区
	 * - 当指定某个元素时，弹出层将以该元素为视区
	 * - 传入字符串时，会根据字符串选择器查询元素
	 *
	 * @since 1.7.0
	 */
	viewport?: PopupViewport
	/**
	 * 弹出层 z-index 层级
	 *
	 * - 如果不设置，则使用内部自增的 zIndex 值
	 *
	 * @since 1.6.0
	 */
	zIndex?: number
}

// 视区元素
type PopupViewport = string | HTMLElement | null

// 自定义键盘快捷键
type PopupAlbumKeyboard =
	| boolean
	| {
			/**
			 * 切换到上一张
			 *
			 * - 默认值：`ArrowUp`
			 */
			prev?: PopupKeyboardConfig
			/**
			 * 切换到下一张
			 *
			 * - 默认值：`ArrowDown`
			 */
			next?: PopupKeyboardConfig
			/**
			 * 放大比例
			 *
			 * - 默认值：`=`
			 */
			scaleUp?: PopupKeyboardConfig
			/**
			 * 缩小比例
			 *
			 * - 默认值：`-`
			 */
			scaleDown?: PopupKeyboardConfig
			/**
			 * 逆时针旋转
			 *
			 * - 默认值：`ArrowLeft`
			 */
			rotateLeft?: PopupKeyboardConfig
			/**
			 * 顺时针旋转
			 *
			 * - 默认值：`ArrowRight`
			 */
			rotateRight?: PopupKeyboardConfig
			/**
			 * 关闭
			 *
			 * - 默认值：`Escape`
			 */
			close?: PopupKeyboardConfig
	  }

// 键盘快捷键配置
type PopupKeyboardConfig =
	| false
	| PopupKeyboardShortcut
	| PopupKeyboardShortcut[]

// 键盘快捷键
type PopupKeyboardShortcut =
	| string
	| {
			/**
			 * 键名
			 */
			key: string
			/**
			 * 是否按住 Ctrl 键
			 *
			 * @default false
			 */
			ctrl?: boolean
			/**
			 * 是否按住 Shift 键
			 *
			 * @default false
			 */
			shift?: boolean
			/**
			 * 是否按住 Alt 键
			 *
			 * @default false
			 */
			alt?: boolean
			/**
			 * 是否按住 Meta 键
			 *
			 * @default false
			 */
			meta?: boolean
			/**
			 * 是否阻止默认事件
			 *
			 * @default false
			 */
			preventDefault?: boolean
			/**
			 * 是否阻止事件冒泡
			 *
			 * @default false
			 */
			stopPropagation?: boolean
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
