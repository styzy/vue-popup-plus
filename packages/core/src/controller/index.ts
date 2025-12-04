import { type App, type AsyncComponentLoader, type Component } from 'vue'
import type { Core } from '../core'
import { Instance } from '../instance'
import type { InstanceId } from '../instance'
import {
	wrapWithPlugin,
	type ExtractPluginOption,
	type PluginOption,
	type PopupPlugin,
} from '../plugin'
import {
	POPUP_ANIMATIONS,
	type Animation,
	type IAnimations,
} from '../animation'
import { PopupError } from '../error'
import { printLog, Log, LogType } from '../log'
import { version } from '../../package.json'

export interface PopupCustomProperties {}

export interface IController extends PopupCustomProperties {
	/**
	 * 版本号
	 */
	readonly version: string
	/**
	 * 安装插件
	 *
	 * @param {App} app - Vue应用实例
	 * @returns {any}
	 */
	install(app: App): any
	/**
	 * 安装插件
	 *
	 * - 可安装使用 `definePlugin` 方法定义的插件
	 * - 重复安装相同的插件，会被忽略
	 * - 具体请参考{@link IDefinePlugin}
	 */
	use<TOption extends PluginOption, TPlugin extends PopupPlugin<TOption>>(
		plugin: TPlugin,
		options?: ExtractPluginOption<TPlugin>
	): void
	/**
	 * 渲染弹出层
	 *
	 * - 渲染参数 `component`
	 *   是唯一的必填项，其他渲染参数具体请参考{@link RenderOption}
	 * - 返回值是弹出层的实例 id ，用于调用 destroy() 方法销毁弹出层
	 */
	render<TComponent extends Component = Component>(
		options: RenderOption<TComponent>
	): InstanceId
	/**
	 * 更新弹出层
	 *
	 * - 主要用于更新弹出层的渲染参数
	 * - 第一个参数需要传入需要更新的弹出层的实例 id
	 * - 第二个参数需要传入更新的参数，仅支持部分渲染参数，具体请参考{@link UpdateOption}
	 */
	update(instanceId: InstanceId, options: UpdateOption): void
	/**
	 * 销毁弹出层
	 *
	 * - 传入弹出层的实例 id ，用于销毁指定的弹出层
	 * - 第二个参数是自定义负载参数，会作为参数传递给创建弹出层时的 onUnmounted 回调函数
	 * - 该函数返回一个 Promise 对象，用于等待弹出层关闭动画完成
	 */
	destroy(instanceId: InstanceId, payload?: any): void
}

/**
 * 提取组件的 props 类型
 *
 * - 支持同步组件和异步组件
 * - 对于异步组件，除了支持 `defineAsyncComponent` 方法定义组件，还支持直接传入
 *   ()=>import() 函数。
 */
export type ExtractComponentProps<TComponent extends Component = Component> =
	TComponent extends new () => {
		$props: infer TProps
	}
		? TProps
		: TComponent extends AsyncComponentLoader
			? InstanceType<Awaited<ReturnType<TComponent>>['default']>['$props']
			: Record<string, any>

export type RenderComponentOptions<TComponent extends Component = Component> = {
	/**
	 * 弹出层渲染的组件
	 *
	 * - 要创建一个弹出层，这是唯一必要的参数。
	 * - 支持同步组件和异步组件，为了提高加载速度，优化构建体积，建议使用异步组件。
	 * - 对于异步组件，无需使用 `defineAsyncComponent` 方法定义组件，直接传入
	 *   ()=>import() 函数即可。
	 * - 使用示例：
	 *
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
	 * 弹出层渲染组件的 props ，会传递给弹出层组件
	 * - 会自动根据传入的组件进行类型推导，提供完善的类型提示
	 */
	componentProps?: ExtractComponentProps<TComponent>
	/**
	 * 弹出层渲染之后的回调
	 */
	onMounted?: () => void
	/**
	 * 弹出层关闭之后的回调，触发时会将destroy() 方法的负载参数 payload 作为参数传入
	 */
	onUnmounted?: (payload?: any) => void
}

