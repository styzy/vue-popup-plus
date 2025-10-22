import { type App, type Component } from 'vue'
import type { Core } from '../core'
import { Instance } from '../Instance'
import type { InstanceId } from '../Instance'
import { wrapWithPlugin, type Plugin } from '../plugin'
import { PopupError } from '../error'
import {
	POPUP_ANIMATIONS,
	type Animation,
	type IAnimations,
} from '../animation'

export interface PopupCustomProperties {}

export interface IController extends PopupCustomProperties {
	/**
	 * 安装插件
	 * @param {App} app - Vue应用实例
	 * @returns {void}
	 */
	install(app: App): void
	/**
	 * 安装插件
	 * - 可安装使用 `definePlugin` 方法定义的插件
	 * - 具体请参考{@link IDefinePlugin}
	 */
	use(plugin: Plugin): void
	/**
	 * 渲染弹出层，返回弹出层实例id，可调用destroy(id)方法销毁弹出层
	 * @param {RenderOptions} options - 渲染参数
	 * @returns 弹出层实例id
	 */
	render(options: RenderOptions): InstanceId
	/**
	 * 更新弹出层，可更新弹出层参数
	 * @param {InstanceId} instanceId - 弹出层实例id
	 * @param {UpdateOptions} options - 更新参数
	 */
	update(instanceId: InstanceId, options: UpdateOptions): void
	/**
	 * 销毁弹出层
	 * @param {InstanceId} instanceId - 弹出层实例id
	 * @param {any} payload - 自定义负载参数，会作为参数传递给创建弹出层时的onUnmounted回调函数
	 * @returns {Promise<void>}
	 */
	destroy(instanceId: InstanceId, payload?: any): void
}

type RenderElement = HTMLElement | string

export type RenderComponentOptions = {
	/**
	 * 弹出层渲染的组件，想要创建一个弹出层，这个唯一必要的参数。它的值可以是一个同步组件，也可以是一个异步组件的 import() 函数。
	 * @example
	 * // 同步组件
	 * import Demo from 'path/Demo.vue'
	 * popup.render({
	 * 	component: Demo,
	 * })
	 *
	 * // 异步组件
	 * popup.render({
	 * 	component: () => import('path/Demo.vue'),
	 * })
	 */
	component: Component
	/**
	 * 弹出层渲染组件的 props ，会传递给弹出层组件
	 */
	componentProps?: Record<string, any>
	/**
	 * 弹出层渲染之后的回调
	 */
	onMounted?: () => void
	/**
	 * 弹出层关闭之后的回调，触发时会将destroy() 方法的负载参数 payload 作为参数传入
	 */
	onUnmounted?: <T>(payload?: T) => void
}

export type RenderStyleOptions = {
	/**
	 * 弹出层宽度，默认为 auto，即自适应，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
	 * @example
	 * // px
	 * width: '300px',
	 * // rem
	 * width: '30rem',
	 * // vw
	 * width: '30vw',
	 * // 百分比
	 * width: '30%',
	 * // css 动态计算
	 * width: 'calc(50% + 20px)',
	 * // css 变量
	 * width: 'var(--width)',
	 * // number 类型，方便计算，单位为 px
	 * width: 300,
	 */
	width?: string | number
	/**
	 * 弹出层最大宽度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
	 * @example
	 * // px
	 * maxWidth: '300px',
	 * // rem
	 * maxWidth: '30rem',
	 * // vw
	 * maxWidth: '30vw',
	 * // 百分比
	 * maxWidth: '30%',
	 * // css 动态计算
	 * maxWidth: 'calc(50% + 20px)',
	 * // css 变量
	 * maxWidth: 'var(--width)',
	 * // number 类型，方便计算，单位为 px
	 * maxWidth: 300,
	 */
	maxWidth?: string | number
	/**
	 * 弹出层最小宽度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
	 * @example
	 * // px
	 * minWidth: '300px',
	 * // rem
	 * minWidth: '30rem',
	 * // vw
	 * minWidth: '30vw',
	 * // 百分比
	 * minWidth: '30%',
	 * // css 动态计算
	 * minWidth: 'calc(50% + 20px)',
	 * // css 变量
	 * minWidth: 'var(--width)',
	 * // number 类型，方便计算，单位为 px
	 * minWidth: 300,
	 */
	minWidth?: string | number
	/**
	 * 弹出层高度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
	 * @example
	 * // px
	 * height: '300px',
	 * // rem
	 * height: '30rem',
	 * // vh
	 * height: '30vh',
	 * // 百分比
	 * height: '30%',
	 * // css 动态计算
	 * height: 'calc(50% + 20px)',
	 * // css 变量
	 * height: 'var(--height)',
	 * // number 类型，方便计算，单位为 px
	 * height: 300,
	 */
	height?: string | number
	/**
	 * 弹出层最大高度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
	 * @example
	 * // px
	 * maxHeight: '300px',
	 * // rem
	 * maxHeight: '30rem',
	 * // vh
	 * maxHeight: '30vh',
	 * // 百分比
	 * maxHeight: '30%',
	 * // css 动态计算
	 * maxHeight: 'calc(50% + 20px)',
	 * // css 变量
	 * maxHeight: 'var(--height)',
	 * // number 类型，方便计算，单位为 px
	 * maxHeight: 300,
	 */
	maxHeight?: string | number
	/**
	 * 弹出层最小高度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
	 * @example
	 * // px
	 * minHeight: '300px',
	 * // rem
	 * minHeight: '30rem',
	 * // vh
	 * minHeight: '30vh',
	 * // 百分比
	 * minHeight: '30%',
	 * // css 动态计算
	 * minHeight: 'calc(50% + 20px)',
	 * // css 变量
	 * minHeight: 'var(--height)',
	 * // number 类型，方便计算，单位为 px
	 * minHeight: 300,
	 */
	minHeight?: string | number
	/**
	 * 弹出层动画时长，默认为 100 ，单位为 毫秒
	 */
	animationDuration?: number
	/**
	 * 遮罩层动画类型，默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出，更多动画类型请查看 {@link IAnimations}
	 */
	maskAnimation?: Animation
	/**
	 * 视图层动画类型，默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出，更多动画类型请查看 {@link IAnimations}
	 */
	viewAnimation?: Animation
	/**
	 * 弹出层 zIndex ，若不设置，则使用全局递增的 zIndex 值
	 */
	zIndex?: number
}

