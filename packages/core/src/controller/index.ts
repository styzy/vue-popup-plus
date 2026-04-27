import { unref, type ComponentInternalInstance } from 'vue'
import { POPUP_ANIMATIONS } from '../animation'
import { type PopupCore } from '../core'
import { PopupError } from '../error'
import { Instance, InstanceRenderType, type PopupInstanceId } from '../instance'
import { printLog, PopupLog, PopupLogType, PopupLogGroupItemType } from '../log'
import { version } from '../version'
import type {
	PopupController,
	PopupRenderOption,
	PopupUpdateOption,
} from './types'

export * from './types'

const defaultOptions: Required<
	Omit<PopupRenderOption, 'zIndex' | 'component'>
> = {
	anchor: null,
	anchorFlip: false,
	anchorFlipAdvance: 0,
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
	core: PopupCore,
	vm: ComponentInternalInstance | null,
	log: PopupLog = new PopupLog({
		type: PopupLogType.Success,
		caller: '未知',
	})
): PopupController {
	let controller: PopupController

	// 当不使用根组件并且提供组件实例时，使用有状态控制器
	const useStatefulController = !core.isRootComponentRegistered && vm

	if (useStatefulController) {
		const componentName = vm.type.name || vm.type.__name || '未知'

		if (core.statefulControllers.has(vm)) {
			controller = core.statefulControllers.get(vm)!

			log.type = PopupLogType.Info
			log.message = `从缓存中获取有状态控制器 ${controller.id} 成功，包含 ${componentName} 组件上下文`
			log.group.push({
				type: PopupLogGroupItemType.Component,
				title: '调用组件',
				instance: vm,
			})
			log.group.push({
				type: PopupLogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'PopupController',
				dataValue: controller,
			})
		} else {
			controller = new Controller(core, vm || undefined)
			core.statefulControllers.set(vm, controller)

			log.message = `创建有状态控制器 ${controller.id} 成功，包含 ${componentName} 组件上下文`
			log.group.push({
				type: PopupLogGroupItemType.Component,
				title: '调用组件',
				instance: vm,
			})
			log.group.push({
				type: PopupLogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'PopupController',
				dataValue: controller,
			})
		}
	} else {
		if (core.statelessController) {
			controller = core.statelessController

			log.type = PopupLogType.Info
			log.message = `从缓存中获取无状态控制器 ${controller.id} 成功`
			log.group.push({
				type: PopupLogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'PopupController',
				dataValue: controller,
			})
		} else {
			controller = core.statelessController = new Controller(core)

			log.message = `创建无状态控制器 ${controller.id} 成功，存入缓存`
			log.group.push({
				type: PopupLogGroupItemType.Data,
				title: '控制器',
				dataName: controller.id,
				dataType: 'PopupController',
				dataValue: controller,
			})
		}
	}

	return controller
}

