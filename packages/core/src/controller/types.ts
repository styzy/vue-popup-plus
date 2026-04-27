import type { Component } from 'vue'
import type { Animation, IAnimations } from '../animation'
import type { PopupInstanceId } from '../instance'
import type {
	PopupViewComputedStyle,
	ExtractComponentPropTypes,
} from '../typings'
import type { PopupVersion } from '../version'

export type PopupPlacement = [
	'left-top',
	'left',
	'left-bottom',
	'top',
	'center',
	'bottom',
	'right-top',
	'right',
	'right-bottom',
][number]

export type PopupAnchorPlacement = [
	'left-start',
	'left',
	'left-end',
	'top-start',
	'top',
	'top-end',
	'bottom-start',
	'bottom',
	'bottom-end',
	'right-start',
	'right',
	'right-end',
][number]

export type PopupAnchorShift = ['both', 'mainAxis', 'crossAxis', 'none'][number]

export type PopupMaskDestroyHandler = (
	close: (payload?: any) => Promise<void>
) => void

// 渲染组件选项
type RenderComponentOption<TComponent extends Component> = {
	/**
	 * 弹出层渲染的视图组件
	 *
	 * - 要创建一个弹出层，这是唯一必要的参数。
	 * - 支持同步组件和异步组件，为了提高加载速度，优化构建体积，建议使用异步组件。
	 * - 对于异步组件，无需使用 `defineAsyncComponent` 方法定义组件，直接传入
	 *   ()=>import() 函数即可。
	 *
	 * - 使用示例：
	 * ```ts
	 * // 异步组件
	 * popup.render({
	 * 	component: () => import('path/Demo.vue'),
	 * })
	 *
	 * // 同步组件
	 * import Demo from 'path/Demo.vue'
	 * popup.render({
	 * 	component: Demo,
	 * })
	 * ```
	 */
	component: TComponent
	/**
	 * 弹出层渲染的视图组件的 props
	 *
	 * - 除了组件的属性，还支持传入组件的事件监听器，事件监听器的名称需要以
	 *   `on` 开头，例如 `onClick` 、 `onInput` 等。
	 * - 会自动根据传入的组件进行类型推导，提供完善的类型提示
	 */
	componentProps?: ExtractComponentPropTypes<TComponent>
	/**
	 * 弹出层渲染之后的回调
	 */
	onMounted?: () => void
	/**
	 * 弹出层销毁之后的回调
	 *
	 * - 触发时会将 popup.destroy() 方法的负载参数 payload 作为参数传入
	 */
	onUnmounted?: (payload?: any) => void
}

// 渲染配置选项
type RenderConfigOption = {
	/**
	 * 弹出层位置
	 *
	 * - 默认为 `'center'` ，即居中显示
	 * - 在使用 `anchor` 参数指定锚点元素时无效
	 *
	 * - 可选值包括：
	 *   - `left-top` ：左侧顶部
	 *   - `left` ：左侧居中
	 *   - `left-bottom` ：左侧底部
	 *   - `top` ：顶部居中
	 *   - `center` ：居中
	 *   - `bottom` ：底部居中
	 *   - `right-top` ：右侧顶部
	 *   - `right` ：右侧居中
	 *   - `right-bottom` ：右侧底部
	 *
	 * @since 1.5.0
	 */
	placement?: PopupPlacement
	/**
	 * 弹出层挂载的父元素
	 *
	 * - 不指定时，默认挂载到 body 元素下
	 */
	appendTo?: Element | string
	/**
	 * 弹出层渲染期间是否禁用窗口滚动
	 *
	 * - 默认值为 `true`
	 */
	disableScroll?: boolean
	/**
	 * 弹出层动画时长
	 *
	 * - 默认为 `100` ，单位为 毫秒
	 */
	animationDuration?: number
	/**
	 * 弹出层视窗区域
	 *
	 * - 如果不指定，将使用浏览器窗口作为视窗区域
	 * - 当指定某个元素时，弹出层将以该元素为视窗区域
	 * - 传入字符串时，会根据字符串选择器查询元素
	 *
	 * @since 1.7.0
	 */
	viewport?: HTMLElement | string | null
	/**
	 * 弹出层 zIndex
	 *
	 * - 若不设置，则使用全局递增的 zIndex 值
	 */
	zIndex?: number
}

