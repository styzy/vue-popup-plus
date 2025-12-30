import { defaultPrintLog, type ILogHandler } from '../log'

export interface IConfig {
	/**
	 * 弹出层 zIndex 基础值
	 */
	zIndex: number
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
	 * 开启调试模式
	 */
	debugMode: boolean
	// custom
}

export type ConfigOption = {
	/**
	 * 弹出层 zIndex 基础值
	 *
	 * - 默认为1000，每次生成弹出层时，除非 render() 方法传入
	 *   zIndex，否则使用此基础值，每次使用后会自动递增
	 */
	zIndex?: number
	/**
	 * 是否自动禁用滚动
	 *
	 * - 默认为 true
	 * - 开启后，弹出层显示时会自动禁用页面滚动
	 */
	autoDisableScroll?: boolean
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 *
	 * - 默认为 $popup ，这在使用 选项式 API 时可以在组件内通过 this.$popup
	 *   访问控制器实例，可以使用该属性自定义挂载属性名
	 * - 使用示例：
	 *
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
	 */
	logHandler?: ILogHandler
	/**
	 * 开启调试模式
	 *
	 * - 默认为 false
	 * - 注意：开启调试模式可能会影响到性能，不建议在生产环境开启。
	 * - 开启后，将会在控制台输出日志，同时如果未注册根组件，调试模式下
	 *   将会使用 Vue App 实例渲染弹出层，方便开发者调试。
	 */
	debugMode?: boolean
}

export class Config implements IConfig {
	zIndex: number
	autoDisableScroll: boolean
	prototypeName: string
	logHandler: ILogHandler
	debugMode: boolean
	constructor({
		zIndex = 1000,
		prototypeName = '$popup',
		autoDisableScroll = true,
		logHandler = defaultPrintLog,
		debugMode = false,
	}: ConfigOption = {}) {
		this.zIndex = zIndex
		this.autoDisableScroll = autoDisableScroll
		this.prototypeName = prototypeName
		this.logHandler = logHandler
		this.debugMode = debugMode
	}
}
