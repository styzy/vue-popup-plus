import { POPUP_ANIMATIONS, type PopupCustomAnimations } from '../animation'
import { type IConfig } from '../config'
import { Controller, type IController } from '../controller'
import { PopupError } from '../error'
import { Log, printLog } from '../log'
import { type Version } from '../version'

type ControllerPrototypeFunctionValue = (
	this: IController,
	...args: any[]
) => any

export type ControllerPrototype = Record<
	string,
	| string
	| boolean
	| number
	| symbol
	| object
	| null
	| undefined
	| bigint
	| ControllerPrototypeFunctionValue
> & {
	render: '内置 render 方法'
	update: '内置 update 方法'
	destroy: '内置 destroy 方法'
	install: '内置 install 方法'
	use: '内置 use 方法'
}

export interface IPluginWrappedConfig extends IConfig {
	/**
	 * 控制器实例自定义属性原型对象
	 *
	 * - 可在插件的 `install` 方法中扩展方法或属性
	 * - 该属性为只读属性，只允许扩展，并且内置方法不能被覆盖
	 * - 使用示例：
	 *
	 * ```ts
	 * // 插件中扩展方法
	 * import { definePlugin } from 'vue-popup-plus'
	 *
	 * const plugin = definePlugin({
	 * 	name: 'test',
	 * 	install(config) {
	 * 		config.customProperties.test = function (message: string) {
	 * 			this.render({
	 * 				component: () => import('./views/Demo.vue'),
	 * 				componentProps: {
	 * 					message,
	 * 				},
	 * 			})
	 * 		}
	 * 	},
	 * })
	 *
	 * // 调用
	 * popup.test('hello world')
	 * ```
	 */
	readonly customProperties: ControllerPrototype
	/**
	 * 动画类型自定义属性原型对象
	 *
	 * - 可在插件的 `install` 方法中扩展动画类型
	 * - 该属性为只读属性，只允许扩展，并且内置动画类型不能被覆盖
	 * - 使用示例：
	 *
	 * ```ts
	 * // 插件中扩展动画类型
	 * import { definePlugin } from 'vue-popup-plus'
	 *
	 * const plugin = definePlugin({
	 * 	name: 'test',
	 * 	install(config) {
	 * 		config.customAnimations.CUSTOM = 'custom'
	 * 	},
	 * })
	 * ```
	 */
	readonly customAnimations: PopupCustomAnimations
}

export type PluginOption = Record<string, any>

type PluginInstall<TOption extends PluginOption> = (
	config: Readonly<IPluginWrappedConfig>,
	option?: TOption
) => void

export type PopupPlugin<TOption extends PluginOption = never> = {
	/**
	 * 插件名称
	 *
	 * - 插件名称必须唯一
	 * - 名称冲突将导致插件注册失败
	 */
	name: string
	/**
	 * 插件作者
	 *
	 * - 插件作者可以是个人或组织名称
	 * - 不设置插件作者将会导致在插件注册时
	 * 通过日志输出一个警告，用以提示插件使用者相关风险
	 *
	 * @since 1.5.0
	 */
	author?: string
	/**
	 * 插件核心版本校验函数
	 *
	 * - 插件作者需要在插件安装函数中校验弹出层核心版本是否符合插件要求
	 * - 该函数需要返回一个布尔值，`true` 表示核心版本符合要求，`false`
	 * 表示不符合要求，核心将会阻止该插件的注册
	 * - 不设置该校验函数将会导致在插件注册时
	 * 通过日志输出一个警告，用以提示插件使用者相关风险
	 */
	// coreVersionValidator?: (coreVersion: Version) => boolean
	/**
	 * 插件核心版本要求
	 *
	 * - 插件作者可以指定插件所适配的最低和最高核心版本
	 * - 不符合要求的核心将无法注册该插件
	 *
	 * @since 1.5.0
	 */
	requiredCoreVersion?: {
		/**
		 * 插件所适配的最低核心版本
		 */
		min?: Version
		/**
		 * 插件所适配的最高核心版本
		 */
		max?: Version
	}
	/**
	 * 插件安装函数
	 *
	 * - 第一个参数接收注册此插件的弹出层的创建配置
	 * - 第二个参数接收插件自定义选项，可自行定义，插件使用者可在调用
	 *  `popup.use` 方法时传入
	 */
	install: PluginInstall<TOption>
}

