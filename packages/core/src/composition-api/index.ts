import { getCurrentInstance, hasInjectionContext, inject } from 'vue'
import {
	defaultPrintLog,
	printLog,
	Log,
	LogType,
	LogGroupItemType,
} from '../log'
import { Controller, type IController } from '../controller'
import { getCore } from '../core'
import { PopupError } from '../error'
import { type InstanceId } from '../instance'
import { POPUP_COMPONENT_INJECTS } from '../CONSTANTS'

let _noContextController: IController

/**
 * 获取弹出层控制器
 *
 * - 必须先调用 `createPopupPlus()` 创建弹出层插件，才能使用该函数
 * ，否则会抛出异常
 *
 * @returns 弹出层控制器实例
 */
export function usePopup(): IController {
	const core = getCore()

	if (!core) {
		const log = new Log({
			type: LogType.Error,
			caller: {
				name: 'usePopup()',
				type: 'Function',
				value: usePopup,
			},
			message: `调用 usePopup() 前请先调用 createPopupPlus() 创建弹出层插件实例`,
		})
		defaultPrintLog(log)
		throw new PopupError(log)
	}

	const vm = getCurrentInstance()

	let controller: IController

	if (vm) {
		controller = new Controller(core, vm || undefined)

		const componentName = vm?.type.name || '未知'

		printLog(
			new Log({
				type: LogType.Info,
				caller: {
					name: 'usePopup()',
					type: 'Function',
					value: usePopup,
				},
				message: `创建控制器 ${controller.id} 成功，包含 ${componentName} 组件上下文`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
					{
						type: LogGroupItemType.Data,
						title: '控制器',
						dataName: controller.id,
						dataType: 'IController',
						dataValue: controller,
					},
				],
			})
		)
	} else {
		if (_noContextController) {
			controller = _noContextController
			printLog(
				new Log({
					type: LogType.Info,
					caller: {
						name: 'usePopup()',
						type: 'Function',
						value: usePopup,
					},
					message: `从缓存中获取无上下文控制器 ${controller.id} 成功`,
					group: [
						{
							type: LogGroupItemType.Data,
							title: '控制器',
							dataName: controller.id,
							dataType: 'IController',
							dataValue: controller,
						},
					],
				})
			)
		} else {
			controller = _noContextController = new Controller(core)
			printLog(
				new Log({
					type: LogType.Info,
					caller: {
						name: 'usePopup()',
						type: 'Function',
						value: usePopup,
					},
					message: `创建无上下文控制器 ${controller.id} 成功，存入缓存`,
					group: [
						{
							type: LogGroupItemType.Data,
							title: '控制器',
							dataName: controller.id,
							dataType: 'IController',
							dataValue: controller,
						},
					],
				})
			)
		}
	}

	return controller
}

/**
 * 获取弹出层实例 ID
 *
 * - 如果当前组件不在弹出层内，则返回 `undefined`
 * - debugMode 为 `true` 时，会打印警告日志
 *
 * @returns 弹出层实例 ID
 */
export function usePopupInstanceId() {
	if (!hasInjectionContext()) {
		printLog(
			new Log({
				type: LogType.Error,
				caller: {
					name: 'usePopupInstanceId()',
					type: 'Function',
					value: usePopupInstanceId,
				},
				message: `获取弹出层实例ID失败，必须在 setup 函数中调用`,
			})
		)
		return undefined
	}

	const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID, undefined)
	const vm = getCurrentInstance()
	const componentName = vm?.type.name || '未知'

	if (instanceId) {
		printLog(
			new Log({
				type: LogType.Info,
				caller: {
					name: 'usePopupInstanceId()',
					type: 'Function',
					value: usePopupInstanceId,
				},
				message: `获取弹出层实例ID ${instanceId.name} 成功，${componentName} 组件`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
					{
						type: LogGroupItemType.Data,
						title: '弹出层实例ID',
						dataType: 'InstanceId',
						dataName: instanceId.name,
						dataValue: instanceId,
					},
				],
			})
		)
	} else {
		printLog(
			new Log({
				type: LogType.Warning,
				caller: {
					name: 'usePopupInstanceId()',
					type: 'Function',
					value: usePopupInstanceId,
				},
				message: `获取弹出层实例ID失败，${componentName} 组件不在弹出层内`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
				],
			})
		)
	}

	return instanceId
}

export function usePopupComputedStyle() {
	if (!hasInjectionContext()) {
		printLog(
			new Log({
				type: LogType.Error,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式失败，必须在 setup 函数中调用`,
			})
		)
		return undefined
	}

	const computedStyle = inject(
		POPUP_COMPONENT_INJECTS.COMPUTED_STYLE,
		undefined
	)
	const vm = getCurrentInstance()
	const componentName = vm?.type.name || '未知'

	if (computedStyle) {
		printLog(
			new Log({
				type: LogType.Info,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式成功，${componentName} 组件`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
					{
						type: LogGroupItemType.Data,
						title: '弹出层计算样式',
						dataType: 'ComputedStyle',
						dataName: 'computedStyle',
						dataValue: computedStyle,
					},
				],
			})
		)
	} else {
		printLog(
			new Log({
				type: LogType.Warning,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式失败，${componentName} 组件不在弹出层内`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
				],
			})
		)
	}

	return computedStyle
}
