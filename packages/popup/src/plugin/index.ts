import type { IController } from '../controller'
import { PopupError } from '../error'
import { POPUP_ANIMATIONS, type PopupCustomAnimations } from '../animation'

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

interface IPluginWrappedController extends IController {
	/**
	 * 原型属性
	 * - 可在插件的 `install` 方法中扩展方法或属性
	 * - 该属性为只读属性，只允许扩展，并且内置方法不能被覆盖
	 * - 使用示例：
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
	 * 自定义动画类型
	 * - 可在插件的 `install` 方法中扩展动画类型
	 * - 该属性为只读属性，只允许扩展，并且内置动画类型不能被覆盖
	 * - 使用示例：
	 * ```ts
	 * // 插件中扩展动画类型
	 * import { definePlugin } from 'vue-popup-plus'
	 *
	 * const plugin = definePlugin({
	 * 	name: 'test',
	 * 	install(popup) {
	 * 		popup.customAnimations.CUSTOM = 'CUSTOM'
	 * 	},
	 * })
	 * ```
	 */
	readonly customAnimations: PopupCustomAnimations
}

type PluginInstall = (controller: IPluginWrappedController) => void

export type Plugin = { name: string; install: PluginInstall }

interface IDefinePlugin {
	/**
	 * 定义插件
	 * - 插件是一个对象，包含插件名称和安装方法
	 * - 安装方法接收一个可扩展自定义属性的控制器实例作为参数，用于扩展弹出层插件的原型属性
	 * - 使用示例：
	 * ```ts
	 * import { createPopup, definePlugin } from 'vue-popup-plus'
	 * const popup = createPopup()
	 * const plugin = definePlugin({
	 * 	// 插件名称，必须唯一
	 * 	name: 'test',
	 * 	// 插件安装时的回调函数，会将控制器实例作为参数传入
	 * 	install(popup) {
	 * 		popup.customProperties.test = function (message) {
	 * 			this.render({
	 * 				component: () => import('path/Demo.vue'),
	 * 				componentProps: {
	 * 					message,
	 * 				},
	 * 			})
	 * 		}
	 * 	},
	 * })
	 * ```
	 */
	(options: Plugin): Plugin
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
				console.log('property: ', property)
				console.log('property in controller: ', property in controller)
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
