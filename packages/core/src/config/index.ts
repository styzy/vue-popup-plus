import { defaultPrintLog, type ILogHandler, type LogFilter } from '../log'

type ZIndexGetter = () => number

export interface IConfig {
	/**
	 * 弹出层 zIndex 基础值
	 */
	zIndex: number | ZIndexGetter
	/**
	 * 获取下一个弹出层 zIndex 值
	 *
	 * - 如果 `zIndex` 是一个工厂函数，则每次调用该函数获取一个新的 `z-index` 值。
	 * - 否则，每次调用该方法会返回基础值并自动递增。
	 */
	nextZIndex(): number
	/**
	 * 是否自动禁用滚动
	 */
	autoDisableScroll: boolean
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 */
	prototypeName: string
	/**
	 * 日志器
	 */
	logHandler: ILogHandler
	/**
	 * 日志过滤器
	 */
	logFilter?: LogFilter
	/**
	 * 开启调试模式
	 */
	debugMode: boolean
}

export type ConfigOption = {
	/**
	 * 弹出层 zIndex 基础值
	 *
	 * - 默认为 `1000`
	 * - 每次生成弹出层时，除非 render() 方法传入
	 *   zIndex，否则使用此基础值，每次使用后会自动递增
	 * - 从 `1.6.1` 版本开始，支持传入一个工厂函数，每次渲染弹出层时，
	 *   会调用该函数获取一个新的 `z-index` 值。
	 */
	zIndex?: number | ZIndexGetter
	/**
	 * 是否自动禁用滚动
	 *
	 * - 默认为 `true`
	 * - 开启后，弹出层显示时会自动禁用页面滚动
	 */
	autoDisableScroll?: boolean
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 *
	 * - 默认为 `$popup` ，这在使用 选项式 API 时可以在组件内通过 `this.$popup`
	 *   访问控制器实例，可以使用该属性自定义挂载属性名
	 *
	 * - 使用示例：
	 * ```ts
	 * // main.ts
	 * import { createPopupPlus } from 'vue-popup-plus'
	 *
	 * const PopupPlus = createPopupPlus({
	 * 	prototypeName: '$customPopup',
	 * })
	 *
	 * // 组件内
	 * this.$customPopup.render({
	 * 	component: Demo,
	 * })
	 * ```
	 *
	 * - 注意，如果你使用 TypeScript，则自定义属性名称需要手动同步添加类型扩展，扩展代码可以放在一个
	 *   .ts 文件，或是一个影响整个项目的 *.d.ts 文件中。
	 * - 扩展代码示例：
	 *
	 * ```ts
	 * // 扩展自定义属性名类型
	 * declare module 'vue' {
	 *  import { type IController } from 'vue-popup-plus'
	 * 	interface ComponentCustomProperties {
	 * 		$customPopup: IController
	 * 	}
	 * }
	 * ```
	 */
	prototypeName?: string
	/**
	 * 日志器
	 *
	 * - 默认使用内置的日志器，仅会在开启调试模式时在控制台输出日志
	 * - 你可以自定义日志器，需要注意日志的接收将不会受到调试模式的影响，
	 *   无论调试模式是否开启，日志都将被传递给自定义的日志器。
	 *
	 * @since 1.5.0
	 */
	logHandler?: ILogHandler
	/**
	 * 日志过滤器
	 *
	 * - 你可以自定义日志过滤器，用于过滤日志，该函数接收每个日志对象
	 *   作为参数，返回 `true` 表示放行打印，返回 `false` 将过滤该日志。
	 *
	 * @since 1.6.0
	 */
	logFilter?: LogFilter
	/**
	 * 开启调试模式
	 *
	 * - 默认为 `false`
	 * - 开启后，将会在控制台输出日志，同时如果未注册根组件，调试模式下
	 *   将会使用 Vue App 实例渲染弹出层，方便开发者调试。
	 * - 注意：开启调试模式可能会影响到性能，不建议在生产环境开启。
	 */
	debugMode?: boolean
}

export class Config implements IConfig {
	zIndex: number | ZIndexGetter
	autoDisableScroll: boolean
	prototypeName: string
	logHandler: ILogHandler
	logFilter?: LogFilter
	debugMode: boolean
	#zIndexOffset = 0
	constructor({
		zIndex = 1000,
		prototypeName = '$popup',
		autoDisableScroll = true,
		logHandler = defaultPrintLog,
		logFilter,
		debugMode = false,
	}: ConfigOption = {}) {
		this.zIndex = zIndex
		this.autoDisableScroll = autoDisableScroll
		this.prototypeName = prototypeName
		this.logHandler = logHandler
		this.logFilter = logFilter
		this.debugMode = debugMode
	}
	nextZIndex(): number {
		if (typeof this.zIndex === 'function') {
			console.log('this: ', this)
			return this.zIndex()
		}
		console.log('this: ', this)
		return this.zIndex + this.#zIndexOffset++
	}
}
