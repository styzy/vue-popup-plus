import {
	type AllowedComponentProps,
	type AppContext,
	type AsyncComponentLoader,
	type Component,
	type ComponentInstance,
	type ComponentInternalInstance,
	type ComponentPublicInstance,
	type VNodeProps,
} from 'vue'
import {
	POPUP_ANIMATIONS,
	type Animation,
	type IAnimations,
} from '../animation'
import { type ICore } from '../core'
import { PopupError } from '../error'
import { Instance, RenderType, type InstanceId } from '../instance'
import { printLog, Log, LogType, LogGroupItemType } from '../log'
import { version, type Version } from '../version'
import { DOCUMENT_URL } from '../CONSTANTS'

export interface PopupCustomProperties {}

export interface IController extends PopupCustomProperties {
	/**
	 * 弹出层控制器实例 id
	 */
	readonly id: string
	/**
	 * 版本号
	 */
	readonly version: Version
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
	 * - 如果弹出层不存在，会在调试模式下打印警告日志
	 */
	destroy(instanceId: InstanceId, payload?: any): void
}

type WithDefaultProps<T> =
	T extends Record<string, any> ? T : Record<string, any>

/**
 * 提取组件的 props 所允许的所有类型
 *
 * - 相较于 `ExtractComponentPropTypes` 返回的类型，还提供了底层对 `VNodeProps`
 *  和 `AllowedComponentProps` 类型属性的支持
 * - 支持同步组件和异步组件
 * - 对于异步组件，除了支持 `defineAsyncComponent` 方法定义组件，还支持直接传入
 *   ()=>import() 函数。
 */
export type ExtractComponentAllPropTypes<
	TComponent extends Component = Component,
> = WithDefaultProps<
	TComponent extends new () => {
		$props: infer TProps
	}
		? TProps
		: TComponent extends AsyncComponentLoader
			? InstanceType<Awaited<ReturnType<TComponent>>['default']>['$props']
			: Record<string, any>
>

/**
 * 提取组件的 props 类型
 *
 * - 包含组件自定义的属性类型以及通过 `ComponentCustomProps` 接口定义的全局属性类型
 * - 支持同步组件和异步组件
 * - 对于异步组件，除了支持 `defineAsyncComponent` 方法定义组件，还支持直接传入
 *   ()=>import() 函数。
 */
export type ExtractComponentPropTypes<
	TComponent extends Component = Component,
> = Omit<
	ExtractComponentAllPropTypes<TComponent>,
	keyof (VNodeProps & AllowedComponentProps)
>

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
	 * - 除了组件的属性，还支持传入组件的事件监听器，事件监听器的名称需要以 `on` 开头，
	 *   例如 `onClick` 、 `onInput` 等。
	 */
	componentProps?: ExtractComponentPropTypes<TComponent>
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

export type Placement =
	| 'left-top'
	| 'left'
	| 'left-bottom'
	| 'top'
	| 'center'
	| 'bottom'
	| 'right-top'
	| 'right'
	| 'right-bottom'

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
	 * 弹出层位置
	 *
	 * - 默认为 center ，即居中显示
	 * - 更多位置请查看 {@link Placement}
	 * @since 1.5.0
	 */
	placement?: Placement
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
	 * 弹出层遮罩是否启用模糊效果
	 *
	 * - 默认为 true
	 * @since 1.3.0
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
	placement: 'center',
	viewTranslateX: 0,
	viewTranslateY: 0,
	viewTranslateOverflow: false,
	viewAnimation: POPUP_ANIMATIONS.FADE,
	maskAnimation: POPUP_ANIMATIONS.FADE,
	maskBlur: true,
	animationDuration: 100,
}

let _seed = 0

export class Controller implements IController {
	#id: string
	#vm?: ComponentInternalInstance
	#core: ICore
	get id() {
		return this.#id
	}
	get isInstalled() {
		return !!this.#core.app
	}
	get version() {
		return version
	}
	constructor(core: ICore, vm?: ComponentInternalInstance) {
		this.#id = `popup-controller-${++_seed}`
		this.#core = core
		this.#vm = vm
	}
	render({ zIndex, ...options }: RenderOption) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.render()',
				type: 'Function',
				value: this.render,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: `调用参数`,
					dataName: `options`,
					dataType: 'RenderOption',
					dataValue: arguments[0],
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `渲染弹出层失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		zIndex = zIndex ?? this.#core.config.zIndex++

		const mergedOptions = {
			...defaultOptions,
			...options,
			...{ zIndex },
		}

		const instance: Instance = new Instance(
			this.#core,
			mergedOptions,
			this.#vm
		)

		instance.mount()

		log.message = `渲染弹出层 ${instance.id.name} 成功`
		log.group.push({
			type: LogGroupItemType.Data,
			title: `合并参数`,
			dataName: `mergedOptions`,
			dataValue: mergedOptions,
			dataType: 'RenderOption',
		})
		log.group.push({
			type: LogGroupItemType.Data,
			title: '渲染方式',
			dataType: `${RenderType.APP} | ${RenderType.VNODE} | ${RenderType.ROOT_COMPONENT}`,
			dataValue: instance.renderType,
			important: true,
		})
		log.group.push({
			type: LogGroupItemType.Data,
			title: `弹出层实例ID`,
			dataName: instance.id.name,
			dataValue: instance.id,
			dataType: 'InstanceId',
		})

		printLog(log)

		return instance.id
	}
	update(instanceId: InstanceId, options: UpdateOption) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.update()',
				type: 'Function',
				value: this.update,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: '弹出层实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'InstanceId',
				},
				{
					type: LogGroupItemType.Data,
					title: '调用参数',
					dataName: `options`,
					dataValue: options,
					dataType: 'UpdateOption',
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `更新弹出层失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) return

		instance.update(options)

		log.message = `更新弹出层 ${instance.id.name} 成功`

		printLog(log)
	}
	async destroy(instanceId: InstanceId, payload?: any) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.destroy()',
				type: 'Function',
				value: this.destroy,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: '弹出层实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'InstanceId',
				},
				{
					type: LogGroupItemType.Data,
					title: '携带参数',
					dataName: `payload`,
					dataValue: payload,
					dataType: 'any',
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `销毁弹出层失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = LogType.Warning
			log.message = `销毁弹出层 ${instanceId.name} 失败，弹出层不存在`
			printLog(log)
			return
		}

		await instance.unmount(payload)

		log.message = `销毁弹出层 ${instance.id.name} 成功`

		printLog(log)
	}
}
