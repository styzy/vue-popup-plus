import {
	markRaw,
	reactive,
	type App,
	type ComponentInternalInstance,
} from 'vue'
import {
	POPUP_COMPONENT_NAMES,
	POPUP_DOCUMENT_URL,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'
import { Config, type PopupConfigOption, type IConfig } from '../config'
import { type PopupController } from '../controller'
import { internalDirectives } from '../directive'
import { Instance, type PopupInstanceId } from '../instance'
import { PopupLog, PopupLogGroupItemType, PopupLogType, printLog } from '../log'
import { createMixins } from '../mixins'
import {
	wrapConfigWithPlugin,
	type PluginOption,
	type PopupPlugin,
} from '../plugin'
import { version } from '../version'
import type { Instances, PopupCore } from './types'

export * from './types'

let core: PopupCore | null = null

export function createCore(options?: PopupConfigOption): PopupCore {
	return new Core(options)
}

export function getCore(): PopupCore | null {
	return core
}

// 核心种子，用于生成核心实例id，自动递增
let _coreSeed = 0

export class Core implements PopupCore {
	#id: string
	#app?: Readonly<App>
	#config: IConfig
	#controllerSeed: number = 0
	#instanceSeed: number = 0
	#instances: Instances = reactive({})
	#plugins: Record<string, PopupPlugin> = {}
	#originBodyOverflow: string = ''
	#registeredRootComponentInstances: ComponentInternalInstance[] = []
	statelessController?: PopupController
	statefulControllers: Map<ComponentInternalInstance, PopupController> =
		new Map()
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
	constructor(options: PopupConfigOption = {}) {
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

		// 注册内置指令
		Object.entries(internalDirectives).forEach(([name, directive]) => {
			app.directive(name, directive)
		})

		// 注册自定义指令
		Object.entries(this.#config.directives).forEach(([name, directive]) => {
			app.directive(name, directive)
		})

		this.#app = app

		printLog(
			new PopupLog({
				type: PopupLogType.Success,
				caller: {
					name: 'core.install()',
					type: 'Function',
					value: this.install,
				},
				message: `注册核心实例到 Vue 成功`,
				group: [
					{
						type: PopupLogGroupItemType.Info,
						title: 'Vue 版本',
						content: app.version,
					},
					{
						type: PopupLogGroupItemType.Data,
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
		const log = new PopupLog({
			type: PopupLogType.Success,
			caller: {
				name: 'core.use()',
				type: 'Function',
				value: this.use,
			},
			group: [
				{
					type: PopupLogGroupItemType.Info,
					title: '插件名称',
					content: plugin.name,
				},
				{
					type: PopupLogGroupItemType.Info,
					title: '插件作者',
					content: plugin.author ?? '未知（可能存在安全风险）',
				},
				{
					type: PopupLogGroupItemType.Info,
					title: '插件要求最低核心版本',
					content: plugin.requiredCoreVersion?.min ?? '-',
					important: true,
				},
				{
					type: PopupLogGroupItemType.Info,
					title: '插件要求最高核心版本',
					content: plugin.requiredCoreVersion?.max ?? '-',
					important: true,
				},
			],
		})

		if (!this.#addPlugin(plugin)) {
			log.type = PopupLogType.Error
			log.message = `注册插件 ${plugin.name} 失败，已存在同名插件 ${plugin.name}`
			printLog(log)
			return
		}

		const hasRequiredCoreVersion =
			plugin.requiredCoreVersion?.min || plugin.requiredCoreVersion?.max

		if (hasRequiredCoreVersion) {
			if (this.#validPluginVersion(plugin)) {
				log.group.push({
					type: PopupLogGroupItemType.Info,
					title: `插件版本校验`,
					content: `通过`,
					important: true,
				})
			} else {
				log.type = PopupLogType.Error
				log.message = `注册插件 ${plugin.name} 失败，未通过核心版本校验`
				log.group.push({
					type: PopupLogGroupItemType.Info,
					title: `插件版本校验`,
					content: `未通过`,
					important: true,
				})
				printLog(log)
				return
			}
		} else {
			log.group.push({
				type: PopupLogGroupItemType.Info,
				title: `插件版本校验`,
				content: `未校验（可能存在兼容性问题）`,
				important: true,
			})
		}

		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: '插件注册选项',
			dataName: 'options',
			dataValue: options,
		})

		plugin.install(wrapConfigWithPlugin(this.config), options)

		const hasAuthor = plugin.author !== undefined
		const hasRisk = !hasRequiredCoreVersion || !hasAuthor

		if (hasRisk) {
			log.type = PopupLogType.Warning
			log.message = `注册插件 ${plugin.name} 成功，但可能存在风险`
		} else {
			log.type = PopupLogType.Success
			log.message = `注册插件 ${plugin.name} 成功`
		}

		printLog(log)
	}
	registerRootComponent(vm: ComponentInternalInstance): boolean {
		if (!this.isRootComponentRegistered) {
			this.#registeredRootComponentInstances.push(vm)

			printLog(
				new PopupLog({
					type: PopupLogType.Info,
					caller: {
						name: 'core.registerRootComponent()',
						type: 'Function',
						value: this.registerRootComponent,
					},
					message: `根组件 ${POPUP_COMPONENT_NAMES.ROOT} 挂载成功`,
					group: [
						{
							type: PopupLogGroupItemType.Component,
							title: '挂载组件',
							instance: vm.parent,
						},
						{
							type: PopupLogGroupItemType.Message,
							title: '功能描述',
							content: `根组件为 usePopup() 函数提供非组件运行支持，同时所有弹出层组件将共享根组件上下文`,
						},
						{
							type: PopupLogGroupItemType.Message,
							title: '帮助文档',
							content: `${POPUP_DOCUMENT_URL}/about/faq.html#同步应用上下文`,
						},
					],
				})
			)

			return true
		} else {
			const log = new PopupLog({
				type: PopupLogType.Warning,
				caller: {
					name: 'core.registerRootComponent()',
					type: 'Function',
					value: this.registerRootComponent,
				},
				message: `检测到重复挂载 ${POPUP_COMPONENT_NAMES.ROOT} 根组件`,
				group: [
					{
						type: PopupLogGroupItemType.Component,
						title: '问题定位组件',
						instance: vm.parent,
					},
					{
						type: PopupLogGroupItemType.Message,
						title: '修改建议',
						content: `${POPUP_COMPONENT_NAMES.ROOT} 根组件同一时刻应当只存在一个实例，请移除多余的 ${POPUP_COMPONENT_NAMES.ROOT} 根组件`,
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
	getInstance(instanceId: PopupInstanceId): Instance | void {
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
