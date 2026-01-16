import {
	markRaw,
	reactive,
	type App,
	type ComponentInternalInstance,
	type Reactive,
} from 'vue'
import { Config, type ConfigOption, type IConfig } from '../config'
import { type IController } from '../controller'
import { Instance, InstanceId } from '../instance'
import { Log, LogGroupItemType, LogType, printLog } from '../log'
import { createMixins } from '../mixins'
import {
	wrapConfigWithPlugin,
	type ExtractPluginOption,
	type PluginOption,
	type PopupPlugin,
} from '../plugin'
import { version, type Version } from '../version'
import { DOCUMENT_URL, POPUP_INSIDE_COMPONENT_INJECTS } from '../CONSTANTS'
import { PopupRootComponentName } from '../components/PopupRoot.vue'

type Instances = Reactive<Record<InstanceId['name'], Instance>>

export interface ICore {
	readonly id: string
	/**
	 * 插件所挂载的 Vue 应用实例
	 */
	readonly app?: Readonly<App>
	/**
	 * 控制器实例种子，用于生成控制器实例id，自动递增
	 */
	readonly controllerSeed: number
	/**
	 * 弹出层实例种子，用于生成弹出层实例id，自动递增
	 */
	readonly instanceSeed: number
	/**
	 * 弹出层配置项
	 */
	readonly config: IConfig
	/**
	 * 弹出层实例存储
	 */
	readonly instances: Instances
	/**
	 * 无状态控制器实例
	 */
	noStateController?: IController
	/**
	 * 是否已注册根组件
	 */
	readonly isRootComponentRegistered: boolean
	/**
	 * 版本号
	 */
	readonly version: Version
	/**
	 * Vue 插件安装函数
	 */
	install(app: App): any
	/**
	 * 注册插件
	 *
	 * - 可注册使用 `definePlugin()` 方法定义的插件
	 * - 重复注册相同的插件，会被忽略
	 * - 具体请参考{@link IDefinePlugin}
	 */
	use<TOption extends PluginOption, TPlugin extends PopupPlugin<TOption>>(
		plugin: TPlugin,
		options?: ExtractPluginOption<TPlugin>
	): void
	/**
	 * 注册根组件
	 */
	registerRootComponent(vm: ComponentInternalInstance): boolean
	/**
	 * 注销根组件
	 */
	unregisterRootComponent(vm: ComponentInternalInstance): void
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

export function createCore(options?: ConfigOption): ICore {
	return new Core(options)
}

export function getCore(): ICore | null {
	return core
}

// 核心种子，用于生成核心实例id，自动递增
let _coreSeed = 0

export class Core implements ICore {
	#id: string
	#app?: Readonly<App>
	#config: IConfig
	#controllerSeed: number = 0
	#instanceSeed: number = 0
	#instances: Instances = reactive({})
	#plugins: Record<string, PopupPlugin> = {}
	#originBodyOverflow: string = ''
	#registeredRootComponentInstances: ComponentInternalInstance[] = []
	get id() {
		return this.#id
	}
	get app() {
		return this.#app
	}
	get controllerSeed() {
		return ++this.#controllerSeed
	}
	get instanceSeed() {
		return ++this.#instanceSeed
	}
	get config() {
		return this.#config
	}
	get instances() {
		return this.#instances
	}
	get isRootComponentRegistered() {
		return this.#registeredRootComponentInstances.length > 0
	}
	constructor(options: ConfigOption = {}) {
		this.#id = `popup-core-${++_coreSeed}`
		this.#config = new Config(options)

		core = this
	}
	get version() {
		return version
	}
	install(app: App) {
		const mixins = createMixins(this)

		app.mixin(mixins)

		app.provide(POPUP_INSIDE_COMPONENT_INJECTS.CORE, this)

		this.#app = app

		printLog(
			new Log({
				type: LogType.Success,
				caller: {
					name: 'core.install()',
					type: 'Function',
					value: this.install,
				},
				message: `注册核心实例到 Vue 成功`,
				group: [
					{
						type: LogGroupItemType.Info,
						title: 'Vue 版本',
						content: app.version,
					},
					{
						type: LogGroupItemType.Data,
						title: 'Vue 应用实例',
						dataName: 'app',
						dataType: 'App',
						dataValue: app,
					},
				],
			})
		)
	}
	use<TOption extends PluginOption>(
		plugin: PopupPlugin<TOption>,
		options?: TOption
	) {
		const log = new Log({
			type: LogType.Success,
			caller: {
				name: 'core.use()',
				type: 'Function',
				value: this.use,
			},
			group: [
				{
					type: LogGroupItemType.Info,
					title: '插件名称',
					content: plugin.name,
				},
				{
					type: LogGroupItemType.Info,
					title: '插件作者',
					content: plugin.author ?? '未知（可能存在安全风险）',
				},
				{
					type: LogGroupItemType.Info,
					title: '插件要求最低核心版本',
					content: plugin.requiredCoreVersion?.min ?? '-',
					important: true,
				},
				{
					type: LogGroupItemType.Info,
					title: '插件要求最高核心版本',
					content: plugin.requiredCoreVersion?.max ?? '-',
					important: true,
				},
			],
		})

		if (!this.#addPlugin(plugin)) {
			log.type = LogType.Error
			log.message = `注册插件 ${plugin.name} 失败，已存在同名插件 ${plugin.name}`
			printLog(log)
			return
		}

		const hasRequiredCoreVersion =
			plugin.requiredCoreVersion?.min || plugin.requiredCoreVersion?.max

		if (hasRequiredCoreVersion) {
			if (this.#validPluginVersion(plugin)) {
				log.group.push({
					type: LogGroupItemType.Info,
					title: `插件版本校验`,
					content: `通过`,
					important: true,
				})
			} else {
				log.type = LogType.Error
				log.message = `注册插件 ${plugin.name} 失败，未通过核心版本校验`
				log.group.push({
					type: LogGroupItemType.Info,
					title: `插件版本校验`,
					content: `未通过`,
					important: true,
				})
				printLog(log)
				return
			}
		} else {
			log.group.push({
				type: LogGroupItemType.Info,
				title: `插件版本校验`,
				content: `未校验（可能存在兼容性问题）`,
				important: true,
			})
		}

		log.group.push({
			type: LogGroupItemType.Data,
			title: '插件注册选项',
			dataName: 'options',
			dataValue: options,
		})

		plugin.install(wrapConfigWithPlugin(this.config), options)

		const hasAuthor = plugin.author !== undefined
		const hasRisk = !hasRequiredCoreVersion || !hasAuthor

		if (hasRisk) {
			log.type = LogType.Warning
			log.message = `注册插件 ${plugin.name} 成功，但可能存在风险`
		} else {
			log.type = LogType.Success
			log.message = `注册插件 ${plugin.name} 成功`
		}

		printLog(log)
	}
	registerRootComponent(vm: ComponentInternalInstance): boolean {
		if (!this.isRootComponentRegistered) {
			this.#registeredRootComponentInstances.push(vm)

			printLog(
				new Log({
					type: LogType.Info,
					caller: {
						name: 'core.registerRootComponent()',
						type: 'Function',
						value: this.registerRootComponent,
					},
					message: `根组件 ${PopupRootComponentName} 挂载成功`,
					group: [
						{
							type: LogGroupItemType.Component,
							title: '挂载组件',
							instance: vm.parent,
						},
						{
							type: LogGroupItemType.Message,
							title: '功能描述',
							content: `根组件为 usePopup() 函数提供非组件运行支持，同时所有弹出层组件将共享根组件上下文`,
						},
						{
							type: LogGroupItemType.Message,
							title: '帮助文档',
							content: `${DOCUMENT_URL}/about/faq.html#同步应用上下文`,
						},
					],
				})
			)

			return true
		} else {
			const log = new Log({
				type: LogType.Warning,
				caller: {
					name: 'core.registerRootComponent()',
					type: 'Function',
					value: this.registerRootComponent,
				},
				message: `检测到重复挂载 ${PopupRootComponentName} 根组件`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '问题定位组件',
						instance: vm.parent,
					},
					{
						type: LogGroupItemType.Message,
						title: '修改建议',
						content: `${PopupRootComponentName} 根组件同一时刻应当只存在一个实例，请移除多余的 ${PopupRootComponentName} 根组件`,
					},
				],
			})
			printLog(log)
			return false
		}
	}
	unregisterRootComponent(vm: ComponentInternalInstance): void {
		const index = this.#registeredRootComponentInstances.indexOf(vm)

		if (index !== -1) {
			this.#registeredRootComponentInstances.splice(index, 1)
		}
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
	#addPlugin(plugin: PopupPlugin): boolean {
		if (this.#getPlugin(plugin.name)) return false

		this.#plugins[plugin.name] = plugin

		return true
	}
	#getPlugin(pluginName: string): PopupPlugin | void {
		return this.#plugins[pluginName]
	}
	#removePlugin(pluginName: string) {
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
	#validPluginVersion(plugin: PopupPlugin) {
		const { requiredCoreVersion } = plugin
		const { min, max } = requiredCoreVersion ?? {}

		if (min && version < min) {
			return false
		}

		if (max && version > max) {
			return false
		}
		return true
	}
}
