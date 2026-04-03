import { unref, type ComponentInternalInstance } from 'vue'
import { POPUP_ANIMATIONS } from '../animation'
import { type ICore } from '../core'
import { PopupError } from '../error'
import { Instance, InstanceRenderType, type InstanceId } from '../instance'
import { printLog, Log, LogType, LogGroupItemType } from '../log'
import { version } from '../version'
import type { IController, RenderOption, UpdateOption } from './types'

export * from './types'

const defaultOptions: Required<Omit<RenderOption, 'zIndex' | 'component'>> = {
	anchor: null,
	anchorFlip: false,
	anchorShift: 'none',
	anchorPlacement: 'top',
	animationDuration: 100,
	appendTo: 'body',
	componentProps: {},
	disableScroll: true,
	height: 'auto',
	mask: true,
	maskAnimation: POPUP_ANIMATIONS.FADE,
	maskBlur: false,
	maskDestroy: false,
	maskTransparent: false,
	maxHeight: 'auto',
	maxWidth: 'auto',
	minHeight: 'auto',
	minWidth: 'auto',
	onMounted: () => {},
	onUnmounted: () => {},
	placement: 'center',
	width: 'auto',
	viewAnimation: POPUP_ANIMATIONS.FADE,
	viewport: null,
	viewTranslateX: 0,
	viewTranslateY: 0,
	viewTranslateOverflow: false,
}

export function createController(
	core: ICore,
	vm: ComponentInternalInstance | null,
	log: Log = new Log({
		type: LogType.Success,
		caller: '未知',
	})
): IController {
	let controller: IController

	// 当不使用根组件并且提供组件实例时，使用有状态控制器
	const useStatefulController = !core.isRootComponentRegistered && vm

	if (useStatefulController) {
		const componentName = vm.type.name || vm.type.__name || '未知'

		if (core.statefulControllers.has(vm)) {
			controller = core.statefulControllers.get(vm)!

			log.type = LogType.Info
			log.message = `从缓存中获取有状态控制器 ${controller.id} 成功，包含 ${componentName} 组件上下文`
			log.group.push({
				type: LogGroupItemType.Component,
				title: '调用组件',
				instance: vm,
			})
			log.group.push({
				type: LogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'IController',
				dataValue: controller,
			})
		} else {
			controller = new Controller(core, vm || undefined)
			core.statefulControllers.set(vm, controller)

			log.message = `创建有状态控制器 ${controller.id} 成功，包含 ${componentName} 组件上下文`
			log.group.push({
				type: LogGroupItemType.Component,
				title: '调用组件',
				instance: vm,
			})
			log.group.push({
				type: LogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'IController',
				dataValue: controller,
			})
		}
	} else {
		if (core.statelessController) {
			controller = core.statelessController

			log.type = LogType.Info
			log.message = `从缓存中获取无状态控制器 ${controller.id} 成功`
			log.group.push({
				type: LogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'IController',
				dataValue: controller,
			})
		} else {
			controller = core.statelessController = new Controller(core)

			log.message = `创建无状态控制器 ${controller.id} 成功，存入缓存`
			log.group.push({
				type: LogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'IController',
				dataValue: controller,
			})
		}
	}

	return controller
}