export type RenderConfigOptions = {
	/**
	 * 弹出层挂载的父元素
	 *
	 * - 不指定时，默认挂载到 body 元素下
	 */
	appendTo?: Element | string
	/**
	 * 弹出层是否显示遮罩层
	 *
	 * - 默认值为 true
	 */
	mask?: boolean
	/**
	 * 点击遮罩层是否关闭弹出层
	 *
	 * - 默认值为 false ，仅在 mask 为 true 时有效
	 */
	maskClickClose?: boolean
	/**
	 * 弹出层是否禁用窗口滚动
	 *
	 * - 默认值为 true
	 */
	disableScroll?: boolean
}

export type RenderStyleOptions = {
	/**
	 * 弹出层宽度
	 *
	 * - 默认为 auto，即自适应，支持 string 和 number 类型，string
	 *   类型更为灵活，number 类型方便计算
	 *
	 * @example
	 * 	// px
	 * 	width: '300px',
	 * 	// rem
	 * 	width: '30rem',
	 * 	// vw
	 * 	width: '30vw',
	 * 	// 百分比
	 * 	width: '30%',
	 * 	// css 动态计算
	 * 	width: 'calc(50% + 20px)',
	 * 	// css 变量
	 * 	width: 'var(--width)',
	 * 	// number 类型，方便计算，单位为 px
	 * 	width: 300,
	 */
	width?: string | number
	/**
	 * 弹出层最大宽度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 *
	 * @example
	 * 	// px
	 * 	maxWidth: '300px',
	 * 	// rem
	 * 	maxWidth: '30rem',
	 * 	// vw
	 * 	maxWidth: '30vw',
	 * 	// 百分比
	 * 	maxWidth: '30%',
	 * 	// css 动态计算
	 * 	maxWidth: 'calc(50% + 20px)',
	 * 	// css 变量
	 * 	maxWidth: 'var(--width)',
	 * 	// number 类型，方便计算，单位为 px
	 * 	maxWidth: 300,
	 */
	maxWidth?: string | number
	/**
	 * 弹出层最小宽度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 *
	 * @example
	 * 	// px
	 * 	minWidth: '300px',
	 * 	// rem
	 * 	minWidth: '30rem',
	 * 	// vw
	 * 	minWidth: '30vw',
	 * 	// 百分比
	 * 	minWidth: '30%',
	 * 	// css 动态计算
	 * 	minWidth: 'calc(50% + 20px)',
	 * 	// css 变量
	 * 	minWidth: 'var(--width)',
	 * 	// number 类型，方便计算，单位为 px
	 * 	minWidth: 300,
	 */
	minWidth?: string | number
	/**
	 * 弹出层高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 *
	 * @example
	 * 	// px
	 * 	height: '300px',
	 * 	// rem
	 * 	height: '30rem',
	 * 	// vh
	 * 	height: '30vh',
	 * 	// 百分比
	 * 	height: '30%',
	 * 	// css 动态计算
	 * 	height: 'calc(50% + 20px)',
	 * 	// css 变量
	 * 	height: 'var(--height)',
	 * 	// number 类型，方便计算，单位为 px
	 * 	height: 300,
	 */
	height?: string | number
	/**
	 * 弹出层最大高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 *
	 * @example
	 * 	// px
	 * 	maxHeight: '300px',
	 * 	// rem
	 * 	maxHeight: '30rem',
	 * 	// vh
	 * 	maxHeight: '30vh',
	 * 	// 百分比
	 * 	maxHeight: '30%',
	 * 	// css 动态计算
	 * 	maxHeight: 'calc(50% + 20px)',
	 * 	// css 变量
	 * 	maxHeight: 'var(--height)',
	 * 	// number 类型，方便计算，单位为 px
	 * 	maxHeight: 300,
	 */
	maxHeight?: string | number
	/**
	 * 弹出层最小高度
	 *
	 * - 默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number
	 *   类型方便计算
	 *
	 * @example
	 * 	// px
	 * 	minHeight: '300px',
	 * 	// rem
	 * 	minHeight: '30rem',
	 * 	// vh
	 * 	minHeight: '30vh',
	 * 	// 百分比
	 * 	minHeight: '30%',
	 * 	// css 动态计算
	 * 	minHeight: 'calc(50% + 20px)',
	 * 	// css 变量
	 * 	minHeight: 'var(--height)',
	 * 	// number 类型，方便计算，单位为 px
	 * 	minHeight: 300,
	 */
	minHeight?: string | number
	/**
	 * 弹出层视图动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出，更多动画类型请查看
	 *   {@link IAnimations}
	 */
	viewAnimation?: Animation
	/**
	 * 弹出层视图水平偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 */
	viewTranslateX?: number
	/**
	 * 弹出层视图垂直偏移量
	 *
	 * - 默认为 0 ，单位为 px
	 */
	viewTranslateY?: number
	/**
	 * 弹出层视图是否允许超出窗口边界
	 *
	 * - 默认为 false
	 */
	viewTranslateOverflow?: boolean
	/**
	 * 弹出层遮罩动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出，更多动画类型请查看
	 *   {@link IAnimations}
	 */
	maskAnimation?: Animation
	/**
	 * 弹出层遮罩是否启用模糊效果，默认为 true
	 */
	maskBlur?: boolean
	/**
	 * 弹出层动画时长
	 *
	 * - 默认为 100 ，单位为 毫秒
	 */
	animationDuration?: number
	/**
	 * 弹出层 zIndex
	 *
	 * - 若不设置，则使用全局递增的 zIndex 值
	 */
	zIndex?: number
}

