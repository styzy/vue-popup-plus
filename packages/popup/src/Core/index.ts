import { Controller, type IController } from '../controller'
import { Instance, InstanceId } from '../Instance'
import type { Plugin } from '../plugin'

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
	 * 添加弹出层实例
	 * @param instance - 弹出层实例
	 * @
	 */
	addInstance(instance: Instance): void
	/**
	 * 获取弹出层实例
	 * @param instanceId - 弹出层实例id
	 */
	getInstance(instanceId: InstanceId): Instance | void
	/**
	 * 移除弹出层实例
	 * @param instance - 弹出层实例
	 */
	removeInstance(instance: Instance): void
}

export type CoreOptions = {
	/**
	 * 弹出层 zIndex 基础值
	 * - 默认为1000，每次生成弹出层时，除非 render() 方法传入 zIndex，否则使用此基础值，每次使用后会自动递增
	 */
	zIndex?: number
	/**
	 * 弹出层控制器挂载在 Vue 实例上的属性名
	 * - 默认为 $popup ，这在使用选项式API时可以在组件内通过this.$popup 访问控制器实例，可以使用该属性自定义挂载属性名
	 * - 使用示例：
	 * ```ts
	 * // main.ts
	 * import { createPopup } from 'vue-popup-plus'
	 *
	 * const popup = createPopup({
	 * 	prototypeName: '$customPopup'
	 * })
	 *
	 * // 组件内
	 * this.$customPopup.render({
	 * 	component: Demo,
	 * })
	 * ```
	 * - 注意，如果你使用 TypeScript，则自定义属性名称需要手动同步添加类型扩展，扩展代码可以放在一个 .ts 文件，或是一个影响整个项目的 *.d.ts 文件中。
	 * - 扩展代码示例：
	 * ```ts
	 * // 扩展自定义属性名类型
	 * declare module 'vue' {
	 * 	interface ComponentCustomProperties {
	 * 		$customPopup: typeof popup
	 * 	}
	 * }
	 */
	prototypeName?: string
}

type CoreConfig = Required<CoreOptions>

let core: ICore

export function createCore(options?: CoreOptions): ICore {
	return new Core(options)
}

export function getCore() {
	return core
}

export class Core implements ICore {
	#seed: number = 1
	#instances: Record<InstanceId['name'], Instance> = {}
	#controller: IController
	#config: CoreConfig
	#plugins: Record<string, Plugin> = {}
	get seed() {
		return this.#seed++
	}
	get config() {
		return this.#config
	}
	get controller() {
		return this.#controller
	}
	constructor({ zIndex = 1000, prototypeName = '$popup' }: CoreOptions = {}) {
		this.#config = { zIndex, prototypeName }
		this.#controller = new Controller(this)
		core = this
	}
	addInstance(instance: Instance) {
		this.#instances[instance.id.name] = instance
	}
	getInstance(instanceId: InstanceId): Instance | void {
		return this.#instances[instanceId.name]
	}
	removeInstance(instance: Instance) {
		delete this.#instances[instance.id.name]
	}
	addPlugin(plugin: Plugin): boolean {
		if (this.getPlugin(plugin.name)) return false

		this.#plugins[plugin.name] = plugin

		return true
	}
	getPlugin(pluginName: string): Plugin | void {
		return this.#plugins[pluginName]
	}
	removePlugin(pluginName: string) {
		delete this.#plugins[pluginName]
	}
}