export class Controller implements PopupController {
	#id: string
	#vm?: ComponentInternalInstance
	#core: PopupCore
	get id() {
		return this.#id
	}
	get isInstalled() {
		return !!this.#core.app
	}
	get version() {
		return version
	}
	constructor(core: PopupCore, vm?: ComponentInternalInstance) {
		this.#id = `popup-controller-${core.controllerSeed}`
		this.#core = core
		this.#vm = vm
	}
	render({ zIndex, ...options }: PopupRenderOption) {
		const log = new PopupLog({
			type: PopupLogType.Info,
			caller: {
				name: 'popup.render()',
				type: 'Function',
				value: this.render,
			},
			group: [
				{
					type: PopupLogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'PopupController',
				},
				{
					type: PopupLogGroupItemType.Data,
					title: `渲染参数`,
					dataName: `options`,
					dataType: 'PopupRenderOption',
					dataValue: arguments[0],
				},
			],
		})

		if (!this.isInstalled) {
			log.type = PopupLogType.Error
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
			type: PopupLogGroupItemType.Data,
			title: `渲染合并参数`,
			dataName: `mergedOptions`,
			dataValue: mergedOptions,
			dataType: 'PopupRenderOption',
		})
		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: '渲染方式',
			dataName: instance.renderType,
			dataType: `'${InstanceRenderType.APP}' | '${InstanceRenderType.VNODE}' | '${InstanceRenderType.ROOT_COMPONENT}'`,
			dataValue: instance.renderType,
			important: true,
		})
		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: `弹出层实例`,
			dataName: instance.id.name,
			dataValue: instance,
			dataType: 'Instance',
		})

		printLog(log)

		unref(instance.store.onMounted)()

		return instance.id
	}
	getComputedStyle(instanceId: PopupInstanceId) {
		const log = new PopupLog({
			type: PopupLogType.Info,
			caller: {
				name: 'popup.getComputedStyle()',
				type: 'Function',
				value: this.getComputedStyle,
			},
			group: [
				{
					type: PopupLogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'PopupController',
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '目标实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'PopupInstanceId',
				},
			],
		})

		if (!this.isInstalled) {
			log.type = PopupLogType.Error
			log.message = `获取弹出层 ${instanceId.name} 计算样式失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = PopupLogType.Warning
			log.message = `获取弹出层 ${instanceId.name} 计算样式失败，弹出层不存在`
			printLog(log)
			return null
		}

		const computedStyle = instance.store.computedStyle

		if (!computedStyle) {
			log.type = PopupLogType.Warning
			log.message = `获取弹出层 ${instanceId.name} 计算样式失败，弹出层未挂载`
			printLog(log)
			return null
		}

		log.message = `获取弹出层 ${instanceId.name} 计算样式成功`
		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: '弹出层实例',
			dataName: instanceId.name,
			dataType: 'Instance',
			dataValue: instance,
		})
		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: '弹出层计算样式',
			dataName: 'computedStyle',
			dataType: 'PopupViewComputedStyle',
			dataValue: computedStyle,
		})

		return computedStyle
	}
	update(instanceId: PopupInstanceId, options: PopupUpdateOption) {
		const log = new PopupLog({
			type: PopupLogType.Info,
			caller: {
				name: 'popup.update()',
				type: 'Function',
				value: this.update,
			},
			group: [
				{
					type: PopupLogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'PopupController',
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '更新实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'PopupInstanceId',
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '更新参数',
					dataName: `options`,
					dataValue: options,
					dataType: 'PopupUpdateOption',
					important: true,
				},
			],
		})

		if (!this.isInstalled) {
			log.type = PopupLogType.Error
			log.message = `更新弹出层 ${instanceId.name} 失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = PopupLogType.Warning
			log.message = `更新弹出层 ${instanceId.name} 失败，弹出层不存在`
			printLog(log)
			return
		}

		for (const _key in options) {
			const key = _key as keyof PopupUpdateOption
			const value =
				options[key] === undefined
					? instance.store[key].value
					: options[key]
			instance.store[key].value = value
		}

		log.message = `更新弹出层 ${instance.id.name} 成功`
		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: '弹出层实例',
			dataName: instanceId.name,
			dataType: 'Instance',
			dataValue: instance,
		})

		printLog(log)
	}
	async destroy(instanceId: PopupInstanceId, payload?: any) {
		const log = new PopupLog({
			type: PopupLogType.Info,
			caller: {
				name: 'popup.destroy()',
				type: 'Function',
				value: this.destroy,
			},
			group: [
				{
					type: PopupLogGroupItemType.Component,
					title: '调用组件',
					instance: this.#vm,
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '控制器',
					dataName: this.#id,
					dataValue: this,
					dataType: 'PopupController',
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '销毁实例ID',
					dataName: instanceId.name,
					dataValue: instanceId,
					dataType: 'PopupInstanceId',
				},
				{
					type: PopupLogGroupItemType.Data,
					title: '销毁携带参数',
					dataName: `payload`,
					dataValue: payload,
					dataType: 'any',
				},
			],
		})

		if (!this.isInstalled) {
			log.type = PopupLogType.Error
			log.message = `销毁弹出层 ${instanceId.name} 失败，请先调用 app.use() 注册插件`
			printLog(log)
			throw new PopupError(log)
		}

		const instance = this.#core.getInstance(instanceId)

		if (!instance) {
			log.type = PopupLogType.Warning
			log.message = `销毁弹出层 ${instanceId.name} 失败，弹出层不存在`
			printLog(log)
			return
		}

		await instance.unmount()

		log.message = `销毁弹出层 ${instance.id.name} 成功`
		log.group.push({
			type: PopupLogGroupItemType.Data,
			title: '弹出层实例',
			dataName: instanceId.name,
			dataValue: instance,
			dataType: 'Instance',
		})

		printLog(log)

		unref(instance.store.onUnmounted)(payload)
	}
}
