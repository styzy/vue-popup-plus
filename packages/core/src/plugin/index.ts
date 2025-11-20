import type { IController } from '../controller'
import { PopupError } from '../error'
import { POPUP_ANIMATIONS, type PopupCustomAnimations } from '../animation'
import type { CoreConfig } from '..//core'

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

export interface IPluginWrappedController extends IController {
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
	 * 	install(popup) {
	 * 		popup.customProperties.test = function (message: string) {
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
	 * 	install(popup) {
	 * 		popup.customAnimations.CUSTOM = 'custom'
	 * 	},
	 * })
	 * ```
	 */
	readonly customAnimations: PopupCustomAnimations
}

export type PluginOption = Record<string, any>

type PluginInstall<TOption extends PluginOption> = (
	controller: IPluginWrappedController,
	config: Readonly<CoreConfig>,
	option?: TOption
) => void

export type PopupPlugin<TOption extends PluginOption = never> = {
	/**
	 * 插件名称
	 *
	 * - 插件名称必须唯一
	 */
	name: string
	/**
	 * 插件安装函数
	 *
	 * - 第一个参数接收安装此插件的弹出层控制器实例
	 * - 第二个参数接收安装此插件的弹出层的创建配置
	 * - 第三个参数接收插件自定义选项，可自行定义，插件使用者可在调用
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
	 * - 该方法用于定义一个可以直接被 `popup.use` 方法安装的插件
	 * - 插件的名称 `name` 必须唯一
	 * - 插件的安装函数 `install` 必须是一个函数，接收三个参数：
	 *   - 第一个参数接收安装此插件的弹出层控制器实例
	 *   - 第二个参数接收安装此插件的弹出层的创建配置
	 *   - 第三个参数接收插件自定义选项，可自行定义，插件使用者可在调用
	 *  `popup.use` 方法时传入
	 * - 使用示例：
	 *
	 * ```ts
	 * import { createPopup, definePlugin } from 'vue-popup-plus'
	 * const popup = createPopup()
	 *
	 * type TestPluginOption = {
	 * 	logEnable?: boolean
	 * }
	 *
	 * const plugin = definePlugin({
	 * 	name: 'test',
	 * 	install(popup, config, { logEnable = false }: TestPluginOption = {}) {
	 * 		popup.customProperties.test = function (message) {
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
	 * ```
	 */
	<TOption extends PluginOption>(
		options: PopupPlugin<TOption>
	): PopupPlugin<TOption>
}

export const definePlugin: IDefinePlugin = (options) => options

interface IWrapWithPlugin {
	(controller: IController): IPluginWrappedController
}

export const wrapWithPlugin: IWrapWithPlugin = (controller) => {
	return new Proxy<IPluginWrappedController>(
		controller as IPluginWrappedController,
		{
			set(target, property: string, value) {
				throw new PopupError(`${property} 是只读属性，不能被覆盖`)
			},
			get(target, property: string) {
				if (property === 'customProperties') {
					return createCustomPropertiseProxy(controller)
				}
				if (property === 'customAnimations') {
					return createCustomAnimationsProxy(controller)
				}
				return (controller as any)[property]
			},
		}
	)
}

function createCustomPropertiseProxy(controller: IController) {
	return new Proxy(
		{},
		{
			set: (target, property: string, value) => {
				if (property in controller) {
					throw new PopupError(
						`定义插件扩展属性 ${property} 时失败，${property} 是只读属性，不能被覆盖`
					)
				}
				;(controller as any).__proto__[property] = value
				return true
			},
			get: (target, property: string) => {
				if (property in controller) {
					return (controller as any).__proto__[property]
				}
				return undefined
			},
		}
	)
}

function createCustomAnimationsProxy(controller: IController) {
	return new Proxy(
		{},
		{
			set: (target, property: string, value) => {
				if (property in POPUP_ANIMATIONS) {
					throw new PopupError(
						`定义插件扩展动画类型 ${property} 时失败，${property} 是只读属性，不能被覆盖`
					)
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