export type ExtractPluginOption<TPlugin extends PopupPlugin> =
	TPlugin extends PopupPlugin<infer TOption> ? TOption : never

export interface IDefinePlugin {
	/**
	 * 定义插件
	 *
	 * - 该方法用于定义一个可以直接被 `popup.use` 方法注册的插件
	 * - 插件的名称 `name` 必须唯一
	 * - 插件的作者 `author` 可以是个人或组织名称
	 * - 插件的核心版本要求 `coreVersion` 可以指定插件所适配的最低和最高核心版本，
	 * 不符合要求的核心将无法注册该插件
	 * - 插件的安装函数 `install` 必须是一个函数，接收两个参数：
	 *   - 第一个参数接收注册此插件的弹出层的创建配置
	 *   - 第二个参数接收插件自定义选项，可自行定义，插件使用者可在调用
	 *  `popup.use` 方法时传入
	 * - 使用示例：
	 *
	 * ```ts
	 * import { createPopupPlus, definePlugin } from 'vue-popup-plus'
	 * const PopupPlus = createPopupPlus()
	 *
	 * type TestPluginOption = {
	 * 	logEnable?: boolean
	 * }
	 *
	 * const plugin = definePlugin({
	 * 	name: 'test',
	 * 	author: 'your name',
	 * 	coreVersionValidator(coreVersion){
	 * 		const requiredVersion = '1.5.0'
	 * 		return coreVersion >= requiredVersion
	 * 	},
	 * 	install(config, { logEnable = false }: TestPluginOption = {}) {
	 * 		config.customProperties.test = function (message: string) {
	 * 			this.render({
	 * 				component: () => import('path/Demo.vue'),
	 * 				componentProps: {
	 * 					message,
	 * 				},
	 * 			})
	 *
	 * 			if (logEnable) {
	 * 				console.log(message)
	 * 			}
	 * 		}
	 * 	},
	 * })
	 *
	 * // 注册插件
	 * PopupPlus.use(plugin)
	 * ```
	 */
	<TOption extends PluginOption>(
		options: PopupPlugin<TOption>
	): PopupPlugin<TOption>
}

export const definePlugin: IDefinePlugin = (options) => options

interface IWrapConfigWithPlugin {
	(config: IConfig): IPluginWrappedConfig
}

export const wrapConfigWithPlugin: IWrapConfigWithPlugin = (config) => {
	return new Proxy<IConfig>(config, {
		set(target, property: keyof IConfig, value) {
			if (['customAnimations', 'customProperties'].includes(property)) {
				const log = new Log({
					caller: 'definePlugin()',
					message: `${property} 是只读属性，不能被覆盖`,
				})
				printLog(log)
				throw new PopupError(log)
			}

			;(target as any)[property] = value

			return true
		},
		get(target, property: string) {
			if (property === 'customProperties') {
				return createCustomPropertiseProxy()
			}
			if (property === 'customAnimations') {
				return createCustomAnimationsProxy()
			}
			return (target as any)[property]
		},
	}) as IPluginWrappedConfig
}

function createCustomPropertiseProxy() {
	return new Proxy(
		{},
		{
			set: (target, property: string, value) => {
				if (property in Controller.prototype) {
					const log = new Log({
						caller: 'definePlugin()',
						message: `定义控制器扩展属性 ${property} 时失败，${property} 属性已存在，不能被覆盖`,
					})
					printLog(log)
					throw new PopupError(log)
				}
				;(Controller.prototype as any)[property] = value
				return true
			},
			get: (target, property: string) => {
				if (property in Controller.prototype) {
					return (Controller.prototype as any)[property]
				}
				return undefined
			},
		}
	)
}

function createCustomAnimationsProxy() {
	return new Proxy(
		{},
		{
			set: (target, property: string, value) => {
				if (property in POPUP_ANIMATIONS) {
					const log = new Log({
						caller: 'definePlugin()',
						message: `定义插件扩展动画类型 ${property} 时失败，${property} 是只读属性，不能被覆盖`,
					})
					printLog(log)
					throw new PopupError(log)
				}
				;(POPUP_ANIMATIONS as any).__proto__[property] = value
				return true
			},
			get: (target, property: string) => {
				if (property in POPUP_ANIMATIONS) {
					return (POPUP_ANIMATIONS as any).__proto__[property]
				}
				return undefined
			},
		}
	)
}