export type RenderExtraOptions = {
	/**
	 * 弹出层挂载的元素，不指定时，默认挂载到 body 元素下
	 */
	el?: RenderElement
	/**
	 * 弹出层是否显示遮罩层，默认值为 true
	 */
	mask?: boolean
	/**
	 * 点击遮罩层是否关闭弹出层，默认值为 false ，仅在 mask 为 true 时有效
	 */
	maskClickCloseEnabled?: boolean
	/**
	 * 弹出层是否自动隐藏窗口滚动条，默认值为 true
	 */
	autoHideWindowScroll?: boolean
}

type RenderOptions = RenderComponentOptions &
	RenderStyleOptions &
	RenderExtraOptions

type UpdateOptions = Partial<
	Omit<RenderOptions, 'component' | 'el' | 'autoHideWindowScroll'>
>

const defaultOptions: Required<
	Omit<RenderOptions, 'component' | 'el' | 'zIndex'>
> = {
	componentProps: {},
	onMounted: () => {},
	onUnmounted: () => {},
	mask: true,
	maskClickCloseEnabled: false,
	autoHideWindowScroll: true,
	width: 'auto',
	maxWidth: 'auto',
	minWidth: 'auto',
	height: 'auto',
	maxHeight: 'auto',
	minHeight: 'auto',
	animationDuration: 100,
	maskAnimation: POPUP_ANIMATIONS.FADE,
	viewAnimation: POPUP_ANIMATIONS.FADE,
}

export class Controller implements IController {
	_core: Core
	constructor(core: Core) {
		this._core = core
	}
	install(app: App): void {
		app.config.globalProperties[this._core.config.prototypeName] = this
	}
	use(plugin: Plugin): void {
		if (!this._core.addPlugin(plugin))
			throw new PopupError(
				`使用插件 ${plugin.name} 失败，已存在同名插件 ${plugin.name}`
			)

		plugin.install(wrapWithPlugin(this))
	}
	render({ el, zIndex, ...options }: RenderOptions): InstanceId {
		el = el || document.body.appendChild(document.createElement('div'))
		zIndex = zIndex ?? this._core.config.zIndex++

		const instance: Instance = new Instance(this._core.seed, {
			...defaultOptions,
			...options,
			...{ zIndex, el },
		})

		this._core.addInstance(instance)

		instance.mount()

		return instance.id
	}
	update(instanceId: InstanceId, options: RenderOptions) {
		const instance = this._core.getInstance(instanceId)

		if (!instance) return

		instance.updateStore(options)
	}
	async destroy(instanceId: InstanceId, payload?: any): Promise<void> {
		const instance = this._core.getInstance(instanceId)

		if (!instance) return

		await instance.unmount(payload)

		this._core.removeInstance(instance)
	}
}