export class Controller implements IController {
	#id: string
	#vm?: ComponentInternalInstance
	#core: ICore
	get id() {
		return this.#id
	}
	get isInstalled() {
		return !!this.#core.app
	}
	get version() {
		return version
	}
	constructor(core: ICore, vm?: ComponentInternalInstance) {
		this.#id = `popup-controller-${core.controllerSeed}`
		this.#core = core
		this.#vm = vm
	}
	render({ zIndex, ...options }: RenderOption) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.render()',
				type: 'Function',
				value: this.render,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: `渲染参数`,
					dataName: `options`,
					dataType: 'RenderOption',
					dataValue: arguments[0],
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `渲染弹出层失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		zIndex = zIndex ?? this.#core.config.nextZIndex()

		const mergedOptions = {
			...defaultOptions,
			...options,
			...{ zIndex },
		}

		const instance: Instance = new Instance(
			this.#core,
			mergedOptions,
			this.#vm
		)

		instance.mount()

		log.message = `渲染弹出层 ${instance.id.name} 成功`
		log.group.push({
			type: LogGroupItemType.Data,
			title: `渲染合并参数`,
			dataName: `mergedOptions`,
			dataValue: mergedOptions,
			dataType: 'RenderOption',
		})
		log.group.push({
			type: LogGroupItemType.Data,
			title: '渲染方式',
			dataName: instance.renderType,
			dataType: `'${InstanceRenderType.APP}' | '${InstanceRenderType.VNODE}' | '${InstanceRenderType.ROOT_COMPONENT}'`,
			dataValue: instance.renderType,
			important: true,
		})
		log.group.push({
			type: LogGroupItemType.Data,
			title: `弹出层实例`,
			dataName: instance.id.name,
			dataValue: instance,
			dataType: 'Instance',
		})

		printLog(log)

		unref(instance.store.onMounted)()

		return instance.id
	}
	getComputedStyle(instanceId: InstanceId) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.getComputedStyle()',
				type: 'Function',
				value: this.getComputedStyle,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: '目标实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'InstanceId',
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `获取弹出层 ${instanceId.name} 计算样式失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = LogType.Warning
			log.message = `获取弹出层 ${instanceId.name} 计算样式失败，弹出层不存在`
			printLog(log)
			return null
		}

		const computedStyle = instance.store.computedStyle

		if (!computedStyle) {
			log.type = LogType.Warning
			log.message = `获取弹出层 ${instanceId.name} 计算样式失败，弹出层未挂载`
			printLog(log)
			return null
		}

		log.message = `获取弹出层 ${instanceId.name} 计算样式成功`
		log.group.push({
			type: LogGroupItemType.Data,
			title: '弹出层实例',
			dataName: instanceId.name,
			dataType: 'Instance',
			dataValue: instance,
		})
		log.group.push({
			type: LogGroupItemType.Data,
			title: '弹出层计算样式',
			dataName: 'computedStyle',
			dataType: 'ComputedStyle',
			dataValue: computedStyle,
		})

		return computedStyle
	}
	update(instanceId: InstanceId, options: UpdateOption) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.update()',
				type: 'Function',
				value: this.update,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: '更新实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'InstanceId',
				},
				{
					type: LogGroupItemType.Data,
					title: '更新参数',
					dataName: `options`,
					dataValue: options,
					dataType: 'UpdateOption',
					important: true,
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `更新弹出层 ${instanceId.name} 失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = LogType.Warning
			log.message = `更新弹出层 ${instanceId.name} 失败，弹出层不存在`
			printLog(log)
			return
		}

		for (const _key in options) {
			const key = _key as keyof UpdateOption
			const value =
				options[key] === undefined
					? instance.store[key].value
					: options[key]
			instance.store[key].value = value
		}

		log.message = `更新弹出层 ${instance.id.name} 成功`
		log.group.push({
			type: LogGroupItemType.Data,
			title: '弹出层实例',
			dataName: instanceId.name,
			dataType: 'Instance',
			dataValue: instance,
		})

		printLog(log)
	}
	async destroy(instanceId: InstanceId, payload?: any) {
		const log = new Log({
			type: LogType.Info,
			caller: {
				name: 'popup.destroy()',
				type: 'Function',
				value: this.destroy,
			},
			group: [
				{
					type: LogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: LogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'IController',
				},
				{
					type: LogGroupItemType.Data,
					title: '销毁实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'InstanceId',
				},
				{
					type: LogGroupItemType.Data,
					title: '销毁携带参数',
					dataName: `payload`,
					dataValue: payload,
					dataType: 'any',
				},
			],
		})

		if (!this.isInstalled) {
			log.type = LogType.Error
			log.message = `销毁弹出层 ${instanceId.name} 失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = LogType.Warning
			log.message = `销毁弹出层 ${instanceId.name} 失败，弹出层不存在`
			printLog(log)
			return
		}

		await instance.unmount()

		log.message = `销毁弹出层 ${instance.id.name} 成功`
		log.group.push({
			type: LogGroupItemType.Data,
			title: '弹出层实例',
			dataName: instanceId.name,
			dataValue: instance,
			dataType: 'Instance',
		})

		printLog(log)

		unref(instance.store.onUnmounted)(payload)
	}
}
