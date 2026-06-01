import type { App, ComponentInternalInstance, Reactive } from 'vue'
import type { IConfig } from '@core/config'
import type { PopupController } from '@core/controller'
import type { Instance, PopupInstanceId } from '@core/instance'
import type {
	ExtractPluginOption,
	PluginOption,
	PopupPlugin,
} from '@core/plugin'
import type { PopupVersion } from '@core/version'

export type Instances = Reactive<Record<PopupInstanceId['name'], Instance>>

export interface PopupCore {
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
	statelessController?: PopupController
	/**
	 * 有状态控制器实例集合
	 */
	statefulControllers: Map<ComponentInternalInstance, PopupController>
	/**
	 * 是否已注册根组件
	 */
	readonly isRootComponentRegistered: boolean
	/**
	 * 版本号
	 */
	readonly version: PopupVersion
	/**
	 * Vue 插件安装函数
	 */
	install(app: App): any
	/**
	 * 注册插件
	 *
	 * - 可注册使用 `definePlugin()` 方法定义的插件
	 * - 重复注册相同的插件，会被忽略
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
	getInstance(instanceId: PopupInstanceId): Instance | void
	/**
	 * 移除弹出层实例
	 *
	 * @param instance - 弹出层实例
	 */
	removeInstance(instance: Instance): void
}
