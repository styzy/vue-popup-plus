import { markRaw, reactive, type App, type Reactive } from 'vue'
import { Controller, type IController } from '../controller'
import { Instance, InstanceId } from '../instance'
import type { PopupPlugin } from '../plugin'
import {
	defaultPrintLog,
	Log,
	LogGroupItemType,
	LogType,
	printLog,
	type ILog,
	type ILogHandler,
} from '../log'
import { PopupError } from '../error'
import { PopupRootComponentName } from '../components/PopupRoot.vue'

export type CoreOption = {
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
	 * import { createPopup } from 'vue-popup-plus'
	 *
	 * const popup = createPopup({
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
	 * 	interface ComponentCustomProperties {
	 * 		$customPopup: typeof popup
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

export type CoreConfig = Required<CoreOption>

type Instances = Reactive<Record<InstanceId['name'], Instance>>

export interface ICore {
	/**
	 * 弹出层种子，用于生成弹出层实例id，自动递增
	 */
	seed: number
	/**
	 * 弹出层配置项
	 */
	config: CoreConfig
	/**
	 * 弹出层控制器
	 */
	controller: IController
	/**
	 * 弹出层实例存储
	 */
	instances: Instances
	/**
	 * 是否已注册根组件
	 */
	isRootComponentRegistered: boolean
	/**
	 * 注册根组件
	 */
	registerRootComponent(): void
	/**
	 * 注销根组件
	 */
	unregisterRootComponent(): void
	/**
	 * 添加弹出层实例
	 *
	 * @param instance - 弹出层实例 @
	 */
	addInstance(instance: Instance): void
	/**
	 * 获取弹出层实例
	 *
	 * @param instanceId - 弹出层实例id
	 */
	getInstance(instanceId: InstanceId): Instance | void
	/**
	 * 移除弹出层实例
	 *
	 * @param instance - 弹出层实例
	 */
	removeInstance(instance: Instance): void
}

let core: ICore | null = null

export function createCore(options?: CoreOption): ICore {
	return new Core(options)
}

export function getCore(): ICore | null {
	return core
}

export class Core implements ICore {
	app?: Readonly<App>
	#seed: number = 1
	#instances: Instances = reactive({})
	#controller: IController
	#config: CoreConfig
	#plugins: Record<string, PopupPlugin> = {}
	#originBodyOverflow: string = ''
	#registeredRootComponentCount: number = 0
	get seed() {
		return this.#seed++
	}
	get config() {
		return this.#config
	}
	get controller() {
		return this.#controller
	}
	get instances() {
		return this.#instances
	}
	get isRootComponentRegistered() {
		return this.#registeredRootComponentCount > 0
	}
	constructor({
		zIndex = 1000,
		prototypeName = '$popup',
		autoDisableScroll = true,
		logHandler = defaultPrintLog,
		debugMode = false,
	}: CoreOption = {}) {
		this.#config = {
			zIndex,
			prototypeName,
			autoDisableScroll,
			logHandler,
			debugMode,
		}
		this.#controller = new Controller(this)
		core = this
	}
	registerRootComponent(): void {
		if (this.#registeredRootComponentCount > 0) {
			const log = new Log({
				caller: 'core',
				type: LogType.Warning,
				message: `检测到同时存在 ${this.#registeredRootComponentCount + 1} 个 ${PopupRootComponentName} 根组件实例`,
				group: [
					{
						type: LogGroupItemType.Default,
						message: `修改建议：${PopupRootComponentName} 根组件同一时刻应当只存在一个实例，请移除多余的 ${PopupRootComponentName} 根组件`,
					},
				],
			})
			printLog(log)
		}
		this.#registeredRootComponentCount++
	}
	unregisterRootComponent(): void {
		this.#registeredRootComponentCount--
	}
	addInstance(instance: Instance) {
		this.#instances[instance.id.name] = markRaw(instance)
		if (this.config.autoDisableScroll && instance.store.disableScroll) {
			this.#disableScroll()
		}
	}
	getInstance(instanceId: InstanceId): Instance | void {
		return this.#instances[instanceId.name]
	}
	removeInstance(instance: Instance) {
		delete this.#instances[instance.id.name]
		if (
			Object.values(this.#instances).filter(
				(_instance) => _instance.store.disableScroll
			).length === 0
		) {
			this.#enableScroll()
		}
	}
	addPlugin(plugin: PopupPlugin): boolean {
		if (this.getPlugin(plugin.name)) return false

		this.#plugins[plugin.name] = plugin

		return true
	}
	getPlugin(pluginName: string): PopupPlugin | void {
		return this.#plugins[pluginName]
	}
	removePlugin(pluginName: string) {
		delete this.#plugins[pluginName]
	}
	#disableScroll() {
		if (document.body.style.overflow === 'hidden') return

		this.#originBodyOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
	}
	#enableScroll() {
		if (!this.config.autoDisableScroll) return

		document.body.style.overflow = this.#originBodyOverflow
	}
}
