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
	 * - 该函数返回一个 Promise 对象，用于等待弹出层销毁动画完成
	 * - 如果弹出层不存在，会在调试模式下打印警告日志
	 */
	destroy(instanceId: InstanceId, payload?: any): Promise<void>
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
	 * 弹出层渲染组件的 props
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
	 * - 触发时会将 popup.destroy() 方法的负载参数 payload 作为参数传入
	 */
	onUnmounted?: (payload?: any) => void
}

type MaskDestroyHandler = (close: (payload?: any) => Promise<void>) => void

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
	 * - 默认值为 `true`
	 */
	mask?: boolean
	/**
	 * 点击遮罩层是否销毁弹出层
	 *
	 * - 默认值为 `false` ，点击遮罩层不会销毁弹出层
	 * - 传入 `true` ，点击遮罩层会销毁弹出层
	 * - 可传入一个函数，该函数接收一个 `(payload?: any) => Promise<void>`
	 *   类型的函数作为参数，执行后将销毁弹出层，可传入销毁携带的负载参数，返回的
	 *   `Promise` 对象会在弹出层销毁动画完成后 `resolve()` 。
	 * - 仅在 `mask` 参数为 `true` 时有效
	 *
	 * @since 1.6.0
	 */
	maskDestroy?: boolean | MaskDestroyHandler
	/**
	 * 弹出层是否禁用窗口滚动
	 *
	 * - 默认值为 `true`
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
	 * 弹出层位置
	 *
	 * - 默认为 `'center'` ，即居中显示
	 * - 更多位置请查看 {@link Placement}
	 *
	 * @since 1.5.0
	 */
	placement?: Placement
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
	/**
	 * 弹出层遮罩动画类型
	 *
	 * - 默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出
	 * - 更多动画类型请查看 {@link IAnimations}
	 */
	maskAnimation?: Animation
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
	 * 弹出层动画时长
	 *
	 * - 默认为 `100` ，单位为 毫秒
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
	maskDestroy: false,
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
	maskBlur: false,
	maskTransparent: false,
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
			dataName: instance.renderType,
			dataType: `'${RenderType.APP}' | '${RenderType.VNODE}' | '${RenderType.ROOT_COMPONENT}'`,
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

		instance.store.onMounted()

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

		if (!instance) {
			log.type = LogType.Warning
			log.message = `更新弹出层 ${instanceId.name} 失败，弹出层不存在`
			printLog(log)
			return
		}

		for (const _key in options) {
			const key = _key as keyof UpdateOption
			const value =
				options[key] === undefined
					? instance.store[key].value
					: options[key]
			instance.store[key].value = value
		}

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

		await instance.unmount()

		log.message = `销毁弹出层 ${instance.id.name} 成功`

		printLog(log)

		instance.store.onUnmounted(payload)
	}
}