// 渲染样式选项
type RenderStyleOption = {
	/**
	 * 弹出层宽度
	 *
	 * - 默认为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * width: 300
	 * width: '300px'
	 * width: '50%'
	 * width: 'inherit'
	 */
	width?: string | number
	/**
	 * 弹出层最小宽度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * minWidth: 300
	 * minWidth: '300px'
	 * minWidth: '50%'
	 * minWidth: 'inherit'
	 */
	minWidth?: string | number
	/**
	 * 弹出层最大宽度
	 *
	 * - 默认为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * maxWidth: 300
	 * maxWidth: '300px'
	 * maxWidth: '50%'
	 * maxWidth: 'inherit'
	 */
	maxWidth?: string | number
	/**
	 * 弹出层高度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * height: 300
	 * height: '300px'
	 * height: '50%'
	 * height: 'inherit'
	 */
	height?: string | number
	/**
	 * 弹出层最小高度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * minHeight: 300
	 * minHeight: '300px'
	 * minHeight: '50%'
	 * minHeight: 'inherit'
	 */
	minHeight?: string | number
	/**
	 * 弹出层最大高度
	 *
	 * - 默认值为 `'auto'` ，即自适应
	 * - 使用 number 类型时，单位为 px
	 * - 使用 string 类型时，支持一切 css 合法值
	 *
	 * @example
	 * maxHeight: 300
	 * maxHeight: '300px'
	 * maxHeight: '50%'
	 * maxHeight: 'inherit'
	 */
	maxHeight?: string | number
}

// 渲染视图选项
type RenderViewOption = {
	/**
	 * 弹出层视图动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 * - 更多动画类型请查看 {@link IAnimations}
	 */
	viewAnimation?: Animation
	/**
	 * 弹出层视图水平偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 *
	 * @since 1.1.0
	 */
	viewTranslateX?: number
	/**
	 * 弹出层视图垂直偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 *
	 * @since 1.1.0
	 */
	viewTranslateY?: number
	/**
	 * 弹出层视图是否允许超出窗口边界
	 *
	 * - 默认为 false
	 */
	viewTranslateOverflow?: boolean
}

// 渲染遮罩选项
type RenderMaskOption = {
	/**
	 * 弹出层是否显示遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 弹出层遮罩动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 * - 更多动画类型请查看 {@link IAnimations}
	 */
	maskAnimation?: Animation
	/**
	 * 弹出层遮罩是否启用透明效果
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskTransparent?: boolean
	/**
	 * 弹出层遮罩是否启用高斯模糊
	 *
	 * - 默认为 `false`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.3.0
	 */
	maskBlur?: boolean
	/**
	 * 点击遮罩层是否销毁弹出层
	 *
	 * - 默认值为 `false` ，点击遮罩层不会销毁弹出层
	 * - 传入 `true` ，点击遮罩层将销毁弹出层
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将销毁弹出层，可传入销毁携带的负载参数，返回的
	 *   `Promise` 对象会在弹出层销毁动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskDestroy?: boolean | PopupMaskDestroyHandler
}

// 渲染锚点选项
type RenderAnchorOption = {
	/**
	 * 弹出层位置的锚点元素
	 *
	 * - 当指定某个元素时，弹出层将以该元素为锚点进行渲染
	 * - 传入字符串时，会根据字符串选择器查询元素
	 * - 可配合 `anchorPlacement` 参数指定弹出层的位置与对齐方式
	 * - 可配合 `anchorAdjust` 参数指定弹出层的相对视窗的调整方式
	 * - 可配合 `anchorClamp` 参数开启弹出层的视窗锁定
	 * - 可配合 `anchorViewport` 参数指定弹出层的视窗元素
	 *
	 * @since 1.7.0
	 */
	anchor?: HTMLElement | string | null
	/**
	 * 锚点弹出层位置与对齐方式
	 *
	 * - 指定弹出层渲染对于锚点的对齐方式
	 * - 默认为 `'top'` ，即顶部居中对齐
	 * - 仅在 `anchor` 参数指定锚点元素时有效
	 *
	 * - 可选值包括：
	 *   - `left-start` ：左侧，顶部对齐
	 *   - `left` ：左侧，居中对齐
	 *   - `left-end` ：左侧，底部对齐
	 *   - `top-start` ：顶部，左侧对齐
	 *   - `top` ：顶部，居中对齐
	 *   - `top-end` ：顶部，右侧对齐
	 *   - `bottom-start` ：底部，左侧对齐
	 *   - `bottom` ：底部，居中对齐
	 *   - `bottom-end` ：底部，右侧对齐
	 *   - `right-start` ：右侧，顶部对齐
	 *   - `right` ：右侧，居中对齐
	 *   - `right-end` ：右侧，底部对齐
	 *
	 * @since 1.7.0
	 */
	anchorPlacement?: PopupAnchorPlacement
	/**
	 * 锚点弹出层是否在视窗空间不足时进行翻转
	 *
	 * - 当视窗空间不足时，自动进行翻转以保持弹出层在视窗范围内，
	 *   并在视窗空间满足渲染时恢复到原始定义的位置
	 * - 默认为 `false`，即不进行翻转
	 *
	 * @since 1.7.0
	 */
	anchorFlip?: boolean
	/**
	 * 锚点弹出层翻转时的偏移量
	 *
	 * - 锚点弹出层计算是否需要进行翻转时的提前偏移量，主要用于
	 *   防止出现达到临界值时的闪烁现象
	 * - 默认为 `0` ，即不提前偏移，与原始定义位置一致
	 * - 仅在 `anchorFlip` 参数为 `true` 时有效
	 *
	 * @since 1.7.0
	 */
	anchorFlipAdvance?: number
	/**
	 * 锚点弹出层是否在视窗空间不足时进行平移
	 *
	 * - 当视窗空间不足时，自动进行平移以保持弹出层在视窗范围内，
	 *   并在视窗空间满足渲染时恢复到原始定义的位置
	 * - 默认为 `'none'`，即不进行平移
	 *
	 * - 可选值包括：
	 *   - `both` ：在主轴和侧轴上都进行平移，相当于完全
	 *     不会超出视窗范围
	 *   - `mainAxis` ：在主轴上进行平移
	 *   - `crossAxis` ：在侧轴上进行平移
	 *   - `none` ：不进行平移
	 *
	 * @since 1.7.0
	 */
	anchorShift?: PopupAnchorShift
}