export type RenderOption<TComponent extends Component = Component> =
	RenderComponentOptions<TComponent> &
		RenderConfigOptions &
		RenderStyleOptions

export type UpdateOption = Partial<RenderStyleOptions>

const defaultOptions: Required<Omit<RenderOption, 'zIndex' | 'component'>> = {
	appendTo: document.body,
	mask: true,
	maskClickClose: false,
	disableScroll: true,
	componentProps: {},
	onMounted: () => {},
	onUnmounted: () => {},
	width: 'auto',
	maxWidth: 'auto',
	minWidth: 'auto',
	height: 'auto',
	maxHeight: 'auto',
	minHeight: 'auto',
	viewTranslateX: 0,
	viewTranslateY: 0,
	viewTranslateOverflow: false,
	viewAnimation: POPUP_ANIMATIONS.FADE,
	maskAnimation: POPUP_ANIMATIONS.FADE,
	maskBlur: true,
	animationDuration: 100,
}

export class Controller implements IController {
	#isInstalled = false
	_core: Core

	get version(): string {
		return version
	}
	constructor(core: Core) {
		this._core = core
	}
	install(app: App): any {
		app.config.globalProperties[this._core.config.prototypeName] = this
		this._core.app = app
		this.#isInstalled = true
	}
	use<TOption extends PluginOption>(
		plugin: PopupPlugin<TOption>,
		options?: TOption
	): void {
		if (!this._core.addPlugin(plugin)) {
			printLog(
				new Log(
					LogType.Warn,
					'controller.use()',
					`注册插件 ${plugin.name} 失败，已存在同名插件 ${plugin.name}`
				)
			)
			return
		}

		plugin.install(wrapWithPlugin(this), this._core.config, options)
	}
	render({ zIndex, ...options }: RenderOption): InstanceId {
		if (!this.#isInstalled)
			throw new PopupError(
				'controller.render()',
				'控制器未被注册到 Vue app，渲染失败'
			)

		zIndex = zIndex ?? this._core.config.zIndex++

		const instance: Instance = new Instance(this._core, {
			...defaultOptions,
			...options,
			...{ zIndex },
		})

		this._core.addInstance(instance)

		instance.mount()
		return instance.id
	}
	update(instanceId: InstanceId, options: UpdateOption) {
		if (!this.#isInstalled)
			throw new PopupError(
				'controller.update()',
				'控制器未被注册到 Vue app，更新失败'
			)

		const instance = this._core.getInstance(instanceId)

		if (!instance) return

		instance.update(options)
	}
	async destroy(instanceId: InstanceId, payload?: any): Promise<void> {
		if (!this.#isInstalled)
			throw new PopupError(
				'controller.destroy()',
				'控制器未被注册到 Vue app，销毁失败'
			)

		const instance = this._core.getInstance(instanceId)

		if (!instance) return

		await instance.unmount(payload)

		this._core.removeInstance(instance)
	}
}

