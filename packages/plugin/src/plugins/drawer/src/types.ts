import type { Component } from 'vue'
import type {
	ExtractComponentPropTypes,
	PopupController,
	PopupMaskDestroyHandler,
} from 'vue-popup-plus'
import type { PluginSharedConfig, SharedOption } from '@plugin/typings'

export type PopupDrawerPlacement = ['top', 'right', 'bottom', 'left'][number]

// 抽屉的配置（插件使用者传入的参数类型）
export type PopupDrawerOption<TComponent extends Component = Component> = {
	/**
	 * 抽屉标题
	 *
	 * - 默认值为 `抽屉`
	 */
	title?: string
	/**
	 * 抽屉内容组件
	 */
	component: TComponent
	/**
	 * 抽屉内容组件props
	 */
	componentProps?: ExtractComponentPropTypes<TComponent>
	/**
	 * 抽屉渲染完成时调用的回调函数
	 */
	onMounted?: () => void
	/**
	 * 是否显示抽屉标题栏
	 *
	 * - 默认值为 `true`
	 */
	header?: boolean
	/**
	 * 标题栏是否显示关闭按钮
	 *
	 * - 默认值：`true`
	 */
	headerClose?: boolean
	/**
	 * 抽屉尺寸
	 *
	 * - 默认值为 `auto`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表高度
	 * - 支持 `string` 或 `number` 类型
	 */
	size?: string | number
	/**
	 * 抽屉最大尺寸
	 *
	 * - 默认值为 `100%`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表抽屉最大宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表抽屉最大高度
	 */
	maxSize?: string | number
	/**
	 * 抽屉最小尺寸
	 *
	 * - 默认值为 `auto`
	 * - 当 `placement` 为 `'left'` | `'right'` 时，代表抽屉最小宽度
	 * - 当 `placement` 为 `'top'` | `'bottom'` 时，代表抽屉最小高度
	 * - 支持 `string` 或 `number` 类型
	 */
	minSize?: string | number
	/**
	 * 抽屉位置
	 *
	 * - 默认值为 `right`
	 */
	placement?: PopupDrawerPlacement
	/**
	 * 是否显示抽屉遮罩层
	 *
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 遮罩层是否模糊
	 *
	 * - 默认值：`false`
	 */
	maskBlur?: boolean
	/**
	 * 遮罩层是否透明
	 *
	 * - 默认为 `false`
	 * - 优先级高于 `maskBlur`
	 * - 仅在 `mask` 参数为 `true` 时有效
	 */
	maskTransparent?: boolean
	/**
	 * 点击遮罩层是否关闭抽屉
	 *
	 * - 默认值为 `true` ，点击遮罩层将关闭抽屉
	 * - 传入 `false` ，点击遮罩层不会关闭抽屉
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将关闭抽屉，可传入关闭携带的负载参数，返回的
	 *   `Promise` 对象会在抽屉关闭动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * - 使用示例：
	 * ```ts
	 * popup.drawer({
	 *     component: () => import('./HelloWorld.vue'),
	 *     maskClose: async (close)=>{
	 *         if(...自定义拦截条件) return
	 *
	 *         // 直接关闭
	 *         close('携带的关闭参数')
	 *
	 *         // 异步等待关闭动画结束
	 *         await close('携带的关闭参数')
	 *         // 关闭后执行其他操作
	 *     },
	 * })
	 * ```
	 */
	maskClose?: boolean | PopupMaskDestroyHandler
} & SharedOption

// popup.drawer()这个方法的类型
export interface PopupDrawer {
	/**
	 * 显示抽屉
	 *
	 * - 抽屉内部组件可通过调用 `drawerClose(payload)`
	 *   关闭抽屉，payload 为关闭时传递的参数
	 * - 如需获取抽屉关闭时传递的参数，可在调用 `drawer` 方法时使用 `await` 关键字等待
	 *   Promise resolve 后获取
	 * - 抽屉关闭时，无论是否传递了参数，Promise 都将 resolve，因此需要在调用时判断是	否有返回参数
	 */
	<T extends any = any, TComponent extends Component = Component>(
		this: PopupController,
		options: PopupDrawerOption<TComponent>
	): Promise<T | void>
}

export interface PopupDrawerClose {
	/**
	 * 关闭抽屉
	 *
	 * - 将会关闭最后一个创建的抽屉
	 * - 如果当前没有抽屉正在显示，则不会有任何效果	，调试模式下会抛出警告
	 * - 可传递任意类型的参数，该参数将会被传递给打开抽屉时的 Promise resolve 函数
	 * @param payload 关闭时传递的参数
	 */
	<T extends any = any>(this: PopupController, payload?: T): Promise<void>
}

// 给全局安装插件定义类型
type PopupDrawerDefaultOption = Omit<
	PopupDrawerOption,
	'component' | 'componentProps' | 'onMounted' | 'zIndex'
>

export type PopupDrawerConfig = PluginSharedConfig & {
	/**
	 * 默认选项
	 *
	 * - 统一配置 `popup.drawer()` 方法的默认选项
	 */
	defaultOptions?: PopupDrawerDefaultOption
}

declare module 'vue-popup-plus' {
	interface PopupCustomProperties {
		drawer: PopupDrawer
		drawerClose: PopupDrawerClose
	}
}