export type PopupRenderOption<TComponent extends Component = Component> =
	RenderComponentOption<TComponent> &
		RenderConfigOption &
		RenderStyleOption &
		RenderViewOption &
		RenderMaskOption &
		RenderAnchorOption

export type PopupUpdateOption = Omit<
	PopupRenderOption,
	'component' | 'disableScroll'
>

export interface PopupCustomProperties {}

export interface PopupController extends PopupCustomProperties {
	/**
	 * 弹出层控制器实例 id
	 */
	readonly id: string
	/**
	 * 是否已安装
	 */
	readonly isInstalled: boolean
	/**
	 * 版本号
	 */
	readonly version: PopupVersion
	/**
	 * 渲染弹出层
	 *
	 * - 渲染参数 `component`
	 *   是唯一的必填项，其他渲染参数具体请参考{@link PopupRenderOption}
	 * - 返回值是弹出层的实例 id ，用于调用 destroy() 方法销毁弹出层
	 */
	render<TComponent extends Component = Component>(
		options: PopupRenderOption<TComponent>
	): PopupInstanceId
	/**
	 * 获取弹出层视图的计算样式
	 *
	 * - 传入弹出层的实例 id ，用于获取指定弹出层的计算样式
	 * - 返回的计算样式是具有响应性的只读对象
	 * - 如果弹出层视图组件未渲染，则返回 undefined
	 */
	getComputedStyle(instanceId: PopupInstanceId): PopupViewComputedStyle | null
	/**
	 * 更新弹出层
	 *
	 * - 主要用于更新弹出层的渲染参数
	 * - 第一个参数需要传入需要更新的弹出层的实例 id
	 * - 第二个参数需要传入更新的参数，仅支持部分渲染参数，具体请参考{@link PopupUpdateOption}
	 */
	update(instanceId: PopupInstanceId, options: PopupUpdateOption): void
	/**
	 * 销毁弹出层
	 *
	 * - 传入弹出层的实例 id ，用于销毁指定的弹出层
	 * - 第二个参数是自定义负载参数，会作为参数传递给创建弹出层时的 onUnmounted 回调函数
	 * - 该函数返回一个 Promise 对象，用于等待弹出层销毁动画完成
	 * - 如果弹出层不存在，会在调试模式下打印警告日志
	 */
	destroy(instanceId: PopupInstanceId, payload?: any): Promise<void>
}
